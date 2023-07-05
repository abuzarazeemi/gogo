<template>
  <div id="app">

    <div class="flex flex-col h-screen overflow-x-hidden font-sans">

      <Nav />

      <div>
        <notifications position="top right" />
        <div class="flex items-center justify-center h-screen spin-content" v-if="loading">
          <pulse-loader class="" :color="color" :loading="loading"></pulse-loader>
        </div>
        <slot />
      </div>
      <Footer />
      <!-- <span class="absolute sticky inset-x-0 bottom-0 ">
      <Cookies/>
    </span> -->
      <span class="fixed inset-x-0 bottom-0 z-50">
        <Cookies />
        <span class="md:hidden">
          <MobileNav />
        </span>


      </span>

    </div>

  </div>
</template>


<script>
import Nav from '@/components/Nav.vue'
import Cookies from '@/components/Cookies.vue'
import Footer from '@/components/Footer.vue'
import MobileNav from '@/components/MobileNav.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
// import '.././tailwind.css'

import {useStorageStore} from '@/store/storage.js'
// const store = useStorageStore()

export default {
  name: 'Home',
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
    Nav,
    Footer,
    PulseLoader,
    MobileNav,
    Cookies
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
