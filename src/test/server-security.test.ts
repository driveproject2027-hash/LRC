import { describe, it, expect, beforeAll, afterAll } from "vitest";
import http from "http";
// @ts-expect-error server.js is an external module at root
import { app } from "../../server.js";

describe("Production Server Security Controls (server.js)", () => {
  let server: http.Server;
  let baseUrl: string;

  beforeAll(async () => {
    await new Promise<void>((resolve) => {
      server = http.createServer(app);
      server.listen(0, () => {
        const addr = server.address();
        if (addr && typeof addr === "object") {
          baseUrl = `http://127.0.0.1:${addr.port}`;
        }
        resolve();
      });
    });
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  });

  it("suppresses X-Powered-By header to prevent technology fingerprinting", async () => {
    const res = await fetch(`${baseUrl}/`);
    expect(res.headers.get("x-powered-by")).toBeNull();
  });

  it("sets X-Content-Type-Options: nosniff", async () => {
    const res = await fetch(`${baseUrl}/`);
    expect(res.headers.get("x-content-type-options")).toBe("nosniff");
  });

  it("sets X-Frame-Options: SAMEORIGIN to prevent clickjacking", async () => {
    const res = await fetch(`${baseUrl}/`);
    expect(res.headers.get("x-frame-options")).toBe("SAMEORIGIN");
  });

  it("sets Referrer-Policy: strict-origin-when-cross-origin", async () => {
    const res = await fetch(`${baseUrl}/`);
    expect(res.headers.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
  });

  it("sets Permissions-Policy to restrict sensitive browser APIs", async () => {
    const res = await fetch(`${baseUrl}/`);
    expect(res.headers.get("permissions-policy")).toBe("camera=(), microphone=(), geolocation=()");
  });

  it("ensures security headers are attached to 405 Method Not Allowed responses", async () => {
    const res = await fetch(`${baseUrl}/contact`, { method: "POST" });
    expect(res.headers.get("x-content-type-options")).toBe("nosniff");
    expect(res.headers.get("x-frame-options")).toBe("SAMEORIGIN");
    expect(res.headers.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
  });

  it("ensures security headers are attached to 404 Not Found responses", async () => {
    const res = await fetch(`${baseUrl}/assets/nonexistent-bundle.js`);
    expect(res.status).toBe(404);
    expect(res.headers.get("x-content-type-options")).toBe("nosniff");
    expect(res.headers.get("x-frame-options")).toBe("SAMEORIGIN");
  });

  it("supports the /health uptime check endpoint and includes security headers", async () => {
    const res = await fetch(`${baseUrl}/health`);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("OK");
    expect(res.headers.get("x-content-type-options")).toBe("nosniff");
  });

  it("returns 405 Method Not Allowed with Allow header for POST requests to SPA fallback", async () => {
    const res = await fetch(`${baseUrl}/any-unhandled-route`, {
      method: "POST",
      body: JSON.stringify({ test: 123 }),
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status).toBe(405);
    expect(res.headers.get("allow")).toBe("GET, HEAD");
    const text = await res.text();
    expect(text).toBe("Method Not Allowed");
  });

  it("returns 405 Method Not Allowed for PUT, DELETE, and PATCH methods", async () => {
    for (const method of ["PUT", "DELETE", "PATCH"]) {
      const res = await fetch(`${baseUrl}/contact`, { method });
      expect(res.status).toBe(405);
    }
  });

  it("permits GET and HEAD requests to the SPA fallback", async () => {
    const headRes = await fetch(`${baseUrl}/about`, { method: "HEAD" });
    expect(headRes.status).not.toBe(405);
  });

  it("blocks hidden dotfiles (.env, .git) with 404 and does not expose secrets", async () => {
    const envRes = await fetch(`${baseUrl}/.env`);
    expect(envRes.status).toBe(404);
    const gitRes = await fetch(`${baseUrl}/.git/config`);
    expect(gitRes.status).toBe(404);
  });

  it("returns 404 for missing static assets or file extensions rather than serving the HTML shell", async () => {
    const jsRes = await fetch(`${baseUrl}/assets/missing.js`);
    expect(jsRes.status).toBe(404);
    const imgRes = await fetch(`${baseUrl}/missing-image.png`);
    expect(imgRes.status).toBe(404);
    const cssRes = await fetch(`${baseUrl}/nonexistent.css`);
    expect(cssRes.status).toBe(404);
    const apiRes = await fetch(`${baseUrl}/api/unhandled`);
    expect(apiRes.status).toBe(404);
  });

  it("does not expose sensitive source files or configuration outside dist", async () => {
    const res = await fetch(`${baseUrl}/package.json`);
    expect(res.status).toBe(404);
    const text = await res.text();
    expect(text).not.toContain('"vite_react_shadcn_ts"');
  });
});
