import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            // when you fetch("/api/xxx") → it goes to http://localhost:5000/api/xxx
            "/api": {
                target: "http://localhost:5000",
                changeOrigin: true,
                secure: false, // if backend is https but using self-signed cert
            },
        },
    },
});
