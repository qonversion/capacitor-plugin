// Toast utility
export function showToast(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideUp 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Loading overlay
export function setLoading(isLoading: boolean): void {
  const overlay = document.getElementById('loading');
  if (overlay) {
    overlay.style.display = isLoading ? 'flex' : 'none';
  }
}

// Copy to clipboard
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
  } catch {
    showToast('Failed to copy', 'error');
  }
}

// Format date
export function formatDate(date: Date | undefined | null): string {
  if (!date) return 'N/A';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Format price
export function formatPrice(price: number | undefined | null, currency: string | undefined | null): string {
  if (price === undefined || price === null) return 'N/A';
  if (!currency) return price.toFixed(2);
  
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  } catch {
    return `${currency} ${price.toFixed(2)}`;
  }
}

// Escape HTML
export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Show Purchase Result Dialog
export function showPurchaseResultDialog(result: any): void {
  console.log('📋 [PurchaseResult] Full result:', JSON.stringify(result, (_, v) => v instanceof Map ? Object.fromEntries(v) : v, 2));
  console.log('📋 [PurchaseResult] status:', result.status, 'isSuccess:', result.isSuccess, 'error:', result.error);
  
  const tx = result.storeTransaction;
  
  // Determine status info
  let statusIcon = '❓';
  let statusColor = 'var(--color-text-muted)';
  if (result.isSuccess) {
    statusIcon = '✅';
    statusColor = 'var(--color-success)';
  } else if (result.isCanceled) {
    statusIcon = '🚫';
    statusColor = 'var(--color-warning, #f59e0b)';
  } else if (result.isPending) {
    statusIcon = '⏳';
    statusColor = 'var(--color-info, #3b82f6)';
  } else if (result.isError) {
    statusIcon = '❌';
    statusColor = 'var(--color-error)';
  }

  const buildRow = (label: string, value: string | null | undefined): string => {
    const displayValue = value || 'N/A';
    return `
      <div style="display: flex; padding: 4px 0; border-bottom: 1px solid var(--color-border);">
        <span style="width: 140px; font-weight: 500; color: var(--color-text-muted);">${escapeHtml(label)}:</span>
        <span style="flex: 1; font-family: monospace; word-break: break-all;">${escapeHtml(displayValue)}</span>
      </div>
    `;
  };

  const truncate = (str: string | null | undefined, len: number): string => {
    if (!str) return 'N/A';
    return str.length > len ? str.substring(0, len) + '...' : str;
  };

  let entitlementsHtml = '';
  if (result.entitlements && result.entitlements.size > 0) {
    const items = Array.from(result.entitlements.values()).map((e: any) => 
      `<div style="padding: 2px 0;">• ${escapeHtml(e.id)} (active: ${e.isActive})</div>`
    ).join('');
    entitlementsHtml = `
      <div style="margin-top: 12px; padding-top: 12px; border-top: 2px solid var(--color-border);">
        <div style="font-weight: 600; margin-bottom: 8px;">Entitlements (${result.entitlements.size}):</div>
        ${items}
      </div>
    `;
  }

  let errorHtml = '';
  // Only show error section if there's actually an error with meaningful data
  if (result.error && (result.error.code !== undefined || result.error.description)) {
    const errorCode = result.error.code !== undefined ? String(result.error.code) : 'N/A';
    errorHtml = `
      <div style="margin-top: 12px; padding-top: 12px; border-top: 2px solid var(--color-border);">
        <div style="font-weight: 600; margin-bottom: 8px; color: var(--color-error);">Error:</div>
        ${buildRow('Code', errorCode)}
        ${buildRow('Description', result.error.description)}
        ${result.error.additionalMessage ? buildRow('Additional', result.error.additionalMessage) : ''}
      </div>
    `;
  }

  let transactionHtml = '';
  if (tx) {
    transactionHtml = `
      <div style="margin-top: 12px; padding-top: 12px; border-top: 2px solid var(--color-border);">
        <div style="font-weight: 600; margin-bottom: 8px;">Store Transaction:</div>
        ${buildRow('Transaction ID', tx.transactionId)}
        ${buildRow('Original TX ID', tx.originalTransactionId)}
        ${buildRow('Product ID', tx.productId)}
        ${buildRow('Quantity', tx.quantity?.toString())}
        ${buildRow('TX Date', tx.transactionDate ? formatDate(tx.transactionDate) : null)}
        ${buildRow('Promo Offer ID', tx.promoOfferId)}
        ${buildRow('Purchase Token', truncate(tx.purchaseToken, 30))}
      </div>
    `;
  }

  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 500px; max-height: 80vh; overflow-y: auto;">
      <div class="modal-header" style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
        <span style="font-size: 24px;">${statusIcon}</span>
        <h2 style="margin: 0; color: ${statusColor};">Purchase Result</h2>
      </div>
      <div class="modal-body">
        ${buildRow('Status', result.status)}
        ${buildRow('Source', result.source)}
        ${buildRow('Is Fallback', result.isFallbackGenerated?.toString())}
        ${errorHtml}
        ${transactionHtml}
        ${entitlementsHtml}
      </div>
      <div class="modal-footer" style="margin-top: 20px; text-align: right;">
        <button class="btn btn-primary modal-close-btn">OK</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Close on button click or overlay click
  modal.querySelector('.modal-close-btn')?.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

// Create element helper
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  content?: string
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (content) el.textContent = content;
  return el;
}
