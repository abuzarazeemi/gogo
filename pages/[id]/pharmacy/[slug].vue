<template>
    <div class="container px-5 mx-auto md:max-w-6xl" v-if="vendors">
        <div class="flex flex-col w-full py-5">
            <div class="flex p-3 mb-8 bg-white rounded-md shadow">
                <!-- <span class="flex items-center justify-end w-auto p-2 text-gray-500">
                    <SearchIcon class="self-center w-6 h-6 text-gray-200 md:w-6 md:h-6" aria-hidden="true" />
                </span> -->
                <input class="w-full p-2 focus:none" v-model="search" type="text" placeholder="kfc">
                <div @click="getSearchResult" class="flex items-center cursor-pointer">
                        <p class="text-xs font-semibold"><SearchIcon class="self-center w-6 h-6 text-black" aria-hidden="true" /></p>
                </div>
            </div>

            <div class="flex justify-between my-10">
                <p class="text-base font-semibold text-gray-700 md:text-2xl">{{ $t('pages.nearbyvendors') }}</p>
              <!-- <div v-if="location"> -->
                <p class="flex justify-center text-sm font-light text-black">{{ address }}</p>
              <!-- </div> -->
            </div>

            <div v-if="vendors">
              <div class="grid gap-y-10 sm:grid-cols-2 place-content-center gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 xl:gap-x-8" >
                  <!-- <a :href="$router.resolve({name: 'Vendor', params: { id: vendor.id, slug: sanitizeTitle(`${vendor.name}`) }}).href"  v-for="vendor in vendors" :key="vendor.id" class="flex flex-row items-center p-2 rounded-md shadow-md bg-gray-50 md:w-82 h-28"> -->
                  <a :href="`/vendor/${vendor.id}/${sanitizeTitle(vendor.name)}`"  v-for="vendor in vendors" :key="vendor.id" class="flex flex-row items-center p-2 rounded-md shadow-md bg-gray-50 md:w-82 h-28">
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
            </div>
            <div v-if="vendors.length == 0">
              <p class="text-center">{{ $t('pages.noVendors') }}</p>
            </div>
        </div>
    </div>
    <Download/>
</template>
<script>
import axios from 'axios'
import { SearchIcon } from '@heroicons/vue/outline'
import { StarIcon } from '@heroicons/vue/solid'
import Download from '@/components/Downloads.vue'
import {useStorageStore} from '@/store/storage.js'
export default {
  name: 'Vendors',
  components: {
    SearchIcon,
    StarIcon,
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
      vendors: null,
      settings: null,
      base_url: this.store.baseUrl,
      search: null,
      types: null,
       places: [],
      currentPlace: null,
      marker: [],
      location: null,
      address: '',
    }
  },

  setup() { 
    const store = useStorageStore();
    return {store}
  },
  
  mounted () {

    axios.get(this.base_url+'api/vendors?vendor_type_id='+this.$route.params.id)
        .then((response) => {
            this.vendors = response.data.data
        }
    )
    .catch(error => console.log(error))

    this.getStreetAddressFrom()
    
    navigator.geolocation.getCurrentPosition(
      position => {
        let lat = position.coords.latitude
        let long = position.coords.longitude
         this.getStreetAddressFrom(lat, long)
      },
      error => {
         console.log(error.message);
      }
   )

  },

  methods: {

    truncate(str, n){
      return (str.length > n) ? str.substr(0, n-1) + '...' : str;
    },

    getSearchResult()
    {
      this.store.setLoading(true)
      axios.get(this.base_url+'api/search?keyword='+this.search)
        .then((response) => {
          this.store.setLoading(false)
          let vendorSearch
          vendorSearch = response.data.vendors.data
          this.vendors = vendorSearch
        })
        .catch(error => console.log(error))
    },

     getStreetAddressFrom(lat, long) 
      {
        navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          
        }
        let geolacat = this.marker.position
                // lat
                // lat = this.geolocate.lat
                long = geolacat.lng
                lat = geolacat.lat

                  axios.get(
                    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
                    lat +
                    "," +
                    long +
                    "&key=AIzaSyCpC_EvzUOBP8LxwaEU75dtoP8_hIIfPlM"
                  )
                  .then((response) => {
                    this.address = response.data.results[0].formatted_address;
                    
                    }
                    
                  )
                  .catch(error => console.log(error))
                  // if (data.error_message) {
                  //   console.log(data.error_message)
                  // } else {
                  //   this.address = data.results[0].formatted_address;
                  // }

        })
             
        
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