<template>
  <div class="container flex flex-col px-5 mx-auto md:max-w-6xl" v-if="products">
    <div v-if="products.length <= 0">
        <p class="mt-5">No Products or vendors</p>
    </div>
    <div v-else class="flex flex-col w-full py-5">
      <div class="flex p-3 mt-2 bg-white rounded-md shadow">
        <input
          class="w-full p-2 border-white"
          v-model="search"
          type="text"
          placeholder="search by product or vendor"
        />
        <div
          @click="getSearchResult"
          class="flex items-center p-2 pl-4 pr-4 cursor-pointer"
        >
          <SearchIcon
            class="self-center w-6 h-6 font-black text-black md:w-6 md:h-6"
            aria-hidden="true"
          />
        </div>
      </div>
      <div class="flex flex-row py-5 mx-auto space-x-5 md:py-8 md:space-x-24">
        <div class="">
          <a
            @click="getAllProducts"
            class="text-center cursor-pointer hover:underline hover:text-gray-500"
            >Products</a
          >
        </div>
        <div class="">
          <a
            @click="getAllVendors"
            class="text-center cursor-pointer hover:underline hover:text-gray-500"
            >Vendors</a
          >
        </div>
      </div>

      <div v-if="showVendors">
        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          <a
            :href="`vendor/${vendor.id}/` + sanitizeTitle(`${vendor.name}`)"
            v-for="vendor in vendors"
            :key="vendor.id"
            class="flex flex-row items-center p-2 rounded-md shadow-md bg-gray-50 md:w-82 h-28"
          >
            <img  v-if="vendor" v-bind:src="vendor.feature_image" class="self-center w-16 h-16 rounded-full ">
            <div class="ml-5">
                <p class="mt-2 mb-1 font-semibold truncate">{{ vendor.name }}</p>
                <p class="text-xs text-black" v-if="vendor.address">{{ truncate(vendor.address, 50) }}</p>
                <div class="flex items-center mt-1" v-if="settings">
                    <ClockIcon class="w-4 h-4 mr-1" :style="{ 'color': settings.colors.deliveredColor }" aria-hidden="true" />
                    <p class="text-xs font-light" :style="{ 'color': settings.colors.deliveredColor }">{{ vendor.prepare_time}} mins</p>
                </div>
            </div>
          </a>
        </div>
      </div>
      <div v-else>
        <div class="grid gap-6 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <!-- <router-link
            :to="{
              name: 'Product',
              params: { id: product.id, slug: sanitizeTitle(product.name) },
            }"
            v-for="product in products"
            :key="product.id"
            class="w-60 h-80"
          > -->
          <a :href="`/product/${product.id}/${sanitizeTitle(product.name)}`" v-for="product in products" :key="product.id" class="w-60 h-80">
            <img
              v-if="product"
              v-bind:src="product.photo"
              class="w-56 h-56 mx-auto transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 rounded-t-xl"
            />
            <div class="p-3">
              <span v-if="product.discount_price > 0">
                <p class="text-sm font-medium text-black">
                  {{ currency
                  }}<span class="mr-1">{{
                    product.discount_price.toFixed(1)
                  }}</span>
                  <span class="text-xs line-through">{{
                    product.price.toFixed(1)
                  }}</span>
                </p>
              </span>
              <span v-else>
                <p class="text-sm font-medium text-black">
                  {{ currency }}{{ product.price.toFixed(2) }}
                </p>
              </span>
              <p class="font-light truncate">{{ truncate(product.name, 25) }}</p>
              <div class="" v-if="product.available_qty > 0">
                <p class="text-xs font-medium">Instock</p>
              </div>
              <div v-else>
                <p class="text-xs font-medium">Available</p>
              </div>
            </div>
          </a>
          <!-- </router-link> -->
        </div>
      </div>
    </div>
    <div
      class="flex items-center justify-between px-4 py-3 mt-5 bg-white border-t border-gray-200 sm:px-6"
    >
      <div class="flex justify-between flex-1 sm:hidden">
        <a
          @click="prevPage"
          class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          @click="nextPage"
          class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700" v-if="products">
            Showing
            {{ " " }}
            <span class="font-medium">{{ pageNo }}</span>
            {{ " " }}
            to
            {{ " " }}
            <span class="font-medium">{{ pagination.per_page }}</span>
            {{ " " }}
            of
            {{ " " }}
            <span class="font-medium">{{ pagination.last_page }}</span>
            {{ " " }}
            results
          </p>
        </div>
        <div>
          <nav
            class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              :class="
                page === 1
                  ? ' relative disabled:bg-gray-300 inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-300 rounded-l-md hover:bg-gray-50'
                  : 'relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50'
              "
              @click="prevPage"
              class=""
            >
              <span class="sr-only">Previous</span>
              <ChevronLeftIcon class="w-5 h-5" aria-hidden="true" />
            </button>

            <button
              @click="nextPage"
              class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
            >
              <span class="sr-only">Next</span>
              <ChevronRightIcon class="w-5 h-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <Download />
</template>
<script>
import axios from "axios";
import { SearchIcon } from "@heroicons/vue/outline";
import { StarIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/vue/solid";
import Download from "@/components/Downloads.vue";
import {useStorageStore} from '@/store/storage.js'
export default {
  name: "Vendors",
  components: {
    SearchIcon,
    StarIcon,
    ChevronRightIcon,
    ClockIcon,
    ChevronLeftIcon,
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
      vendors: null,
      settings: null,
      base_url: this.store.baseUrl,
      products: null,
      currency: null,
      selectedProducts: null,
      search: null,
      types: null,
      pageNo: 1,
      page: 1,
      perPage: 20,
      pagination: null,
      showVendors: false,
      settings: null,
    };
  },

  setup() { 
    const store = useStorageStore();
    return {store}
  },

  created() {
    if (this.$route.query.search) {
      this.search = this.$route.query.search
      this.getSearchResult()
    }
  },

  mounted() {
      
    axios.get(this.base_url + "api/app/settings")
    .then((response) => {
      this.settings = response.data;
    })
    .catch((error) => console.log(error));

    this.getCurrency();

    this.store.setLoading(true)
    // ?vendor_type_id=" + 2
    axios.get(this.base_url + "api/products")
    .then((response) => {
      this.store.setLoading(false)
      this.products = response.data.data;
      this.pagination = response.data
    })
      .catch((error) => console.log(error));
  },

  methods: {
    getCurrency() {
      let setting;
      axios.get(this.base_url + "api/app/settings").then((response) => {
        setting = response.data;
        this.currency = setting.strings.currency;
      });
      return this.currency;
    },

    truncate(str, n) {
      return str.length > n ? str.substr(0, n - 1) + "..." : str;
    },

    prevPage() {
      if(this.showVendors == false)
      {
         this.store.setLoading(true)
        this.pageNo--
        axios.get(this.base_url + "api/products?page="+this.pageNo)
        .then((response) => {
          this.store.setLoading(false)
          this.products = response.data.data;
        })
        
      }else {
        this.store.setLoading(true)
        this.pageNo--
        axios.get(this.base_url + "api/vendors?page="+this.pageNo)
        .then((response) => {
          this.store.setLoading(false)
          this.vendors = response.data.data;
        })
      }
    },

    nextPage() {
     if(this.showVendors == false)
      {
        this.store.setLoading(true)
        this.pageNo++
        axios.get(this.base_url + "api/products?page="+this.pageNo)
        .then((response) => {
          this.store.setLoading(false)
          this.products = response.data.data;
        })
        
      }else {
        this.store.setLoading(true)
        this.pageNo++
        axios.get(this.base_url + "api/vendors?page="+this.pageNo)
        .then((response) => {
          this.store.setLoading(false)
          this.vendors = response.data.data;
        })
      }
    },
    
    getAllProducts() {
      this.showVendors = false;
      this.store.setLoading(true)
    //   ?vendor_type_id=" + 2
      axios
        .get(this.base_url + "api/products")
        .then((response) => {
          this.store.setLoading(false)
          this.products = response.data.data;
          // console.log(this.products)
        })
        .catch((error) => console.log(error));
    },

    getAllVendors() {
      this.showVendors = true;
    //   ?vendor_type_id=" + 2
      this.store.setLoading(true)
      axios
        .get(this.base_url + "api/vendors")
        .then((response) => {
          this.store.setLoading(false)
          this.vendors = response.data.data;
          // console.log(this.vendors)
        })
        .catch((error) => console.log(error));
    },

    getSearchResult() {
      this.store.setLoading(true)
      axios
        .get(this.base_url + "api/search?keyword=" + this.search)
        .then((response) => {
          //   console.log(response)
          this.store.setLoading(false)
          let productSearch;
          let vendorSearch;
          productSearch = response.data.products.data;
          vendorSearch = response.data.vendors.data;
          this.products = productSearch;
          this.vendors = vendorSearch;
        })
        .catch((error) => console.log(error));
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
  },
};
</script>
