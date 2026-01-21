import { registerPlugin } from '@capacitor/core';
import type { QProduct, QNoCodeAction, QNoCodesError, QNoCodeScreenInfo } from './internal/Mapper';

export type NoCodeEvent = {
  name: string;
  payload: QNoCodeAction | QNoCodesError | QNoCodeScreenInfo | undefined;
};

export interface NoCodesNativePlugin {
  initialize(params: {
    projectKey: string;
    source: string;
    version: string;
    proxyUrl?: string;
    locale?: string;
  }): void;

  setScreenPresentationConfig(params: {
    configData: Record<string, unknown>;
    contextKey?: string;
  }): Promise<void>;

  showScreen(params: { contextKey: string }): Promise<void>;

  close(): Promise<void>;

  setPurchaseDelegate(): void;

  setLocale(params: { locale: string | null }): void;

  delegatedPurchaseCompleted(): void;

  delegatedPurchaseFailed(params: { errorMessage: string }): void;

  delegatedRestoreCompleted(): void;

  delegatedRestoreFailed(params: { errorMessage: string }): void;

  addListener(
    event: 'noCodesEvent',
    listener: (payload: NoCodeEvent) => void
  ): Promise<{ remove: () => Promise<void> }>;

  addListener(
    event: 'noCodesPurchase',
    listener: (payload: QProduct) => void
  ): Promise<{ remove: () => Promise<void> }>;

  addListener(
    event: 'noCodesRestore',
    listener: () => void
  ): Promise<{ remove: () => Promise<void> }>;
}

export const NoCodesPlugin = registerPlugin<NoCodesNativePlugin>('NoCodes');
