import { test, expect } from '@playwright/test';

test.describe('看板首页 - 筛选联动刷新', () => {
  test('修改品牌筛选后柱状图车型数量与明细表行数一致，且筛选前后数据发生变化', async ({ page }) => {
    await test.step('1. 登录系统', async () => {
      await page.goto('/login');
      await page.fill('input[name="username"]', 'admin');
      await page.fill('input[name="password"]', 'admin123');
      await page.click('button[type="submit"]');
      await page.waitForURL('/', { timeout: 15000 });
      await expect(page.locator('#barChart')).toBeVisible({ timeout: 15000 });
    });

    await test.step('2. 等待初始数据加载完成并记录筛选前的状态', async () => {
      await page.waitForResponse(
        (resp) => resp.url().includes('/api/chart/bar') && resp.status() === 200,
        { timeout: 15000 }
      );
      await page.waitForTimeout(500);
    });

    const beforeModels = await page.evaluate(() => {
      const chartDom = document.getElementById('barChart');
      const echartsInst = chartDom && echarts.getInstanceByDom(chartDom);
      if (!echartsInst) return null;
      const opt = echartsInst.getOption();
      return {
        categories: opt.xAxis?.[0]?.data ?? [],
        seriesData: opt.series?.map((s) => s.data) ?? [],
      };
    });
    expect(beforeModels).not.toBeNull();
    const beforeCategoryCount = beforeModels.categories.length;

    const beforeTableRowCount = await page.locator('#dashboardTableBody tr').count();

    expect(beforeCategoryCount).toBeGreaterThan(0);
    expect(beforeTableRowCount).toBeGreaterThan(0);
    expect(beforeCategoryCount).toBe(beforeTableRowCount);

    await test.step('3. 修改品牌筛选为「特斯拉」', async () => {
      const barResponsePromise = page.waitForResponse(
        (resp) => resp.url().includes('/api/chart/bar') && resp.status() === 200,
        { timeout: 15000 }
      );

      await page.selectOption('#brandFilter', '特斯拉');
      await barResponsePromise;
      await page.waitForTimeout(500);
    });

    await test.step('4. 断言筛选后柱状图车型数量与明细表行数一致', async () => {
      const afterModels = await page.evaluate(() => {
        const chartDom = document.getElementById('barChart');
        const echartsInst = chartDom && echarts.getInstanceByDom(chartDom);
        if (!echartsInst) return null;
        const opt = echartsInst.getOption();
        return {
          categories: opt.xAxis?.[0]?.data ?? [],
          seriesData: opt.series?.map((s) => s.data) ?? [],
        };
      });
      expect(afterModels).not.toBeNull();
      const afterCategoryCount = afterModels.categories.length;

      const afterTableRowCount = await page.locator('#dashboardTableBody tr').count();

      expect(afterCategoryCount).toBeGreaterThan(0);
      expect(afterTableRowCount).toBeGreaterThan(0);
      expect(afterCategoryCount).toBe(afterTableRowCount);
    });

    await test.step('5. 断言筛选前后数据发生变化', async () => {
      const afterModels = await page.evaluate(() => {
        const chartDom = document.getElementById('barChart');
        const echartsInst = chartDom && echarts.getInstanceByDom(chartDom);
        if (!echartsInst) return null;
        const opt = echartsInst.getOption();
        return {
          categories: opt.xAxis?.[0]?.data ?? [],
        };
      });
      expect(afterModels).not.toBeNull();

      expect(afterModels.categories.length).toBeLessThan(beforeCategoryCount);

      expect(afterModels.categories).not.toEqual(beforeModels.categories);
    });
  });
});
