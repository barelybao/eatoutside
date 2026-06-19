// Shared notification state — singleton across all callers (so the toast
// component and any share button read/write the same state).
const notification = reactive({ message: '', visible: false });
let hideTimer: ReturnType<typeof setTimeout> | null = null;

export function useShare() {
  const { t } = useI18n();

  // Show a toast message that auto-hides after 3 seconds
  const notify = (message: string) => {
    notification.message = message;
    notification.visible = true;
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      notification.visible = false;
    }, 3000);
  };

  // Copy the current page URL to the clipboard
  const copyPageUrl = async (): Promise<boolean> => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return false;
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      return true;
    } catch (error) {
      console.error('Clipboard error:', error);
      return false;
    }
  };

  // Main share action — copies the page URL and shows a confirmation toast
  const shareRecipe = async (_slug?: string, _foodName?: string, _locale?: string) => {
    const success = await copyPageUrl();
    if (success) {
      notify(t('ui.share.copied'));
    }
    return { success, method: 'clipboard' };
  };

  return {
    shareRecipe,
    notification
  };
}
