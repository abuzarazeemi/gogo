<template>
<div class="px-2">
     <div class="flex justify-between mb-10">
        <div>
          <p class="text-2xl font-semibold text-gray-700">{{ $t('pages.vendors') }}</p>
          <p class="pt-1 text-sm text-black">{{ $t('pages.vendorSubHeader2') }}</p>
        </div>
        
        <a class="flex" href="/search">
            {{ $t('pages.seeall') }}
            <ArrowNarrowRightIcon class="w-4 h-4 ml-1 text-gray-400" aria-hidden="true" />
        </a>
    </div>
     
  <vue-horizontal responsive>
    <div  v-for="(vendor) in vendors" :key="vendor.id" class="grid grid-cols-1 gap-4 px-3 h-44">
      <!-- <a :href="$router.resolve({name: 'Vendor', params: { id: vendor.id, slug: sanitizeTitle(`${vendor.name}`) }}).href" class="flex flex-row items-center p-2 rounded-md shadow-md bg-gray-50 w-82 h-28"> -->
      <a :href="`/vendor/${vendor.id}/${vendor.name}`" class="flex flex-row items-center p-2 rounded-md shadow-md bg-gray-50 w-82 h-28">
        <img  v-if="vendor" v-bind:src="vendor.feature_image" class="w-16 h-16 rounded-full ">
        <div class="ml-5">
            <p class="mt-2 mb-1 text-sm font-semibold truncate">{{ vendor.name }}</p>
            <div class="">
               <p class="flex py-1">
                <span class="font-light " v-for="star in vendor.rating" :key="star.id">
                  <starIcon {{ star }} class="self-center w-3 h-3 text-yellow-400" aria-hidden="true" />
                </span>
              </p>
            </div>
            <p class="text-xs font-light text-gray-700" v-if="vendor.address">{{ truncate(vendor.address, 50) }}</p>
            <!-- <p class="text-xs font-light text-gray-700 truncate">{{ truncate(vendor.address, 15) }}</p> -->
        </div>
      </a>
    </div>
  </vue-horizontal>
</div>
 
</template>
<script>
import VueHorizontal from "vue-horizontal"
import axios from 'axios'
import { StarIcon } from '@heroicons/vue/solid'
import { ArrowNarrowRightIcon } from '@heroicons/vue/outline'
import {useStorageStore} from '@/store/storage.js'
export default {
  name: 'Vendors',
  components: {
    ArrowNarrowRightIcon,
    VueHorizontal,
    StarIcon,
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
      vendors: null,
      settings: null,
      base_url: this.store.baseUrl
    }
  },
  setup() { 
    const store = useStorageStore();
    return {store}
  },
  
  mounted () {
    axios.get(this.base_url+'api/vendors?vendor_type_id='+ this.$route.params.id)
    .then((response) => {
      this.vendors = response.data.data
      }
      
    )
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
