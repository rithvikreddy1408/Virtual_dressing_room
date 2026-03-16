/**
 * ui.js — All DOM rendering, UI state, Canvas drawing, and localStorage wardrobe logic.
 * Split into clearly labelled sections so each concern is easy to find.
 */

// ─── CONSTANTS: Fit score options ─────────────────────────────────────────────

const FIT_SCORES = [
    { label: 'Good Fit', className: 'fit-good', score: 95, desc: 'This garment fits your body type perfectly. Great choice!' },
    { label: 'Slightly Loose', className: 'fit-loose', score: 74, desc: 'A bit roomy around the waist. Consider sizing down.' },
    { label: 'Too Tight', className: 'fit-tight', score: 48, desc: 'Might feel snug. We recommend one size up.' },
];

// ─── CONSTANTS: Landing page data ────────────────────────────────────────────

const TRENDING_OUTFITS = [
    { id: 1, name: 'Quiet Luxury Set', style: 'Minimalist', image: 'https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=280&h=380&fit=crop', price: '$340', likes: 26 },
    { id: 2, name: 'Boho Dream', style: 'Bohemian', image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=280&h=380&fit=crop', price: '$189', likes: 18 },
    { id: 3, name: 'Power Suit Edit', style: 'Formal', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=280&h=380&fit=crop', price: '$420', likes: 34 },
    { id: 4, name: 'Floral Midi Magic', style: 'Casual', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=280&h=380&fit=crop', price: '$145', likes: 42 },
    { id: 5, name: 'Dark Romance', style: 'Elegant', image: 'https://images.unsplash.com/photo-1566479153369-bca2a1c6f0a0?w=280&h=380&fit=crop', price: '$265', likes: 21 },
    { id: 6, name: 'Street Style', style: 'Streetwear', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=280&h=380&fit=crop', price: '$215', likes: 29 },
];

const LANDING_STEPS = [
    { icon: '📸', title: 'Upload or Use Webcam', desc: 'Take a photo or upload one — our AI detects your body pose in real time.', color: '#c9a96e' },
    { icon: '✨', title: 'AI Detects Your Body', desc: 'Pose detection maps keypoints to understand your proportions precisely.', color: '#b07d6b' },
    { icon: '👗', title: 'Try On Clothes', desc: 'Browse our catalog and see garments overlaid on your body instantly.', color: '#d4956a' },
];

const LANDING_FEATURES = [
    { icon: '📸', title: 'Virtual Try-On', desc: 'See how clothes look on your body using AI pose detection and garment overlay.', color: '#c9a96e', page: 'try-on' },
    { icon: '✨', title: 'AI Recommendations', desc: 'Get personalized outfit combinations based on body type, occasion, and style.', color: '#b07d6b', page: 'recommendations' },
    { icon: '⚡', title: 'Fit Prediction', desc: 'AI predicts how well a garment fits. See fit scores before you buy.', color: '#d4956a', page: 'try-on' },
    { icon: '📈', title: 'Trend Insights', desc: 'Stay ahead with real-time fashion trends and seasonal style analytics.', color: '#8a9e8c', page: 'trends' },
];

const LANDING_STATS = [
    { value: 'NEW', label: 'Beta Launch' },
    { value: '24', label: 'Catalog Items' },
    { value: 'AI', label: 'Pose + Fit Engine' },
    { value: '0', label: 'Looks Saved Yet' },
];

const USD_TO_INR = 83;

function formatINR(amountUsd) {
    const inr = Math.round((Number(amountUsd) || 0) * USD_TO_INR);
    return `₹${inr.toLocaleString('en-IN')}`;
}

function skinGuidanceForTone(tone, undertone) {
    const neutral = {
        colors: ['Emerald', 'Navy', 'Charcoal', 'Teal', 'Burgundy'],
        patterns: ['Vertical stripes', 'Small checks', 'Minimal prints', 'Solid blocks'],
    };
    const guides = {
        fair: {
            warm: { colors: ['Coral', 'Olive', 'Warm beige', 'Rust', 'Mustard'], patterns: ['Soft florals', 'Thin stripes', 'Subtle geometrics'] },
            cool: { colors: ['Royal blue', 'Lavender', 'Emerald', 'Rose pink', 'Charcoal'], patterns: ['Pinstripes', 'Plaids', 'Monochrome prints'] },
            neutral: neutral,
        },
        medium: {
            warm: { colors: ['Terracotta', 'Gold', 'Forest green', 'Camel', 'Maroon'], patterns: ['Paisley', 'Geometric motifs', 'Medium checks'] },
            cool: { colors: ['Cobalt', 'Plum', 'Slate', 'Mint', 'Deep red'], patterns: ['Abstract prints', 'Structured stripes', 'Two-tone colorblocks'] },
            neutral: neutral,
        },
        deep: {
            warm: { colors: ['Burnt orange', 'Mustard', 'Olive', 'Chocolate', 'Copper'], patterns: ['Bold stripes', 'Ethnic motifs', 'Larger checks'] },
            cool: { colors: ['Fuchsia', 'Electric blue', 'Violet', 'Crisp white', 'Ruby'], patterns: ['High-contrast prints', 'Chevron', 'Sharp geometrics'] },
            neutral: neutral,
        },
    };
    return guides[tone]?.[undertone] || neutral;
}

// ─── SECTION 1: SPA Navigation ────────────────────────────────────────────────

/**
 * Show the given page section and update nav links to reflect the active page.
 * @param {string} pageId - e.g. 'home', 'try-on', 'measure', 'recommendations', 'trends', 'dashboard'
 */
function showPage(pageId) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach((s) => s.classList.remove('active'));

    // Show the requested section
    const target = document.getElementById(`page-${pageId}`);
    if (target) target.classList.add('active');

    // Update desktop nav links
    document.querySelectorAll('.navbar__link').forEach((link) => {
        link.classList.toggle('active', link.dataset.page === pageId);
    });

    // Update mobile nav links
    document.querySelectorAll('.navbar__mobile-link').forEach((link) => {
        link.classList.toggle('active', link.dataset.page === pageId);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // On-demand page initialisation (only runs once)
    if (pageId === 'trends' && !window._trendsLoaded) loadTrendsPage();
    if (pageId === 'try-on' && !window._tryOnLoaded) initTryOnPage();
    if (pageId === 'measure' && !window._measureLoaded) initMeasurePage();
    if (pageId === 'measure') renderMeasurementsPage();
    if (pageId === 'recommendations') {
        if (!window._recoLoaded) initRecoPage();
        resetRecommendationsView();
    }
    if (pageId === 'dashboard') loadDashboard();
}

// ─── SECTION 2: Navbar ────────────────────────────────────────────────────────

/** Toggle light/dark mode */
function initDarkModeToggle() {
    const btn = document.getElementById('dark-mode-toggle');
    if (!btn) return;

    const stored = localStorage.getItem('theme');
    if (stored === 'light') document.body.classList.add('light-mode');
    updateDarkModeIcon();

    btn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateDarkModeIcon();
    });
}

function updateDarkModeIcon() {
    const btn = document.getElementById('dark-mode-toggle');
    if (!btn) return;
    const isLight = document.body.classList.contains('light-mode');
    btn.textContent = isLight ? '☀️' : '🌙';
    btn.title = isLight ? 'Switch to dark mode' : 'Switch to light mode';
}

/** Toggle mobile hamburger menu */
function initMobileMenu() {
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        menu.classList.toggle('open');
        btn.textContent = menu.classList.contains('open') ? '✕' : '☰';
    });
}

// ─── SECTION 3: Landing Page ──────────────────────────────────────────────────

/** Render the static parts of the landing page (steps, carousel, features, stats). */
function renderLandingPage() {
    renderStats();
    renderSteps();
    renderCarousel();
    renderFeatures();
}

function renderStats() {
    const el = document.getElementById('hero-stats');
    if (!el) return;
    el.innerHTML = LANDING_STATS.map(({ value, label }) => `
    <div style="text-align:center">
      <div class="hero__stat-value">${value}</div>
      <div class="hero__stat-label">${label}</div>
    </div>
  `).join('');
}

function renderSteps() {
    const el = document.getElementById('how-it-works-grid');
    if (!el) return;
    el.innerHTML = LANDING_STEPS.map((step, i) => `
    <div class="step-card">
      <div class="step-card__num">${i + 1}</div>
      <div class="step-card__icon-wrap" style="background:${step.color}22">
        <span>${step.icon}</span>
      </div>
      <h3 class="step-card__title">${step.title}</h3>
      <p class="step-card__desc">${step.desc}</p>
    </div>
  `).join('');
}

function renderCarousel() {
    const el = document.getElementById('trending-carousel');
    if (!el) return;
    el.innerHTML = TRENDING_OUTFITS.map((outfit) => `
    <div class="outfit-card">
      <div class="outfit-card__image-wrap">
        <img class="outfit-card__image" src="${outfit.image}" alt="${outfit.name}" loading="lazy">
        <div class="outfit-card__style-tag">${outfit.style}</div>
      </div>
      <div class="outfit-card__body">
        <div class="outfit-card__foot">
          <div>
            <div class="outfit-card__name">${outfit.name}</div>
            <div class="outfit-card__saves">❤️ ${outfit.likes.toLocaleString()} saves</div>
          </div>
          <div class="outfit-card__price">${outfit.price}</div>
        </div>
        <button class="outfit-card__try-btn" onclick="showPage('try-on')">Try This On</button>
      </div>
    </div>
  `).join('');
}

function renderFeatures() {
    const el = document.getElementById('features-grid');
    if (!el) return;
    el.innerHTML = LANDING_FEATURES.map((f) => `
    <div class="feature-card" onclick="showPage('${f.page}')">
      <div class="feature-card__icon-wrap" style="background:${f.color}20">
        <span style="font-size:24px">${f.icon}</span>
      </div>
      <h3 class="feature-card__title">${f.title}</h3>
      <p class="feature-card__desc">${f.desc}</p>
      <div class="feature-card__link" style="color:${f.color}">
        <span>Explore</span>
        <span>›</span>
      </div>
    </div>
  `).join('');
}

// ─── SECTION 4: Try-On Page ───────────────────────────────────────────────────

/** State for the Try-On page. */
const tryOnState = {
    mode: 'upload',          // 'upload' | 'webcam'
    uploadedImageUrl: null,
    selectedGarment: null,
    showSkeleton: true,
    poseDetected: false,
    poseDetecting: false,
    saved: false,
    fitScore: FIT_SCORES[0],
    mediaStream: null,
    videoEl: null,
    animFrameId: null,
    garmentImg: null,
    canvasWidth: 640,
    canvasHeight: 480,
    activeCategory: 'shirts',
    allGarments: {},
    poseKeypoints: null,
    latestMeasurements: null,
    heightCm: 170,
    poseDetector: null,
    poseDetectorLoading: null,
    poseDetectorMode: null,
    poseDetectorError: '',
    lastVideoTime: -1,
    lastMeasurementTs: 0,
    poseKeypointsWidth: 640,
    poseKeypointsHeight: 480,
    garmentRenderMode: 'stylized',
    skinProfile: null,
    fullBodyVisible: false,
    generatedTryOnImage: '',
};

function initTryOnPage() {
    window._tryOnLoaded = true;
    renderGarmentPanel(tryOnState.allGarments, tryOnState.activeCategory);
    bindTryOnControls();
    setTryOnMode('upload');
}

/** Wire up all Try-On page buttons. */
function bindTryOnControls() {
    // Mode tabs
    document.querySelectorAll('.mode-tab').forEach((tab) => {
        tab.addEventListener('click', () => setTryOnMode(tab.dataset.mode));
    });

    // Upload drop zone
    const fileInput = document.getElementById('photo-upload-input');
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const url = URL.createObjectURL(file);
            tryOnState.uploadedImageUrl = url;
            tryOnState.poseDetected = false;
            tryOnState.poseDetecting = false;
            tryOnState.poseKeypoints = null;
            tryOnState.latestMeasurements = null;
            tryOnState.skinProfile = null;
            tryOnState.fullBodyVisible = false;
            const hiddenImg = document.getElementById('hidden-img');
            if (hiddenImg) hiddenImg.src = url;
            renderTryOnCanvas();
            startCanvasLoop();
            updatePoseOverlay();
            updateMeasurementsUi();
            updateSkinAnalysisUi();
        });
    }

    const heightInput = document.getElementById('height-input');
    if (heightInput) {
        heightInput.addEventListener('input', (e) => setHeightCm(e.target.value));
    }

    // Skeleton toggle
    const skelBtn = document.getElementById('skeleton-toggle');
    if (skelBtn) {
        skelBtn.addEventListener('click', () => {
            tryOnState.showSkeleton = !tryOnState.showSkeleton;
            skelBtn.textContent = tryOnState.showSkeleton ? '🦴 Hide Skeleton' : '🦴 Show Skeleton';
        });
    }

    // Save button
    const saveBtn = document.getElementById('save-look-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            tryOnState.saved = !tryOnState.saved;
            saveBtn.textContent = tryOnState.saved ? '❤️ Saved!' : '🤍 Save Look';
            saveBtn.classList.toggle('saved', tryOnState.saved);
        });
    }

    syncHeightInputs();
}

/** Switch between upload and webcam modes. */
function setTryOnMode(mode) {
    tryOnState.mode = mode;
    tryOnState.poseDetected = false;
    tryOnState.poseDetecting = false;
    tryOnState.poseKeypoints = null;
    tryOnState.skinProfile = null;
    tryOnState.fullBodyVisible = false;

    document.querySelectorAll('.mode-tab').forEach((tab) => {
        tab.classList.toggle('active', tab.dataset.mode === mode);
    });

    const uploadArea = document.getElementById('upload-area');
    const webcamArea = document.getElementById('webcam-area');

    if (uploadArea) uploadArea.style.display = mode === 'upload' ? 'block' : 'none';
    if (webcamArea) webcamArea.style.display = mode === 'webcam' ? 'block' : 'none';

    if (mode === 'webcam') startWebcam();
    else stopWebcam();

    renderTryOnCanvas();
    updatePoseOverlay();
    renderMeasurementsPage();
    updateSkinAnalysisUi();
}

/** Render the canvas area depending on state. */
function renderTryOnCanvas() {
    const uploadArea = document.getElementById('upload-area');
    const canvasWrap = document.getElementById('canvas-wrap');
    const dropZone = document.getElementById('upload-drop');
    const webcamCanvas = document.getElementById('pose-canvas-webcam');
    if (!uploadArea || !canvasWrap) return;

    if (tryOnState.mode === 'upload') {
        if (webcamCanvas) webcamCanvas.style.display = 'none';
        if (tryOnState.uploadedImageUrl) {
            if (dropZone) dropZone.style.display = 'none';
            canvasWrap.style.display = 'block';
            startCanvasLoop();
        } else {
            if (dropZone) dropZone.style.display = 'flex';
            canvasWrap.style.display = 'none';
            stopCanvasLoop();
        }
    } else if (tryOnState.mode === 'webcam') {
        if (webcamCanvas) webcamCanvas.style.display = 'block';
        stopCanvasLoop();
    }
}

function clearUploadedPhoto() {
    const fileInput = document.getElementById('photo-upload-input');
    const hiddenImg = document.getElementById('hidden-img');
    if (fileInput) fileInput.value = '';
    if (hiddenImg) hiddenImg.src = '';
    tryOnState.uploadedImageUrl = null;
    tryOnState.poseDetected = false;
    tryOnState.poseDetecting = false;
    tryOnState.poseKeypoints = null;
    tryOnState.latestMeasurements = null;
    tryOnState.skinProfile = null;
    tryOnState.fullBodyVisible = false;
    renderTryOnCanvas();
    updatePoseOverlay();
    updateMeasurementsUi();
    updateSkinAnalysisUi();
}

// ─── Canvas: Pose detection + measurements ───────────────────────────────────

const POSE_MODEL_URL = 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task';

function simulatePoseKeypoints(w, h) {
    const cx = w * 0.5;
    return {
        nose: [cx, h * 0.12],
        leftShoulder: [cx - w * 0.18, h * 0.28],
        rightShoulder: [cx + w * 0.18, h * 0.28],
        leftHip: [cx - w * 0.14, h * 0.55],
        rightHip: [cx + w * 0.14, h * 0.55],
        leftAnkle: [cx - w * 0.1, h * 0.92],
        rightAnkle: [cx + w * 0.1, h * 0.92],
    };
}

function clampHeight(value) {
    const n = Number.parseInt(value, 10);
    if (Number.isNaN(n)) return 170;
    return Math.min(220, Math.max(120, n));
}

function syncHeightInputs() {
    const h1 = document.getElementById('height-input');
    const h2 = document.getElementById('measure-height-input');
    if (h1) h1.value = `${tryOnState.heightCm}`;
    if (h2) h2.value = `${tryOnState.heightCm}`;
}

function setHeightCm(value) {
    tryOnState.heightCm = clampHeight(value);
    syncHeightInputs();
    refreshMeasurements();
}

async function ensurePoseDetector(runningMode = 'IMAGE') {
    if (tryOnState.poseDetector) {
        if (tryOnState.poseDetectorMode !== runningMode) {
            await tryOnState.poseDetector.setOptions({ runningMode });
            tryOnState.poseDetectorMode = runningMode;
        }
        return tryOnState.poseDetector;
    }

    if (tryOnState.poseDetectorLoading) {
        await tryOnState.poseDetectorLoading;
        return ensurePoseDetector(runningMode);
    }

    tryOnState.poseDetectorLoading = (async () => {
        const { FilesetResolver, PoseLandmarker } = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14');
        const vision = await FilesetResolver.forVisionTasks(
            'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm',
        );
        tryOnState.poseDetector = await PoseLandmarker.createFromOptions(vision, {
            baseOptions: { modelAssetPath: POSE_MODEL_URL, delegate: 'GPU' },
            runningMode,
            numPoses: 1,
            minPoseDetectionConfidence: 0.45,
            minPosePresenceConfidence: 0.45,
            minTrackingConfidence: 0.45,
        });
        tryOnState.poseDetectorMode = runningMode;
        tryOnState.poseDetectorError = '';
    })();

    try {
        await tryOnState.poseDetectorLoading;
    } catch (err) {
        console.warn('Pose detector failed to initialize, using fallback:', err);
        tryOnState.poseDetectorError = 'Live AI model could not load; using fallback pose.';
    } finally {
        tryOnState.poseDetectorLoading = null;
    }

    return tryOnState.poseDetector;
}

function mapLandmarksToKeypoints(landmarks, width, height) {
    if (!landmarks || landmarks.length < 29) return null;
    const scale = (idx) => {
        const p = landmarks[idx];
        if (!p) return null;
        return [p.x * width, p.y * height];
    };
    return {
        nose: scale(0),
        leftShoulder: scale(11),
        rightShoulder: scale(12),
        leftHip: scale(23),
        rightHip: scale(24),
        leftAnkle: scale(27),
        rightAnkle: scale(28),
    };
}

function getUploadPoseKeypoints(canvas) {
    if (!tryOnState.poseKeypoints) return null;
    if (
        tryOnState.poseKeypointsWidth === canvas.width
        && tryOnState.poseKeypointsHeight === canvas.height
    ) {
        return tryOnState.poseKeypoints;
    }

    const sx = canvas.width / (tryOnState.poseKeypointsWidth || canvas.width);
    const sy = canvas.height / (tryOnState.poseKeypointsHeight || canvas.height);
    const scaled = {};
    for (const [key, pt] of Object.entries(tryOnState.poseKeypoints)) {
        scaled[key] = pt ? [pt[0] * sx, pt[1] * sy] : null;
    }
    return scaled;
}

function getVideoPoseKeypoints(canvas) {
    const detector = tryOnState.poseDetector;
    const video = tryOnState.videoEl;
    if (!detector || !video || video.readyState < 2) return null;

    if (tryOnState.lastVideoTime === video.currentTime) return null;
    tryOnState.lastVideoTime = video.currentTime;

    let result;
    try {
        result = detector.detectForVideo(video, performance.now());
    } catch (err) {
        console.warn('Video pose detection frame failed:', err);
        return null;
    }
    if (!result || !result.landmarks || !result.landmarks.length) return null;

    return mapLandmarksToKeypoints(result.landmarks[0], canvas.width, canvas.height);
}

function dist(a, b) {
    if (!a || !b) return 0;
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    return Math.sqrt(dx * dx + dy * dy);
}

function estimateMeasurements(kp) {
    if (!kp || !kp.nose || !kp.leftShoulder || !kp.rightShoulder || !kp.leftHip || !kp.rightHip) return null;

    const shoulderMid = [
        (kp.leftShoulder[0] + kp.rightShoulder[0]) / 2,
        (kp.leftShoulder[1] + kp.rightShoulder[1]) / 2,
    ];
    const hipMid = [
        (kp.leftHip[0] + kp.rightHip[0]) / 2,
        (kp.leftHip[1] + kp.rightHip[1]) / 2,
    ];

    const leftBodyH = kp.leftAnkle ? dist(kp.nose, kp.leftAnkle) : 0;
    const rightBodyH = kp.rightAnkle ? dist(kp.nose, kp.rightAnkle) : 0;
    const bodyPx = (leftBodyH && rightBodyH) ? (leftBodyH + rightBodyH) / 2 : Math.max(leftBodyH, rightBodyH, dist(kp.nose, hipMid) * 1.8);
    if (!bodyPx) return null;

    const pxToCm = tryOnState.heightCm / bodyPx;
    const shoulderW = dist(kp.leftShoulder, kp.rightShoulder) * pxToCm;
    const hipW = dist(kp.leftHip, kp.rightHip) * pxToCm;
    const torsoLen = dist(shoulderMid, hipMid) * pxToCm;
    const inseamDivisor = kp.leftAnkle && kp.rightAnkle ? 2 : 1;
    const inseam = (
        (kp.leftAnkle ? dist(kp.leftHip, kp.leftAnkle) : 0)
        + (kp.rightAnkle ? dist(kp.rightHip, kp.rightAnkle) : 0)
    ) / inseamDivisor * pxToCm;

    return {
        shoulder: Math.round(shoulderW * 10) / 10,
        chest: Math.round((shoulderW * 2.05) * 10) / 10,
        waist: Math.round((hipW * 1.55) * 10) / 10,
        hips: Math.round((hipW * 1.95) * 10) / 10,
        inseam: Math.round(inseam * 10) / 10,
        torso: Math.round(torsoLen * 10) / 10,
    };
}

function measurementCardsMarkup(measurements) {
    const rows = [
        { label: 'Shoulder Width', key: 'shoulder' },
        { label: 'Chest (est.)', key: 'chest' },
        { label: 'Waist (est.)', key: 'waist' },
        { label: 'Hips (est.)', key: 'hips' },
        { label: 'Inseam (est.)', key: 'inseam' },
        { label: 'Torso Length', key: 'torso' },
    ];
    return rows.map((item) => `
      <div class="measurement-card">
        <p class="measurement-card__label">${item.label}</p>
        <p class="measurement-card__value">${measurements[item.key]} <span>cm</span></p>
      </div>
    `).join('');
}

function updateMeasurementsUi() {
    const card = document.getElementById('body-measurements-card');
    if (card) {
        if (!tryOnState.latestMeasurements) {
            card.style.display = 'none';
        } else {
            card.style.display = 'block';
            card.innerHTML = `
              <div class="fit-score-header">
                <div class="fit-score-label">📏 Body Measurements (Estimated)</div>
                <span class="fit-badge fit-good">${tryOnState.heightCm} cm</span>
              </div>
              <div class="measurements-grid">${measurementCardsMarkup(tryOnState.latestMeasurements)}</div>
              <p style="font-size:12px;color:var(--text-muted);margin-top:10px">Estimates from pose keypoints. Stand straight for best accuracy.</p>
            `;
        }
    }
    renderMeasurementsPage();
}

function computeAndStoreMeasurements(kp) {
    const m = estimateMeasurements(kp);
    if (!m) return;
    tryOnState.latestMeasurements = m;
    updateMeasurementsUi();
}

function sampleRgb(ctx, x, y) {
    try {
        const data = ctx.getImageData(Math.max(0, Math.floor(x)), Math.max(0, Math.floor(y)), 1, 1).data;
        return [data[0], data[1], data[2]];
    } catch {
        return null;
    }
}

function classifySkin(rgb) {
    const [r, g, b] = rgb;
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    let tone = 'medium';
    if (brightness > 175) tone = 'fair';
    else if (brightness < 110) tone = 'deep';

    const rg = r - g;
    const gb = g - b;
    let undertone = 'neutral';
    if (rg > 12 && gb > 4) undertone = 'warm';
    else if (b - r > 10 || g - r > 10) undertone = 'cool';

    return { tone, undertone, rgb: `rgb(${r},${g},${b})` };
}

function evaluateBodyVisibility(kp, canvasHeight) {
    const hasFace = Boolean(kp.nose);
    const hasShoulders = Boolean(kp.leftShoulder && kp.rightShoulder);
    const hasHips = Boolean(kp.leftHip && kp.rightHip);
    const hasAnkles = Boolean(kp.leftAnkle && kp.rightAnkle);
    const fullBody = hasAnkles && Math.max(kp.leftAnkle[1], kp.rightAnkle[1]) < canvasHeight * 0.99;
    return {
        hasFace,
        hasUpperBody: hasFace && hasShoulders,
        hasHalfBody: hasFace && hasShoulders && hasHips,
        fullBody,
    };
}

function updateSkinProfileFromFrame(ctx, kp, canvas) {
    if (!kp || !kp.nose) return;
    const pts = [
        [kp.nose[0], kp.nose[1] + 12],
        [kp.nose[0] - 14, kp.nose[1] + 16],
        [kp.nose[0] + 14, kp.nose[1] + 16],
    ];
    const rgbVals = pts.map(([x, y]) => sampleRgb(ctx, x, y)).filter(Boolean);
    if (!rgbVals.length) return;
    const avg = rgbVals.reduce((acc, cur) => [acc[0] + cur[0], acc[1] + cur[1], acc[2] + cur[2]], [0, 0, 0]).map((v) => Math.round(v / rgbVals.length));
    const profile = classifySkin(avg);
    const body = evaluateBodyVisibility(kp, canvas.height);
    const guide = skinGuidanceForTone(profile.tone, profile.undertone);
    tryOnState.skinProfile = { ...profile, ...body, ...guide };
    tryOnState.fullBodyVisible = body.fullBody;
    updateSkinAnalysisUi();
}

function updateSkinAnalysisUi() {
    const el = document.getElementById('skin-analysis-card');
    if (!el) return;
    if (!tryOnState.skinProfile) {
        el.style.display = 'none';
        return;
    }
    const p = tryOnState.skinProfile;
    const bodyMsg = p.fullBody
        ? 'Full body detected: best for accurate outfit fit.'
        : (p.hasHalfBody ? 'Half body detected. Move back to show full body for best fit recommendations.' : 'Face/upper body detected. Show full body for better fit recommendations.');
    el.style.display = 'block';
    el.innerHTML = `
      <div class="fit-score-header">
        <div class="fit-score-label">🎨 Skin & Frame Analysis</div>
        <span class="fit-badge fit-good">${p.tone.toUpperCase()} • ${p.undertone}</span>
      </div>
      <p style="color:var(--text-secondary);font-size:13px;margin-bottom:12px">${bodyMsg}</p>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
        <span style="font-size:12px;color:var(--text-muted)">Detected skin swatch</span>
        <span style="display:inline-block;width:28px;height:28px;border-radius:50%;border:1px solid var(--border-color);background:${p.rgb}"></span>
      </div>
      <p style="font-size:13px;color:var(--text-secondary);margin-bottom:6px"><strong style="color:var(--text-primary)">Best Colors:</strong> ${p.colors.join(', ')}</p>
      <p style="font-size:13px;color:var(--text-secondary)"><strong style="color:var(--text-primary)">Best Patterns:</strong> ${p.patterns.join(', ')}</p>
    `;
    renderSkinGuidanceForReco();
}

function renderSkinGuidanceForReco() {
    const el = document.getElementById('reco-skin-guidance');
    if (!el) return;
    if (!tryOnState.skinProfile) {
        el.style.display = 'none';
        return;
    }
    const p = tryOnState.skinProfile;
    el.style.display = 'block';
    el.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap">
        <div>
          <p style="font-weight:700;color:var(--text-primary);margin-bottom:6px">Skin-aware style guidance</p>
          <p style="font-size:13px;color:var(--text-secondary)">Detected tone: ${p.tone} • undertone: ${p.undertone}</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:12px;color:var(--text-muted)">Swatch</span>
          <span style="display:inline-block;width:22px;height:22px;border-radius:50%;border:1px solid var(--border-color);background:${p.rgb}"></span>
        </div>
      </div>
      <p style="font-size:13px;color:var(--text-secondary);margin-top:10px"><strong style="color:var(--text-primary)">Recommended colors:</strong> ${p.colors.join(', ')}</p>
      <p style="font-size:13px;color:var(--text-secondary);margin-top:6px"><strong style="color:var(--text-primary)">Recommended patterns:</strong> ${p.patterns.join(', ')}</p>
    `;
}

/** Draw skeleton lines and keypoint dots onto the canvas context. */
function drawSkeleton(ctx, kp) {
    const connections = [
        ['leftShoulder', 'rightShoulder'],
        ['leftShoulder', 'leftHip'],
        ['rightShoulder', 'rightHip'],
        ['leftHip', 'rightHip'],
        ['leftHip', 'leftAnkle'],
        ['rightHip', 'rightAnkle'],
        ['nose', 'leftShoulder'],
        ['nose', 'rightShoulder'],
    ];

    ctx.strokeStyle = 'rgba(201,169,110,0.8)';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#c9a96e';
    ctx.shadowBlur = 6;

    for (const [a, b] of connections) {
        if (kp[a] && kp[b]) {
            ctx.beginPath();
            ctx.moveTo(kp[a][0], kp[a][1]);
            ctx.lineTo(kp[b][0], kp[b][1]);
            ctx.stroke();
        }
    }

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#b07d6b';
    for (const pt of Object.values(kp)) {
        if (pt) {
            ctx.beginPath();
            ctx.arc(pt[0], pt[1], 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
}

function normalizeHex(hex) {
    if (!hex) return '#c9a96e';
    if (hex.length === 4) {
        return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
    }
    return hex;
}

function shiftHex(hex, amount) {
    const h = normalizeHex(hex);
    const n = Number.parseInt(h.slice(1), 16);
    const r = clamp(((n >> 16) & 255) + amount, 0, 255);
    const g = clamp(((n >> 8) & 255) + amount, 0, 255);
    const b = clamp((n & 255) + amount, 0, 255);
    return `rgb(${r}, ${g}, ${b})`;
}

function createGarmentGradient(ctx, color, x, y, w, h) {
    const grad = ctx.createLinearGradient(x, y, x, y + h);
    grad.addColorStop(0, shiftHex(color, 30));
    grad.addColorStop(0.5, normalizeHex(color));
    grad.addColorStop(1, shiftHex(color, -35));
    return grad;
}

function drawStylizedTop(ctx, kp, color) {
    const ls = kp.leftShoulder;
    const rs = kp.rightShoulder;
    const lh = kp.leftHip;
    const rh = kp.rightHip;
    if (!ls || !rs || !lh || !rh) return;

    const shoulderPad = Math.abs(rs[0] - ls[0]) * 0.32;
    const topY = Math.min(ls[1], rs[1]) - 18;
    const bottomY = Math.max(lh[1], rh[1]) + 12;
    const leftX = ls[0] - shoulderPad;
    const rightX = rs[0] + shoulderPad;

    ctx.save();
    ctx.globalAlpha = 0.72;
    ctx.fillStyle = createGarmentGradient(ctx, color, leftX, topY, rightX - leftX, bottomY - topY);
    ctx.beginPath();
    ctx.moveTo(leftX, topY + 12);
    ctx.quadraticCurveTo((ls[0] + rs[0]) / 2, topY - 18, rightX, topY + 12);
    ctx.lineTo(rh[0] + shoulderPad * 0.3, bottomY);
    ctx.quadraticCurveTo((lh[0] + rh[0]) / 2, bottomY + 8, lh[0] - shoulderPad * 0.3, bottomY);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function drawStylizedDress(ctx, kp, color) {
    const ls = kp.leftShoulder;
    const rs = kp.rightShoulder;
    const lh = kp.leftHip;
    const rh = kp.rightHip;
    if (!ls || !rs || !lh || !rh) return;

    const shoulderW = Math.abs(rs[0] - ls[0]);
    const topY = Math.min(ls[1], rs[1]) - 14;
    const hemY = (kp.leftAnkle && kp.rightAnkle)
        ? (Math.min(kp.leftAnkle[1], kp.rightAnkle[1]) - 8)
        : (Math.max(lh[1], rh[1]) + shoulderW * 1.8);
    const centerX = (ls[0] + rs[0]) / 2;
    const topHalf = shoulderW * 0.8;
    const hemHalf = shoulderW * 1.55;

    ctx.save();
    ctx.globalAlpha = 0.68;
    ctx.fillStyle = createGarmentGradient(ctx, color, centerX - hemHalf, topY, hemHalf * 2, hemY - topY);
    ctx.beginPath();
    ctx.moveTo(centerX - topHalf, topY + 10);
    ctx.quadraticCurveTo(centerX, topY - 12, centerX + topHalf, topY + 10);
    ctx.lineTo(centerX + hemHalf, hemY);
    ctx.lineTo(centerX - hemHalf, hemY);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function drawStylizedPants(ctx, kp, color) {
    const lh = kp.leftHip;
    const rh = kp.rightHip;
    if (!lh || !rh) return;
    const la = kp.leftAnkle || [lh[0] - 16, lh[1] + 190];
    const ra = kp.rightAnkle || [rh[0] + 16, rh[1] + 190];
    const hipW = Math.abs(rh[0] - lh[0]);
    const legW = hipW * 0.58;

    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = createGarmentGradient(ctx, color, lh[0] - legW, lh[1], hipW + legW * 2, Math.max(la[1], ra[1]) - lh[1]);
    ctx.beginPath();
    ctx.moveTo(lh[0] - 12, lh[1] - 4);
    ctx.lineTo((lh[0] + rh[0]) / 2 - 8, lh[1] + 12);
    ctx.lineTo(la[0] - legW * 0.22, la[1]);
    ctx.lineTo(la[0] + legW * 0.22, la[1]);
    ctx.lineTo((lh[0] + rh[0]) / 2 + 2, lh[1] + 14);
    ctx.lineTo(rh[0] + 12, rh[1] - 4);
    ctx.lineTo(ra[0] + legW * 0.22, ra[1]);
    ctx.lineTo(ra[0] - legW * 0.22, ra[1]);
    ctx.lineTo((lh[0] + rh[0]) / 2 - 2, lh[1] + 14);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function drawStylizedGarment(ctx, kp, garmentType, color) {
    if (garmentType === 'dresses') {
        drawStylizedDress(ctx, kp, color);
        return;
    }
    if (garmentType === 'pants') {
        drawStylizedPants(ctx, kp, color);
        return;
    }
    drawStylizedTop(ctx, kp, color);
}

function evaluateImageTransparency(img) {
    try {
        const w = 80;
        const h = 100;
        const c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        const cctx = c.getContext('2d', { willReadFrequently: true });
        cctx.drawImage(img, 0, 0, w, h);
        const { data } = cctx.getImageData(0, 0, w, h);
        let transparent = 0;
        for (let i = 3; i < data.length; i += 4) {
            if (data[i] < 245) transparent += 1;
        }
        return transparent / (w * h);
    } catch (err) {
        return 0;
    }
}

/** Draw garment image overlay using keypoint positions. */
function drawGarmentOverlay(ctx, kp, garmentImg, garmentType, cw, ch) {
    if (!kp.leftShoulder || !kp.rightShoulder || !kp.leftHip || !kp.rightHip) return;
    const color = tryOnState.selectedGarment?.color || '#c9a96e';
    if (tryOnState.garmentRenderMode === 'stylized') {
        drawStylizedGarment(ctx, kp, garmentType, color);
        return;
    }

    const shoulderWidth = Math.abs(kp.rightShoulder[0] - kp.leftShoulder[0]);
    const shoulderMidX = (kp.leftShoulder[0] + kp.rightShoulder[0]) / 2;
    const shoulderY = Math.min(kp.leftShoulder[1], kp.rightShoulder[1]);
    const hipY = Math.max(kp.leftHip[1], kp.rightHip[1]);
    const torsoH = hipY - shoulderY;

    ctx.globalAlpha = 0.82;

    if (garmentType === 'dresses') {
        const w = shoulderWidth * 2.2;
        const h = (kp.leftAnkle ? kp.leftAnkle[1] : ch * 0.9) - shoulderY + 20;
        ctx.drawImage(garmentImg, shoulderMidX - w / 2, shoulderY - 10, w, h);
    } else if (garmentType === 'shirts' || garmentType === 'jackets') {
        const w = shoulderWidth * 2.4;
        const h = torsoH * 1.1;
        ctx.drawImage(garmentImg, shoulderMidX - w / 2, shoulderY - 15, w, h);
    } else if (garmentType === 'pants') {
        const hipMidX = (kp.leftHip[0] + kp.rightHip[0]) / 2;
        const hipWidth = Math.abs(kp.rightHip[0] - kp.leftHip[0]);
        const w = hipWidth * 2.4;
        const bottomY = kp.leftAnkle ? kp.leftAnkle[1] : ch * 0.92;
        const h = bottomY - kp.rightHip[1] + 20;
        ctx.drawImage(garmentImg, hipMidX - w / 2, kp.rightHip[1] - 10, w, h);
    }

    ctx.globalAlpha = 1;
}

/** Start the animation loop that draws the canvas every frame. */
function startCanvasLoop() {
    stopCanvasLoop();

    const canvas = document.getElementById(
        tryOnState.mode === 'webcam' ? 'pose-canvas-webcam' : 'pose-canvas'
    );
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function renderFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the source image (uploaded or video)
        if (tryOnState.mode === 'webcam' && tryOnState.videoEl) {
            const v = tryOnState.videoEl;
            if (v.readyState >= 2) ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
        } else if (tryOnState.uploadedImageUrl) {
            const hiddenImg = document.getElementById('hidden-img');
            if (hiddenImg && hiddenImg.complete) ctx.drawImage(hiddenImg, 0, 0, canvas.width, canvas.height);
        }

        // Draw pose and garment if detected
        if (tryOnState.poseDetected) {
            let kp = null;
            if (tryOnState.mode === 'webcam') {
                kp = getVideoPoseKeypoints(canvas) || tryOnState.poseKeypoints;
            } else {
                kp = getUploadPoseKeypoints(canvas);
            }
            if (!kp) kp = simulatePoseKeypoints(canvas.width, canvas.height);
            tryOnState.poseKeypoints = kp;
            updateSkinProfileFromFrame(ctx, kp, canvas);
            if (tryOnState.showSkeleton) drawSkeleton(ctx, kp);
            if (
                tryOnState.selectedGarment
                && (tryOnState.garmentRenderMode === 'stylized' || tryOnState.garmentImg)
            ) {
                drawGarmentOverlay(ctx, kp, tryOnState.garmentImg, tryOnState.selectedGarment.type, canvas.width, canvas.height);
            }
            const now = Date.now();
            if (now - tryOnState.lastMeasurementTs > 700) {
                tryOnState.lastMeasurementTs = now;
                computeAndStoreMeasurements(kp);
            }
        }

        tryOnState.animFrameId = requestAnimationFrame(renderFrame);
    }

    tryOnState.animFrameId = requestAnimationFrame(renderFrame);
}

function stopCanvasLoop() {
    if (tryOnState.animFrameId) {
        cancelAnimationFrame(tryOnState.animFrameId);
        tryOnState.animFrameId = null;
    }
}

/** Called when user clicks "Detect My Body Pose". */
async function runPoseDetection() {
    if (tryOnState.poseDetecting) return;
    if (tryOnState.mode === 'upload' && !tryOnState.uploadedImageUrl) return;
    if (tryOnState.mode === 'webcam' && !tryOnState.videoEl) return;

    tryOnState.poseDetecting = true;
    updatePoseOverlay();

    try {
        let kp = null;
        if (tryOnState.mode === 'upload') {
            const imgEl = document.getElementById('hidden-img');
            if (!imgEl || !imgEl.complete) throw new Error('Image not ready');
            const detector = await ensurePoseDetector('IMAGE');
            if (detector) {
                const res = detector.detect(imgEl);
                if (res?.landmarks?.length) {
                    kp = mapLandmarksToKeypoints(res.landmarks[0], 640, 480);
                }
            }
            if (!kp) kp = simulatePoseKeypoints(640, 480);
            tryOnState.poseKeypoints = kp;
            tryOnState.poseKeypointsWidth = 640;
            tryOnState.poseKeypointsHeight = 480;
        } else {
            await ensurePoseDetector('VIDEO');
            const webcamCanvas = document.getElementById('pose-canvas-webcam');
            if (webcamCanvas) kp = getVideoPoseKeypoints(webcamCanvas);
        }

        tryOnState.poseDetected = true;
        if (kp) {
            tryOnState.poseKeypoints = kp;
            computeAndStoreMeasurements(kp);
        }
    } catch (err) {
        console.warn('Pose detection failed, using fallback pose:', err);
        tryOnState.poseDetected = true;
        tryOnState.poseKeypoints = simulatePoseKeypoints(640, 480);
        computeAndStoreMeasurements(tryOnState.poseKeypoints);
    } finally {
        tryOnState.poseDetecting = false;
        updatePoseOverlay();
        startCanvasLoop();
    }
}

function generateTryOnImage() {
    const canvas = document.getElementById(
        tryOnState.mode === 'webcam' ? 'pose-canvas-webcam' : 'pose-canvas'
    );
    const card = document.getElementById('generated-tryon-card');
    if (!canvas || !card) return;
    if (!tryOnState.poseDetected || !tryOnState.selectedGarment) {
        card.style.display = 'block';
        card.innerHTML = `
          <div class="fit-score-header">
            <div class="fit-score-label">🧠 AI Try-On Image</div>
          </div>
          <p style="color:var(--text-secondary);font-size:13px">Detect pose and select a garment first, then generate.</p>
        `;
        return;
    }

    const dataUrl = canvas.toDataURL('image/png');
    tryOnState.generatedTryOnImage = dataUrl;
    card.style.display = 'block';
    card.innerHTML = `
      <div class="fit-score-header">
        <div class="fit-score-label">🧠 AI Try-On Image</div>
        <span class="fit-badge fit-good">Generated</span>
      </div>
      <img src="${dataUrl}" alt="Generated try-on output" style="width:100%;border-radius:14px;border:1px solid var(--border-color);margin-top:8px">
      <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap">
        <a class="btn btn-outline" href="${dataUrl}" download="virtual-tryon.png" style="text-decoration:none">⬇ Download</a>
        <button class="btn btn-glow" onclick="showPage('dashboard')">Save To Wardrobe</button>
      </div>
      <p style="font-size:12px;color:var(--text-muted);margin-top:10px">AI generated preview from your input and selected garment overlay.</p>
    `;
}

function getPoseUiElements() {
    if (tryOnState.mode === 'webcam') {
        return {
            overlay: document.getElementById('pose-overlay-webcam'),
            detected: document.getElementById('pose-detected-badge-webcam'),
        };
    }
    return {
        overlay: document.getElementById('pose-overlay'),
        detected: document.getElementById('pose-detected-badge'),
    };
}

/** Show/hide the overlay on the canvas based on detection state. */
function updatePoseOverlay() {
    const { overlay, detected } = getPoseUiElements();
    if (!overlay || !detected) return;

    if (tryOnState.poseDetected) {
        overlay.style.display = 'none';
        detected.style.display = tryOnState.selectedGarment ? 'none' : 'block';
    } else if (tryOnState.poseDetecting) {
        overlay.style.display = 'flex';
        overlay.innerHTML = `
      <div style="text-align:center;color:white">
        <div class="pose-spinner"></div>
        <p style="font-weight:600">Detecting body pose...</p>
        <p style="font-size:13px;color:rgba(255,255,255,0.6);margin-top:6px">AI is mapping 33 keypoints</p>
      </div>`;
    } else {
        const cta = tryOnState.mode === 'webcam' ? '✨ Try On Selected Outfit' : '✨ Detect My Body Pose';
        overlay.style.display = 'flex';
        overlay.innerHTML = `
      <button class="btn btn-glow" onclick="runPoseDetection()" style="font-size:15px;padding:16px 36px">
        ${cta}
      </button>`;
    }
}

function initMeasurePage() {
    window._measureLoaded = true;
    const input = document.getElementById('measure-height-input');
    if (input) {
        input.addEventListener('input', (e) => setHeightCm(e.target.value));
    }
    renderMeasurementsPage();
}

function renderMeasurementsPage() {
    const grid = document.getElementById('measurements-page-grid');
    const note = document.getElementById('measurements-page-note');
    if (!grid || !note) return;

    if (!tryOnState.latestMeasurements) {
        grid.innerHTML = `
          <div class="empty-state" style="grid-column:1/-1">
            <div class="empty-state__icon">📏</div>
            <p class="empty-state__title">No measurements yet</p>
            <p class="empty-state__desc">Open Try-On, upload image or use webcam, then click Detect/Try.</p>
          </div>
        `;
        note.textContent = '';
        return;
    }

    grid.innerHTML = measurementCardsMarkup(tryOnState.latestMeasurements);
    note.textContent = `Source: ${tryOnState.mode === 'webcam' ? 'Webcam' : 'Uploaded photo'} • Height used: ${tryOnState.heightCm} cm • Values are estimates`;
}

function refreshMeasurements() {
    if (tryOnState.poseKeypoints) computeAndStoreMeasurements(tryOnState.poseKeypoints);
    else renderMeasurementsPage();
}

// ─── Garment Panel ────────────────────────────────────────────────────────────

/**
 * Render the garment panel sidebar.
 * @param {object} allGarments - { shirts, jackets, dresses, pants }
 * @param {string} activeCategory
 */
function renderGarmentPanel(allGarments, activeCategory) {
    const categories = [
        { key: 'shirts', label: '👕 Tops' },
        { key: 'jackets', label: '🧥 Jackets' },
        { key: 'dresses', label: '👗 Dresses' },
        { key: 'pants', label: '👖 Pants' },
    ];

    const tabsEl = document.getElementById('garment-tabs');
    const gridEl = document.getElementById('garment-grid');
    if (!tabsEl || !gridEl) return;

    // Category tabs
    tabsEl.innerHTML = categories.map(({ key, label }) => `
    <button
      class="garment-tab ${key === activeCategory ? 'active' : ''}"
      data-category="${key}"
      onclick="selectGarmentCategory('${key}')"
    >${label}</button>
  `).join('');

    // Garment grid
    const garments = allGarments[activeCategory] || [];
    gridEl.innerHTML = garments.length === 0
        ? `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state__icon">👗</div><p class="empty-state__title">Loading garments...</p></div>`
        : garments.map((g) => {
            const isSelected = tryOnState.selectedGarment && tryOnState.selectedGarment.id === g.id;
            return `
          <div class="garment-item ${isSelected ? 'selected' : ''}" onclick="selectGarment('${g.id}')">
            <div class="garment-item__img-wrap">
              <img class="garment-item__img" src="${g.image}" alt="${g.name}" loading="lazy">
              ${isSelected ? '<div class="garment-item__check">✓</div>' : ''}
            </div>
            <div class="garment-item__body">
              <p class="garment-item__name">${g.name}</p>
              <div style="display:flex;justify-content:space-between;align-items:center">
                <p class="garment-item__brand">${g.brand}</p>
                <p class="garment-item__price">${formatINR(g.price)}</p>
              </div>
            </div>
          </div>`;
        }).join('');
}

function selectGarmentCategory(category) {
    tryOnState.activeCategory = category;
    renderGarmentPanel(tryOnState.allGarments, category);
}

function selectGarment(garmentId) {
    const g = tryOnState.allGarments[tryOnState.activeCategory]?.find((x) => x.id === garmentId);
    if (!g) return;

    // Toggle off if already selected
    if (tryOnState.selectedGarment && tryOnState.selectedGarment.id === garmentId) {
        tryOnState.selectedGarment = null;
        tryOnState.garmentImg = null;
        tryOnState.garmentRenderMode = 'stylized';
        renderGarmentPanel(tryOnState.allGarments, tryOnState.activeCategory);
        updateFitScoreCard();
        updatePoseOverlay();
        return;
    }

    tryOnState.selectedGarment = { ...g, type: tryOnState.activeCategory };

    // Pick a random fit score
    const fitIdx = Math.floor(Math.random() * FIT_SCORES.length);
    tryOnState.fitScore = FIT_SCORES[fitIdx];

    // Load garment image for canvas
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = g.image;
    img.onload = () => {
        tryOnState.garmentImg = img;
        const transparencyRatio = evaluateImageTransparency(img);
        tryOnState.garmentRenderMode = transparencyRatio > 0.18 ? 'image' : 'stylized';
    };
    img.onerror = () => {
        tryOnState.garmentImg = null;
        tryOnState.garmentRenderMode = 'stylized';
    };

    renderGarmentPanel(tryOnState.allGarments, tryOnState.activeCategory);
    updateFitScoreCard();
    if (tryOnState.poseDetected) updatePoseOverlay();
}

/** Show/update the fit score card beneath the canvas. */
function updateFitScoreCard() {
    const el = document.getElementById('fit-score-card');
    if (!el) return;

    if (!tryOnState.selectedGarment) {
        el.style.display = 'none';
        return;
    }

    const { label, className, score, desc } = tryOnState.fitScore;
    const g = tryOnState.selectedGarment;

    el.style.display = 'block';
    el.innerHTML = `
    <div class="fit-score-header">
      <div class="fit-score-label">⚡ Fit Prediction</div>
      <span class="fit-badge ${className}">${label}</span>
    </div>
    <div class="fit-bar-bg">
      <div class="fit-bar" style="width:${score}%"></div>
    </div>
    <div class="fit-meta">
      <span>Fit Score</span>
      <span style="font-weight:700;color:var(--text-primary)">${score}/100</span>
    </div>
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.6">${desc}</p>
    <button class="btn btn-glow" style="width:100%;margin-top:16px;justify-content:center;border-radius:12px">
      🛒 Add to Cart — ${formatINR(g.price)}
    </button>`;
}

// ─── Webcam ───────────────────────────────────────────────────────────────────

function startWebcam() {
    const placeholder = document.getElementById('webcam-placeholder');
    const webcamCanvas = document.getElementById('pose-canvas-webcam');
    const webcamOverlay = document.getElementById('pose-overlay-webcam');
    const webcamDetected = document.getElementById('pose-detected-badge-webcam');
    if (placeholder) placeholder.style.display = 'flex';

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        if (placeholder) {
            placeholder.innerHTML = `
        <div style="text-align:center">
          <div style="font-size:48px;margin-bottom:12px;opacity:0.5">📷</div>
          <p style="color:var(--text-secondary)">Webcam is not supported in this browser</p>
        </div>`;
        }
        return;
    }

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then((stream) => {
            tryOnState.mediaStream = stream;
            const video = document.createElement('video');
            video.srcObject = stream;
            video.autoplay = true;
            video.muted = true;
            video.playsInline = true;
            video.onloadedmetadata = async () => {
                try {
                    await video.play();
                } catch (err) {
                    console.warn('Unable to autoplay webcam video:', err);
                }
                tryOnState.videoEl = video;
                tryOnState.poseDetected = false;
                tryOnState.poseDetecting = false;
                tryOnState.poseKeypoints = null;
                tryOnState.latestMeasurements = null;
                tryOnState.skinProfile = null;
                tryOnState.fullBodyVisible = false;
                if (placeholder) placeholder.style.display = 'none';
                if (webcamCanvas) webcamCanvas.style.display = 'block';
                if (webcamDetected) webcamDetected.style.display = 'none';
                if (webcamOverlay) webcamOverlay.style.display = 'flex';
                startCanvasLoop();
                updatePoseOverlay();
                updateMeasurementsUi();
                updateSkinAnalysisUi();
            };
        })
        .catch(() => {
            if (webcamCanvas) webcamCanvas.style.display = 'none';
            if (webcamOverlay) webcamOverlay.style.display = 'none';
            if (webcamDetected) webcamDetected.style.display = 'none';
            if (placeholder) placeholder.innerHTML = `
        <div style="text-align:center">
          <div style="font-size:48px;margin-bottom:12px;opacity:0.5">📷</div>
          <p style="color:var(--text-secondary)">Camera access denied or unavailable</p>
        </div>`;
        });
}

function stopWebcam() {
    if (tryOnState.mediaStream) {
        tryOnState.mediaStream.getTracks().forEach((t) => t.stop());
        tryOnState.mediaStream = null;
    }
    const placeholder = document.getElementById('webcam-placeholder');
    const webcamCanvas = document.getElementById('pose-canvas-webcam');
    const webcamOverlay = document.getElementById('pose-overlay-webcam');
    const webcamDetected = document.getElementById('pose-detected-badge-webcam');
    if (placeholder) {
        placeholder.style.display = 'flex';
        placeholder.innerHTML = `
      <div>
        <div style="font-size:48px;margin-bottom:12px;opacity:0.5">📷</div>
        <p>Initializing camera...</p>
      </div>`;
    }
    if (webcamCanvas) webcamCanvas.style.display = 'none';
    if (webcamOverlay) webcamOverlay.style.display = 'none';
    if (webcamDetected) webcamDetected.style.display = 'none';
    tryOnState.videoEl = null;
    tryOnState.lastVideoTime = -1;
    stopCanvasLoop();
}

// ─── SECTION 5: Recommendations Page ─────────────────────────────────────────

const recoState = {
    meta: null,
    selectedBody: '',
    selectedOccasion: '',
    selectedStyles: [],
    generated: false,
    loading: false,
};

async function initRecoPage() {
    window._recoLoaded = true;
    try {
        recoState.meta = await fetchMeta();
        renderRecoSelectors();
        resetRecommendationsView();
    } catch (err) {
        console.error('Failed to fetch meta:', err);
    }
}

function resetRecommendationsView() {
    const emptyEl = document.getElementById('reco-empty');
    const resultsWrap = document.getElementById('outfit-results-wrap');
    const resultsEl = document.getElementById('outfit-results');
    const countEl = document.getElementById('results-count');
    const btn = document.getElementById('generate-btn');
    const guidance = document.getElementById('reco-skin-guidance');
    if (emptyEl) emptyEl.style.display = 'flex';
    if (resultsWrap) resultsWrap.style.display = 'none';
    if (resultsEl) resultsEl.innerHTML = '';
    if (countEl) countEl.textContent = '';
    if (btn) btn.innerHTML = '<span>✨</span> Generate My Outfits';
    if (guidance) guidance.style.display = 'none';
    recoState.generated = false;
}

function renderRecoSelectors() {
    renderBodyTypes();
    renderOccasions();
    renderStyleChips();
}

function renderBodyTypes() {
    const el = document.getElementById('body-type-list');
    if (!el || !recoState.meta) return;
    el.innerHTML = recoState.meta.bodyTypes.map((bt) => `
    <button
      class="body-type-option ${recoState.selectedBody === bt.id ? 'selected' : ''}"
      onclick="selectBodyType('${bt.id}')"
    >
      <span class="body-type-option__emoji">${bt.emoji}</span>
      <div>
        <p class="body-type-option__name">${bt.name}</p>
        <p class="body-type-option__desc">${bt.description}</p>
      </div>
      ${recoState.selectedBody === bt.id ? '<span class="body-type-option__check">✓</span>' : ''}
    </button>
  `).join('');
}

function renderOccasions() {
    const el = document.getElementById('occasion-grid');
    if (!el || !recoState.meta) return;
    el.innerHTML = recoState.meta.occasions.map((occ) => `
    <button
      class="occasion-option ${recoState.selectedOccasion === occ.id ? 'selected' : ''}"
      onclick="selectOccasion('${occ.id}')"
    >
      <div class="occasion-option__icon">${occ.icon}</div>
      <p class="occasion-option__name">${occ.name}</p>
      <p class="occasion-option__desc">${occ.description}</p>
    </button>
  `).join('');
}

function renderStyleChips() {
    const el = document.getElementById('style-chips');
    if (!el || !recoState.meta) return;
    el.innerHTML = recoState.meta.styles.map((style) => `
    <button
      class="style-chip ${recoState.selectedStyles.includes(style) ? 'selected' : ''}"
      onclick="toggleStyle('${style}')"
    >${style}</button>
  `).join('');
}

function selectBodyType(id) {
    recoState.selectedBody = recoState.selectedBody === id ? '' : id;
    renderBodyTypes();
}

function selectOccasion(id) {
    recoState.selectedOccasion = recoState.selectedOccasion === id ? '' : id;
    renderOccasions();
}

function toggleStyle(style) {
    if (recoState.selectedStyles.includes(style)) {
        recoState.selectedStyles = recoState.selectedStyles.filter((s) => s !== style);
    } else {
        recoState.selectedStyles.push(style);
    }
    renderStyleChips();
}

async function generateOutfits() {
    if (recoState.loading) return;
    recoState.loading = true;
    recoState.generated = false;

    const btn = document.getElementById('generate-btn');
    if (btn) btn.innerHTML = '<span class="animate-spin" style="display:inline-block;margin-right:8px">↻</span>Generating Outfits...';

    try {
        const results = await fetchRecommendations(
            recoState.selectedBody,
            recoState.selectedOccasion,
            recoState.selectedStyles,
        );
        recoState.generated = true;
        renderOutfitResults(results);
    } catch (err) {
        console.error('Recommendations failed:', err);
    } finally {
        recoState.loading = false;
        if (btn) btn.innerHTML = '<span>✨</span> Regenerate Outfits';
    }
}

function renderOutfitResults(outfits) {
    const resultsEl = document.getElementById('outfit-results');
    const emptyEl = document.getElementById('reco-empty');
    const resultsWrap = document.getElementById('outfit-results-wrap');

    if (emptyEl) emptyEl.style.display = 'none';
    if (resultsWrap) resultsWrap.style.display = 'block';
    document.getElementById('results-count').textContent = `${outfits.length} outfits generated`;
    renderSkinGuidanceForReco();
    const skinTags = tryOnState.skinProfile
        ? [...tryOnState.skinProfile.colors.slice(0, 2), ...tryOnState.skinProfile.patterns.slice(0, 2)].map((x) => `#${x.replace(/\s+/g, '')}`)
        : [];
    const bodyHint = tryOnState.fullBodyVisible
        ? 'Full body visible: fit mapping is more reliable.'
        : 'Tip: show full body in Try-On for better fit-accurate recommendations.';

    resultsEl.innerHTML = outfits.map((outfit, i) => `
    <div class="outfit-result-card" style="animation-delay:${i * 0.1}s">
      <div class="outfit-result-images">
        ${outfit.items.slice(0, 2).map((item) => `
          <div class="outfit-result-img-col">
            <img src="${item.image}" alt="${item.name}">
            <div class="outfit-result-type-badge">${item.type}</div>
          </div>
        `).join('')}
      </div>
      <div class="outfit-result-body">
        <div class="outfit-result-header">
          <span class="outfit-result-style">${outfit.style}</span>
          <div class="outfit-result-score">
            <span class="outfit-result-score__dot"></span>
            ${outfit.fitScore}% Match
          </div>
        </div>
        <p style="font-size:12px;color:var(--text-muted);margin:2px 0 10px">${bodyHint}</p>
        ${outfit.items.map((item, j) => `
          <div class="outfit-item-row" ${j === outfit.items.length - 1 ? 'style="border-bottom:none"' : ''}>
            <div>
              <p class="outfit-item-name">${item.name}</p>
              <p class="outfit-item-brand">${item.brand}</p>
            </div>
            <span class="outfit-item-price">${formatINR(item.price)}</span>
          </div>
        `).join('')}
        <div class="outfit-tags">
          ${outfit.tags.map((tag) => `<span class="outfit-tag">${tag}</span>`).join('')}
          ${skinTags.map((tag) => `<span class="outfit-tag">${tag}</span>`).join('')}
        </div>
        <div class="outfit-actions">
          <button class="btn btn-glow" style="flex:1;justify-content:center;border-radius:12px;font-size:13px">
            🛒 Shop Look
          </button>
          <button class="outfit-fav-btn" title="Favorite">♡</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ─── SECTION 6: Trends Page ───────────────────────────────────────────────────

let trendCharts = {};

async function loadTrendsPage() {
    window._trendsLoaded = true;
    try {
        const data = await fetchTrends();
        renderTrendItems(data.trendingItems);
        renderHashtags(data.hashtags);
        renderStyleOfWeek(data.styleOfWeek);
        renderTrendTip();
        renderLineChart(data.chartData);
        renderPieChart(data.pieData);
        renderBarChart(data.barData);
    } catch (err) {
        console.error('Trends load failed:', err);
    }
}

function renderTrendItems(items) {
    const el = document.getElementById('trend-items-grid');
    if (!el) return;
    el.innerHTML = items.map((item) => `
    <div class="trend-item">
      <div class="trend-item__img-wrap">
        <img class="trend-item__img" src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="trend-item__rank ${item.rank <= 3 ? 'trend-item__rank--top' : 'trend-item__rank--rest'}">${item.rank}</div>
        ${item.hot ? '<div class="trend-item__hot">🔥 HOT</div>' : ''}
      </div>
      <div class="trend-item__body">
        <p class="trend-item__name">${item.name}</p>
        <div class="trend-item__meta">
          <span class="trend-item__cat">${item.category}</span>
          <span class="trend-item__pct">${item.trend}</span>
        </div>
        <div class="trend-item__tags">
          ${item.tags.map((t) => `<span class="trend-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function renderHashtags(hashtags) {
    const el = document.getElementById('hashtags-wrap');
    if (!el) return;
    el.innerHTML = hashtags.map((tag, i) => `
    <span class="hashtag ${i < 3 ? 'featured' : ''}">${tag}</span>
  `).join('');
}

function renderStyleOfWeek(sotw) {
    const el = document.getElementById('style-of-week');
    if (!el) return;
    el.innerHTML = `
    <div class="sotw-card">
      <div class="sotw-card__img-wrap">
        <img class="sotw-card__img" src="${sotw.image}" alt="${sotw.title}" loading="lazy">
        <div class="sotw-card__overlay"></div>
        <div class="sotw-card__label-wrap">
          <div class="sotw-card__badge">⭐ STYLE OF THE WEEK</div>
          <h3 class="sotw-card__title">${sotw.title}</h3>
        </div>
      </div>
      <div class="sotw-card__body">
        <p class="sotw-card__desc">${sotw.description}</p>
        ${sotw.tips.map((tip) => `
          <div class="sotw-tip">
            <span class="sotw-tip__arrow">→</span>${tip}
          </div>`).join('')}
      </div>
    </div>`;
}

function renderTrendTip() {
    const el = document.getElementById('trend-tip-box');
    if (!el) return;
    el.innerHTML = `
    💡 <strong style="color:var(--text-primary)">Trend Tip:</strong>
    #QuietLuxury is peaking this season. Invest in neutral tones and impeccable tailoring for a timeless look that screams expensive.`;
}

function renderLineChart(chartData) {
    const canvas = document.getElementById('line-chart');
    if (!canvas || typeof Chart === 'undefined') return;
    if (trendCharts.line) trendCharts.line.destroy();

    trendCharts.line = new Chart(canvas, {
        type: 'line',
        data: {
            labels: chartData.map((d) => d.month),
            datasets: [
                { label: 'Oversized', data: chartData.map((d) => d.oversized), borderColor: '#c9a96e', backgroundColor: 'transparent', borderWidth: 2, pointRadius: 4 },
                { label: 'Bohemian', data: chartData.map((d) => d.boho), borderColor: '#b07d6b', backgroundColor: 'transparent', borderWidth: 2, pointRadius: 4 },
                { label: 'Streetwear', data: chartData.map((d) => d.streetwear), borderColor: '#d4956a', backgroundColor: 'transparent', borderWidth: 2, pointRadius: 4 },
                { label: 'Elegant', data: chartData.map((d) => d.elegant), borderColor: '#8a9e8c', backgroundColor: 'transparent', borderWidth: 2, pointRadius: 4 },
            ],
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#a89b8c', font: { size: 12 } } } },
            scales: {
                x: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } },
            },
        },
    });
}

function renderPieChart(pieData) {
    const canvas = document.getElementById('pie-chart');
    if (!canvas || typeof Chart === 'undefined') return;
    if (trendCharts.pie) trendCharts.pie.destroy();

    trendCharts.pie = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: pieData.map((d) => d.name),
            datasets: [{ data: pieData.map((d) => d.value), backgroundColor: pieData.map((d) => d.color), borderWidth: 0 }],
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#a89b8c', font: { size: 12 } } } },
        },
    });
}

function renderBarChart(barData) {
    const canvas = document.getElementById('bar-chart');
    if (!canvas || typeof Chart === 'undefined') return;
    if (trendCharts.bar) trendCharts.bar.destroy();

    trendCharts.bar = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: barData.map((d) => d.season),
            datasets: [
                { label: 'Dresses', data: barData.map((d) => d.dresses), backgroundColor: '#c9a96e', borderRadius: 4 },
                { label: 'Tops', data: barData.map((d) => d.tops), backgroundColor: '#b07d6b', borderRadius: 4 },
                { label: 'Jackets', data: barData.map((d) => d.jackets), backgroundColor: '#d4956a', borderRadius: 4 },
                { label: 'Pants', data: barData.map((d) => d.pants), backgroundColor: '#8a9e8c', borderRadius: 4 },
            ],
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#a89b8c', font: { size: 12 } } } },
            scales: {
                x: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } },
            },
        },
    });
}

// ─── SECTION 7: Dashboard + Wardrobe (localStorage) ──────────────────────────

const WARDROBE_KEY = 'smart-dressing-wardrobe';
let activeTab = 'saved';

const PAST_TRYONS = [];

// Wardrobe CRUD (localStorage)
function loadWardrobe() { try { return JSON.parse(localStorage.getItem(WARDROBE_KEY)) || []; } catch { return []; } }
function saveWardrobe(w) { localStorage.setItem(WARDROBE_KEY, JSON.stringify(w)); }
function removeFromWardrobe(id) { const w = loadWardrobe().filter((o) => o.id !== id); saveWardrobe(w); loadDashboard(); }
function toggleFavoriteWardrobe(id) {
    const w = loadWardrobe().map((o) => o.id === id ? { ...o, favorite: !o.favorite } : o);
    saveWardrobe(w);
    loadDashboard();
}

function loadDashboard() {
    const wardrobe = loadWardrobe();
    updateDashboardStats(wardrobe);
    renderDashboardTabs(wardrobe);
    renderDashboardTab(activeTab, wardrobe);
}

function renderDashboardTabs(wardrobe) {
    const savedCount = wardrobe.length;
    const favCount = wardrobe.filter((o) => o.favorite).length;
    const histCount = PAST_TRYONS.length;

    const tabs = [
        { key: 'saved', label: '🛍 Saved Outfits', count: savedCount },
        { key: 'favorites', label: '❤️ Favorites', count: favCount },
        { key: 'history', label: '🕐 Try-On History', count: histCount },
    ];

    const el = document.getElementById('dashboard-tabs');
    if (!el) return;
    el.innerHTML = tabs.map((tab) => `
    <button
      class="dashboard-tab ${activeTab === tab.key ? 'active' : ''}"
      onclick="switchDashboardTab('${tab.key}')"
    >
      ${tab.label}
      <span class="tab-count">${tab.count}</span>
    </button>
  `).join('');
}

function switchDashboardTab(tab) {
    activeTab = tab;
    loadDashboard();
}

function renderDashboardTab(tab, wardrobe) {
    const el = document.getElementById('dashboard-tab-content');
    if (!el) return;

    if (tab === 'saved') {
        if (!wardrobe.length) {
            el.innerHTML = renderDashboardEmptyState(
                'No saved outfits yet',
                'Save your first look from the Try-On page to build your wardrobe.',
                '📦',
            );
            return;
        }
        el.innerHTML = `<div class="saved-outfits-grid">${wardrobe.map((o) => renderSavedOutfitCard(o, o.id)).join('')}</div>`;
    } else if (tab === 'favorites') {
        const favs = wardrobe.filter((o) => o.favorite);
        if (!favs.length) {
            el.innerHTML = renderDashboardEmptyState(
                'No favorites yet',
                'Mark saved looks as favorites to quickly access your top styles.',
                '❤️',
            );
            return;
        }
        el.innerHTML = `<div class="saved-outfits-grid">${favs.map((o) => renderSavedOutfitCard(o, o.id)).join('')}</div>`;
    } else if (tab === 'history') {
        if (!PAST_TRYONS.length) {
            el.innerHTML = renderDashboardEmptyState(
                'No try-on history yet',
                'Your recent virtual try-ons will appear here once you start testing outfits.',
                '📷',
            );
            return;
        }
        el.innerHTML = `<div class="history-grid">
      ${PAST_TRYONS.map((tryon) => `
        <div class="history-card" onclick="showPage('try-on')">
          <div class="history-card__img-wrap">
            <img class="history-card__img" src="${tryon.image}" alt="${tryon.garment}" loading="lazy">
            <div class="history-card__fit ${tryon.score === 'Good Fit' ? 'fit-good' : 'fit-loose'}">${tryon.score}</div>
          </div>
          <div class="history-card__body">
            <p class="history-card__garment">${tryon.garment}</p>
            <p class="history-card__date">${tryon.date}</p>
            <button class="history-try-again">📷 Try Again</button>
          </div>
        </div>
      `).join('')}
    </div>`;
    }
}

function renderDashboardEmptyState(title, description, icon) {
    return `
    <div class="empty-state" style="margin:24px 0">
      <div class="empty-state__icon">${icon}</div>
      <p class="empty-state__title">${title}</p>
      <p class="empty-state__desc">${description}</p>
    </div>`;
}

function updateDashboardStats(wardrobe) {
    const savedEl = document.getElementById('stat-saved');
    const tryOnEl = document.getElementById('stat-tryons');
    const favEl = document.getElementById('stat-favorites');
    if (savedEl) savedEl.textContent = `${wardrobe.length}`;
    if (tryOnEl) tryOnEl.textContent = `${PAST_TRYONS.length}`;
    if (favEl) favEl.textContent = `${wardrobe.filter((o) => o.favorite).length}`;
}

function renderSavedOutfitCard(outfit, wardrobeId) {
    const total = outfit.items.reduce((s, i) => s + i.price, 0);
    const removeBtn = wardrobeId
        ? `<button class="icon-btn" onclick="removeFromWardrobe('${wardrobeId}')" title="Remove">🗑</button>`
        : '';
    return `
    <div class="saved-outfit-card">
      <div class="saved-outfit-images">
        ${outfit.items.map((item) => `
          <div class="saved-outfit-img-col">
            <img src="${item.image}" alt="${item.name}">
            <div class="saved-outfit-img-type">${item.type}</div>
          </div>`).join('')}
      </div>
      <div class="saved-outfit-body">
        <div class="saved-outfit-header">
          <span class="saved-outfit-name">${outfit.name}</span>
          <span class="saved-outfit-style">${outfit.style}</span>
        </div>
        <p class="saved-outfit-total">${formatINR(total)} total</p>
        <div class="saved-outfit-actions">
          <button class="btn btn-outline" style="flex:1;justify-content:center;border-radius:10px;font-size:12px;padding:9px">
            🔗 Share
          </button>
          <button class="icon-btn ${outfit.favorite ? 'fav-active' : ''}" title="Favorite">
            ${outfit.favorite ? '❤️' : '🤍'}
          </button>
          ${removeBtn}
        </div>
      </div>
    </div>`;
}
