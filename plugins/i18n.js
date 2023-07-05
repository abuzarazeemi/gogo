// import { createI18n } from 'vue-i18n'


import en from '@/locales/en.json'
import es from '../locales/es.json'

// /**
//  * Load locale messages
//  *
//  * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
//  * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
//  */
// function loadLocaleMessages() {
//   const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
//   // const locales = {...en, ...es}
//   const messages = {}
//   Object.keys(locales).forEach(key => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i)
//     if (matched && matched.length > 1) {
//       const locale = matched[1]
//       messages[locale] = locales(key).default
//     }
//   })
//   return messages
// }

// export default defineNuxtPlugin(({ vueApp }) => {
// const i18n = createI18n({
//   locale: 'en',
//   fallbackLocale: 'en',
//   // messages: loadLocaleMessages()
//   messages: {
//     en,
//     es
//   }
// })
// vueApp.use(i18n)
// })

import { createI18n } from 'vue-i18n'

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
// function loadLocaleMessages() {
//   const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
//   const messages = {}
//   locales.keys().forEach(key => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i)
//     if (matched && matched.length > 1) {
//       const locale = matched[1]
//       messages[locale] = locales(key).default
//     }
//   })
//   return messages
// }

export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    es
  }
})
