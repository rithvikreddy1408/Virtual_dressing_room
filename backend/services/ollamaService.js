/**
 * ollamaService.js
 * Calls the local Ollama HTTP API to generate an outfit try-on image
 * using a Flux model (text-to-image).
 *
 * Requires Ollama to be running: `ollama serve`
 * Requires a Flux model to be pulled, e.g.:
 *   ollama pull hf.co/lllyasviel/flux1-schnell-bnb-nf4
 */

const OLLAMA_BASE_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const FLUX_MODEL = process.env.FLUX_MODEL || 'hf.co/lllyasviel/flux1-schnell-bnb-nf4';
const TIMEOUT_MS = 120_000; // 2 minutes — Flux generation can be slow

/**
 * Build a descriptive text prompt from garment details.
 * @param {object} garment - { name, type, color, brand }
 * @returns {string} prompt
 */
function buildPrompt(garment) {
    const typeLabel = {
        shirts: 'shirt / top',
        jackets: 'jacket / coat',
        dresses: 'dress',
        pants: 'trousers / pants',
    }[garment.type] || 'outfit';

    return (
        `A photorealistic full-body fashion photograph of a person wearing a ${garment.name} ` +
        `(${typeLabel}) by ${garment.brand}. ` +
        `The garment is styled fashionably against a clean, bright studio background. ` +
        `High quality, professional fashion photography, sharp details, 4K.`
    );
}

/**
 * Call the Ollama /api/generate endpoint to produce an image.
 * Returns the generated image as a base64 string (no data-URL prefix).
 *
 * @param {object} garment - { name, type, color, brand }
 * @returns {Promise<string>} base64 image data
 */
async function generateOutfitImage(garment) {
    const prompt = buildPrompt(garment);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    let response;
    try {
        response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
                model: FLUX_MODEL,
                prompt,
                stream: false,
            }),
        });
    } catch (err) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
            throw new Error('Ollama request timed out after 2 minutes. Try a lighter model.');
        }
        throw new Error(
            'Cannot reach Ollama. Make sure it is running: `ollama serve`'
        );
    }

    clearTimeout(timeoutId);

    if (!response.ok) {
        const text = await response.text().catch(() => 'unknown error');
        throw new Error(`Ollama returned ${response.status}: ${text}`);
    }

    const json = await response.json();

    // Flux models return the image in json.images[0] (base64)
    if (json.images && json.images.length > 0) {
        return json.images[0]; // base64 string
    }

    // Some Ollama builds put the image in json.response (base64 PNG)
    if (json.response && json.response.length > 100) {
        return json.response;
    }

    throw new Error(
        `Ollama did not return an image. Model "${FLUX_MODEL}" may not support image generation. ` +
        `Run: ollama pull ${FLUX_MODEL}`
    );
}

/**
 * Check whether the Ollama server is reachable.
 * @returns {Promise<boolean>}
 */
async function isOllamaRunning() {
    try {
        const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
            signal: AbortSignal.timeout(3000),
        });
        return res.ok;
    } catch {
        return false;
    }
}

/**
 * Return the list of locally available Ollama models.
 * @returns {Promise<string[]>} array of model names
 */
async function listAvailableModels() {
    try {
        const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
            signal: AbortSignal.timeout(5000),
        });
        if (!res.ok) return [];
        const json = await res.json();
        return (json.models || []).map((m) => m.name);
    } catch {
        return [];
    }
}

module.exports = { generateOutfitImage, isOllamaRunning, listAvailableModels };
