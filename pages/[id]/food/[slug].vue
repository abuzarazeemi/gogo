<template>
  <div v-if="settings">
    <div class="max-w-6xl px-5 mx-auto">
      <!-- Categories -->
      <div class="mt-8">
        <Category />
      </div>

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

      <!-- best selling -->
      <div class="mt-8 md:mt-20">
        <best-selling />
      </div>

     

      <div class="mt-8 md:mt-20" id="vendor">
        <nearby-vendor />
      </div>

       <div class="mt-8 md:mt-20">
        <for-you />
      </div>
     
      <div class="mt-8 md:mt-20" id="vendor">
        <vendors />
      </div>
    </div>
    <Download />
  </div>
  <div
    v-if="showModal"
    class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
  >
    <div class="relative w-full max-w-6xl px-5 mx-auto">
      <div
        class="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none"
      >
        <div
          class="flex items-start justify-between p-2 text-white border-b border-solid rounded-t"
          :style="{ 'background-color': settings.colors.accentColor }"
        >
          <h3 class="text-3xl font-light">Search</h3>
          <button
            class="float-right p-1 ml-auto text-3xl font-semibold leading-none border-0 outline-none focus:outline-none"
            v-on:click="toggleModal()"
          >
            <span class="block w-6 h-6 text-2xl"> × </span>
          </button>
        </div>
        <div class="relative flex-auto p-6">
          <div class="flex space-x-2">
            <input
              type="text"
              name="search"
              v-model="search"
              placeholder="search product..."
              class="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
            <button
              @click="getSearchResult"
              class="px-1 py-2 text-xs rounded-md text-primary bg-primary"
            >
              <SearchIcon class="w-6 h-6 text-primary" aria-hidden="true" />
            </button>
          </div>

          <div class="flex flex-col" v-if="products">
            <div v-if="products.length <= 0">
              <p class="mt-5 text-center">No Product</p>
            </div>
            <div v-else class="grid grid-cols-2 gap-4 mt-16 md:grid-cols-4">
              <div class="my-5" v-for="product in products" :key="product.id">
                <!-- <a
                  :href="
                    $router.resolve({
                      name: 'Product',
                      params: {
                        id: product.id,
                        slug: sanitizeTitle(`${product.name}`),
                      },
                    }).href
                  "
                > -->
                  <a :href="`product/${product.id}/`+sanitizeTitle(`${product.name}`)">
                  <img
                    v-if="product"
                    v-bind:src="product.photo"
                    class="mx-auto rounded-lg h-14 md:h-44"
                  />
                  <p class="mt-2 text-xs font-semibold text-center md:text-xl">
                    {{ truncate(product.name, 15) }}
                  </p>
                  <span v-if="product.discount_price > 0">
                    <p class="text-xs text-center text-primary">
                      {{ currency }}
                      <span class="line-through">{{
                        product.price.toFixed(1)
                      }}</span>
                      <span class="text-xs">{{
                        product.discount_price.toFixed(1)
                      }}</span>
                    </p>
                  </span>
                  <span v-else>
                    <p class="text-xs text-center text-primary">
                      {{ currency }}{{ product.price }}
                    </p>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showModal" class="fixed inset-0 z-40 bg-black opacity-25"></div>
</template>

<script>
import Category from "@/components/Category.vue";
import ForYou from "@/components/ForYou.vue";
import Vendors from "@/components/Vendors.vue";
import BestSelling from "@/components/BestSelling.vue";
import Download from "@/components/Downloads.vue";
import axios from "axios";
import NearbyVendor from "@/components/NearbyVendor.vue";
import { SearchIcon } from "@heroicons/vue/outline";
import {useStorageStore} from '@/store/storage.js'
export default {
  name: "Restaurant",
  components: {
    Category,
    NearbyVendor,
    ForYou,
    BestSelling,
    SearchIcon,
    Vendors,
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
  data() {
    return {
      settings: null,
      banners: null,
      showModal: false,
      search: null,
      products: null,
      base_url: this.store.baseUrl,
    };
  },
  setup() { 
    const store = useStorageStore();
    return {store}
  },
  mounted() {
    axios
      .get(this.base_url + "api/app/settings")
      .then((response) => {
        this.settings = response.data;
      })
      .catch((error) => console.log(error));

    axios.get(this.base_url+'api/vendor/types/'+this.$route.params.id)
    .then((response) => {
        this.vendor = response.data
    })
    .catch(error => console.log(error))
      
  },

  methods: {
    truncate(str, n) {
      return str.length > n ? str.substr(0, n - 1) + "..." : str;
    },

    toggleModal: function () {
      this.showModal = !this.showModal;
    },

    sanitizeTitle(title) {
      var slug = "";
      // Change to lower case
      var titleLower = title.toLowerCase();
      // Letter "e"
      slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, "e");
      // Letter "a"
      slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, "a");
      // Letter "o"
      slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, "o");
      // Letter "u"
      slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, "u");
      // Letter "d"
      slug = slug.replace(/đ/gi, "d");
      // Trim the last whitespace
      slug = slug.replace(/\s*$/g, "");
      // Change whitespace to "-"
      slug = slug.replace(/\s+/g, "-");

      return slug;
    },

    getSearchResult() {
      this.store.setLoading(true)
      axios
        .get(this.base_url + "api/search?keyword=" + this.search)
        .then((response) => {
          // console.log(response)
          this.store.setLoadingoading(false);
          let search;
          search = response.data.products.data;
          this.products = search;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
