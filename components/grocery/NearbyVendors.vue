<template>
<div class="px-2">
   <div class="flex justify-between my-10">
     <p class="text-2xl font-semibold text-gray-700">{{ $t('pages.nearbyvendors') }}</p>
     <!-- <div v-if="location"> -->
      <p class="flex justify-center text-sm font-light text-black">{{ address }}</p>
    <!-- </div> -->
  </div>
  <vue-horizontal responsive>
    <div  v-for="(vendor) in vendors" :key="vendor.id" class="grid grid-cols-1 gap-4 h-40 px-5">
      <!-- <a :href="$router.resolve({name: 'Vendor', params: { id: vendor.id, slug: sanitizeTitle(`${vendor.name}`) }}).href" class="flex flex-row items-center p-2 rounded-md shadow-md bg-gray-50 w-82 h-28"> -->
        <a :href="`/vendor/${vendor.id}/${sanitizeTitle(vendor.name)}`" class="flex flex-row items-center p-2 rounded-md shadow-md bg-gray-50 w-82 h-28">
        <img  v-if="vendor" v-bind:src="vendor.feature_image" class="w-16 h-16 rounded-full ">
        <div class="ml-5">
            <p class="mt-2 mb-1 font-semibold truncate">{{ vendor.name }}</p>
            <p class="text-xs text-black" v-if="vendor.address">{{ truncate(vendor.address, 50) }}</p>
            <span v-if="vendor.prepare_time != null">
              <p class="w-20 p-1 mt-1 text-xs font-light text-green-700 border rounded-md ">{{ vendor.prepare_time}} mins</p>
            </span>
        </div>
      </a>
    </div>
  </vue-horizontal>
</div>
 
</template>
<script>
import VueHorizontal from "vue-horizontal";
import {useStorageStore} from '@/store/storage.js'
import axios from 'axios'
export default {
  name: 'Vendors',
  components: {
    VueHorizontal,
  },
  
  data () {
    return {
      vendors: null,
      settings: null,
      places: [],
      currentPlace: null,
      marker: [],
      location: null,
      address: '',
      // latLong: null
    }
  },
  setup() { 
    const store = useStorageStore();
    return {store}
  },
  
  mounted () {
    let base_url = this.store.baseUrl
    let location
    navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          
        }
        location = this.marker.position
        let lati = location.lat
        let long = location.lng
        // console.log('lat', lati, 'long', long );
         axios.get(base_url+'api/vendors?lat='+lati+'&long='+long+'&vendor_type_id='+this.$route.params.id)
        .then((response) => {
          this.vendors = response.data.data
          }
          
        )
        .catch(error => console.log(error))
    })

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

    truncate(str, n){
      return (str.length > n) ? str.substr(0, n-1) + '...' : str;
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
             
        
    }
  },

}
</script>
