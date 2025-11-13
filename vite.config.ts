import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ command, mode }) => {
  const isBuild = command === "build";
  const isProduction = mode === "production";

  return {
    plugins: [
      vue(),
      svgLoader({
        defaultImport: "component",
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  // viewBox 유지 (중요!)
                  removeViewBox: false,
                },
              },
            },
            // ✅ fill/stroke 제거 활성화 - CSS로 색상 변경 가능
            { name: "removeAttrs", params: { attrs: "(fill|stroke)" } },
          ],
          multipass: true,
        },
      }),
    ],

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },

    esbuild: {
      legalComments: isBuild ? "none" : "inline",
      drop: isProduction ? ["console", "debugger"] : [],
    },

    server: {
      port: 8201,
      open: true,
      strictPort: true,
    },
  };
});
