import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the massage landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /Массаж под вашу задачу/);
  assert.match(html, /Соберём ваш/);
  assert.match(html, /Подобрать массаж/);
  assert.match(html, /Хакурате, 12/);
  assert.match(html, /79994179908/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps customer data local and includes safety copy", async () => {
  const response = await render();
  const html = await response.text();
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(html, /Массаж не заменяет консультацию врача/);
  assert.match(source, /encodeURIComponent/);
  assert.match(html, /При противопоказаниях/);
  assert.match(html, /2ГИС/);
  assert.match(html, /Яндекс Карты/);
});
