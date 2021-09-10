// import vue from '@vitejs/plugin-vue'
const path = require('path')
const pkg = require('./package.json')
import { createVuePlugin } from 'vite-plugin-vue2'

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [ createVuePlugin() ],
  build: {
    lib: {
      entry: path.resolve(__dirname, pkg.main),
      name: 'TencentMap'
    },
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
}
