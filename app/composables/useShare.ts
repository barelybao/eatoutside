export function useShare() {
  const { t } = useI18n();

  // Check if Web Share API is available
  const canShare = computed(() => {
    if (process.client) {
      return navigator.share !== undefined;
    }
    return false;
  });

  // Get share URL with locale awareness
  const getShareUrl = (slug: string, locale: string): string => {
    const baseUrl = typeof window !== 'undefined'
      ? window.location.origin
      : 'https://eatoutside.sg';
    const localePrefix = locale === 'en' ? '' : `/${locale}`;
    return `${baseUrl}${localePrefix}/food/${slug}`;
  };

  // Get share text with food name
  const getShareText = (foodName: string): string => {
    return t('ui.share.text', { name: foodName });
  };

  // Web Share API for mobile devices
  const shareViaWebAPI = async (slug: string, foodName: string, locale: string) => {
    if (!canShare.value) {
      return { success: false, method: 'web-api', error: 'Web Share API not available' };
    }

    try {
      const shareData = {
        title: foodName,
        text: getShareText(foodName),
        url: getShareUrl(slug, locale)
      };

      await navigator.share(shareData);
      return { success: true, method: 'web-api' };
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return { success: false, method: 'web-api', error: 'User cancelled' };
      }
      console.error('Web Share API error:', error);
      return { success: false, method: 'web-api', error: String(error) };
    }
  };

  // Clipboard copy as fallback
  const copyToClipboard = async (slug: string, foodName: string, locale: string) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return { success: false, method: 'clipboard', error: 'Clipboard API not available' };
    }

    try {
      const text = `${getShareText(foodName)}\n${getShareUrl(slug, locale)}`;
      await navigator.clipboard.writeText(text);
      return { success: true, method: 'clipboard' };
    } catch (error) {
      console.error('Clipboard error:', error);
      return { success: false, method: 'clipboard', error: String(error) };
    }
  };

  // Main share function - tries Web Share API first, falls back to clipboard copy
  const shareRecipe = async (slug: string, foodName: string, locale: string) => {
    // Try Web Share API first (best UX on mobile)
    console.log('canShare.value:', canShare.value, 'navigator.share:', typeof navigator !== 'undefined' ? navigator.share : 'undefined');

    if (canShare.value) {
      const result = await shareViaWebAPI(slug, foodName, locale);
      console.log('Web Share API result:', result);
      if (result.success) {
        return result;
      }
    }

    // Fallback to clipboard copy (better UX on desktop)
    console.log('Falling back to clipboard copy');
    return await copyToClipboard(slug, foodName, locale);
  };

  return {
    shareRecipe
  };
}
