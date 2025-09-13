import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Auto-detect base path for GitHub Pages builds
  const isCI = process.env.GITHUB_ACTIONS === 'true';
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
  const base = isCI && repo ? `/${repo}/` : '/';

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base,
  };
});
