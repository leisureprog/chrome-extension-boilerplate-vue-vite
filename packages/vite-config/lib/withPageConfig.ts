import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import { watchRebuildPlugin } from '@extension/hmr'
import Vue from '@vitejs/plugin-vue'
import deepmerge from 'deepmerge'
import env, { IS_DEV, IS_PROD } from '@extension/env'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export const watchOption = IS_DEV ? {
  buildDelay: 100,
  exclude: [/\/pages\/content-ui\/dist\/.*\.(css)$/],
  chokidar: {
    awaitWriteFinish: true,
    ignored: [/\/packages\/.*\.(ts|vue|map)$/, /\/pages\/content-ui\/dist\/.*/],
  },
} : undefined

/**
 * @typedef {import('vite').UserConfig} UserConfig
 * @param {UserConfig} config
 * @returns {UserConfig}
 */
export function withPageConfig(config: UserConfig) {
  return defineConfig(
    deepmerge(
      {
        define: {
          'process.env': env,
        },
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
            dts: 'src/auto-imports.d.ts'
          }),

          // https://github.com/antfu/unplugin-vue-components
          Components({
            // Путь к директории, где будут искаться компоненты
            dirs: ['src/**/components'],
      
            // Расширения файлов, которые будут автоматически загружаться
            extensions: ['vue'],

            // Включаем автозагрузку компонентов в markdown
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

            // Генерация глобальных деклараций для компонентов
            dts: 'src/components.d.ts',

            // Разрешить подпапки как префиксы пространств имен для компонентов
            directoryAsNamespace: true,

            // Разрешатели для пользовательских компонентов
            resolvers: [
              // HeadlessUiResolver()
            ]
          }),

          IS_DEV && watchRebuildPlugin({ refresh: true })
        ],
        
        build: {
          sourcemap: IS_DEV,
          minify: IS_PROD,
          reportCompressedSize: IS_PROD,
          emptyOutDir: IS_PROD,
          watch: watchOption,
          rollupOptions: {
            external: ['chrome'],
          },
        },
      },
      config,
    ),
  )
}
