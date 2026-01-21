import { Qonversion, UserPropertyKey, AttributionProvider } from '@qonversion/capacitor-plugin';
import { store } from '../store';
import { showToast, copyToClipboard } from '../utils';

export function renderUserScreen(): string {
  const state = store.getState();
  const { userInfo } = state;

  const propertyKeys = Object.values(UserPropertyKey).filter(k => k !== UserPropertyKey.CUSTOM);
  const attributionProviders = Object.values(AttributionProvider);

  return `
    <div class="section">
      ${userInfo ? `
        <div class="user-info">
          <div class="user-info-row" data-copy="${userInfo.qonversionId || ''}">
            <span class="user-info-label">Qonversion ID</span>
            <span class="user-info-value">${userInfo.qonversionId || 'N/A'}</span>
          </div>
          <div class="user-info-row" data-copy="${userInfo.identityId || ''}">
            <span class="user-info-label">Identity ID</span>
            <span class="user-info-value">${userInfo.identityId || 'Anonymous'}</span>
          </div>
        </div>
      ` : `
        <div class="card">
          <p class="card-subtitle">Loading user info...</p>
        </div>
      `}
    </div>

    <div class="section">
      <div class="card">
        <h3 class="card-title">Identity</h3>
        <div class="input-group">
          <label class="input-label">Identity ID</label>
          <input type="text" class="input" id="identity-id" placeholder="Enter identity ID" 
            ${userInfo?.identityId ? 'disabled' : ''} />
        </div>
        <div class="button-row">
          <button class="btn btn-primary" id="identify" ${userInfo?.identityId ? 'disabled' : ''}>
            Identify
          </button>
          <button class="btn btn-secondary" id="logout" ${!userInfo?.identityId ? 'disabled' : ''}>
            Logout
          </button>
          <button class="btn btn-outline" id="refresh-user">
            Refresh
          </button>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="card">
        <h3 class="card-title">User Properties</h3>
        <button class="btn btn-secondary btn-block" id="load-properties" style="margin-bottom: var(--spacing-md);">
          Load User Properties
        </button>
        <div id="properties-container"></div>
        
        <h4 style="margin-top: var(--spacing-lg); margin-bottom: var(--spacing-sm);">Set Property</h4>
        <div class="input-group">
          <label class="input-label">Property Key</label>
          <select class="input" id="property-key-select">
            ${propertyKeys.map(k => `<option value="${k}">${k}</option>`).join('')}
            <option value="custom">Custom Key</option>
          </select>
        </div>
        <div class="input-group" id="custom-key-group" style="display: none;">
          <label class="input-label">Custom Key</label>
          <input type="text" class="input" id="custom-property-key" placeholder="Enter custom key" />
        </div>
        <div class="input-group">
          <label class="input-label">Value</label>
          <input type="text" class="input" id="property-value" placeholder="Enter value" />
        </div>
        <button class="btn btn-primary btn-block" id="set-property">Set Property</button>
      </div>
    </div>

    <div class="section">
      <div class="card">
        <h3 class="card-title">Attribution</h3>
        <div class="input-group">
          <label class="input-label">Provider</label>
          <select class="input" id="attribution-provider">
            ${attributionProviders.map(p => `<option value="${p}">${p}</option>`).join('')}
          </select>
        </div>
        <div class="input-group">
          <label class="input-label">Attribution Data (JSON)</label>
          <textarea class="input" id="attribution-data" rows="3" placeholder='{"key": "value"}'></textarea>
        </div>
        <button class="btn btn-primary btn-block" id="send-attribution">Send Attribution</button>
      </div>
    </div>
  `;
}

export function setupUserScreenEvents(): void {
  // Copy to clipboard
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', () => {
      const value = el.getAttribute('data-copy');
      if (value) copyToClipboard(value);
    });
  });

  // Property key select change
  document.getElementById('property-key-select')?.addEventListener('change', (e) => {
    const select = e.target as HTMLSelectElement;
    const customGroup = document.getElementById('custom-key-group');
    if (customGroup) {
      customGroup.style.display = select.value === 'custom' ? 'block' : 'none';
    }
  });

  // Identify
  document.getElementById('identify')?.addEventListener('click', async () => {
    const input = document.getElementById('identity-id') as HTMLInputElement;
    const identityId = input?.value.trim();

    if (!identityId) {
      showToast('Enter identity ID', 'error');
      return;
    }

    try {
      store.dispatch({ type: 'SET_LOADING', payload: true });
      console.log('🔄 [Qonversion] Identifying user:', identityId);
      
      const userInfo = await Qonversion.getSharedInstance().identify(identityId);
      console.log('✅ [Qonversion] User identified:', userInfo);
      
      store.dispatch({ type: 'SET_USER_INFO', payload: userInfo });
      showToast('User identified!', 'success');
    } catch (error: any) {
      console.error('❌ [Qonversion] Identify failed:', error);
      showToast(error.message || 'Identify failed', 'error');
    } finally {
      store.dispatch({ type: 'SET_LOADING', payload: false });
    }
  });

  // Logout
  document.getElementById('logout')?.addEventListener('click', async () => {
    try {
      console.log('🔄 [Qonversion] Logging out...');
      Qonversion.getSharedInstance().logout();
      
      const userInfo = await Qonversion.getSharedInstance().userInfo();
      store.dispatch({ type: 'SET_USER_INFO', payload: userInfo });
      showToast('Logged out!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Logout failed', 'error');
    }
  });

  // Refresh user info
  document.getElementById('refresh-user')?.addEventListener('click', async () => {
    try {
      store.dispatch({ type: 'SET_LOADING', payload: true });
      const userInfo = await Qonversion.getSharedInstance().userInfo();
      store.dispatch({ type: 'SET_USER_INFO', payload: userInfo });
      showToast('User info refreshed!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to refresh', 'error');
    } finally {
      store.dispatch({ type: 'SET_LOADING', payload: false });
    }
  });

  // Load properties
  document.getElementById('load-properties')?.addEventListener('click', async () => {
    try {
      store.dispatch({ type: 'SET_LOADING', payload: true });
      console.log('🔄 [Qonversion] Loading user properties...');
      
      const properties = await Qonversion.getSharedInstance().userProperties();
      console.log('✅ [Qonversion] Properties loaded:', properties);

      const container = document.getElementById('properties-container');
      if (container && properties.properties.length > 0) {
        container.innerHTML = `
          <div class="list">
            ${properties.properties.map(p => `
              <div class="list-item">
                <div class="list-item-content">
                  <div class="list-item-title">${p.key}</div>
                  <div class="list-item-subtitle">${p.value}</div>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      } else if (container) {
        container.innerHTML = '<p class="card-subtitle">No properties found</p>';
      }
      
      showToast(`Loaded ${properties.properties.length} properties`, 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to load properties', 'error');
    } finally {
      store.dispatch({ type: 'SET_LOADING', payload: false });
    }
  });

  // Set property
  document.getElementById('set-property')?.addEventListener('click', () => {
    const keySelect = document.getElementById('property-key-select') as HTMLSelectElement;
    const customKey = document.getElementById('custom-property-key') as HTMLInputElement;
    const valueInput = document.getElementById('property-value') as HTMLInputElement;
    
    const value = valueInput?.value.trim();
    if (!value) {
      showToast('Enter property value', 'error');
      return;
    }

    try {
      if (keySelect?.value === 'custom') {
        const key = customKey?.value.trim();
        if (!key) {
          showToast('Enter custom key', 'error');
          return;
        }
        console.log('🔄 [Qonversion] Setting custom property:', key, value);
        Qonversion.getSharedInstance().setCustomUserProperty(key, value);
      } else {
        const key = keySelect?.value as UserPropertyKey;
        console.log('🔄 [Qonversion] Setting property:', key, value);
        Qonversion.getSharedInstance().setUserProperty(key, value);
      }
      showToast('Property set!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to set property', 'error');
    }
  });

  // Send attribution
  document.getElementById('send-attribution')?.addEventListener('click', () => {
    const provider = (document.getElementById('attribution-provider') as HTMLSelectElement)?.value as AttributionProvider;
    const dataInput = document.getElementById('attribution-data') as HTMLTextAreaElement;
    
    try {
      const data = JSON.parse(dataInput?.value || '{}');
      console.log('🔄 [Qonversion] Sending attribution:', provider, data);
      Qonversion.getSharedInstance().attribution(data, provider);
      showToast('Attribution sent!', 'success');
    } catch (error: any) {
      showToast('Invalid JSON data', 'error');
    }
  });
}
