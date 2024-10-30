import { defineConfig } from 'vite'
import { watchRebuildPlugin } from '@extension/hmr'
import Vue from '@vitejs/plugin-vue'
import deepmerge from 'deepmerge'
import { isDev, isProduction } from './env.mjs'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export const watchOption = isDev ? {
  buildDelay: 100,
  chokidar: {
    ignored: [
      /\/packages\/.*\.(ts|vue|map)$/,
    ]
  }
} : undefined

/**
 * @typedef {import('vite').UserConfig} UserConfig
 * @param {UserConfig} config
 * @returns {UserConfig}
 */
export function withPageConfig(config) {
  return defineConfig(
    deepmerge(
      {
        base: '',
        plugins: [
          Vue(),

          // https://github.com/antfu/unplugin-auto-import
          AutoImport({
            imports: [
              'vue',
              'vue-router',
              '@vueuse/core',
              // 'pinia'
            ],

            // generate `auto-imports.d.ts` global declarations, 
            // also accepts a path for custom filename
            dts: true
          }),

          // https://github.com/antfu/unplugin-vue-components
          Components({
            // Расширения файлов, которые будут автоматически загружаться
            extensions: ['vue'],

            // Включаем автозагрузку компонентов в markdown
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

            // Генерация глобальных деклараций для компонентов
            dts: true,

            // Разрешить подпапки как префиксы пространств имен для компонентов
            directoryAsNamespace: true,

            // Разрешатели для пользовательских компонентов
            resolvers: [
              // HeadlessUiResolver()
            ]
          }),


          isDev && watchRebuildPlugin({ refresh: true })
        ],
        build: {
          sourcemap: isDev,
          minify: isProduction,
          reportCompressedSize: isProduction,
          emptyOutDir: isProduction,
          watch: watchOption,
          rollupOptions: {
            external: ['chrome'],
          },
        },
        // define: {
        //   'process.env.NODE_ENV': isDev ? 'development' : 'production',
        // },
        envDir: '../..'
      },
      config,
    ),
  )
}
