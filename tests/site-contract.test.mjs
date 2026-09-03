import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const pages = ["website", "marketing", "seo", "geo", "cases"];
const source = pages
  .map((page) => readFileSync(new URL(`../src/pages/${page}.astro`, import.meta.url), "utf8"))
  .join("\n");

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
    expect(source).not.toContain(forbidden);
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
