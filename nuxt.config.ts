/// <reference types="node" />
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
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
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
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Lato:wght@300;400;700&family=ZCOOL+KuaiLe&display=swap' }
      ]
    }
  },
  routeRules: {
    '/api/**': {
      headers: {
        'Cache-Control': 'no-store, must-revalidate'
      }
    }
  },
  nitro: {
    routeRules: {
      '/api/**': {
        headers: {
          'Cache-Control': 'no-store, must-revalidate'
        }
      }
    }
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        'default-src': "'self'",
        'script-src': "'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://fonts.googleapis.com",
        'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
        'font-src': "'self' https://fonts.gstatic.com",
        'img-src': "'self' data: blob: https:",
        'connect-src': "'self' https://*.supabase.co",
        'frame-src': "'none'",
        'base-uri': "'self'",
        'form-action': "'self'",
        'frame-ancestors': "'none'",
        'upgrade-insecure-requests': ''
      }
    }
  }
})
