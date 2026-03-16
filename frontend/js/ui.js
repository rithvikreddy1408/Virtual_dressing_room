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

// ─── SECTION 1: SPA Navigation ────────────────────────────────────────────────

/**
 * Show the given page section and update nav links to reflect the active page.
 * @param {string} pageId - e.g. 'home', 'try-on', 'recommendations', 'trends', 'dashboard'
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
            tryOnState.uploadedImageUrl = URL.createObjectURL(file);
            tryOnState.poseDetected = false;
            tryOnState.poseDetecting = false;
            renderTryOnCanvas();
        });
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
}

/** Switch between upload and webcam modes. */
function setTryOnMode(mode) {
    tryOnState.mode = mode;

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
}

/** Render the canvas area depending on state. */
function renderTryOnCanvas() {
    const uploadArea = document.getElementById('upload-area');
    const canvasWrap = document.getElementById('canvas-wrap');
    const dropZone = document.getElementById('upload-drop');
    if (!uploadArea || !canvasWrap) return;

    if (tryOnState.mode === 'upload') {
        if (tryOnState.uploadedImageUrl) {
            if (dropZone) dropZone.style.display = 'none';
            canvasWrap.style.display = 'block';
            startCanvasLoop();
        } else {
            if (dropZone) dropZone.style.display = 'flex';
            canvasWrap.style.display = 'none';
            stopCanvasLoop();
        }
    }
}

// ─── Canvas: Pose simulation ──────────────────────────────────────────────────

/** Get simulated pose keypoints (fractions of canvas size). */
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

/** Draw garment image overlay using keypoint positions. */
function drawGarmentOverlay(ctx, kp, garmentImg, garmentType, cw, ch) {
    if (!kp.leftShoulder || !kp.rightShoulder || !kp.leftHip || !kp.rightHip) return;

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

    const canvas = document.getElementById('pose-canvas');
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
            const kp = simulatePoseKeypoints(canvas.width, canvas.height);
            if (tryOnState.showSkeleton) drawSkeleton(ctx, kp);
            if (tryOnState.selectedGarment && tryOnState.garmentImg) {
                drawGarmentOverlay(ctx, kp, tryOnState.garmentImg, tryOnState.selectedGarment.type, canvas.width, canvas.height);
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
function runPoseDetection() {
    if (tryOnState.poseDetecting) return;
    tryOnState.poseDetecting = true;
    updatePoseOverlay();

    setTimeout(() => {
        tryOnState.poseDetected = true;
        tryOnState.poseDetecting = false;
        updatePoseOverlay();
    }, 1800);
}

/** Show/hide the overlay on the canvas based on detection state. */
function updatePoseOverlay() {
    const overlay = document.getElementById('pose-overlay');
    const detected = document.getElementById('pose-detected-badge');
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
        overlay.style.display = 'flex';
        overlay.innerHTML = `
      <button class="btn btn-glow" onclick="runPoseDetection()" style="font-size:15px;padding:16px 36px">
        ✨ Detect My Body Pose
      </button>`;
    }
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
                <p class="garment-item__price">$${g.price}</p>
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
    img.onload = () => { tryOnState.garmentImg = img; };

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
      🛒 Add to Cart — $${g.price}
    </button>`;
}

// ─── Webcam ───────────────────────────────────────────────────────────────────

function startWebcam() {
    const placeholder = document.getElementById('webcam-placeholder');
    if (placeholder) placeholder.style.display = 'flex';

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then((stream) => {
            tryOnState.mediaStream = stream;
            const video = document.createElement('video');
            video.srcObject = stream;
            video.autoplay = true;
            video.muted = true;
            video.playsInline = true;
            video.onloadeddata = () => {
                tryOnState.videoEl = video;
                if (placeholder) placeholder.innerHTML = `
          <p style="color:var(--text-secondary)">📷 Camera active — canvas overlay enabled</p>`;
                startCanvasLoop();
                document.getElementById('canvas-wrap').style.display = 'block';
            };
        })
        .catch(() => {
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
    tryOnState.videoEl = null;
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
    if (emptyEl) emptyEl.style.display = 'flex';
    if (resultsWrap) resultsWrap.style.display = 'none';
    if (resultsEl) resultsEl.innerHTML = '';
    if (countEl) countEl.textContent = '';
    if (btn) btn.innerHTML = '<span>✨</span> Generate My Outfits';
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
        ${outfit.items.map((item, j) => `
          <div class="outfit-item-row" ${j === outfit.items.length - 1 ? 'style="border-bottom:none"' : ''}>
            <div>
              <p class="outfit-item-name">${item.name}</p>
              <p class="outfit-item-brand">${item.brand}</p>
            </div>
            <span class="outfit-item-price">$${item.price}</span>
          </div>
        `).join('')}
        <div class="outfit-tags">
          ${outfit.tags.map((tag) => `<span class="outfit-tag">${tag}</span>`).join('')}
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
        <p class="saved-outfit-total">$${total} total</p>
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
