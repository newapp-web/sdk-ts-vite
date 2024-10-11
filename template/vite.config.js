import { defineConfig } from "vite";
import babel from "@rollup/plugin-babel";
import bundleAnalyzer from "rollup-plugin-bundle-analyzer";
import dts from "vite-plugin-dts-canary";

// 获取执行时的参数 --report, 用于打包分析
const npm_lifecycle_script = process.env.npm_lifecycle_script;
const isReport = npm_lifecycle_script.indexOf("--report") > -1;

export default defineConfig({
  server: {
    host: true,
  },
  build: {
    lib: {
      entry: "./src/main.ts",
      name: "{{namespace}}",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs", "umd"],
    },
    outDir: "lib",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
    },
    rollupOptions: {
      // 使用Babel转译你的代码
      plugins: [
        babel({
          babelHelpers: "bundled",
          presets: [
            [
              "@babel/preset-env",
              {
                targets: "> 0.25%, not dead, ie 11", // 设置目标浏览器环境为支持 ES5 的浏览器，如 IE11
                modules: false,
              },
            ],
          ],
          exclude: "node_modules/**",
        }),
        isReport && bundleAnalyzer(),
        dts({
          insertTypesEntry: true,
          outDir: "types",
          copyDtsFiles: true,
          rollupTypes: true,
          include: ["src/**/*.ts"],
          tsconfigPath: "./tsconfig.json",
        }),
      ],
    },
  },
});
