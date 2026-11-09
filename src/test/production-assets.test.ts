import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Production Configuration Assets Validation", () => {
  const rootDir = path.resolve(__dirname, "../../");

  describe("IIS web.config (public/web.config)", () => {
    const webConfigPath = path.join(rootDir, "public/web.config");

    it("exists and is non-empty", () => {
      expect(fs.existsSync(webConfigPath)).toBe(true);
      const content = fs.readFileSync(webConfigPath, "utf-8");
      expect(content.length).toBeGreaterThan(100);
    });

    it("has valid XML declaration and root elements", () => {
      const content = fs.readFileSync(webConfigPath, "utf-8");
      expect(content).toContain('<?xml version="1.0" encoding="utf-8"?>');
      expect(content).toContain("<configuration>");
      expect(content).toContain("</configuration>");
      expect(content).toContain("<system.webServer>");
      expect(content).toContain("</system.webServer>");
    });

    it("points SPA rewrite rule explicitly to /index.html", () => {
      const content = fs.readFileSync(webConfigPath, "utf-8");
      expect(content).toContain('<action type="Rewrite" url="/index.html" />');
      // Must not rewrite to root "/" which risks 403.14 directory listing issues
      expect(content).not.toContain('<action type="Rewrite" url="/" />');
    });

    it("documents the IIS URL Rewrite Module 2.0 prerequisite", () => {
      const content = fs.readFileSync(webConfigPath, "utf-8");
      expect(content).toMatch(/IIS URL Rewrite Module 2\.0/i);
    });

    it("defines essential security headers without duplicate key risks", () => {
      const content = fs.readFileSync(webConfigPath, "utf-8");
      expect(content).toContain('<remove name="X-Powered-By" />');
      expect(content).toContain('<add name="X-Content-Type-Options" value="nosniff" />');
      expect(content).toContain('<add name="X-Frame-Options" value="SAMEORIGIN" />');
      expect(content).toContain('<add name="Referrer-Policy" value="strict-origin-when-cross-origin" />');
      expect(content).toContain('<add name="Strict-Transport-Security" value="max-age=86400" />');
    });
  });

  describe("Apache / LiteSpeed .htaccess (public/.htaccess)", () => {
    const htaccessPath = path.join(rootDir, "public/.htaccess");

    it("exists and defines DirectoryIndex index.html", () => {
      expect(fs.existsSync(htaccessPath)).toBe(true);
      const content = fs.readFileSync(htaccessPath, "utf-8");
      expect(content).toContain("DirectoryIndex index.html");
    });

    it("preserves SPA rewrite rules targeting /index.html", () => {
      const content = fs.readFileSync(htaccessPath, "utf-8");
      expect(content).toContain("RewriteEngine On");
      expect(content).toContain("RewriteRule ^index\\.html$ - [L]");
      expect(content).toContain("RewriteRule . /index.html [L]");
    });

    it("defines security headers inside mod_headers block", () => {
      const content = fs.readFileSync(htaccessPath, "utf-8");
      expect(content).toContain("<IfModule mod_headers.c>");
      expect(content).toContain('Header always set X-Content-Type-Options "nosniff"');
      expect(content).toContain('Header always set X-Frame-Options "SAMEORIGIN"');
      expect(content).toContain('Header always set Referrer-Policy "strict-origin-when-cross-origin"');
      expect(content).toContain('Header always set Strict-Transport-Security "max-age=86400"');
    });
  });

  describe("WordPress API Integration Reference (docs/wordpress_contact_api_integration.php)", () => {
    const phpPath = path.join(rootDir, "docs/wordpress_contact_api_integration.php");

    it("exists and defines the REST route contact/v1/send", () => {
      expect(fs.existsSync(phpPath)).toBe(true);
      const content = fs.readFileSync(phpPath, "utf-8");
      expect(content).toContain("register_rest_route('contact/v1', '/send'");
    });

    it("implements payload size and field length boundaries", () => {
      const content = fs.readFileSync(phpPath, "utf-8");
      expect(content).toContain("10240"); // 10KB raw payload check
      expect(content).toContain("strlen($name) > 100");
      expect(content).toContain("strlen($email) > 100");
      expect(content).toContain("strlen($subject) > 200");
      expect(content).toContain("strlen($message) > 5000");
    });

    it("prevents email header injection and formats headers safely", () => {
      const content = fs.readFileSync(phpPath, "utf-8");
      expect(content).toContain("safe_subject = preg_replace('/[\\r\\n\\t\\0]+/', ' ', $subject)");
      expect(content).toContain("safe_name    = preg_replace('/[\\r\\n\\t\\0\",]+/', '', $name)");
      expect(content).toContain("'Reply-To: \"' . $safe_name . '\" <' . $email . '>'");
    });

    it("uses generic error message on mail delivery failure", () => {
      const content = fs.readFileSync(phpPath, "utf-8");
      // Must not leak internal mail server configuration details
      expect(content).not.toContain("mail server configuration issue");
      expect(content).toContain("Unable to send message at this time.");
    });

    it("uses rest_pre_serve_request filter for REST-compatible CORS", () => {
      const content = fs.readFileSync(phpPath, "utf-8");
      expect(content).toContain("add_filter('rest_pre_serve_request'");
      // Must not exit prematurely on init hook
      expect(content).not.toContain("add_action('init'");
    });

    it("documents reverse proxy and trusted proxy requirements", () => {
      const content = fs.readFileSync(phpPath, "utf-8");
      expect(content).toMatch(/PROXY ARCHITECTURE REQUIREMENT/i);
      expect(content).toMatch(/mod_remoteip/i);
    });
  });
});
