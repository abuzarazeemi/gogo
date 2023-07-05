<template>
<div v-if="settings">
    <div class="max-w-6xl px-5 mx-auto">
        <div v-if="vendor" class="mt-20 rounded-lg" :style="{ 'background-color': settings.colors.primaryColor }">
        <!-- <div class=""> -->
          <div v-if="vendor.website_header != ''" class="flex items-center justify-between p-4">
            <div class="p-5 md:h-72 h-80 flex-col flex justify-center items-center">
              <h2 class="text-4xl font-bold text-white">
                {{ settings ? settings.strings.website.websiteHeaderTitle : "" }}
                <!-- Book your favourite restaurant with lovely menu -->
              </h2>
              <p class="mt-3 text-2xl text-gray-200">
                {{ settings ? settings.strings.website.websiteHeaderSubtitle : "" }}
                <!-- Crispy Tofu Salad Greens & Honey Chilli -->
              </p>
            </div>
            <div class="hidden md:block">
              <img :src="vendor.website_header" class="object-contain h-64 rounded-xl"/>
            </div>
          </div>
          <!-- <div v-else class="flex items-center justify-center p-4"> -->
            <div v-else  class="p-5 md:h-72 h-80 flex flex-col items-center justify-center">
              <h2 class="text-4xl font-bold text-white">
                {{ settings ? settings.strings.website.websiteHeaderTitle : "" }}
                <!-- Book your favourite restaurant with lovely menu -->
              </h2>
              <p class="mt-3 text-2xl text-gray-200">
                {{ settings ? settings.strings.website.websiteHeaderSubtitle : "" }}
                <!-- Crispy Tofu Salad Greens & Honey Chilli -->
              </p>
            </div>
           
          <!-- </div> -->
        <!-- </div> -->
      </div>
      <!-- Categories -->
      <div class="mt-8">
        <Category />
      </div>

     

    <div class="mt-8 md:mt-20">
      <TodaysPicks/>
    </div>

    <div class="mt-8 md:mt-20" id="vendor">
      <nearby-vendor/>
    </div>

  </div>

  <Download/>

  <!-- <div class="my-40 ">
    <VendorBanner/>
  </div> -->
</div>
</template>

<script>
import Category from '@/components/Category.vue'
import TodaysPicks from '@/components/grocery/TodaysPicks.vue'
import Download from '@/components/Downloads.vue'
// import VendorBanner from '@/components/VendorBanner.vue'
import axios from 'axios'
import NearbyVendor from '@/components/grocery/NearbyVendors.vue'
import { SearchIcon } from '@heroicons/vue/outline'
import {useStorageStore} from '@/store/storage'
export default {
  name: 'Home',
  components: {
    Category,
    NearbyVendor,
    TodaysPicks,
    SearchIcon,
    Download,
    // VendorBanner
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
      search: null,
      products: null,
      base_url: this.store.baseUrl

    }
  },
  setup() { 
    const store = useStorageStore();
    return {store}
  },
  mounted() {
    
    axios.get(this.base_url+'api/app/settings')
      .then((response) => {
        this.settings = response.data
      })
      .catch(error => console.log(error))

     axios.get(this.base_url+'api/vendor/types/'+this.$route.params.id)
    .then((response) => {
        this.vendor = response.data
    })
    .catch(error => console.log(error))

  },

  methods: {

    truncate(str, n){
      return (str.length > n) ? str.substr(0, n-1) + '...' : str;
    },

    sanitizeTitle(title) {
      var slug = "";
      // Change to lower case
      var titleLower = title.toLowerCase();
      // Letter "e"
      slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
      // Letter "a"
      slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
      // Letter "o"
      slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
      // Letter "u"
      slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
      // Letter "d"
      slug = slug.replace(/đ/gi, 'd');
      // Trim the last whitespace
      slug = slug.replace(/\s*$/g, '');
      // Change whitespace to "-"
      slug = slug.replace(/\s+/g, '-');
      
      return slug;
    },

  },
 
}
</script>

