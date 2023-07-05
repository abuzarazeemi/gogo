<template>

    <!-- <div class="container max-w-6xl p-5 mx-auto "> -->
        <iframe class="w-screen h-screen" :src="`${this.store.baseUrl}privacy/policy`" frameborder="0">
        </iframe>
    <!-- </div> -->

    <Download/>
</template>
<script>
import Download from '@/components/Downloads.vue'
import axios from 'axios'
import {useStorageStore} from '@/store/storage.js';

export default {
    components: {
        Download,
    },
    head() {
    return {
      title: "GoGo app: Grocery,Vegetables, Food, Taxi Booking & Courier",
      meta: [
        {
          name: 'description',
          content: 'GoGo the best delivery app gets you Food, Grocery, Medicine, Pet Supplies, Fruits & Vegetables, Meat & Fish, Health & Wellness, Gifts and Send Packages from.'
        }
      ]
    }
  },
  data () {
    return {
        settings: null,
        base_url: this.store.baseUrl
    }
  },
  setup() {
    const store = useStorageStore();
    return { store };
  },
};
</script>