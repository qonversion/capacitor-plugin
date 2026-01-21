import { Qonversion, type Offering, type Product } from '@qonversion/capacitor-plugin';
import { store } from '../store';
import { showToast } from '../utils';

const renderProduct = (product: Product): string => {
  const priceStr = product.prettyPrice || (product.price ? `${product.currencyCode || ''} ${product.price}` : 'N/A');
  
  return `
    <div class="list-item" data-purchase-offering="${product.qonversionID}">
      <div class="list-item-content">
        <div class="list-item-title">${product.storeTitle || product.qonversionID}</div>
        <div class="list-item-subtitle">${product.qonversionID}</div>
      </div>
      <span class="product-price">${priceStr}</span>
    </div>
  `;
};

const renderOffering = (offering: Offering): string => {
  return `
    <div class="card">
      <div class="card-header">
        <span class="card-title">${offering.id}</span>
        <span class="status-badge status-neutral">${offering.tag}</span>
      </div>
      ${offering.products.length > 0 ? `
        <div class="list">
          ${offering.products.map(renderProduct).join('')}
        </div>
      ` : `
        <p class="card-subtitle">No products in this offering</p>
      `}
    </div>
  `;
};

// Update offerings section without full re-render
function updateOfferingsSection(): void {
  const section = document.getElementById('offerings-section');
  if (!section) return;
  
  const { offerings } = store.getState();
  
  if (offerings) {
    let html = '';
    
    if (offerings.main) {
      html += `
        <div class="card" style="border-color: var(--color-accent);">
          <div class="card-header">
            <span class="card-title">⭐ Main Offering</span>
            <span class="status-badge status-success">${offerings.main.id}</span>
          </div>
          ${offerings.main.products.length > 0 ? `
            <div class="list">
              ${offerings.main.products.map(renderProduct).join('')}
            </div>
          ` : `
            <p class="card-subtitle">No products</p>
          `}
        </div>
      `;
    }
    
    if (offerings.availableOffering.length > 0) {
      html += `
        <h2 class="section-title">All Offerings (${offerings.availableOffering.length})</h2>
        ${offerings.availableOffering.map(renderOffering).join('')}
      `;
    } else {
      html += `
        <div class="empty-state">
          <div class="empty-state-icon">📋</div>
          <div class="empty-state-title">No Offerings Available</div>
          <div class="empty-state-text">Configure offerings in your dashboard</div>
        </div>
      `;
    }
    
    section.innerHTML = html;
    // Re-attach purchase listeners
    attachOfferingsPurchaseListeners();
  }
}

// Attach purchase listeners for offerings
function attachOfferingsPurchaseListeners(): void {
  document.querySelectorAll('[data-purchase-offering]').forEach(el => {
    el.addEventListener('click', async () => {
      const productId = el.getAttribute('data-purchase-offering');
      if (!productId) return;

      try {
        store.dispatch({ type: 'SET_LOADING', payload: true });
        console.log('🔄 [Qonversion] Purchasing from offering:', productId);
        
        // Find product in offerings
        const offerings = store.getState().offerings;
        let product: Product | undefined;
        
        for (const offering of offerings?.availableOffering || []) {
          product = offering.products.find(p => p.qonversionID === productId);
          if (product) break;
        }
        
        if (!product) {
          showToast('Product not found', 'error');
          return;
        }

        const entitlements = await Qonversion.getSharedInstance().purchaseProduct(product);
        store.dispatch({ type: 'SET_ENTITLEMENTS', payload: entitlements });
        showToast('Purchase successful!', 'success');
      } catch (error: any) {
        console.error('❌ [Qonversion] Purchase failed:', error);
        if (error.userCanceled) {
          showToast('Purchase canceled', 'info');
        } else {
          showToast(error.message || 'Purchase failed', 'error');
        }
      } finally {
        store.dispatch({ type: 'SET_LOADING', payload: false });
      }
    });
  });
}

export function renderOfferingsScreen(): string {
  const state = store.getState();
  const { offerings } = state;

  return `
    <div class="section">
      <button class="btn btn-primary btn-block" id="load-offerings">
        Load Offerings
      </button>
    </div>

    <div class="section" id="offerings-section">
      ${offerings ? `
        ${offerings.main ? `
          <div class="card" style="border-color: var(--color-accent);">
            <div class="card-header">
              <span class="card-title">⭐ Main Offering</span>
              <span class="status-badge status-success">${offerings.main.id}</span>
            </div>
            ${offerings.main.products.length > 0 ? `
              <div class="list">
                ${offerings.main.products.map(renderProduct).join('')}
              </div>
            ` : `
              <p class="card-subtitle">No products</p>
            `}
          </div>
        ` : ''}
        
        ${offerings.availableOffering.length > 0 ? `
          <h2 class="section-title">All Offerings (${offerings.availableOffering.length})</h2>
          ${offerings.availableOffering.map(renderOffering).join('')}
        ` : `
          <div class="empty-state">
            <div class="empty-state-icon">📋</div>
            <div class="empty-state-title">No Offerings Available</div>
            <div class="empty-state-text">Configure offerings in your dashboard</div>
          </div>
        `}
      ` : `
        <div class="empty-state">
          <div class="empty-state-icon">📋</div>
          <div class="empty-state-title">Offerings Not Loaded</div>
          <div class="empty-state-text">Tap the button above to load offerings</div>
        </div>
      `}
    </div>
  `;
}

export function setupOfferingsScreenEvents(): void {
  // Load offerings
  document.getElementById('load-offerings')?.addEventListener('click', async () => {
    try {
      store.dispatch({ type: 'SET_LOADING', payload: true });
      console.log('🔄 [Qonversion] Loading offerings...');
      
      const offerings = await Qonversion.getSharedInstance().offerings();
      console.log('✅ [Qonversion] Offerings loaded:', offerings);
      
      if (offerings) {
        store.dispatch({ type: 'SET_OFFERINGS', payload: offerings });
        // Update UI without full re-render
        updateOfferingsSection();
        showToast(`Loaded ${offerings.availableOffering.length} offerings`, 'success');
      } else {
        showToast('No offerings found', 'info');
      }
    } catch (error: any) {
      console.error('❌ [Qonversion] Failed to load offerings:', error);
      showToast(error.message || 'Failed to load offerings', 'error');
    } finally {
      store.dispatch({ type: 'SET_LOADING', payload: false });
    }
  });

  // Attach purchase listeners for initial render
  attachOfferingsPurchaseListeners();
}
