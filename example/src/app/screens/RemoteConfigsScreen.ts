import { Qonversion, RemoteConfigList } from '@qonversion/capacitor-plugin';
import { store } from '../store';
import { showToast } from '../utils';

export function renderRemoteConfigsScreen(): string {
  const state = store.getState();
  const { remoteConfigs } = state;

  const renderConfig = (config: any, index: number): string => {
    return `
      <div class="card">
        <div class="card-header">
          <span class="card-title">Config #${index + 1}</span>
          <span class="status-badge status-neutral">${config.source?.type || 'unknown'}</span>
        </div>
        <div class="details-grid">
          <div class="detail-item">
            <div class="detail-label">Context Key</div>
            <div class="detail-value">${config.source?.contextKey || 'empty'}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Source</div>
            <div class="detail-value">${config.source?.name || 'N/A'}</div>
          </div>
        </div>
        ${config.payload ? `
          <div class="input-group" style="margin-top: var(--spacing-md);">
            <label class="input-label">Payload</label>
            <div class="json-view">${JSON.stringify(config.payload, null, 2)}</div>
          </div>
        ` : ''}
      </div>
    `;
  };

  return `
    <div class="section">
      <div class="card">
        <h3 class="card-title">Load Remote Config</h3>
        <div class="input-group">
          <label class="input-label">Context Key (optional)</label>
          <input type="text" class="input" id="single-context-key" placeholder="Enter context key" />
        </div>
        <button class="btn btn-primary btn-block" id="load-single-config">
          Get Remote Config
        </button>
      </div>
    </div>

    <div class="section">
      <div class="card">
        <h3 class="card-title">Load Config List</h3>
        <div class="input-group">
          <label class="input-label">Context Keys (comma-separated)</label>
          <input type="text" class="input" id="context-keys" placeholder="key1, key2, key3" />
        </div>
        <button class="btn btn-secondary btn-block" id="load-config-list">
          Get Remote Config List
        </button>
      </div>
    </div>

    <div class="section">
      <div class="card">
        <h3 class="card-title">Experiments</h3>
        <div class="input-row">
          <div class="input-group">
            <label class="input-label">Experiment ID</label>
            <input type="text" class="input" id="experiment-id" placeholder="Experiment ID" />
          </div>
          <div class="input-group">
            <label class="input-label">Group ID</label>
            <input type="text" class="input" id="group-id" placeholder="Group ID" />
          </div>
        </div>
        <div class="button-row">
          <button class="btn btn-secondary" id="attach-experiment">Attach</button>
          <button class="btn btn-outline" id="detach-experiment">Detach</button>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="card">
        <h3 class="card-title">Remote Configuration</h3>
        <div class="input-group">
          <label class="input-label">Configuration ID</label>
          <input type="text" class="input" id="config-id" placeholder="Configuration ID" />
        </div>
        <div class="button-row">
          <button class="btn btn-secondary" id="attach-config">Attach</button>
          <button class="btn btn-outline" id="detach-config">Detach</button>
        </div>
      </div>
    </div>

    <div class="section" id="configs-section">
      ${remoteConfigs ? `
        <h2 class="section-title">Loaded Configs (${remoteConfigs.remoteConfigs.length})</h2>
        ${remoteConfigs.remoteConfigs.map(renderConfig).join('')}
      ` : ''}
    </div>
  `;
}

export function setupRemoteConfigsScreenEvents(): void {
  // Load single config
  document.getElementById('load-single-config')?.addEventListener('click', async () => {
    const input = document.getElementById('single-context-key') as HTMLInputElement;
    const contextKey = input?.value.trim() || undefined;

    try {
      store.dispatch({ type: 'SET_LOADING', payload: true });
      console.log('🔄 [Qonversion] Loading remote config:', contextKey || 'default');
      
      const config = await Qonversion.getSharedInstance().remoteConfig(contextKey);
      console.log('✅ [Qonversion] Remote config loaded:', config);
      
      const configList = new RemoteConfigList([config]);
      store.dispatch({ type: 'SET_REMOTE_CONFIGS', payload: configList });
      showToast('Remote config loaded!', 'success');
    } catch (error: any) {
      console.error('❌ [Qonversion] Failed to load remote config:', error);
      showToast(error.message || 'Failed to load config', 'error');
    } finally {
      store.dispatch({ type: 'SET_LOADING', payload: false });
    }
  });

  // Load config list
  document.getElementById('load-config-list')?.addEventListener('click', async () => {
    const input = document.getElementById('context-keys') as HTMLInputElement;
    const keys = input?.value.split(',').map(k => k.trim()).filter(Boolean);

    try {
      store.dispatch({ type: 'SET_LOADING', payload: true });
      
      let configList: RemoteConfigList;
      if (keys?.length) {
        console.log('🔄 [Qonversion] Loading remote configs for keys:', keys);
        configList = await Qonversion.getSharedInstance().remoteConfigListForContextKeys(keys, true);
      } else {
        console.log('🔄 [Qonversion] Loading all remote configs');
        configList = await Qonversion.getSharedInstance().remoteConfigList();
      }
      
      console.log('✅ [Qonversion] Remote configs loaded:', configList);
      store.dispatch({ type: 'SET_REMOTE_CONFIGS', payload: configList });
      showToast(`Loaded ${configList.remoteConfigs.length} configs`, 'success');
    } catch (error: any) {
      console.error('❌ [Qonversion] Failed to load remote configs:', error);
      showToast(error.message || 'Failed to load configs', 'error');
    } finally {
      store.dispatch({ type: 'SET_LOADING', payload: false });
    }
  });

  // Attach to experiment
  document.getElementById('attach-experiment')?.addEventListener('click', async () => {
    const expId = (document.getElementById('experiment-id') as HTMLInputElement)?.value.trim();
    const groupId = (document.getElementById('group-id') as HTMLInputElement)?.value.trim();

    if (!expId || !groupId) {
      showToast('Enter experiment and group IDs', 'error');
      return;
    }

    try {
      console.log('🔄 [Qonversion] Attaching to experiment:', expId, groupId);
      await Qonversion.getSharedInstance().attachUserToExperiment(expId, groupId);
      showToast('Attached to experiment!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to attach', 'error');
    }
  });

  // Detach from experiment
  document.getElementById('detach-experiment')?.addEventListener('click', async () => {
    const expId = (document.getElementById('experiment-id') as HTMLInputElement)?.value.trim();

    if (!expId) {
      showToast('Enter experiment ID', 'error');
      return;
    }

    try {
      console.log('🔄 [Qonversion] Detaching from experiment:', expId);
      await Qonversion.getSharedInstance().detachUserFromExperiment(expId);
      showToast('Detached from experiment!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to detach', 'error');
    }
  });

  // Attach to config
  document.getElementById('attach-config')?.addEventListener('click', async () => {
    const configId = (document.getElementById('config-id') as HTMLInputElement)?.value.trim();

    if (!configId) {
      showToast('Enter configuration ID', 'error');
      return;
    }

    try {
      console.log('🔄 [Qonversion] Attaching to configuration:', configId);
      await Qonversion.getSharedInstance().attachUserToRemoteConfiguration(configId);
      showToast('Attached to configuration!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to attach', 'error');
    }
  });

  // Detach from config
  document.getElementById('detach-config')?.addEventListener('click', async () => {
    const configId = (document.getElementById('config-id') as HTMLInputElement)?.value.trim();

    if (!configId) {
      showToast('Enter configuration ID', 'error');
      return;
    }

    try {
      console.log('🔄 [Qonversion] Detaching from configuration:', configId);
      await Qonversion.getSharedInstance().detachUserFromRemoteConfiguration(configId);
      showToast('Detached from configuration!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to detach', 'error');
    }
  });
}
