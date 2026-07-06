import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          50:  "hsl(243, 100%, 97%)",
          100: "hsl(243, 95%, 93%)",
          200: "hsl(243, 90%, 86%)",
          300: "hsl(243, 85%, 76%)",
          400: "hsl(243, 80%, 67%)",
          500: "hsl(243, 75%, 59%)",
          600: "hsl(243, 70%, 50%)",
          700: "hsl(243, 72%, 41%)",
          800: "hsl(243, 74%, 33%)",
          900: "hsl(243, 76%, 26%)",
          950: "hsl(243, 78%, 16%)",
        },
        violet: {
          50:  "hsl(270, 100%, 98%)",
          100: "hsl(270, 95%, 95%)",
          200: "hsl(270, 90%, 89%)",
          300: "hsl(270, 85%, 80%)",
          400: "hsl(270, 91%, 73%)",
          500: "hsl(270, 91%, 65%)",
          600: "hsl(270, 76%, 53%)",
          700: "hsl(270, 67%, 44%)",
          800: "hsl(270, 60%, 36%)",
          900: "hsl(270, 55%, 29%)",
        },
        success: {
          DEFAULT: "hsl(160, 84%, 39%)",
          foreground: "hsl(0, 0%, 100%)",
          muted: "hsl(160, 84%, 95%)",
        },
        warning: {
          DEFAULT: "hsl(38, 92%, 50%)",
          foreground: "hsl(0, 0%, 100%)",
          muted: "hsl(38, 92%, 95%)",
        },
        danger: {
          DEFAULT: "hsl(347, 77%, 50%)",
          foreground: "hsl(0, 0%, 100%)",
          muted: "hsl(347, 77%, 95%)",
        },
        info: {
          DEFAULT: "hsl(207, 90%, 54%)",
          foreground: "hsl(0, 0%, 100%)",
          muted: "hsl(207, 90%, 95%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "sidebar": "16rem",
        "sidebar-collapsed": "4.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(16px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-16px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "count-up": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          from: { backgroundPosition: "-200px 0" },
          to: { backgroundPosition: "calc(200px + 100%) 0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 hsl(243 75% 59% / 70%)" },
          "70%": { transform: "scale(1)", boxShadow: "0 0 0 10px hsl(243 75% 59% / 0%)" },
          "100%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 hsl(243 75% 59% / 0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "fade-up": "fade-up 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        shimmer: "shimmer 2s infinite",
        "spin-slow": "spin-slow 3s linear infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite",
        float: "float 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, hsl(243,75%,59%) 0%, hsl(270,91%,65%) 100%)",
        "gradient-brand-soft": "linear-gradient(135deg, hsl(243,100%,97%) 0%, hsl(270,100%,98%) 100%)",
        "gradient-mesh": "radial-gradient(at 40% 20%, hsl(243,75%,59%,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsl(270,91%,65%,0.1) 0px, transparent 50%)",
        "shimmer-gradient": "linear-gradient(90deg, transparent 25%, hsl(var(--muted)) 50%, transparent 75%)",
      },
      boxShadow: {
        "card": "0 1px 3px 0 hsl(0 0% 0% / 0.08), 0 1px 2px -1px hsl(0 0% 0% / 0.06)",
        "card-hover": "0 4px 12px 0 hsl(0 0% 0% / 0.12), 0 2px 4px -1px hsl(0 0% 0% / 0.08)",
        "brand": "0 4px 24px -4px hsl(243 75% 59% / 0.4)",
        "brand-sm": "0 2px 12px -2px hsl(243 75% 59% / 0.3)",
        "inner-brand": "inset 0 1px 0 0 hsl(243 75% 59% / 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
