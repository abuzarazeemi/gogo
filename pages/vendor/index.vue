<template>
  <div class="pt-10 pb-5 bg-gray-50 vendor">
    <!-- <div class="max-w-full ">
       <img  v-if="vendor" v-bind:src="vendor.feature_image" class="w-full bg-center bg-contain" style="height: 450px">
    </div> -->
   
    <div class="container px-5 mx-auto max-w-7xl" v-if="vendor">
      <div class="mb-5">
          <div class="flex flex-col md:space-x-5 md:flex-row">
            <img  v-if="vendor" v-bind:src="vendor.logo" class="rounded-md w-14 h-14">
            <div>
              <div class="flex flex-col ">
                <div class="flex md:flex-row">
                  <div class="flex flex-row space-x-5">
                    <p class="self-center font-big md:text-5xl sm:mt-0 leading-large ">{{ vendor.name }}</p>
                    <p class="flex py-3">
                      <span class="flex p-1 space-x-1 bg-white border rounded-md">
                        <starIcon class="self-center w-4 h-4 text-yellow-400" aria-hidden="true" />
                        <p class="text-xs font-semibold">{{ vendor.rating }}</p>
                      </span>
                    </p>
                    <div v-if="vendor.vendor_type.slug == 'pharmacy'" class="flex items-center ">
                      <div v-if="settings" class="p-1 rounded-md" :style="{ 'background-color': settings.colors.primaryColor }">
                        <!-- <a :href="$router.resolve({name: 'UploadPrescription', params: { id: vendor.id, slug: sanitizeTitle(`${vendor.name}`) }}).href"> -->
                        <a :href="`/upload-prescription/${vendor.id}/${sanitizeTitle(vendor.name)}`">
                          <UploadIcon class="w-4 h-4 text-white" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                    
                  </div>
                  
                  
                </div>
                  
                  <!-- <div class="container p-5 mx-auto"> -->
                    <!-- <div class="sticky inset-x-0 md:hidden" v-if="settings">
                      <a href="" class="absolute bottom-0 right-0 flex p-1 space-x-2 text-sm text-white rounded-full w-44" :style="{ 'background-color': settings.colors.primaryColor }" v-if="vendor.vendor_type_id == 4"><PlusCircleIcon class="self-center w-6 h-6 rounded-full " aria-hidden="true" /><span>Upload Prescription</span></a>
                    </div> -->
                  <!-- </div> -->
                  <div class="flex flex-col md:space-x-3 md:flex-row ">
                    <!-- <p class="flex py-3">
                      <span class="font-light " v-for="star in vendor.rating" :key="star.id">
                        <starIcon {{ star }} class="self-center w-3 h-3 text-yellow-400 md:mt-0 md:w-6 md:h-6" aria-hidden="true" />
                      </span>
                    </p> -->
                
                    <p class="flex py-3 font-light">
                      <LocationMarkerIcon class="self-center w-4 h-4 text-black" aria-hidden="true" />
                      <span class="px-1 text-sm font-light text-black">{{ vendor.address }}</span>
                    </p>
                    <p class="flex py-3 font-light">
                      <PhoneIcon class="self-center w-4 h-4 text-black" aria-hidden="true" />
                      <span class="px-1 text-sm font-light text-black">{{ vendor.phone }}</span>
                    </p>
                    <p class="flex py-3 font-light">
                      <MailIcon class="self-center w-4 h-4 text-black" aria-hidden="true" />
                      <span class="px-1 text-sm font-light text-black">{{ vendor.email }}</span>
                    </p>
                  </div>
                  
              </div>
              <div class="flex flex-col text-black md:space-x-5 md:flex-row" v-if="settings">
                <p class="mb-2 text-sm font-light" >Min Order: {{ currency }}{{ vendor.min_order ? vendor.min_order : '0.00'}}</p>
                <p class="mb-2 text-sm font-light">Max Order: {{ currency }}{{ vendor.max_order ? vendor.max_order : '0.00'}}</p>
                
                <span class="w-16 px-2 py-1 mb-2 text-sm text-center text-black bg-gray-100 rounded-md shadow-sm" v-if="vendor.is_open">Opened</span>
                <span class="w-16 px-2 py-1 mb-2 text-sm text-center text-black bg-gray-100 rounded-md shadow-sm" v-else>Closed</span>
                <span class="w-16 px-2 py-1 mb-2 text-sm text-center text-black bg-gray-100 rounded-md shadow-sm" v-if="vendor.pickup == 1">Pickup</span>
                <span class="w-16 px-2 py-1 mb-2 text-sm text-center text-black bg-gray-100 rounded-md shadow-sm" v-if="vendor.delivery == 1">Delivery</span>
                <!-- :style="{ 'background-color': settings.colors.deliveryColor }" -->
              </div>
              <div class="flex" v-if="vendor.prepare_time">
                <div class="flex items-center mt-1 mr-5" v-if="settings">
                  <ClockIcon class="w-4 h-4 mr-1" :style="{ 'color': settings.colors.deliveredColor }" aria-hidden="true" />
                  <p class="text-xs font-light" :style="{ 'color': settings.colors.deliveredColor }">{{ vendor.prepare_time}} mins</p>
                </div>
                <div class="flex items-center mt-1" v-if="settings">
                    <LightningBoltIcon class="w-4 h-4 mr-1" :style="{ 'color': settings.colors.deliveredColor }" aria-hidden="true" />
                    <p class="text-xs font-light" :style="{ 'color': settings.colors.deliveredColor }">{{ vendor.delivery_time}} mins</p>
                </div>
              </div>
              <p class="mt-2 text-sm text-black">{{ vendor.description }}</p>
            </div>
            
          </div>
        
        
        <MenuTab/>
        
      </div>
    </div>
    <!-- footer -->
    <!-- <Footer/> -->
  </div>
  <Download/>
  <!-- <div class="container p-5 mx-auto">
    <div class="relative md:hidden" v-if="settings">
      <a href="" class="absolute bottom-0 right-0 flex p-1 space-x-2 text-sm text-white rounded-full w-44" :style="{ 'background-color': settings.colors.primaryColor }" v-if="vendor.vendor_type_id == 4"><PlusCircleIcon class="self-center w-6 h-6 rounded-full " aria-hidden="true" /><span>Upload Prescription</span></a>
    </div>
  </div> -->
  
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
// import Footer from '@/components/Footer.vue'
import MenuTab from '@/components/MenuTab.vue'
import Download from '@/components/Downloads.vue'
// import { LocationMarkerIcon, PhoneIcon, MailIcon, PlusCircleIcon } from '@heroicons/vue/outline'
import { StarIcon, LocationMarkerIcon, PhoneIcon, MailIcon, PlusCircleIcon, UploadIcon, LightningBoltIcon, ClockIcon } from '@heroicons/vue/solid'
import {useStorageStore} from '@/store/storage'

export default {
  name: 'vendor',
  components: {
    // Footer,
    Download,
    MenuTab,
    LocationMarkerIcon,
    StarIcon,
    PhoneIcon,
    MailIcon,
    PlusCircleIcon,
    UploadIcon,
    LightningBoltIcon, 
    ClockIcon
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
      vendor: null,
      currency: null,
      base_url: this.store.baseUrl,
      settings: null
    }
  },

  setup() { 
    const store = useStorageStore();
    return {store}
  },
  
  mounted () {
    
    this.store.setLoading(true)
    axios.get(this.base_url+'api/vendors/' + this.$route.params.id)
    .then((response) => {
      this.store.setLoading(false)
      this.vendor = response.data
    })
    .catch(error => console.log(error))

    axios.get(this.base_url+'api/app/settings')
      .then((response) => {
        this.settings = response.data
        this.currency = this.settings.strings.currency
      })
      .catch(error => console.log(error))
  },

  methods: {
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
  }
}
</script>
