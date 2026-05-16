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
        "headline-sm": ["Playfair Display"],
        "headline-lg": ["Playfair Display"],
        "headline-lg-mobile": ["Playfair Display"],
        "headline-md": ["Playfair Display"],
        "label-md": ["Inter"],
        "label-sm": ["Inter"],
        "body-md": ["Inter"],
        "display-lg": ["Playfair Display"]
      },
      "fontSize": {
        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "headline-sm": ["24px", {"lineHeight": "1.4", "fontWeight": "500"}],
        "headline-lg": ["48px", {"lineHeight": "1.2", "fontWeight": "500"}],
        "headline-lg-mobile": ["36px", {"lineHeight": "1.2", "fontWeight": "500"}],
        "headline-md": ["32px", {"lineHeight": "1.3", "fontWeight": "500"}],
        "label-md": ["14px", {"lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "600"}],
        "label-sm": ["12px", {"lineHeight": "1", "fontWeight": "500"}],
        "body-md": ["16px", {"lineHeight": "1.5", "fontWeight": "400"}],
        "display-lg": ["64px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "600"}]
      }
    },
  },
  plugins: [
    forms,
    containerQueries,
  ],
}
