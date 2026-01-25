// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4
  },
  devtools: { enabled: true },
  typescript: {
    strict: true
  },
  modules: ['@nuxtjs/i18n'],
  runtimeConfig: {
    supabaseUrl: process.env.NUXT_SUPABASE_URL,
    supabaseAnonKey: process.env.NUXT_SUPABASE_ANON_KEY,
    public: {
      supabaseUrl: process.env.NUXT_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_SUPABASE_ANON_KEY
    }
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-GB', file: 'en-GB.json' },
      { code: 'zh', language: 'zh-CN', file: 'zh-CN.json' }
    ],
    defaultLocale: 'en',
    langDir: 'locales',
    strategy: 'prefix_except_default'
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Eat Outside',
      meta: [
        { name: 'description', content: 'Singapore hawker food guide - make healthier choices with ease' }
      ]
    }
  }
})
