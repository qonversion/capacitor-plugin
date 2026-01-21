import type { Product, Offerings, Entitlement, RemoteConfigList, User } from '@qonversion/capacitor-plugin';

export interface AppState {
  currentScreen: string;
  navigationStack: string[];
  isLoading: boolean;
  qonversionInitialized: boolean;
  qonversionInitStatus: 'not_initialized' | 'initializing' | 'success' | 'error';
  noCodesInitialized: boolean;
  
  // Data
  userInfo: User | null;
  products: Map<string, Product> | null;
  offerings: Offerings | null;
  entitlements: Map<string, Entitlement> | null;
  remoteConfigs: RemoteConfigList | null;
  
  // NoCodes
  noCodesEvents: string[];
  
  // Selected items for detail views
  selectedProduct: Product | null;
  selectedEntitlement: Entitlement | null;
}

export type AppAction =
  | { type: 'NAVIGATE'; payload: string }
  | { type: 'GO_BACK' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_QONVERSION_INIT_STATUS'; payload: AppState['qonversionInitStatus'] }
  | { type: 'SET_QONVERSION_INITIALIZED'; payload: boolean }
  | { type: 'SET_NOCODES_INITIALIZED'; payload: boolean }
  | { type: 'SET_USER_INFO'; payload: User | null }
  | { type: 'SET_PRODUCTS'; payload: Map<string, Product> }
  | { type: 'SET_OFFERINGS'; payload: Offerings }
  | { type: 'SET_ENTITLEMENTS'; payload: Map<string, Entitlement> }
  | { type: 'SET_REMOTE_CONFIGS'; payload: RemoteConfigList }
  | { type: 'ADD_NOCODES_EVENT'; payload: string }
  | { type: 'CLEAR_NOCODES_EVENTS' }
  | { type: 'SET_SELECTED_PRODUCT'; payload: Product | null }
  | { type: 'SET_SELECTED_ENTITLEMENT'; payload: Entitlement | null };

const initialState: AppState = {
  currentScreen: 'main',
  navigationStack: ['main'],
  isLoading: false,
  qonversionInitialized: false,
  qonversionInitStatus: 'not_initialized',
  noCodesInitialized: false,
  userInfo: null,
  products: null,
  offerings: null,
  entitlements: null,
  remoteConfigs: null,
  noCodesEvents: [],
  selectedProduct: null,
  selectedEntitlement: null,
};

class Store {
  private state: AppState = { ...initialState };
  private listeners: Set<(state: AppState) => void> = new Set();

  getState(): AppState {
    return this.state;
  }

  dispatch(action: AppAction): void {
    this.state = this.reduce(this.state, action);
    this.notify();
  }

  subscribe(listener: (state: AppState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach(listener => listener(this.state));
  }

  private reduce(state: AppState, action: AppAction): AppState {
    switch (action.type) {
      case 'NAVIGATE':
        return {
          ...state,
          currentScreen: action.payload,
          navigationStack: [...state.navigationStack, action.payload],
        };
      
      case 'GO_BACK':
        if (state.navigationStack.length <= 1) return state;
        const newStack = state.navigationStack.slice(0, -1);
        return {
          ...state,
          currentScreen: newStack[newStack.length - 1],
          navigationStack: newStack,
        };
      
      case 'SET_LOADING':
        return { ...state, isLoading: action.payload };
      
      case 'SET_QONVERSION_INIT_STATUS':
        return { ...state, qonversionInitStatus: action.payload };
      
      case 'SET_QONVERSION_INITIALIZED':
        return { ...state, qonversionInitialized: action.payload };
      
      case 'SET_NOCODES_INITIALIZED':
        return { ...state, noCodesInitialized: action.payload };
      
      case 'SET_USER_INFO':
        return { ...state, userInfo: action.payload };
      
      case 'SET_PRODUCTS':
        return { ...state, products: action.payload };
      
      case 'SET_OFFERINGS':
        return { ...state, offerings: action.payload };
      
      case 'SET_ENTITLEMENTS':
        return { ...state, entitlements: action.payload };
      
      case 'SET_REMOTE_CONFIGS':
        return { ...state, remoteConfigs: action.payload };
      
      case 'ADD_NOCODES_EVENT':
        return {
          ...state,
          noCodesEvents: [...state.noCodesEvents, `${new Date().toLocaleTimeString()} - ${action.payload}`],
        };
      
      case 'CLEAR_NOCODES_EVENTS':
        return { ...state, noCodesEvents: [] };
      
      case 'SET_SELECTED_PRODUCT':
        return { ...state, selectedProduct: action.payload };
      
      case 'SET_SELECTED_ENTITLEMENT':
        return { ...state, selectedEntitlement: action.payload };
      
      default:
        return state;
    }
  }
}

export const store = new Store();
