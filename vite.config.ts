import { globSync } from "glob";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import path from "path";
import PurgeIcons from 'vite-plugin-purge-icons';
import fs from 'fs';
import { loadEnv } from "vite";

const THEME_BASE = "/themes/theme-sakura";
const ASSETS_BASE = `/assets/dist/`;

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    plugins: [
      PurgeIcons({
        content: [
          './templates/*/*.html',
        ],
      }),
      {
        name: 'write-version-plugin',
        closeBundle() {
          const version = env.VITE_THEME_VERSION;
          const yamlFilePath = path.resolve(__dirname, 'theme.yaml');
          let yamlContent = fs.readFileSync(yamlFilePath, 'utf8');
          yamlContent = yamlContent.replace(/version:\s*.*$/m, `version: ${version}`);
          fs.writeFileSync(yamlFilePath, yamlContent, 'utf8');
        },
      }
    ],
    base: THEME_BASE + ASSETS_BASE,
    build: {
      outDir: "templates" + ASSETS_BASE,
      minify: mode === 'development' ? false : true,
      rollupOptions: {
        input: Object.fromEntries(
          globSync(["src/main.ts", "src/libs/**/*.*", "src/page/**/*.*"]).map((file) => [
            path.relative("src", file.slice(0, file.length - path.extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
        ),
        output: {
          format: "es",
          entryFileNames: `[name]-${env.VITE_THEME_VERSION}.min.js`,
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith(".css")) {
              return `css/[name]-${env.VITE_THEME_VERSION}.min.[ext]`;
            }
            return `[name].min.[ext]`;
          },
        },
      },
      sourcemap: false,
      chunkSizeWarningLimit: 1024
    },
  });
};
