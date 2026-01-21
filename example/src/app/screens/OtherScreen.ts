import { Qonversion, type Entitlement } from '@qonversion/capacitor-plugin';
import { store } from '../store';
import { showToast } from '../utils';

export function renderOtherScreen(): string {
  return `
    <div class="section">
      <div class="card">
        <h3 class="card-title">Fallback File</h3>
        <button class="btn btn-primary btn-block" id="check-fallback">
          Check Fallback File Accessibility
        </button>
        <div id="fallback-result" style="margin-top: var(--spacing-md);"></div>
      </div>
    </div>

    <div class="section">
      <div class="card">
        <h3 class="card-title">iOS Only Features</h3>
        <p class="card-subtitle" style="margin-bottom: var(--spacing-md);">
          These features are only available on iOS devices
        </p>
        <div class="list">
          <button class="btn btn-secondary btn-block" id="collect-advertising-id" style="margin-bottom: var(--spacing-sm);">
            Collect Advertising ID
          </button>
          <button class="btn btn-secondary btn-block" id="collect-asa" style="margin-bottom: var(--spacing-sm);">
            Collect Apple Search Ads Attribution
          </button>
          <button class="btn btn-secondary btn-block" id="code-redemption" style="margin-bottom: var(--spacing-sm);">
            Present Code Redemption Sheet
          </button>
          <button class="btn btn-secondary btn-block" id="promo-delegate">
            Set Promo Purchases Delegate
          </button>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="card">
        <h3 class="card-title">Promotional Offers (iOS)</h3>
        <div class="input-row">
          <div class="input-group">
            <label class="input-label">Product ID</label>
            <input type="text" class="input" id="promo-product-id" placeholder="Product ID" />
          </div>
          <div class="input-group">
            <label class="input-label">Discount ID</label>
            <input type="text" class="input" id="promo-discount-id" placeholder="Discount ID" />
          </div>
        </div>
        <button class="btn btn-primary btn-block" id="get-promo-offer">
          Get Promotional Offer
        </button>
      </div>
    </div>
  `;
}

export function setupOtherScreenEvents(): void {
  // Check fallback file
  document.getElementById('check-fallback')?.addEventListener('click', async () => {
    try {
      store.dispatch({ type: 'SET_LOADING', payload: true });
      console.log('🔄 [Qonversion] Checking fallback file accessibility...');
      
      const accessible = await Qonversion.getSharedInstance().isFallbackFileAccessible();
      console.log('✅ [Qonversion] Fallback accessible:', accessible);
      
      const container = document.getElementById('fallback-result');
      if (container) {
        container.innerHTML = `
          <div class="status-badge ${accessible ? 'status-success' : 'status-error'}">
            <span class="status-dot"></span>
            ${accessible ? 'Accessible' : 'Not Accessible'}
          </div>
        `;
      }
      
      showToast(`Fallback file ${accessible ? 'is' : 'is not'} accessible`, accessible ? 'success' : 'error');
    } catch (error: any) {
      console.error('❌ [Qonversion] Fallback check failed:', error);
      showToast(error.message || 'Check failed', 'error');
    } finally {
      store.dispatch({ type: 'SET_LOADING', payload: false });
    }
  });

  // Collect advertising ID (iOS)
  document.getElementById('collect-advertising-id')?.addEventListener('click', () => {
    try {
      console.log('🔄 [Qonversion] Collecting advertising ID...');
      Qonversion.getSharedInstance().collectAdvertisingId();
      showToast('Advertising ID collected!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed', 'error');
    }
  });

  // Collect Apple Search Ads (iOS)
  document.getElementById('collect-asa')?.addEventListener('click', () => {
    try {
      console.log('🔄 [Qonversion] Collecting Apple Search Ads attribution...');
      Qonversion.getSharedInstance().collectAppleSearchAdsAttribution();
      showToast('ASA attribution collected!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed', 'error');
    }
  });

  // Code redemption sheet (iOS)
  document.getElementById('code-redemption')?.addEventListener('click', () => {
    try {
      console.log('🔄 [Qonversion] Presenting code redemption sheet...');
      Qonversion.getSharedInstance().presentCodeRedemptionSheet();
      showToast('Code redemption sheet presented!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed', 'error');
    }
  });

  // Set promo purchases delegate (iOS)
  document.getElementById('promo-delegate')?.addEventListener('click', () => {
    try {
      console.log('🔄 [Qonversion] Setting promo purchases delegate...');
      Qonversion.getSharedInstance().setPromoPurchasesDelegate({
        onPromoPurchaseReceived(productId: string, promoPurchaseExecutor: () => Promise<Map<string, Entitlement>>) {
          console.log('🎁 [Promo] Purchase received:', productId);
          showToast(`Promo purchase: ${productId}`, 'info');
          
          promoPurchaseExecutor().then(entitlements => {
            console.log('✅ [Promo] Purchase executed:', entitlements);
            store.dispatch({ type: 'SET_ENTITLEMENTS', payload: entitlements });
            showToast('Promo purchase completed!', 'success');
          }).catch(error => {
            console.error('❌ [Promo] Purchase failed:', error);
            showToast('Promo purchase failed', 'error');
          });
        },
      });
      showToast('Promo purchases delegate set!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed', 'error');
    }
  });

  // Get promotional offer (iOS)
  document.getElementById('get-promo-offer')?.addEventListener('click', async () => {
    const productId = (document.getElementById('promo-product-id') as HTMLInputElement)?.value.trim();
    const discountId = (document.getElementById('promo-discount-id') as HTMLInputElement)?.value.trim();

    if (!productId || !discountId) {
      showToast('Enter product and discount IDs', 'error');
      return;
    }

    try {
      store.dispatch({ type: 'SET_LOADING', payload: true });
      console.log('🔄 [Qonversion] Getting promotional offer:', productId, discountId);
      
      const products = await Qonversion.getSharedInstance().products();
      const product = products.get(productId);
      
      if (!product) {
        showToast('Product not found', 'error');
        return;
      }

      const discount = product.skProduct?.discounts?.find(d => d.identifier === discountId);
      if (!discount) {
        showToast('Discount not found', 'error');
        return;
      }

      const promoOffer = await Qonversion.getSharedInstance().getPromotionalOffer(product, discount);
      console.log('✅ [Qonversion] Promo offer:', promoOffer);
      showToast('Promotional offer retrieved!', 'success');
    } catch (error: any) {
      console.error('❌ [Qonversion] Get promo offer failed:', error);
      showToast(error.message || 'Failed to get offer', 'error');
    } finally {
      store.dispatch({ type: 'SET_LOADING', payload: false });
    }
  });
}
