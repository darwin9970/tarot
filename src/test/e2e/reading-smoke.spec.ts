import { expect, test } from "@playwright/test";

test("homepage can navigate into the reading ritual", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /把问题放进夜色里，让牌面替你点亮答案。/,
    }),
  ).toBeVisible();

  await page.getByRole("link", { name: /开始抽牌/ }).first().click();
  await expect(page).toHaveURL(/\/reading/);

  await page.getByLabel("你的问题").fill("我接下来应该把注意力放在哪里？");
  await page.getByRole("button", { name: "开始占卜" }).click();

  await expect(page.getByRole("heading", { name: "洗牌中" })).toBeVisible();
  await expect(page.getByRole("button", { name: "抽取塔罗" })).toBeEnabled({
    timeout: 6000,
  });

  await page.getByRole("button", { name: "抽取塔罗" }).click();
  await expect(page.getByRole("button", { name: "查看完整解读" })).toBeVisible();
});
