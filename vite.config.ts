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
        // ⚙️ SVG 파일 내 fill/stroke 제거해서 CSS 제어 가능하게
        svgoConfig: {
          plugins: [{ name: "removeAttrs", params: { attrs: "(fill|stroke)" } }],
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
      // ✅ 프로덕션 빌드 시 console/debugger 제거
      drop: isProduction ? ["console", "debugger"] : [],
    },

    server: {
      port: 8201,
      open: true,
      strictPort: true,
      // host: true, // ✅ 외부 기기 접근 허용 시 사용
    },
  };
});
