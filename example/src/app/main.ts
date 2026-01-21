import {
  Qonversion,
  QonversionConfigBuilder,
  LaunchMode,
  Environment,
  EntitlementsCacheLifetime,
} from '@qonversion/capacitor-plugin';
import { store } from './store';
import { showToast, setLoading } from './utils';
import { renderMainScreen } from './screens/MainScreen';
import { renderProductsScreen } from './screens/ProductsScreen';
import { renderEntitlementsScreen } from './screens/EntitlementsScreen';
import { renderOfferingsScreen } from './screens/OfferingsScreen';
import { renderRemoteConfigsScreen } from './screens/RemoteConfigsScreen';
import { renderUserScreen } from './screens/UserScreen';
import { renderNoCodesScreen } from './screens/NoCodesScreen';
import { renderOtherScreen } from './screens/OtherScreen';

const PROJECT_KEY = 'PV77YHL7qnGvsdmpTs7gimsxUvY-Znl2';

// Screen renderers map
const screenRenderers: Record<string, () => string> = {
  main: renderMainScreen,
  products: renderProductsScreen,
  entitlements: renderEntitlementsScreen,
  offerings: renderOfferingsScreen,
  remoteConfigs: renderRemoteConfigsScreen,
  user: renderUserScreen,
  noCodes: renderNoCodesScreen,
  other: renderOtherScreen,
  more: renderMoreScreen,
};

// Screen titles
const screenTitles: Record<string, string> = {
  main: 'Qonversion SDK Demo',
  products: 'Products',
  entitlements: 'Entitlements',
  offerings: 'Offerings',
  remoteConfigs: 'Remote Configs',
  user: 'User',
  noCodes: 'No-Codes',
  other: 'Other',
  more: 'More',
};

function renderMoreScreen(): string {
  return `
    <div class="section">
      <h2 class="section-title">Additional Features</h2>
      <div class="list">
        <div class="list-item" data-navigate="offerings">
          <div class="list-item-content">
            <div class="list-item-title">📋 Offerings</div>
            <div class="list-item-subtitle">View available offerings and products</div>
          </div>
          <span class="list-item-arrow">›</span>
        </div>
        <div class="list-item" data-navigate="remoteConfigs">
          <div class="list-item-content">
            <div class="list-item-title">⚙️ Remote Configs</div>
            <div class="list-item-subtitle">Manage remote configurations</div>
          </div>
          <span class="list-item-arrow">›</span>
        </div>
        <div class="list-item" data-navigate="noCodes">
          <div class="list-item-content">
            <div class="list-item-title">🎨 No-Codes</div>
            <div class="list-item-subtitle">Display no-code screens</div>
          </div>
          <span class="list-item-arrow">›</span>
        </div>
        <div class="list-item" data-navigate="other">
          <div class="list-item-content">
            <div class="list-item-title">🔧 Other</div>
            <div class="list-item-subtitle">Additional SDK features</div>
          </div>
          <span class="list-item-arrow">›</span>
        </div>
      </div>
    </div>
  `;
}

// Track current screen for selective re-rendering
let lastRenderedScreen: string | null = null;

// Initialize the app
async function initApp(): Promise<void> {
  console.log('🚀 Initializing Qonversion SDK Demo App...');
  
  // Subscribe to store changes - only re-render when screen changes
  store.subscribe((state) => {
    // Always update loading state
    setLoading(state.isLoading);
    
    // Only re-render if the screen changed
    if (state.currentScreen !== lastRenderedScreen) {
      renderScreen();
      updateNavigation();
    }
  });

  // Setup navigation
  setupNavigation();

  // Initialize Qonversion SDK
  await initializeQonversion();

  // Initial render
  renderScreen();
}

async function initializeQonversion(): Promise<void> {
  try {
    console.log('🔄 [Qonversion] Starting SDK initialization...');
    store.dispatch({ type: 'SET_QONVERSION_INIT_STATUS', payload: 'initializing' });

    const config = new QonversionConfigBuilder(PROJECT_KEY, LaunchMode.SUBSCRIPTION_MANAGEMENT)
      .setEnvironment(Environment.SANDBOX)
      .setEntitlementsCacheLifetime(EntitlementsCacheLifetime.MONTH)
      .setEntitlementsUpdateListener({
        onEntitlementsUpdated(entitlements) {
          console.log('📡 [Qonversion] Entitlements updated via listener');
          store.dispatch({ type: 'SET_ENTITLEMENTS', payload: entitlements });
          showToast('Entitlements updated!', 'info');
        },
      })
      .build();

    Qonversion.initialize(config);
    console.log('✅ [Qonversion] SDK initialized successfully');
    
    store.dispatch({ type: 'SET_QONVERSION_INIT_STATUS', payload: 'success' });
    store.dispatch({ type: 'SET_QONVERSION_INITIALIZED', payload: true });

    // Load user info
    await loadUserInfo();
  } catch (error: any) {
    console.error('❌ [Qonversion] SDK initialization failed:', error);
    store.dispatch({ type: 'SET_QONVERSION_INIT_STATUS', payload: 'error' });
    showToast('SDK initialization failed', 'error');
  }
}

async function loadUserInfo(): Promise<void> {
  try {
    const userInfo = await Qonversion.getSharedInstance().userInfo();
    store.dispatch({ type: 'SET_USER_INFO', payload: userInfo });
  } catch (error) {
    console.error('Failed to load user info:', error);
  }
}

function setupNavigation(): void {
  // Bottom navigation
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const screen = item.getAttribute('data-screen');
      if (screen) {
        // Reset navigation stack when clicking bottom nav
        store.dispatch({ type: 'NAVIGATE', payload: screen });
      }
    });
  });

  // Back button
  const backBtn = document.getElementById('header-back');
  backBtn?.addEventListener('click', () => {
    store.dispatch({ type: 'GO_BACK' });
  });

  // Event delegation for navigation
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const navigateEl = target.closest('[data-navigate]');
    if (navigateEl) {
      const screen = navigateEl.getAttribute('data-navigate');
      if (screen) {
        store.dispatch({ type: 'NAVIGATE', payload: screen });
      }
    }
  });
}

// Main tab screens - should not show back button
const mainTabScreens = ['main', 'products', 'entitlements', 'user', 'more'];

function updateNavigation(): void {
  const state = store.getState();
  const { currentScreen } = state;

  // Update active nav item
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const screen = item.getAttribute('data-screen');
    item.classList.toggle('active', screen === currentScreen || 
      (screen === 'more' && ['offerings', 'remoteConfigs', 'noCodes', 'other'].includes(currentScreen)));
  });

  // Update header
  const headerTitle = document.getElementById('header-title');
  const headerBack = document.getElementById('header-back');
  
  if (headerTitle) {
    headerTitle.textContent = screenTitles[currentScreen] || 'Qonversion SDK Demo';
  }
  
  if (headerBack) {
    // Show back button only for non-tab screens (internal pages)
    const isTabScreen = mainTabScreens.includes(currentScreen);
    headerBack.style.display = isTabScreen ? 'none' : 'flex';
  }
}

function renderScreen(): void {
  const state = store.getState();
  const { currentScreen } = state;
  
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  const renderer = screenRenderers[currentScreen];
  if (renderer) {
    mainContent.innerHTML = renderer();
    setupScreenEventListeners(currentScreen);
    lastRenderedScreen = currentScreen;
  }
}

function setupScreenEventListeners(screen: string): void {
  // Import and setup screen-specific event listeners
  switch (screen) {
    case 'main':
      import('./screens/MainScreen').then(m => m.setupMainScreenEvents?.());
      break;
    case 'products':
      import('./screens/ProductsScreen').then(m => m.setupProductsScreenEvents?.());
      break;
    case 'entitlements':
      import('./screens/EntitlementsScreen').then(m => m.setupEntitlementsScreenEvents?.());
      break;
    case 'offerings':
      import('./screens/OfferingsScreen').then(m => m.setupOfferingsScreenEvents?.());
      break;
    case 'remoteConfigs':
      import('./screens/RemoteConfigsScreen').then(m => m.setupRemoteConfigsScreenEvents?.());
      break;
    case 'user':
      import('./screens/UserScreen').then(m => m.setupUserScreenEvents?.());
      break;
    case 'noCodes':
      import('./screens/NoCodesScreen').then(m => m.setupNoCodesScreenEvents?.());
      break;
    case 'other':
      import('./screens/OtherScreen').then(m => m.setupOtherScreenEvents?.());
      break;
  }
}

// Export for global access
(window as any).store = store;
(window as any).showToast = showToast;
(window as any).Qonversion = Qonversion;

// Start the app
document.addEventListener('DOMContentLoaded', initApp);
