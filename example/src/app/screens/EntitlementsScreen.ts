import { Qonversion, type Entitlement } from '@qonversion/capacitor-plugin';
import { store } from '../store';
import { showToast, formatDate } from '../utils';

const renderEntitlement = (entitlement: Entitlement): string => {
  return `
    <div class="list-item">
      <div class="list-item-content">
        <div class="list-item-title">${entitlement.id}</div>
        <div class="list-item-subtitle">
          ${entitlement.isActive ? '✅ Active' : '❌ Inactive'} • 
          Started: ${formatDate(entitlement.startedDate)}
        </div>
        ${entitlement.expirationDate ? `
          <div class="list-item-subtitle">Expires: ${formatDate(entitlement.expirationDate)}</div>
        ` : ''}
      </div>
      <span class="status-badge ${entitlement.isActive ? 'status-success' : 'status-error'}">
        ${entitlement.isActive ? 'Active' : 'Expired'}
      </span>
    </div>
  `;
};

// Update entitlements section without full re-render
function updateEntitlementsSection(): void {
  const section = document.getElementById('entitlements-section');
  if (!section) return;
  
  const { entitlements } = store.getState();
  
  if (entitlements) {
    if (entitlements.size > 0) {
      section.innerHTML = `
        <h2 class="section-title">Your Entitlements (${entitlements.size})</h2>
        <div class="list">
          ${Array.from(entitlements.values()).map(renderEntitlement).join('')}
        </div>
      `;
    } else {
      section.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🎫</div>
          <div class="empty-state-title">No Entitlements</div>
          <div class="empty-state-text">You don't have any active entitlements yet</div>
        </div>
      `;
    }
  }
}

export function renderEntitlementsScreen(): string {
  const state = store.getState();
  const { entitlements } = state;

  return `
    <div class="section">
      <button class="btn btn-primary btn-block" id="check-entitlements">
        Check Entitlements
      </button>
    </div>

    <div class="section">
      <div class="button-row">
        <button class="btn btn-secondary" id="set-listener">
          Set Listener
        </button>
        <button class="btn btn-secondary" id="restore-purchases">
          Restore
        </button>
      </div>
    </div>

    <div class="section" id="entitlements-section">
      ${entitlements ? `
        ${entitlements.size > 0 ? `
          <h2 class="section-title">Your Entitlements (${entitlements.size})</h2>
          <div class="list">
            ${Array.from(entitlements.values()).map(renderEntitlement).join('')}
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-state-icon">🎫</div>
            <div class="empty-state-title">No Entitlements</div>
            <div class="empty-state-text">You don't have any active entitlements yet</div>
          </div>
        `}
      ` : `
        <div class="empty-state">
          <div class="empty-state-icon">🎫</div>
          <div class="empty-state-title">Entitlements Not Loaded</div>
          <div class="empty-state-text">Tap the button above to check your entitlements</div>
        </div>
      `}
    </div>

    <div class="section">
      <div class="card">
        <h3 class="card-title">Sync Options</h3>
        <div class="button-row">
          <button class="btn btn-outline btn-sm" id="sync-historical">
            Sync Historical
          </button>
          <button class="btn btn-outline btn-sm" id="sync-storekit2">
            Sync SK2 (iOS)
          </button>
          <button class="btn btn-outline btn-sm" id="sync-purchases">
            Sync (Android)
          </button>
        </div>
      </div>
    </div>
  `;
}

export function setupEntitlementsScreenEvents(): void {
  // Check entitlements
  document.getElementById('check-entitlements')?.addEventListener('click', async () => {
    try {
      store.dispatch({ type: 'SET_LOADING', payload: true });
      console.log('🔄 [Qonversion] Checking entitlements...');
      
      const entitlements = await Qonversion.getSharedInstance().checkEntitlements();
      console.log('✅ [Qonversion] Entitlements loaded:', entitlements.size);
      
      store.dispatch({ type: 'SET_ENTITLEMENTS', payload: entitlements });
      // Update UI without full re-render
      updateEntitlementsSection();
      showToast(`Found ${entitlements.size} entitlements`, 'success');
    } catch (error: any) {
      console.error('❌ [Qonversion] Failed to check entitlements:', error);
      showToast(error.message || 'Failed to check entitlements', 'error');
    } finally {
      store.dispatch({ type: 'SET_LOADING', payload: false });
    }
  });

  // Set listener
  document.getElementById('set-listener')?.addEventListener('click', () => {
    console.log('🔄 [Qonversion] Setting entitlements listener...');
    Qonversion.getSharedInstance().setEntitlementsUpdateListener({
      onEntitlementsUpdated(entitlements) {
        console.log('📡 [Qonversion] Entitlements updated via listener');
        store.dispatch({ type: 'SET_ENTITLEMENTS', payload: entitlements });
        showToast('Entitlements updated!', 'info');
      },
    });
    showToast('Entitlements listener set', 'success');
  });

  // Restore
  document.getElementById('restore-purchases')?.addEventListener('click', async () => {
    try {
      store.dispatch({ type: 'SET_LOADING', payload: true });
      console.log('🔄 [Qonversion] Restoring purchases...');
      
      const entitlements = await Qonversion.getSharedInstance().restore();
      console.log('✅ [Qonversion] Restore successful');
      
      store.dispatch({ type: 'SET_ENTITLEMENTS', payload: entitlements });
      // Update UI without full re-render
      updateEntitlementsSection();
      showToast('Purchases restored!', 'success');
    } catch (error: any) {
      console.error('❌ [Qonversion] Restore failed:', error);
      showToast(error.message || 'Restore failed', 'error');
    } finally {
      store.dispatch({ type: 'SET_LOADING', payload: false });
    }
  });

  // Sync historical data
  document.getElementById('sync-historical')?.addEventListener('click', async () => {
    try {
      console.log('🔄 [Qonversion] Syncing historical data...');
      await Qonversion.getSharedInstance().syncHistoricalData();
      showToast('Historical data synced!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Sync failed', 'error');
    }
  });

  // Sync StoreKit 2 (iOS)
  document.getElementById('sync-storekit2')?.addEventListener('click', async () => {
    try {
      console.log('🔄 [Qonversion] Syncing StoreKit 2 purchases...');
      await Qonversion.getSharedInstance().syncStoreKit2Purchases();
      showToast('StoreKit 2 purchases synced!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Sync failed', 'error');
    }
  });

  // Sync purchases (Android)
  document.getElementById('sync-purchases')?.addEventListener('click', async () => {
    try {
      console.log('🔄 [Qonversion] Syncing purchases...');
      await Qonversion.getSharedInstance().syncPurchases();
      showToast('Purchases synced!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Sync failed', 'error');
    }
  });
}
