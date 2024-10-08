import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{html,tsx,ts}"],
    theme: {
        extend: {
            screens: {
                "xs": "340px",
                "sm": "640px",
                "md": "768px",
                "lg": "1024px",
                "xl": "1280px",
                "2xl": "1536px"
            },
            maxWidth: {
                "xs": "340px",
                "sm": "640px",
                "md": "768px",
                "lg": "1024px",
                "xl": "1280px",
                "2xl": "1536px"
            },
            minWidth: {
                "xs": "340px",
                "sm": "640px",
                "md": "768px",
                "lg": "1024px",
                "xl": "1280px",
                "2xl": "1536px"
            }

        }
    },
    plugins: []
} satisfies Config;

