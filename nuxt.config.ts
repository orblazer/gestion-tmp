import NuxtConfiguration from '@nuxt/config'
import webpack from 'webpack'
import StyleLintPlugin from 'stylelint-webpack-plugin'
require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env'
})

const title = 'Gestion'
const description = 'The panel for manage website'
const storagePrefix = 'gestion.'
const baseURL = process.env.BASE_URL || 'http://localhost:3000'
const apiURL = process.env.API_URL || baseURL + '/api'

const titleTemplate = (chunk: string): string => {
  return (chunk ? chunk + ' - ' : '') + process.env.title
}

const config: NuxtConfiguration = {
  srcDir: './src',
  mode: 'universal',
  env: {
    title,
    description,
    storagePrefix,
    baseURL,
    apiURL
  },

  /**
   * Headers of the page
   */
  head: {
    title: '',
    titleTemplate,
    base: { target: '_blank', href: '/' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },

      // OpenGraph data (Most widely used)
      {
        hid: 'og:title',
        property: 'og:title',
        content: title,
        template: titleTemplate
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description
      },
      { property: 'og:site_name', content: title },
      { property: 'og:type', content: 'panel' },
      { property: 'og:url', content: baseURL },
      // { hid: 'og:image', property: 'og:image', content: image },

      // Twitter card
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: title },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: title,
        template: titleTemplate
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description
      },
      // { hid: 'twitter:image', name: 'twitter:image:src', content: image },

      // Google / Schema.org markup:
      { hid: 'gs_name', itemprop: 'name', content: title },
      {
        hid: 'gs_description',
        itemprop: 'description',
        content: description,
        template: titleTemplate
      }
      // { hid: 'gs_image', itemprop: 'image', content: image }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }] // , { rel: "canonical", href: baseURL }
  },

  /**
   * Customize the progress-bar color
   */
  loading: { color: '#318de0', failedColor: '#eb5c5b' },

  /**
   * Global CSS
   */
  css: [
    '@/assets/fonts/material-icons/material-icons.css',
    '@/assets/scss/main.scss'
  ],
  styleResources: {
    scss: '@/assets/scss/global.scss'
  },

  /**
   * Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/localStorage', ssr: false },
    '~/plugins/vee-validate',
    '~/plugins/apiURL',
    '~/plugins/directives'
  ],

  /**
   * Nuxt.js modules
   */
  modules: [
    [
      'nuxt-i18n',
      {
        parsePages: false,
        locales: [
          { code: 'en', name: 'English', iso: 'en-US', file: 'en.js' },
          { code: 'fr', name: 'Français', iso: 'fr-FR', file: 'fr.js' }
        ],
        defaultLocale: 'en',
        lazy: true,
        langDir: 'locales/',
        vueI18n: {
          fallbackLocale: 'en',
          dateTimeFormats: {
            fr: {
              long: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
              },
              timeShort: {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              },
              timeLong: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour: 'numeric',
                minute: 'numeric'
              }
            },
            en: {
              long: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
              },
              timeShort: {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              },
              timeLong: {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour: 'numeric',
                minute: 'numeric'
              }
            }
          }
        },
        detectBrowserLanguage: {
          useCookie: true,
          alwaysRedirect: true,
          fallbackLocale: 'en'
        },
        onLanguageSwitched: (previous, current): void => {
          if (process.client) {
            const expires = new Date()
            expires.setFullYear(expires.getFullYear() + 1)

            require('cookie').serialize('i18n_redirected', current, {
              expires,
              path: '/'
            })
          }
        }
      }
    ],
    '@nuxtjs/apollo',
    '@nuxtjs/toast',
    '@nuxtjs/style-resources'
  ],
  /**
   * Apollo module configuration
   */
  apollo: {
    tokenName: storagePrefix + 'token',
    includeNodeModules: true,
    errorHandler (error) {
      console.error(
        '%cError',
        'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
        error.message
      )
    },
    clientConfigs: {
      default: {
        httpEndpoint: apiURL + '/graphql',
        wsEndpoint:
          (process.env.API_WS_URL || baseURL.replace('http', 'ws')) +
          '/graphql',
        httpLinkOptions: {
          headers: {
            key: 'QV68P34ipxBNHp32c2xwks75uuMG5D2N'
          }
        }
      }
    }
  },
  /**
   * Toast module configuration
   */
  toast: {
    position: 'bottom-center',
    duration: 5000
  },

  /**
   * Proxy configuration
   */
  proxy: {
    '/api/': { target: apiURL, pathRewrite: { '^/api/': '/' } }
  },
  /**
   * Router configuration
   */
  router: {
    base: '/',
    linkActiveClass: '',
    linkExactActiveClass: ''
    // middleware: ['auth', 'user-agent']
  },

  /**
   * Build configuration
   */
  build: {
    analyze: false,
    // extractCSS: true,
    publicPath: '/public/',
    filenames: {
      app: ({ isDev }): string => (isDev ? '[name].js' : 'app.[hash:8].js'),
      css: ({ isDev }): string => (isDev ? '[name].css' : 'styles.[hash:8].css')
    },
    babel: {
      presets ({ isServer }): any[] {
        return [
          [
            '@nuxt/babel-preset-app',
            {
              targets: isServer
                ? { node: 'current' }
                : { browsers: ['last 2 versions'], ie: 11 }
            }
          ]
        ]
      }
    },
    /**
     * You can extend webpack config here
     */
    extend (config, ctx): void {
      if (
        typeof config.module === 'undefined' ||
        typeof config.plugins === 'undefined'
      ) {
        return
      }

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|ts|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|dist)/
        })
        config.plugins.push(new StyleLintPlugin())
      }
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.dev': ctx.isDev
        })
      )
    }
  }
}

export default config
