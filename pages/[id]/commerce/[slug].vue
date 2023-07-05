<template>
<div v-if="settings">
    <div class="max-w-6xl px-5 mx-auto">
      
      <!-- Categories -->
      <div class="mt-8">
        <Category />
      </div>

    <div class="mt-8 md:mt-20">
      <FlashSale/>
    </div>

    <div class="mt-8 md:mt-20">
      <NewArrival/>
    </div>

    <div class="mt-8 md:mt-20">
      <BestSelling/>
    </div>


    <div class="mt-8 md:mt-20">
      <Book/>
    </div>

  </div>

  <Download/>
</div>
</template>

<script>
import Category from '../../../components/Category.vue'
import BestSelling from '../../../components/BestSelling.vue'
import FlashSale from '../../../components/ecommerce/FlashSales.vue'
import NewArrival from '../../../components/ecommerce/NewArrivals.vue'
import Book from '../../../components/ecommerce/Books.vue'
import Download from '@/components/Downloads.vue'
// import VendorBanner from '@/components/VendorBanner.vue'
import axios from 'axios'
import { SearchIcon } from '@heroicons/vue/outline'
import {useStorageStore} from '@/store/storage.js'
export default {
  name: 'Home',
  components: {
    Category,
    BestSelling,
    FlashSale,
    NewArrival,
    Book,
    SearchIcon,
    Download,
    // VendorBanner
  },
  data () {
    return {
      settings: null,
      search: null,
      products: null,
      base_url: this.store.baseUrl

    }
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