import { test, expect } from '@playwright/test';

test.describe('Real Browser Performance & Web Vitals Measurement', () => {
  test('measures LCP, CLS, and transferred resource sizes on Homepage', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });

    // Collect Navigation and Performance Timing
    const metrics = await page.evaluate(async () => {
      // 1. Navigation Timing
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

      // 2. Cumulative Layout Shift (CLS)
      let cls = 0;
      interface LayoutShiftEntry extends PerformanceEntry {
        hadRecentInput?: boolean;
        value?: number;
      }
      const layoutShiftEntries = performance.getEntriesByType('layout-shift') as unknown as LayoutShiftEntry[];
      for (const entry of layoutShiftEntries) {
        if (!entry.hadRecentInput && typeof entry.value === 'number') {
          cls += entry.value;
        }
      }

      // 3. Largest Contentful Paint (LCP)
      let lcp = 0;
      interface LCPEntry extends PerformanceEntry {
        startTime: number;
      }
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint') as unknown as LCPEntry[];
      if (lcpEntries.length > 0) {
        lcp = lcpEntries[lcpEntries.length - 1].startTime;
      }

      // 4. Resource metrics
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      let jsBytes = 0;
      let cssBytes = 0;
      let imgBytes = 0;

      for (const r of resources) {
        if (r.initiatorType === 'script' || r.name.endsWith('.js')) {
          jsBytes += r.transferSize || r.encodedBodySize || 0;
        } else if (r.initiatorType === 'css' || r.name.endsWith('.css')) {
          cssBytes += r.transferSize || r.encodedBodySize || 0;
        } else if (r.initiatorType === 'img') {
          imgBytes += r.transferSize || r.encodedBodySize || 0;
        }
      }

      return {
        domContentLoaded: nav ? nav.domContentLoadedEventEnd - nav.startTime : 0,
        loadTime: nav ? nav.loadEventEnd - nav.startTime : 0,
        cls,
        lcp: lcp || (nav ? nav.domContentLoadedEventEnd : 0),
        jsBytes,
        cssBytes,
        imgBytes,
      };
    });

    console.log('--- MEASURED PERFORMANCE METRICS ---');
    console.log(`DOM Content Loaded: ${metrics.domContentLoaded.toFixed(1)} ms`);
    console.log(`Page Load Time: ${metrics.loadTime.toFixed(1)} ms`);
    console.log(`Largest Contentful Paint (LCP): ${metrics.lcp.toFixed(1)} ms`);
    console.log(`Cumulative Layout Shift (CLS): ${metrics.cls.toFixed(4)}`);
    console.log(`Total Transferred JS: ${(metrics.jsBytes / 1024).toFixed(1)} kB`);
    console.log(`Total Transferred CSS: ${(metrics.cssBytes / 1024).toFixed(1)} kB`);

    // Expectations for healthy performance
    expect(metrics.cls).toBeLessThan(0.1); // Good CLS < 0.1
  });
});
