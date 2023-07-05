<template>
    <div class="">
        <div class="" v-if="vendors">
            <!-- <p class="leading-10 ">{{ vendors.menu.products.length }} Items Found</p> -->
            <div class="grid gap-4 lg:grid-cols-4">
                <div v-for="men in vendors.menu" :key="men.id">
                    <div class="relative p-3 rounded-md shadow-md group" v-for="product in men.products" :key="product.id">
                        <router-link :to="{ name: 'Product', params: { id: product.id, slug: sanitizeTitle(product.name) }}" >
                        <div class="w-full overflow-hidden min-h-80 aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:aspect-none">
                            <img  v-if="product.photo" v-bind:src="product.photo" class="object-contain object-center w-full h-full lg:w-32 lg:h-32">
                        </div>
                        <div class="flex flex-col mt-2 mb-2">
                            
                            <span v-if="product.discount_price > 0">
                                <p class="text-sm font-semibold text-gray-900">{{ currency }} <span class="line-through">{{ product.price.toFixed(1) }}</span> <span class="text-base">{{ product.discount_price.toFixed(1) }}</span></p>
                            </span>
                            <span v-else>
                                <p class="text-sm font-semibold text-gray-900">{{ currency }}{{ product.price.toFixed(2) }}</p>
                            </span>
                            <!-- <span aria-hidden="true" class="absolute inset-0"></span> -->
                            <p class="mt-1 text-sm text-gray-700 truncate">{{ product.name }}</p>
                            <!-- <div class="flex mt-5"> -->
                            <!-- <img v-if="product" :src="product.vendor.feature_image" class="object-cover w-4 h-4 rounded-md" alt=""> -->
                            <!-- <p class="w-24 p-1 text-xs text-gray-700 truncate bg-gray-100 rounded-md">{{ product.vendor.name }}</p> -->
                            <!-- </div> -->
                        </div>
                        </router-link>
                    </div>
                </div>
            </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
import {useStorageStore} from '@/store/storage.js'

export default {
  name: 'Vendors',
  components: {},
  
  data () {
    return {
      vendors: null,
      settings: null,
      base_url: this.store.baseUrl,
      currency: null,
    }
  },
  setup() { 
    const store = useStorageStore();
    return {store}
  },
  
  mounted () {
    this.getCurrency()
    
    if(this.vendors){
        this.store.setLoading(true)
        axios.get(this.base_url+'api/vendors/' + this.$route.params.id)
        .then((response) => {
            this.store.setLoading(false)
            this.vendors = response.data
            // console.log(this.vendors)
        })
        .catch(error => console.log(error))
    }

  },

//   computed: {
//     getVendorProduct()
//     {
//         this.$store.commit('loading', true)
//         axios.get(this.base_url+'api/vendors/' + this.$route.params.id)
//         .then((response) => {
//              this.$store.commit('loading', false)
//              let prodts = response.data
//              console.log(prodts)
//             this.vendorProducts = prodts
//             // console.log(this.vendorProducts)
//         })
//         .catch(error => console.log(error))
//     },
//   },

  methods: {
    getCurrency() {
        let setting;
        axios.get(this.base_url+'api/app/settings')
        .then( (response) => {
            setting = response.data;
            this.currency = setting.strings.currency
        })
        return this.currency;
    }, 

    
  },

}
</script>