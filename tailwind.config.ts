const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
        },
        surface: {
          DEFAULT: "#ffffff",
          soft: "#f8fafc",
        },
      },
      boxShadow: {
        soft: "0 20px 40px -24px rgba(15, 23, 42, 0.35)",
      },
    },
  },
} as const;

export default config;
