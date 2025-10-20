import type { Config } from "tailwindcss";
import { join } from "path";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    join(__dirname, "../../packages/ui/src/**/*.{ts,tsx,js,jsx}"),
    join(__dirname, "../../packages/ui/dist/**/*.{js,jsx}"),
  ],
  theme: {
    maxWidth: {
      large: "1600px",
      xLarge: "1920px",
    },
    extend: {
      backgroundImage: {
        "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
      },
      colors: {
        caribbean: "#01C98F",
        cerulean: "#007fb2",
        cinnabar: "#E23428",
        codGray: "#111",
        colonial: "#FFEBBD",
        dodger: "#049EDC",
        eden: "#135846",
        elephant: "#104235",
        emerald: "#43D440",
        fire: "#F47C06",
        forest: "#2BA829",
        mineShaft: "#333333",
        pacific: "#04B0B6",
        palm: "#0e250a",
        pastel: "#68E365",
        salem: "#038C48",
        seaweed: "#193314",
        spring: "#38FF9C",
        thunderbird: "#C5261B",
        transparent: "transparent",
        turquoise: "#00C8F9",
        wild: "#00CF68",
        wildSand: "#CCC",
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
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        monserrat: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        xxs: "0.65rem",
      },
      screens: {
        "3xl": "1793px",
      },
    },
  },
};
export default config;
