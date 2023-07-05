<template>
  <NuxtLayout>
    <NuxtPage v-if="$route.path != '/'" />
    <Home v-else />
  </NuxtLayout>
</template>


<script>
// import Nav from '@/components/Nav.vue'
// import Cookies from '@/components/Cookies.vue'
// import Footer from '@/components/Footer.vue'
// import MobileNav from '@/components/MobileNav.vue'
// import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
// import './tailwind.css'

import {useStorageStore} from '@/store/storage.js'
import Home from '@/pages/Home.vue'
// const store = useStorageStore()

export default {
  data() {
    return {
      color: '#98d1c8',
      color1: '#5bc0de',
      size: '45px',
      margin: '2px',
      radius: '2px'
    }
  },
  components: {
    Home
    // Nav,
    // Footer,
    // PulseLoader,
    // MobileNav,
    // Cookies
  },
  setup() { 
    const store = useStorageStore();
    return {store}
  },
  computed: {
    loading() {
      return this.store.loading
    }
  },
  mounted() {
    this.store.setCartItems(JSON.parse(!process.server ? localStorage.getItem("cart") : []))
    // document.title = "GoGo"
  }
}
</script>
<style lang="scss" scoped>
.spin-content {
  background-color: #fff;
  padding: 30px;
  align-items: center;
}
</style>
