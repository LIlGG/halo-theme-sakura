import { globSync } from "glob";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import path from "path";
import PurgeIcons from 'vite-plugin-purge-icons';

export default defineConfig({
  plugins: [
    PurgeIcons({
      content: [
        './templates/*/*.html',
      ],
    })
  ],
  build: {
    minify: false,
    rollupOptions: {
      input: Object.fromEntries(
        globSync(["src/main.ts", "src/libs/**/*.*", "src/page/**/*.*"]).map((file) => [
          path.relative("src", file.slice(0, file.length - path.extname(file).length)),
          fileURLToPath(new URL(file, import.meta.url)),
        ])
      ),
      output: {
        format: "es",
        dir: fileURLToPath(new URL("./templates/assets/dist", import.meta.url)),
        entryFileNames: "[name].min.js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "css/[name].min.[ext]";
          }
          return "[name].min.[ext]";
        },
      },
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1024
  },
});
