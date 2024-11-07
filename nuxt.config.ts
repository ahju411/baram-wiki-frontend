// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-07',
  devtools: { enabled: true },

  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      title: 'My Nuxt App',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'An SSR-powered Pokedex Encyclopedia' },
      ],
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/reset-css@5.0.2/reset.min.css' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || '/api' // API 경로 설정
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  },

  // SSR 사용
  ssr: true,

  modules: ['@nuxt/image']
})