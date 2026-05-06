// ============================================
// SCRIPTGENIE AI — app.js
// Frontend Logic
// ============================================

const API_BASE = window.location.origin + '/api';

// ── State ───────────────────────────────────
let selectedTone   = 'professional';
let selectedLength = 'medium';
let currentScript  = null;

// ── DOM Ready ───────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initToneButtons();
  initLengthButtons();
  initCharCounter();
  loadSavedScripts();
});

// ── Tone Selector ───────────────────────────
function initToneButtons() {
  document.querySelectorAll('.tone-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tone-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedTone = btn.dataset.tone;
    });
  });
}

// ── Length Selector ──────────────────────────
function initLengthButtons() {
  document.querySelectorAll('.length-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.length-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedLength = btn.dataset.length;
    });
  });
}

// ── Char Counter ─────────────────────────────
function initCharCounter() {
  const input = document.getElementById('topic');
  const counter = document.getElementById('charCount');
  input.addEventListener('input', () => {
    counter.textContent = `${input.value.length} / 200`;
    counter.style.color = input.value.length > 180 ? '#ff3b30' : '#444';
  });
}

// ═══════════════════════════════════════════
// GENERATE SCRIPT
// ═══════════════════════════════════════════
async function generateScript() {
  const topic    = document.getElementById('topic').value.trim();
  const audience = document.getElementById('audience').value;

  if (!topic) {
    showToast('⚠️ Please enter a topic!', 'warn');
    document.getElementById('topic').focus();
    return;
  }
  if (topic.length < 3) {
    showToast('⚠️ Topic must be at least 3 characters.', 'warn');
    return;
  }

  setLoading(true);
  showLoadingState();

  try {
    const res = await fetch(`${API_BASE}/scripts/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        tone:     selectedTone,
        length:   selectedLength,
        audience,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Generation failed.');
    }

    currentScript = data.data;
    renderScript(currentScript);
    showToast('✅ Script generated successfully!');

  } catch (err) {
    showError(err.message);
    showToast(`❌ ${err.message}`, 'error');
    console.error(err);
  } finally {
    setLoading(false);
  }
}

// ── Render Loading Skeleton ──────────────────
function showLoadingState() {
  const panel = document.getElementById('outputPanel');
  panel.innerHTML = `
    <div style="padding:28px">
      <div class="shimmer" style="width:30%;height:12px"></div>
      <div class="shimmer" style="width:100%;height:80px;margin-top:16px"></div>
      <div class="shimmer" style="width:100%;height:60px;margin-top:12px"></div>
      <div class="shimmer" style="width:100%;height:120px;margin-top:12px"></div>
      <div class="shimmer" style="width:100%;height:80px;margin-top:12px"></div>
    </div>
  `;
}

// ── Render Final Script ──────────────────────
function renderScript(script) {
  const panel = document.getElementById('outputPanel');
  panel.innerHTML = `
    <div class="script-result" id="scriptResult">
      <!-- Actions Bar -->
      <div class="actions-bar">
        <span class="result-badge" id="resultBadge">✅ Script Generated</span>
        <div class="action-btns">
          <button class="action-btn" onclick="copyAll()" title="Copy full script">📋 Copy All</button>
          <button class="action-btn" onclick="downloadScript()" title="Download as .txt">⬇️ Download</button>
          <button class="action-btn save-btn" onclick="saveScript()" title="Save to library">💾 Save</button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tabs">
        <button class="tab active" onclick="switchTab('script', this)">📝 Script</button>
        <button class="tab" onclick="switchTab('meta', this)">🏷️ Meta</button>
        <button class="tab" onclick="switchTab('titles', this)">💡 Titles</button>
      </div>

      <!-- Tab: Script -->
      <div class="tab-content" id="tab-script">
        <div class="script-section hook-section">
          <div class="section-label">🎣 HOOK</div>
          <div class="section-body">${escHtml(script.hook || '')}</div>
        </div>
        <div class="script-section intro-section">
          <div class="section-label">🎬 INTRO</div>
          <div class="section-body">${escHtml(script.intro || '')}</div>
        </div>
        <div class="script-section main-section">
          <div class="section-label">📜 MAIN CONTENT</div>
          ${renderMainContent(script.mainContent)}
        </div>
        <div class="script-section cta-section">
          <div class="section-label">🔥 CALL TO ACTION</div>
          <div class="section-body">${escHtml(script.cta || '')}</div>
        </div>
      </div>

      <!-- Tab: Meta -->
      <div class="tab-content hidden" id="tab-meta">
        <div class="meta-block">
          <div class="meta-label">📄 Video Description</div>
          <div class="meta-body">${escHtml(script.description || '')}</div>
        </div>
        <div class="meta-block">
          <div class="meta-label">🏷️ Tags</div>
          <div class="tags-container">${renderTags(script.tags)}</div>
        </div>
        <div class="meta-block">
          <div class="meta-label">📊 Stats</div>
          ${renderStats(script)}
        </div>
      </div>

      <!-- Tab: Titles -->
      <div class="tab-content hidden" id="tab-titles">
        <div class="meta-label" style="margin-bottom:12px">💡 Suggested Video Titles</div>
        ${renderTitles(script.title)}
      </div>
    </div>
  `;
}

function renderMainContent(sections) {
  if (!sections || !sections.length) {
    return '<div class="main-item"><div class="main-item-body">No main content generated.</div></div>';
  }
  return sections.map(s => `
    <div class="main-item">
      <div class="main-item-title">▶ ${escHtml(s.section || '')}</div>
      <div class="main-item-body">${escHtml(s.content || '')}</div>
    </div>
  `).join('');
}

function renderTags(tags) {
  if (!tags || !tags.length) return '<span style="color:#555">No tags generated.</span>';
  return tags.map(t => `<span class="tag-chip">#${escHtml(t)}</span>`).join('');
}

function renderStats(script) {
  const wordCount = [script.hook, script.intro, script.cta,
    ...(script.mainContent || []).map(s => s.content)]
    .filter(Boolean).join(' ').split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 130));
  return `
    <div class="stats-grid">
      <div class="stat-box"><div class="stat-val">${wordCount}</div><div class="stat-label">Words</div></div>
      <div class="stat-box"><div class="stat-val">~${readTime} min</div><div class="stat-label">Read Time</div></div>
      <div class="stat-box"><div class="stat-val">${script.tokensUsed || '—'}</div><div class="stat-label">Tokens Used</div></div>
    </div>
  `;
}

function renderTitles(titleStr) {
  if (!titleStr) return '<div style="color:#555">No titles generated.</div>';
  const lines = titleStr.split('\n').map(l => l.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
  return lines.map(t => `
    <div class="title-item" onclick="copyText('${escAttr(t)}')">
      <span>${escHtml(t)}</span>
      <span class="title-copy">Click to copy</span>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════
// TABS
// ═══════════════════════════════════════════
function switchTab(tab, btn) {
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
  btn.classList.add('active');
  const el = document.getElementById(`tab-${tab}`);
  if (el) el.classList.remove('hidden');
}

// ═══════════════════════════════════════════
// COPY / DOWNLOAD / SAVE
// ═══════════════════════════════════════════
function copyAll() {
  if (!currentScript) return;
  const { hook, intro, mainContent = [], cta, topic } = currentScript;
  let text = `YOUTUBE SCRIPT — ${topic}\n\n`;
  text += `🎣 HOOK\n${hook}\n\n`;
  text += `🎬 INTRO\n${intro}\n\n`;
  text += `📜 MAIN CONTENT\n`;
  mainContent.forEach(s => { text += `\n▶ ${s.section}\n${s.content}\n`; });
  text += `\n🔥 CALL TO ACTION\n${cta}`;
  copyText(text);
}

function copyText(str) {
  navigator.clipboard.writeText(str).then(() => showToast('📋 Copied to clipboard!')).catch(() => {
    showToast('❌ Copy failed', 'error');
  });
}

function downloadScript() {
  if (!currentScript) return;
  const { hook, intro, mainContent = [], cta, topic } = currentScript;
  let text = `YOUTUBE SCRIPT — ${topic}\nGenerated by ScriptGenie AI\n${'═'.repeat(50)}\n\n`;
  text += `HOOK\n${hook}\n\n`;
  text += `INTRO\n${intro}\n\n`;
  text += `MAIN CONTENT\n`;
  mainContent.forEach(s => { text += `\n▶ ${s.section}\n${s.content}\n`; });
  text += `\nCALL TO ACTION\n${cta}`;
  const blob = new Blob([text], { type: 'text/plain' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = `${topic.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_script.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('⬇️ Script downloaded!');
}

async function saveScript() {
  if (!currentScript) return;
  try {
    const res = await fetch(`${API_BASE}/saved`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentScript),
    });
    const data = await res.json();
    if (data.success) {
      showToast('💾 Script saved to library!');
      loadSavedScripts();
    } else {
      showToast(`⚠️ ${data.error}`, 'warn');
    }
  } catch {
    showToast('⚠️ Could not save (MongoDB not connected)', 'warn');
  }
}

// ═══════════════════════════════════════════
// SAVED SCRIPTS (MongoDB)
// ═══════════════════════════════════════════
async function loadSavedScripts() {
  try {
    const res = await fetch(`${API_BASE}/saved`);
    const data = await res.json();
    if (!data.success || !data.data.length) return;
    renderSavedScripts(data.data);
  } catch { /* MongoDB not connected — silent fail */ }
}

function renderSavedScripts(scripts) {
  const container = document.getElementById('savedContainer');
  container.innerHTML = `<div class="saved-grid">${scripts.map(s => `
    <div class="saved-card">
      <div class="saved-topic">${escHtml(s.topic)}</div>
      <div class="saved-meta">
        <span class="saved-badge">${s.tone}</span>
        <span class="saved-badge">${s.length}</span>
        <span>${new Date(s.createdAt).toLocaleDateString()}</span>
      </div>
      <div class="saved-actions">
        <button class="saved-btn" onclick="viewSaved('${s._id}')">👁 View</button>
        <button class="saved-btn del" onclick="deleteSaved('${s._id}')">🗑 Delete</button>
      </div>
    </div>
  `).join('')}</div>`;
}

async function deleteSaved(id) {
  if (!confirm('Delete this saved script?')) return;
  try {
    await fetch(`${API_BASE}/saved/${id}`, { method: 'DELETE' });
    showToast('🗑 Script deleted.');
    loadSavedScripts();
  } catch { showToast('❌ Delete failed', 'error'); }
}

// ═══════════════════════════════════════════
// UI HELPERS
// ═══════════════════════════════════════════
function setLoading(loading) {
  const btn = document.getElementById('generateBtn');
  if (!btn) return;
  btn.disabled = loading;
  btn.querySelector('#btnText')   && (btn.querySelector('#btnText').style.display   = loading ? 'none'         : 'inline');
  btn.querySelector('#btnLoader') && (btn.querySelector('#btnLoader').style.display = loading ? 'inline-block' : 'none');
}

function showError(msg) {
  const panel = document.getElementById('outputPanel');
  panel.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">❌</div>
      <h3>Generation Failed</h3>
      <p>${escHtml(msg)}</p>
      <p style="margin-top:8px;font-size:12px;color:#555">Check your OpenAI API key in backend/.env</p>
    </div>
  `;
}

function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className = 'toast show';
  if (type === 'error') toast.style.borderColor = '#ff3b30';
  else if (type === 'warn') toast.style.borderColor = '#ffd60a';
  else toast.style.borderColor = '#34d399';
  setTimeout(() => { toast.className = 'toast hidden'; }, 3000);
}

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function escAttr(str) {
  if (!str) return '';
  return String(str).replace(/'/g, "\\'");
}
