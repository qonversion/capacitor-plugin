import type { NoCodesApi } from '../NoCodesApi';
import { NoCodesConfig } from '../NoCodesConfig';
import type { QNoCodeAction, QNoCodesError, QNoCodeScreenInfo, QProduct } from './Mapper';
import Mapper from './Mapper';
import type { NoCodesListener } from '../dto/NoCodesListener';
import type { PurchaseDelegate } from '../dto/PurchaseDelegate';
import { ScreenPresentationConfig } from '../dto/ScreenPresentationConfig';
import { NoCodesError } from '../dto/NoCodesError';
import { NoCodesErrorCode, NoCodesTheme } from '../dto/enums';
import type { NoCodeEvent } from '../NoCodesNativePlugin';
import { NoCodesPlugin } from '../NoCodesNativePlugin';
import { sdkSource, sdkVersion } from './QonversionInternal';

const EVENT_SCREEN_SHOWN = 'nocodes_screen_shown';
const EVENT_FINISHED = 'nocodes_finished';
const EVENT_ACTION_STARTED = 'nocodes_action_started';
const EVENT_ACTION_FAILED = 'nocodes_action_failed';
const EVENT_ACTION_FINISHED = 'nocodes_action_finished';
const EVENT_SCREEN_FAILED_TO_LOAD = 'nocodes_screen_failed_to_load';

export class NoCodesInternal implements NoCodesApi {
  private noCodesListener: NoCodesListener | null = null;
  private purchaseDelegate: PurchaseDelegate | null = null;

  constructor(config: NoCodesConfig) {
    NoCodesPlugin.initialize({
      projectKey: config.projectKey,
      source: sdkSource,
      version: sdkVersion,
      proxyUrl: config.proxyUrl,
      locale: config.locale,
      theme: config.theme,
    });

    if (config.noCodesListener) {
      this.setNoCodesListener(config.noCodesListener);
    }

    if (config.purchaseDelegate) {
      this.setPurchaseDelegate(config.purchaseDelegate);
    }
  }

  async setScreenPresentationConfig(config: ScreenPresentationConfig, contextKey?: string) {
    const data = Mapper.convertScreenPresentationConfig(config);
    await NoCodesPlugin.setScreenPresentationConfig({ configData: data, contextKey });
  }

  async showScreen(contextKey: string) {
    await NoCodesPlugin.showScreen({ contextKey });
  }

  async close() {
    await NoCodesPlugin.close();
  }

  setLocale(locale: string | null) {
    NoCodesPlugin.setLocale({ locale });
  }

  setTheme(theme: NoCodesTheme) {
    NoCodesPlugin.setTheme({ theme });
  }

  private noCodeEventHandler = (event: NoCodeEvent) => {
    switch (event.name) {
      case EVENT_SCREEN_SHOWN:
        const screenId = (event.payload as QNoCodeScreenInfo)?.screenId ?? '';
        this.noCodesListener?.onScreenShown(screenId);
        break;
      case EVENT_ACTION_STARTED:
        const actionStarted = Mapper.convertAction(event.payload as QNoCodeAction);
        this.noCodesListener?.onActionStartedExecuting(actionStarted);
        break;
      case EVENT_ACTION_FAILED:
        const actionFailed = Mapper.convertAction(event.payload as QNoCodeAction);
        this.noCodesListener?.onActionFailedToExecute(actionFailed);
        break;
      case EVENT_ACTION_FINISHED:
        const actionFinished = Mapper.convertAction(event.payload as QNoCodeAction);
        this.noCodesListener?.onActionFinishedExecuting(actionFinished);
        break;
      case EVENT_FINISHED:
        this.noCodesListener?.onFinished();
        break;
      case EVENT_SCREEN_FAILED_TO_LOAD:
        const error = Mapper.convertNoCodesError(event.payload as QNoCodesError | undefined);
        const defaultError = new NoCodesError(
          NoCodesErrorCode.UNKNOWN,
          'Failed to load No-Code screen',
          'Native error parsing failed.'
        );
        this.noCodesListener?.onScreenFailedToLoad(error ?? defaultError);
        break;
      default:
        console.warn(`No-Codes SDK: Unknown event: ${event.name}`);
        break;
    }
  };

  private customPurchaseHandler = async (productData: QProduct) => {
    if (!this.purchaseDelegate) {
      throw new Error('PurchaseDelegate is not set but custom purchase handling initiated');
    }
    const product = Mapper.convertProduct(productData);
    this.purchaseDelegate
      .purchase(product)
      .then(() => {
        NoCodesPlugin.delegatedPurchaseCompleted();
      })
      .catch((error: Error) => {
        NoCodesPlugin.delegatedPurchaseFailed({ errorMessage: error.message });
      });
  };

  private customRestoreHandler = async () => {
    if (!this.purchaseDelegate) {
      throw new Error('PurchaseDelegate is not set but custom restore handling initiated');
    }
    this.purchaseDelegate
      .restore()
      .then(() => {
        NoCodesPlugin.delegatedRestoreCompleted();
      })
      .catch((error: Error) => {
        NoCodesPlugin.delegatedRestoreFailed({ errorMessage: error.message });
      });
  };

  private setNoCodesListener(listener: NoCodesListener) {
    if (this.noCodesListener == null) {
      NoCodesPlugin.addListener('noCodesEvent', this.noCodeEventHandler);
    }
    this.noCodesListener = listener;
  }

  setPurchaseDelegate(delegate: PurchaseDelegate) {
    this.purchaseDelegate = delegate;
    NoCodesPlugin.addListener('noCodesPurchase', this.customPurchaseHandler);
    NoCodesPlugin.addListener('noCodesRestore', this.customRestoreHandler);
    NoCodesPlugin.setPurchaseDelegate();
  }
}
