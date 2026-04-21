import { useEffect, useRef, useCallback } from 'react';

interface ImagePreloadOptions {
  quality?: number;
  blur?: boolean;
}

/**
 * Hook for optimized image preloading and caching
 * Helps ensure smooth image rendering across the application
 */
export function useImageOptimization(
  imagePaths: string[],
  options: ImagePreloadOptions = {}
) {
  const preloadedImages = useRef<Set<string>>(new Set());

  const preloadImage = useCallback(
    (src: string) => {
      if (preloadedImages.current.has(src)) {
        return;
      }

      const img = new Image();
      img.src = src;
      img.onerror = () => {
        console.warn(`Failed to preload image: ${src}`);
      };
      img.onload = () => {
        preloadedImages.current.add(src);
      };
    },
    []
  );

  useEffect(() => {
    imagePaths.forEach(preloadImage);
  }, [imagePaths, preloadImage]);

  return {
    isImagePreloaded: (src: string) => preloadedImages.current.has(src),
  };
}

/**
 * Utility function to get responsive image sizes for different viewports
 */
export function getResponsiveImageSizes() {
  if (typeof window === 'undefined') {
    return '100vw';
  }

  const width = window?.innerWidth ?? 1024;

  if (width < 768) return '100vw';
  if (width < 1024) return '90vw';
  if (width < 1280) return '85vw';
  return '1280px';
}

/**
 * Utility to batch preload multiple images
 */
export async function batchPreloadImages(urls: string[]): Promise<void> {
  const promises = urls.map(
    (url) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = url;
      })
  );

  await Promise.all(promises);
}

/**
 * Get blur placeholder for an image
 */
export function generateBlurPlaceholder(width: number, height: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect fill="%23f0f0f0" width="${width}" height="${height}"/><filter id="blur"><feGaussianBlur stdDeviation="20"/></filter><rect fill="%23e8e8e8" width="${width}" height="${height}" filter="url(%23blur)"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}
