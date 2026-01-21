import { Qonversion, PurchaseOptionsBuilder, type Product } from '@qonversion/capacitor-plugin';
import { store } from '../store';
import { showToast, showPurchaseResultDialog } from '../utils';

// Update products section without full re-render
function updateProductsSection(): void {
  const section = document.getElementById('products-section');
  if (!section) return;
  
  const { products } = store.getState();
  
  const renderProduct = (product: Product): string => {
    const priceStr = product.prettyPrice || (product.price ? `${product.currencyCode || ''} ${product.price}` : 'N/A');
    const hasOffers = product.storeDetails?.subscriptionOfferDetails?.length;
    
    return `
      <div class="product-card">
        <div class="product-header">
          <span class="product-name">${product.storeTitle || product.qonversionId}</span>
          <span class="product-price">${priceStr}</span>
        </div>
        <div class="product-id">${product.qonversionId}</div>
        ${product.storeDescription ? `
          <div class="product-description">${product.storeDescription}</div>
        ` : ''}
        <div class="button-row">
          <button class="btn btn-primary btn-sm" data-purchase="${product.qonversionId}">
            Purchase
          </button>
          ${hasOffers ? `
            <button class="btn btn-secondary btn-sm" data-purchase-offer="${product.qonversionId}">
              With Offer
            </button>
          ` : ''}
        </div>
      </div>
    `;
  };
  
  if (products && products.size > 0) {
    section.innerHTML = `
      <h2 class="section-title">Available Products (${products.size})</h2>
      ${Array.from(products.values()).map(renderProduct).join('')}
    `;
    // Re-attach event listeners for purchase buttons
    attachPurchaseListeners();
  } else if (products) {
    section.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📦</div>
        <div class="empty-state-title">No Products Found</div>
        <div class="empty-state-text">Configure products in your Qonversion dashboard</div>
      </div>
    `;
  }
}

export function renderProductsScreen(): string {
  const state = store.getState();
  const { products } = state;

  const renderProduct = (product: Product): string => {
    const priceStr = product.prettyPrice || (product.price ? `${product.currencyCode || ''} ${product.price}` : 'N/A');
    const hasOffers = product.storeDetails?.subscriptionOfferDetails?.length;
    
    return `
      <div class="product-card">
        <div class="product-header">
          <span class="product-name">${product.storeTitle || product.qonversionId}</span>
          <span class="product-price">${priceStr}</span>
        </div>
        <div class="product-id">${product.qonversionId}</div>
        ${product.storeDescription ? `
          <div class="product-description">${product.storeDescription}</div>
        ` : ''}
        <div class="button-row">
          <button class="btn btn-primary btn-sm" data-purchase="${product.qonversionId}">
            Purchase
          </button>
          ${hasOffers ? `
            <button class="btn btn-secondary btn-sm" data-purchase-offer="${product.qonversionId}">
              With Offer
            </button>
          ` : ''}
        </div>
      </div>
    `;
  };

  return `
    <div class="section">
      <button class="btn btn-primary btn-block" id="load-products">
        Load Products
      </button>
    </div>

    <div class="section" id="products-section">
      ${products ? `
        ${products.size > 0 ? `
          <h2 class="section-title">Available Products (${products.size})</h2>
          ${Array.from(products.values()).map(renderProduct).join('')}
        ` : `
          <div class="empty-state">
            <div class="empty-state-icon">📦</div>
            <div class="empty-state-title">No Products Found</div>
            <div class="empty-state-text">Configure products in your Qonversion dashboard</div>
          </div>
        `}
      ` : `
        <div class="empty-state">
          <div class="empty-state-icon">📦</div>
          <div class="empty-state-title">Products Not Loaded</div>
          <div class="empty-state-text">Tap the button above to load products</div>
        </div>
      `}
    </div>

    <div class="section">
      <div class="card">
        <h3 class="card-title">Check Trial/Intro Eligibility</h3>
        <div class="input-group">
          <label class="input-label">Product IDs (comma-separated)</label>
          <input type="text" class="input" id="eligibility-ids" placeholder="product1, product2" />
        </div>
        <button class="btn btn-secondary btn-block" id="check-eligibility">
          Check Eligibility
        </button>
      </div>
    </div>
  `;
}

// Attach purchase button event listeners
function attachPurchaseListeners(): void {
  // Purchase
  document.querySelectorAll('[data-purchase]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const productId = btn.getAttribute('data-purchase');
      if (!productId) return;

      try {
        store.dispatch({ type: 'SET_LOADING', payload: true });
        console.log('🔄 [Qonversion] Purchasing:', productId);
        
        const products = store.getState().products;
        const product = products?.get(productId);
        if (!product) {
          showToast('Product not found', 'error');
          return;
        }

        const result = await Qonversion.getSharedInstance().purchase(product);
        console.log('✅ [Qonversion] Purchase result:', result.status);
        
        // Show full PurchaseResult dialog
        showPurchaseResultDialog(result);
        
        if (result.isSuccess && result.entitlements) {
          store.dispatch({ type: 'SET_ENTITLEMENTS', payload: result.entitlements });
        }
      } catch (error: any) {
        console.error('❌ [Qonversion] Purchase failed:', error);
        showToast(error.message || 'Purchase failed', 'error');
      } finally {
        store.dispatch({ type: 'SET_LOADING', payload: false });
      }
    });
  });

  // Purchase with offer (Android)
  document.querySelectorAll('[data-purchase-offer]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const productId = btn.getAttribute('data-purchase-offer');
      if (!productId) return;

      try {
        store.dispatch({ type: 'SET_LOADING', payload: true });
        
        const products = store.getState().products;
        const product = products?.get(productId);
        if (!product) {
          showToast('Product not found', 'error');
          return;
        }

        const offers = product.storeDetails?.subscriptionOfferDetails;
        if (!offers?.length) {
          showToast('No offers available', 'error');
          return;
        }

        const offerId = offers[0].offerId;
        if (!offerId) {
          showToast('No offer ID found', 'error');
          return;
        }

        const purchaseOptions = new PurchaseOptionsBuilder().setOfferId(offerId).build();
        const result = await Qonversion.getSharedInstance().purchase(product, purchaseOptions);
        
        // Show full PurchaseResult dialog
        showPurchaseResultDialog(result);
        
        if (result.isSuccess && result.entitlements) {
          store.dispatch({ type: 'SET_ENTITLEMENTS', payload: result.entitlements });
        }
      } catch (error: any) {
        console.error('❌ [Qonversion] Purchase with offer failed:', error);
        showToast(error.message || 'Purchase failed', 'error');
      } finally {
        store.dispatch({ type: 'SET_LOADING', payload: false });
      }
    });
  });
}

export function setupProductsScreenEvents(): void {
  // Load products
  document.getElementById('load-products')?.addEventListener('click', async () => {
    try {
      store.dispatch({ type: 'SET_LOADING', payload: true });
      console.log('🔄 [Qonversion] Loading products...');
      
      const products = await Qonversion.getSharedInstance().products();
      console.log('✅ [Qonversion] Products loaded:', products.size);
      
      store.dispatch({ type: 'SET_PRODUCTS', payload: products });
      // Update UI without full re-render
      updateProductsSection();
      showToast(`Loaded ${products.size} products`, 'success');
    } catch (error: any) {
      console.error('❌ [Qonversion] Failed to load products:', error);
      showToast(error.message || 'Failed to load products', 'error');
    } finally {
      store.dispatch({ type: 'SET_LOADING', payload: false });
    }
  });

  // Attach purchase listeners for initial render
  attachPurchaseListeners();

  // Check eligibility
  document.getElementById('check-eligibility')?.addEventListener('click', async () => {
    const input = document.getElementById('eligibility-ids') as HTMLInputElement;
    const ids = input?.value.split(',').map(id => id.trim()).filter(Boolean);
    
    if (!ids?.length) {
      showToast('Enter product IDs', 'error');
      return;
    }

    try {
      store.dispatch({ type: 'SET_LOADING', payload: true });
      console.log('🔄 [Qonversion] Checking eligibility for:', ids);
      
      const eligibilities = await Qonversion.getSharedInstance().checkTrialIntroEligibility(ids);
      console.log('✅ [Qonversion] Eligibility results:', eligibilities);
      
      const results = Array.from(eligibilities.entries())
        .map(([id, elig]) => `${id}: ${elig.status}`)
        .join('\n');
      
      showToast(`Eligibility checked:\n${results}`, 'success');
    } catch (error: any) {
      console.error('❌ [Qonversion] Eligibility check failed:', error);
      showToast(error.message || 'Eligibility check failed', 'error');
    } finally {
      store.dispatch({ type: 'SET_LOADING', payload: false });
    }
  });
}
