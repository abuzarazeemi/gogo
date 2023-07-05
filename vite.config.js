export default {
    // config options
    buildModules: [
        'nuxt-vite'
    ],
    optimizeDeps: {
        include: [
            "@fawmi/vue-google-maps",
            "fast-deep-equal",
        ],
    },
  }