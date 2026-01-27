import type { PurchaseDelegate } from './dto/PurchaseDelegate';
import { ScreenPresentationConfig } from './dto/ScreenPresentationConfig';
import { NoCodesTheme } from './dto/enums';

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

  /**
   * Set the theme mode for No-Code screens.
   * Controls how screens adapt to light/dark themes.
   *
   * You may set the theme both after No-Codes SDK initialization with this method
   * and during initialization via NoCodesConfigBuilder.setTheme().
   *
   * @param theme the desired theme mode. Use AUTO to follow device settings,
   *              LIGHT to force light theme, or DARK to force dark theme.
   */
  setTheme(theme: NoCodesTheme): void;
}
