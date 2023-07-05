// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  pwa: {
    iconPaths: {
      favicon: "img/app-store.png",
    },
  },
  // ssr: true,

  // plugins: ['~/plugins/i18n.js'],

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    },
  },

  components: true,

  css: ["~/tailwind.css", "~/assets/css/style.css"],

  modules: ["@pinia/nuxt"],
  buildModules: ["@pinia/nuxt"],

  build: {
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
    transpile: ['@fawmi/vue-google-maps']
  },
  optimizeDeps: {
    include: [
      "@fawmi/vue-google-maps",
      "fast-deep-equal",
    ],
  },

  app: {
    head: {
      charset: "utf-16",
      viewport: "width=500, initial-scale=1",
      title: "gogo",
      meta: [
        // <meta name="description" content="My amazing site">
        {
          name: "description",
          content: "GoGo app: Grocery,Vegetables, Food, Taxi Booking & Courier",
        },
        // {name: "csrf-token", content: "{{ csrf_token() }}"}
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://site-assets.fontawesome.com/releases/v6.1.1/css/all.css",
        },
      ],
      script: [
        // {src: "https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js"},
        // {src: "https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js"}
      ]
    },
  },

  // plugins: [
  //   // { src: "~/plugins/main", mode: "client"}
  // ]
});
