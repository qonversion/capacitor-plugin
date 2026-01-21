import { store } from '../store';
import { copyToClipboard } from '../utils';

export function renderMainScreen(): string {
  const state = store.getState();
  const { qonversionInitStatus, userInfo } = state;

  const getStatusBadge = () => {
    switch (qonversionInitStatus) {
      case 'success':
        return '<span class="status-badge status-success"><span class="status-dot"></span>Initialized</span>';
      case 'error':
        return '<span class="status-badge status-error"><span class="status-dot"></span>Error</span>';
      case 'initializing':
        return '<span class="status-badge status-warning"><span class="status-dot"></span>Initializing...</span>';
      default:
        return '<span class="status-badge status-neutral"><span class="status-dot"></span>Not Initialized</span>';
    }
  };

  return `
    <div class="section">
      <div class="card">
        <div class="card-header">
          <span class="card-title">SDK Status</span>
          ${getStatusBadge()}
        </div>
        ${userInfo ? `
          <div class="user-info-row" data-copy="${userInfo.qonversionId || ''}">
            <span class="user-info-label">Qonversion ID</span>
            <span class="user-info-value">${userInfo.qonversionId || 'N/A'}</span>
          </div>
          <div class="user-info-row" data-copy="${userInfo.identityId || ''}">
            <span class="user-info-label">Identity ID</span>
            <span class="user-info-value">${userInfo.identityId || 'Anonymous'}</span>
          </div>
        ` : `
          <p class="card-subtitle">Loading user info...</p>
        `}
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">SDK Features</h2>
      <div class="menu-grid">
        <div class="menu-item" data-navigate="products">
          <span class="menu-item-icon">📦</span>
          <span class="menu-item-title">Products</span>
        </div>
        <div class="menu-item" data-navigate="entitlements">
          <span class="menu-item-icon">🎫</span>
          <span class="menu-item-title">Entitlements</span>
        </div>
        <div class="menu-item" data-navigate="offerings">
          <span class="menu-item-icon">📋</span>
          <span class="menu-item-title">Offerings</span>
        </div>
        <div class="menu-item" data-navigate="remoteConfigs">
          <span class="menu-item-icon">⚙️</span>
          <span class="menu-item-title">Remote Configs</span>
        </div>
        <div class="menu-item" data-navigate="user">
          <span class="menu-item-icon">👤</span>
          <span class="menu-item-title">User</span>
        </div>
        <div class="menu-item" data-navigate="noCodes">
          <span class="menu-item-icon">🎨</span>
          <span class="menu-item-title">No-Codes</span>
        </div>
        <div class="menu-item" data-navigate="other">
          <span class="menu-item-icon">🔧</span>
          <span class="menu-item-title">Other</span>
        </div>
      </div>
    </div>
  `;
}

export function setupMainScreenEvents(): void {
  // Copy to clipboard on click
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', () => {
      const value = el.getAttribute('data-copy');
      if (value) {
        copyToClipboard(value);
      }
    });
  });
}
