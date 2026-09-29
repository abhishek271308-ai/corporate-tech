import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",

  [
    "script-src 'self' 'unsafe-inline'",
    isDev ? "'unsafe-eval'" : "",
    "https://www.googletagmanager.com",
    "https://tagmanager.google.com",
    "https://www.google.com/recaptcha/",
    "https://www.gstatic.com/recaptcha/",
    "https://www.recaptcha.net/recaptcha/",
  ]
    .filter(Boolean)
    .join(" "),

  [
    "style-src 'self' 'unsafe-inline'",
    "https://www.googletagmanager.com",
    "https://tagmanager.google.com",
    "https://fonts.googleapis.com",
  ].join(" "),

  [
    "img-src 'self' data: blob:",
    "https://www.googletagmanager.com",
    "https://*.google-analytics.com",
    "https://www.google.com",
    "https://www.gstatic.com",
    "https://ssl.gstatic.com",
  ].join(" "),

  "font-src 'self' data: https://fonts.gstatic.com",

  [
    "connect-src 'self'",
    isDev ? "ws://localhost:* ws://127.0.0.1:*" : "",
    "https://www.googletagmanager.com",
    "https://*.google-analytics.com",
    "https://*.analytics.google.com",
    "https://*.google.com",
    "https://www.gstatic.com/recaptcha/",
    "https://www.recaptcha.net/recaptcha/",
  ]
    .filter(Boolean)
    .join(" "),

  [
    "frame-src",
    "https://www.google.com/recaptcha/",
    "https://recaptcha.google.com/recaptcha/",
    "https://www.recaptcha.net/recaptcha/",
    "https://www.googletagmanager.com",
  ].join(" "),

  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
