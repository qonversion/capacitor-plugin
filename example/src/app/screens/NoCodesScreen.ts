import {
  NoCodes,
  NoCodesConfigBuilder,
  ScreenPresentationConfig,
  ScreenPresentationStyle,
  NoCodesTheme,
  Qonversion,
  type NoCodesAction,
  type NoCodesError,
  type PurchaseDelegate,
  type Product,
} from '@qonversion/capacitor-plugin';
import { store } from '../store';
import { showToast } from '../utils';

const PROJECT_KEY = 'PV77YHL7qnGvsdmpTs7gimsxUvY-Znl2';

export function renderNoCodesScreen(): string {
  const state = store.getState();
  const { noCodesInitialized, noCodesEvents } = state;

  const presentationStyles = Object.values(ScreenPresentationStyle);

  return `
    <div class="section">
      <div class="card" style="border-color: ${noCodesInitialized ? 'var(--color-success)' : 'var(--color-border)'};">
        <div class="card-header">
          <span class="card-title">No-Codes SDK</span>
          <span class="status-badge ${noCodesInitialized ? 'status-success' : 'status-neutral'}">
            <span class="status-dot"></span>
            ${noCodesInitialized ? 'Initialized' : 'Not Initialized'}
          </span>
        </div>
        <button class="btn btn-primary btn-block" id="init-nocodes" ${noCodesInitialized ? 'disabled' : ''}>
          Initialize No-Codes
        </button>
      </div>
    </div>

    <div class="section">
      <div class="card">
        <h3 class="card-title">Purchase Delegate</h3>
        <p style="color: var(--color-text-muted); font-size: 13px; margin-bottom: 12px;">
          Set a custom delegate to handle purchases and restores instead of the default Qonversion flow.
        </p>
        <button class="btn btn-secondary btn-block" id="set-purchase-delegate" ${!noCodesInitialized ? 'disabled' : ''}>
          Set Custom Purchase Delegate
        </button>
      </div>
    </div>

    <div class="section">
      <div class="card">
        <h3 class="card-title">Show Screen</h3>
        <div class="input-group">
          <label class="input-label">Context Key</label>
          <input type="text" class="input" id="nocodes-context-key" placeholder="Enter context key" value="kamo_test" />
        </div>
        <button class="btn btn-primary btn-block" id="show-screen" ${!noCodesInitialized ? 'disabled' : ''}>
          Show No-Code Screen
        </button>
      </div>
    </div>

    <div class="section">
      <div class="card">
        <h3 class="card-title">Presentation Config</h3>
        <div class="input-group">
          <label class="input-label">Presentation Style</label>
          <select class="input" id="presentation-style">
            ${presentationStyles.map(s => `<option value="${s}">${s}</option>`).join('')}
          </select>
        </div>
        <div class="checkbox-group">
          <div class="checkbox-item" id="animated-toggle">
            <input type="checkbox" id="animated-checkbox" checked />
            <label class="checkbox-label" for="animated-checkbox">Animated (iOS only)</label>
          </div>
        </div>
        <button class="btn btn-secondary btn-block" id="set-presentation" ${!noCodesInitialized ? 'disabled' : ''}>
          Set Presentation Config
        </button>
      </div>
    </div>

    <div class="section">
      <div class="card">
        <h3 class="card-title">Locale</h3>
        <div class="input-row">
          <div class="input-group">
            <label class="input-label">Locale Code</label>
            <input type="text" class="input" id="locale-input" placeholder="en, de, fr..." />
          </div>
        </div>
        <div class="button-row">
          <button class="btn btn-secondary" id="set-locale" ${!noCodesInitialized ? 'disabled' : ''}>
            Set Locale
          </button>
          <button class="btn btn-outline" id="reset-locale" ${!noCodesInitialized ? 'disabled' : ''}>
            Reset to Default
          </button>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="card">
        <h3 class="card-title">Theme</h3>
        <p style="color: var(--color-text-muted); font-size: 13px; margin-bottom: 12px;">
          Set the theme mode for No-Code screens. Controls how screens adapt to light/dark themes.
        </p>
        <div class="button-row">
          <button class="btn btn-outline" id="set-theme-auto" ${!noCodesInitialized ? 'disabled' : ''}>
            Auto
          </button>
          <button class="btn btn-outline" id="set-theme-light" ${!noCodesInitialized ? 'disabled' : ''}>
            Light
          </button>
          <button class="btn btn-outline" id="set-theme-dark" ${!noCodesInitialized ? 'disabled' : ''}>
            Dark
          </button>
        </div>
      </div>
    </div>

    <div class="section">
      <button class="btn btn-outline btn-block" id="close-nocodes" ${!noCodesInitialized ? 'disabled' : ''}>
        Close No-Codes Screen
      </button>
    </div>

    <div class="section">
      <div class="card">
        <div class="card-header">
          <span class="card-title">Events Log</span>
          <button class="btn btn-sm btn-outline" id="clear-events">Clear</button>
        </div>
        <div class="events-log" id="events-log">
          ${noCodesEvents.length > 0 
            ? noCodesEvents.map(e => `<div class="event-item">${e}</div>`).join('')
            : '<div class="event-item" style="color: var(--color-text-muted);">No events yet...</div>'
          }
        </div>
      </div>
    </div>
  `;
}

let isShowingScreen = false;

// Update initialization status without full re-render
function updateNoCodesStatus(): void {
  const state = store.getState();
  const { noCodesInitialized } = state;
  
  // Update status badge
  const card = document.querySelector('.section .card') as HTMLElement;
  if (card) {
    card.style.borderColor = noCodesInitialized ? 'var(--color-success)' : 'var(--color-border)';
    
    const badge = card.querySelector('.status-badge');
    if (badge) {
      badge.className = `status-badge ${noCodesInitialized ? 'status-success' : 'status-neutral'}`;
      badge.innerHTML = `<span class="status-dot"></span>${noCodesInitialized ? 'Initialized' : 'Not Initialized'}`;
    }
  }
  
  // Update button states
  const initBtn = document.getElementById('init-nocodes') as HTMLButtonElement;
  if (initBtn) initBtn.disabled = noCodesInitialized;
  
  const showBtn = document.getElementById('show-screen') as HTMLButtonElement;
  if (showBtn) showBtn.disabled = !noCodesInitialized;

  const delegateBtn = document.getElementById('set-purchase-delegate') as HTMLButtonElement;
  if (delegateBtn) delegateBtn.disabled = !noCodesInitialized;
  
  const presentBtn = document.getElementById('set-presentation') as HTMLButtonElement;
  if (presentBtn) presentBtn.disabled = !noCodesInitialized;
  
  const localeBtn = document.getElementById('set-locale') as HTMLButtonElement;
  if (localeBtn) localeBtn.disabled = !noCodesInitialized;
  
  const resetBtn = document.getElementById('reset-locale') as HTMLButtonElement;
  if (resetBtn) resetBtn.disabled = !noCodesInitialized;

  const themeAutoBtn = document.getElementById('set-theme-auto') as HTMLButtonElement;
  if (themeAutoBtn) themeAutoBtn.disabled = !noCodesInitialized;

  const themeLightBtn = document.getElementById('set-theme-light') as HTMLButtonElement;
  if (themeLightBtn) themeLightBtn.disabled = !noCodesInitialized;

  const themeDarkBtn = document.getElementById('set-theme-dark') as HTMLButtonElement;
  if (themeDarkBtn) themeDarkBtn.disabled = !noCodesInitialized;
  
  const closeBtn = document.getElementById('close-nocodes') as HTMLButtonElement;
  if (closeBtn) closeBtn.disabled = !noCodesInitialized;
}

// Update events log without full re-render
function updateEventsLog(events: string[]): void {
  const logEl = document.getElementById('events-log');
  if (!logEl) return;
  
  if (events.length > 0) {
    logEl.innerHTML = events.map(e => `<div class="event-item">${e}</div>`).join('');
  } else {
    logEl.innerHTML = '<div class="event-item" style="color: var(--color-text-muted);">No events yet...</div>';
  }
  // Scroll to bottom
  logEl.scrollTop = logEl.scrollHeight;
}

// Subscribe to store for events updates only
store.subscribe((state) => {
  updateEventsLog(state.noCodesEvents);
});

export function setupNoCodesScreenEvents(): void {
  // Initialize No-Codes
  document.getElementById('init-nocodes')?.addEventListener('click', () => {
    try {
      console.log('🔄 [NoCodes] Initializing...');
      
      const config = new NoCodesConfigBuilder(PROJECT_KEY)
        .setNoCodesListener({
          onScreenShown: (id: string) => {
            console.log('📡 [NoCodes] Screen shown:', id);
            store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: `Screen shown: ${id}` });
          },
          onActionStartedExecuting: (action: NoCodesAction) => {
            console.log('📡 [NoCodes] Action started:', action);
            store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: `Action started: ${action.type}` });
          },
          onActionFailedToExecute: (action: NoCodesAction) => {
            console.log('📡 [NoCodes] Action failed:', action);
            store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: `Action failed: ${action.type}` });
          },
          onActionFinishedExecuting: (action: NoCodesAction) => {
            console.log('📡 [NoCodes] Action finished:', action);
            store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: `Action finished: ${action.type}` });
          },
          onFinished: () => {
            console.log('📡 [NoCodes] Flow finished');
            isShowingScreen = false;
            store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: 'Flow finished' });
          },
          onScreenFailedToLoad: (error: NoCodesError) => {
            console.log('📡 [NoCodes] Screen failed to load:', error);
            store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: `Screen failed: ${error.description || error.code}` });
            NoCodes.getSharedInstance().close();
          },
        })
        .build();

      NoCodes.initialize(config);
      console.log('✅ [NoCodes] Initialized successfully');
      
      store.dispatch({ type: 'SET_NOCODES_INITIALIZED', payload: true });
      store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: 'SDK Initialized' });
      // Update UI without full re-render
      updateNoCodesStatus();
      showToast('No-Codes initialized!', 'success');
    } catch (error: any) {
      console.error('❌ [NoCodes] Initialization failed:', error);
      showToast(error.message || 'Initialization failed', 'error');
    }
  });

  // Set Purchase Delegate
  document.getElementById('set-purchase-delegate')?.addEventListener('click', () => {
    try {
      console.log('🔄 [NoCodes] Setting custom purchase delegate...');
      
      const customPurchaseDelegate: PurchaseDelegate = {
        async purchase(product: Product): Promise<void> {
          console.log('🛒 [PurchaseDelegate] Custom purchase called for:', product.qonversionId);
          store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: `Custom purchase: ${product.qonversionId}` });
          
          // Use Qonversion SDK for purchase
          const result = await Qonversion.getSharedInstance().purchase(product);
          
          if (result.isSuccess) {
            store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: `Purchase completed: ${product.qonversionId}` });
          } else if (result.isCanceled) {
            store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: `Purchase canceled: ${product.qonversionId}` });
            throw new Error('Purchase canceled by user');
          } else if (result.isError) {
            store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: `Purchase failed: ${result.error?.description}` });
            throw new Error(result.error?.description || 'Purchase failed');
          }
        },
        
        async restore(): Promise<void> {
          console.log('🔄 [PurchaseDelegate] Custom restore called');
          store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: 'Custom restore started' });
          
          // Use Qonversion SDK for restore
          await Qonversion.getSharedInstance().restore();
          
          store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: 'Restore completed' });
        }
      };
      
      NoCodes.getSharedInstance().setPurchaseDelegate(customPurchaseDelegate);
      
      store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: 'Custom Purchase Delegate set' });
      showToast('Purchase delegate set!', 'success');
    } catch (error: any) {
      console.error('❌ [NoCodes] Set delegate failed:', error);
      showToast(error.message || 'Failed to set delegate', 'error');
    }
  });

  // Show screen
  document.getElementById('show-screen')?.addEventListener('click', () => {
    if (isShowingScreen) {
      console.log('⏳ [NoCodes] Already showing screen, ignoring...');
      return;
    }

    const contextKey = (document.getElementById('nocodes-context-key') as HTMLInputElement)?.value.trim();
    
    if (!contextKey) {
      showToast('Enter context key', 'error');
      return;
    }

    try {
      isShowingScreen = true;
      console.log('🔄 [NoCodes] Showing screen:', contextKey);
      NoCodes.getSharedInstance().showScreen(contextKey);
      store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: `Showing screen: ${contextKey}` });
      
      // Reset flag after a short delay
      setTimeout(() => {
        isShowingScreen = false;
      }, 1000);
    } catch (error: any) {
      isShowingScreen = false;
      console.error('❌ [NoCodes] Show screen failed:', error);
      showToast(error.message || 'Failed to show screen', 'error');
    }
  });

  // Set presentation config
  document.getElementById('set-presentation')?.addEventListener('click', () => {
    const style = (document.getElementById('presentation-style') as HTMLSelectElement)?.value as ScreenPresentationStyle;
    const animated = (document.getElementById('animated-checkbox') as HTMLInputElement)?.checked ?? true;
    const contextKey = (document.getElementById('nocodes-context-key') as HTMLInputElement)?.value.trim();

    try {
      console.log('🔄 [NoCodes] Setting presentation config:', { style, animated, contextKey });
      const config = new ScreenPresentationConfig(style, animated);
      NoCodes.getSharedInstance().setScreenPresentationConfig(config, contextKey || undefined);
      
      store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: `Config set: ${style}, animated: ${animated}` });
      showToast('Presentation config set!', 'success');
    } catch (error: any) {
      console.error('❌ [NoCodes] Set config failed:', error);
      showToast(error.message || 'Failed to set config', 'error');
    }
  });

  // Set locale
  document.getElementById('set-locale')?.addEventListener('click', () => {
    const locale = (document.getElementById('locale-input') as HTMLInputElement)?.value.trim() || null;

    try {
      console.log('🔄 [NoCodes] Setting locale:', locale);
      NoCodes.getSharedInstance().setLocale(locale);
      
      store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: `Locale set: ${locale || 'default'}` });
      showToast(locale ? `Locale set to: ${locale}` : 'Locale reset', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to set locale', 'error');
    }
  });

  // Reset locale
  document.getElementById('reset-locale')?.addEventListener('click', () => {
    try {
      console.log('🔄 [NoCodes] Resetting locale');
      NoCodes.getSharedInstance().setLocale(null);
      (document.getElementById('locale-input') as HTMLInputElement).value = '';
      
      store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: 'Locale reset to default' });
      showToast('Locale reset to default', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to reset locale', 'error');
    }
  });

  // Set theme - Auto
  document.getElementById('set-theme-auto')?.addEventListener('click', () => {
    try {
      console.log('🔄 [NoCodes] Setting theme: Auto');
      NoCodes.getSharedInstance().setTheme(NoCodesTheme.AUTO);
      
      store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: 'Theme set: Auto' });
      showToast('Theme set to Auto', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to set theme', 'error');
    }
  });

  // Set theme - Light
  document.getElementById('set-theme-light')?.addEventListener('click', () => {
    try {
      console.log('🔄 [NoCodes] Setting theme: Light');
      NoCodes.getSharedInstance().setTheme(NoCodesTheme.LIGHT);
      
      store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: 'Theme set: Light' });
      showToast('Theme set to Light', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to set theme', 'error');
    }
  });

  // Set theme - Dark
  document.getElementById('set-theme-dark')?.addEventListener('click', () => {
    try {
      console.log('🔄 [NoCodes] Setting theme: Dark');
      NoCodes.getSharedInstance().setTheme(NoCodesTheme.DARK);
      
      store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: 'Theme set: Dark' });
      showToast('Theme set to Dark', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to set theme', 'error');
    }
  });

  // Close
  document.getElementById('close-nocodes')?.addEventListener('click', () => {
    try {
      console.log('🔄 [NoCodes] Closing screen');
      NoCodes.getSharedInstance().close();
      
      store.dispatch({ type: 'ADD_NOCODES_EVENT', payload: 'Screen closed' });
      showToast('No-Codes screen closed', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to close', 'error');
    }
  });

  // Clear events
  document.getElementById('clear-events')?.addEventListener('click', () => {
    store.dispatch({ type: 'CLEAR_NOCODES_EVENTS' });
  });
}
