<template>
  <div class="container px-5 mx-auto mb-5 max-w-7xl" v-if="products">
    <!-- <div> -->
      <div v-if="products.length <= 0">
        <p class="mt-5">No Product associated to this category</p>
      </div>
      <div v-else class="grid grid-cols-2 gap-5 mt-8 place-content-center md:grid-col-4 lg:grid-cols-6">
        <div class="" v-for="product in products" :key="product.id">
          <!-- <a :href=" $router.resolve({ name: 'Product', params: {id: product.id, slug: sanitizeTitle(`${product.name}`),},}).href"> -->
            <!-- <NuxtLink :to="{params: {id: product.id, slug: sanitizeTitle(`${product.name}`)}}"> -->
              <a :href="`/product/${product.id}/${sanitizeTitle(product.name)}`">
            <div class="flex items-center w-32 h-40">
              <img v-if="product" v-bind:src="product.photo" class="h-32 transition duration-500 ease-in-out transform w-28 hover:-translate-y-1 hover:scale-100"/>
            </div>
            <div class="w-32">
              <div class="flex flex-col">
                <span>
                  <p class="pb-1 text-sm font-bold text-black ">
                    {{ currency }}{{ product.price.toFixed(2) }}
                  </p>
                </span>
                <div>
                  <p class="text-sm text-gray-500 capitalize">
                    {{ truncate(product.name, 30) }}
                  </p>
                </div>
                
              </div>
              
            </div>
            <!-- </NuxtLink> -->
          </a>
        </div>
      </div>
    <!-- </div> -->
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
          <p class="text-sm text-gray-700" v-if="pagination">
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
import Download from "@/components/Downloads.vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";
import {useStorageStore} from '@/store/storage.js'
export default {
  components: {
    Download,
    ChevronLeftIcon,
    ChevronRightIcon,
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
      products: [],
      currency: null,
      pageNo: 1,
      page: 1,
      perPage: 20,
      pagination: null,
      base_url: this.store.baseUrl,
    };
  },
  setup() { 
    const store = useStorageStore();
    return {store}
  },
  mounted() {
    this.getCurrency();

    axios.get(this.base_url +"api/search?category_id=" +this.$route.params.id)
    .then((response) => {
      let search;
      this.pagination = response.data.products
      search = response.data.products.data;
      this.products = search;
    });
  },

  methods: {
    prevPage() {
      this.store.setLoading(true)
      this.pageNo--
      axios.get(this.base_url + "api/search?category_id=" +this.$route.params.id+"?page="+this.pageNo)
      .then((response) => {
        this.store.setLoading(false)
        this.products = response.data.data;
      })
        
    },

    nextPage() {
      this.store.setLoading(true)
      this.pageNo++
      axios.get(this.base_url + "api/search?category_id=" +this.$route.params.id+"?page="+this.pageNo)
      .then((response) => {
        this.store.setLoading(false)
        this.products = response.data.data;
      })
    },

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

    // slugify(string) {
    //   return string
    //   .toString()
    //   .trim()
    //   .toLowerCase()
    //   .replace(/\s+/g, "-")
    //   // eslint-disable-next-line no-useless-escape
    //   .replace(/[^\w\-]+/g, "")
    //   // eslint-disable-next-line no-useless-escape
    //   .replace(/\-\-+/g, "-")
    //   .replace(/^-+/, "")
    //   .replace(/-+$/, "");
    // }
  },
};
</script>
