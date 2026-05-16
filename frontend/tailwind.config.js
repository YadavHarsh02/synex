import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
        "on-secondary": "#ffffff",
        "secondary-fixed": "#dae2fd",
        "surface-dim": "#cbdbf5",
        "secondary-fixed-dim": "#bec6e0",
        "background": "#f8f9ff",
        "on-surface": "#0b1c30",
        "surface-bright": "#f8f9ff",
        "on-tertiary-fixed": "#191c1e",
        "error": "#ba1a1a",
        "primary-container": "#10b981",
        "on-surface-variant": "#3c4a42",
        "secondary": "#565e74",
        "surface": "#f8f9ff",
        "on-primary-fixed-variant": "#005236",
        "outline-variant": "#bbcabf",
        "on-secondary-fixed-variant": "#3f465c",
        "on-error": "#ffffff",
        "on-primary-fixed": "#002113",
        "inverse-on-surface": "#eaf1ff",
        "on-secondary-container": "#5c647a",
        "on-primary-container": "#00422b",
        "tertiary-fixed-dim": "#c4c7c9",
        "outline": "#6c7a71",
        "secondary-container": "#dae2fd",
        "primary-fixed-dim": "#4edea3",
        "inverse-surface": "#213145",
        "on-secondary-fixed": "#131b2e",
        "on-primary": "#ffffff",
        "on-tertiary-container": "#36393b",
        "primary": "#006c49",
        "surface-container-high": "#dce9ff",
        "surface-variant": "#d3e4fe",
        "surface-container-lowest": "#ffffff",
        "tertiary-container": "#a0a3a5",
        "on-tertiary-fixed-variant": "#444749",
        "inverse-primary": "#4edea3",
        "primary-fixed": "#6ffbbe",
        "surface-tint": "#006c49",
        "tertiary-fixed": "#e0e3e5",
        "surface-container": "#e5eeff",
        "tertiary": "#5c5f61",
        "on-background": "#0b1c30",
        "on-tertiary": "#ffffff",
        "on-error-container": "#93000a",
        "surface-container-low": "#eff4ff",
        "error-container": "#ffdad6",
        "surface-container-highest": "#d3e4fe"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "gutter": "32px",
        "unit": "8px",
        "container-max": "1440px",
        "margin-md": "40px",
        "margin-lg": "80px",
        "margin-sm": "24px"
      },
      "fontFamily": {
        "body-lg": ["Inter"],
        "headline-sm": ["Plus Jakarta Sans"],
        "headline-lg": ["Plus Jakarta Sans"],
        "headline-lg-mobile": ["Plus Jakarta Sans"],
        "headline-md": ["Plus Jakarta Sans"],
        "label-md": ["Inter"],
        "label-sm": ["Inter"],
        "body-md": ["Inter"],
        "display-lg": ["Plus Jakarta Sans"],
        "serif": ["Playfair Display", "serif"]
      },
      "keyframes": {
        "fade-in": {
          "0%": { "opacity": "0" },
          "100%": { "opacity": "1" }
        },
        "fade-in-up": {
          "0%": { "opacity": "0", "transform": "translateY(40px)" },
          "100%": { "opacity": "1", "transform": "translateY(0)" }
        },
        "float": {
          "0%, 100%": { "transform": "translateY(0)" },
          "50%": { "transform": "translateY(-10px)" }
        },
        "grow-bar": {
          "0%": { "height": "0%" },
          "100%": { "height": "var(--target-height)" }
        }
      },
      "animation": {
        "fade-in": "fade-in 1.2s ease-out forwards",
        "fade-in-up": "fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "float": "float 3s ease-in-out infinite",
        "grow-bar": "grow-bar 1.5s ease-out forwards"
      },
      "fontSize": {
        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "headline-sm": ["24px", {"lineHeight": "1.4", "fontWeight": "800", "letterSpacing": "-0.02em"}],
        "headline-lg": ["48px", {"lineHeight": "1.2", "fontWeight": "700", "letterSpacing": "-0.03em"}],
        "headline-lg-mobile": ["36px", {"lineHeight": "1.2", "fontWeight": "700", "letterSpacing": "-0.03em"}],
        "headline-md": ["32px", {"lineHeight": "1.3", "fontWeight": "700", "letterSpacing": "-0.02em"}],
        "label-md": ["14px", {"lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "600"}],
        "label-sm": ["12px", {"lineHeight": "1", "fontWeight": "500"}],
        "body-md": ["16px", {"lineHeight": "1.5", "fontWeight": "400"}],
        "display-lg": ["64px", {"lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "800"}]
      }
    },
  },
  plugins: [
    forms,
    containerQueries,
  ],
}
