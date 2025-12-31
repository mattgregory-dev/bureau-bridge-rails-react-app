export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#2563EB",   // blue-600
          primaryHover: "#1D4ED8",
          secondary: "#0F172A", // slate-900
          muted: "#64748B",     // slate-500
          surface: "#FFFFFF",
          border: "#E5E7EB"
        }
      },
      fontSize: {
        xs: ["12px", { lineHeight: "1em" }],
        sm: ["14px", { lineHeight: "1.25em" }],
        base: ["16px", { lineHeight: "1.5em" }],
        lg: ["18px", { lineHeight: "1.75em" }],
        xl: ["20px", { lineHeight: "1.75em" }],
        "2xl": ["28px", { lineHeight: "1.75em" }]
      },
      borderRadius: {
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem"
      }
    }
  },
  plugins: []
};
