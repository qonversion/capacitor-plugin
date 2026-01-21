import type { PurchaseDelegate } from './dto/PurchaseDelegate';
import { ScreenPresentationConfig } from './dto/ScreenPresentationConfig';

export interface NoCodesApi {
  /**
   * Set a delegate for custom purchase and restore handling.
   * When this delegate is provided, it replaces the default Qonversion SDK purchase flow.
   * Can be called at any time after initialization.
   *
   * @param delegate delegate to handle purchase and restore operations.
   */
  setPurchaseDelegate(delegate: PurchaseDelegate): void;
  /**
   * Set the configuration of screen representation.
   * @param config a configuration to apply.
   * @param contextKey the context key of the screen, to which a config should be applied.
   *                   If not provided, the config is used for all the screens.
   */
  setScreenPresentationConfig(config: ScreenPresentationConfig, contextKey?: string): void;

  /**
   * Show the screen using its context key.
   * @param contextKey the context key of the screen which must be shown
   */
  showScreen(contextKey: string): void;

  /**
   * Close the current opened No-Code screen.
   */
  close(): void;

  /**
   * Set the locale for No-Code screens.
   * Use this to override the device locale for the No-Codes SDK.
   * Pass null to reset to the device default locale.
   *
   * @param locale the locale to use (e.g. "en", "de", "fr"), or null to reset to device default.
   */
  setLocale(locale: string | null): void;
}
