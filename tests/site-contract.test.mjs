import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const pages = ["website", "marketing", "seo", "geo", "cases"];
const source = pages
  .map((page) => readFileSync(new URL(`../src/pages/${page}.astro`, import.meta.url), "utf8"))
  .join("\n");
const websiteContent = readFileSync(
  new URL("../src/content/pages/website.md", import.meta.url),
  "utf8",
);
const marketingContent = readFileSync(
  new URL("../src/content/pages/marketing.md", import.meta.url),
  "utf8",
);
const marketingPage = readFileSync(
  new URL("../src/pages/marketing.astro", import.meta.url),
  "utf8",
);
const seoPage = readFileSync(
  new URL("../src/pages/seo.astro", import.meta.url),
  "utf8",
);
const geoPage = readFileSync(
  new URL("../src/pages/geo.astro", import.meta.url),
  "utf8",
);
const contentSource = ["website", "marketing", "seo", "geo"]
  .map((page) =>
    readFileSync(new URL(`../src/content/pages/${page}.md`, import.meta.url), "utf8"),
  )
  .join("\n");
const projectSource = `${source}\n${contentSource}`;

test("the five-page demo keeps the frozen route scope", () => {
  expect(pages).toEqual(["website", "marketing", "seo", "geo", "cases"]);
  for (const page of pages) {
    expect(readFileSync(new URL(`../src/pages/${page}.astro`, import.meta.url), "utf8")).toContain("<BaseLayout");
  }
});

test("reference-site identities and contacts are not copied", () => {
  for (const forbidden of [
    "臻优",
    "REALGOOD",
    "Zmpress",
    "szrealgood",
    "美仪",
    "爱禄尔",
    "兆威机电",
    "15062122884",
    "wangqi@",
  ]) {
    expect(projectSource).not.toContain(forbidden);
  }
});

test("every service page ships the shared demo contact section", () => {
  for (const page of pages.slice(0, 4)) {
    const pageSource = readFileSync(
      new URL(`../src/pages/${page}.astro`, import.meta.url),
      "utf8",
    );
    expect(pageSource).toContain("<ContactPanel />");
  }
});

test("plan comparison tables expose concrete values instead of merged shorthand", () => {
  expect(`${websiteContent}\n${marketingContent}`).not.toContain("各档相同");
  for (const value of ["13 种", "49 种", "100 条", "150 条", "500G"]) {
    expect(websiteContent).toContain(value);
  }
  for (const value of ["8 个", "12 个", "20 个", "480 条", "2400 条", "160 条"]) {
    expect(marketingContent).toContain(value);
  }
});

test("marketing restores the full reference delivery matrix", () => {
  for (const heading of [
    "效果保证 KPI",
    "账号搭建与国家矩阵",
    "社媒运营交付",
    "远航社媒营销系统",
    "远航客资管理系统",
    "8 要素询盘交付（每个国家）",
  ]) {
    expect(marketingContent).toContain(heading);
  }
});

test("marketing keeps the complete nine-part directory and lower-page anchors", () => {
  for (const label of [
    "效果 KPI",
    "账号矩阵",
    "运营交付",
    "营销系统",
    "客资系统",
    "询盘标准",
    "8 要素询盘",
    "我们提供",
    "客户配合",
  ]) {
    expect(marketingPage).toContain(label);
  }
  for (const id of ["eight-elements", "provider", "client"]) {
    expect(marketingPage).toContain(id);
  }
});

test("SEO renders its previously hidden context and reporting sections", () => {
  expect(seoPage).toContain("sellingPoints.items.map");
  expect(seoPage).not.toContain('/img/svc-data.webp');
  expect(seoPage).toContain("title={reporting.heading}");
  expect(seoPage).toContain("reporting.items.map");
});

test("qualified inquiry cards expose eight visible pictograms", () => {
  expect(marketingPage).toContain("inquiryIcons");
  expect(marketingPage).toContain("<Icon name={inquiryIcons[i]}");
  for (const icon of ["building", "person", "target", "wallet", "handshake", "message", "mail", "brand"]) {
    expect(marketingPage).toContain(`'${icon}'`);
  }
});

test("GEO platform and service cards include visible icons", () => {
  expect(geoPage).toContain("platformIcons");
  expect(geoPage).toContain("serviceIcons");
  expect(geoPage).toContain("<Icon name={platformIcons[i]");
  expect(geoPage).toContain("<Icon name={serviceIcons[i]");
});
