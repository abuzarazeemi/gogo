<template>
  <div class="container max-w-6xl px-5 mx-auto mt-10 mb-5" v-if="orders">
    <p
      class="flex justify-center mb-10 text-2xl font-medium md:justify-start md:font-light md:text-5xl md:mb-16"
    >
      {{ $t('orders.header') }}
    </p>
    <div>
      <div class="" v-if="orders.length <= 0">
        <p class="mt-5 text-center">{{ $t('orders.subHeader') }}</p>
      </div>
      <div class="flex flex-col mt-8" v-else>
        <div v-for="order in orders" :key="order.id">
          <div class="py-5 border-b" v-if="order.products.length != 0">
            <a
              :href="
                `order/details/${order.id}/` + sanitizeTitle(`${order.code}`)
              "
              class="flex items-center justify-between"
              v-for="product in order.products"
              :key="product.id"
            >
              <!-- <p class="text-black">{{ product.name }}</p> -->
              <div :aria-label="order.vendor.name" class="">
                <img
                  v-if="order"
                  v-bind:src="order.vendor.feature_image"
                  class="w-32 h-12 m-0 md:h-16"
                  alt=""
                />
              </div>
              <div
                :aria-label="order.vendor.name"
                class="w-32 p-2 m-0 text-center text-gray-600"
              >
                <p class="font-semibold text-smallest md:text-base">
                  {{ order.vendor.name }}
                </p>
                <p class="md:text-base text-smallest">
                  {{ product.quantity }} {{ $t('orders.product') }}(s)
                </p>
              </div>
              <div class="w-32 p-2 m-0 text-center text-gray-600">
                <p class="text-smallest md:text-base">#{{ order.code }}</p>
                <p class="md:text-xs text-smallest">
                  {{ order.formatted_date }}
                </p>
              </div>
              <div class="w-32 p-2 m-0 text-center" v-if="order">
                <p class="font-semibold text-center md:text-base text-smallest">
                  {{ currency }}{{ order.total.toFixed(2) }}
                </p>
                <p
                  class="text-center text-gray-500 md:text-base text-smallest"
                  v-if="order.status == 'cancelled'"
                >
                  {{ order.status }}
                </p>
                <p
                  class="text-center text-green-500 md:text-base text-smallest"
                  v-else-if="order.status == 'delivered'"
                >
                  {{ order.status }}
                </p>
                <p
                  class="text-center text-blue-500 md:text-base text-smallest"
                  v-else
                >
                  {{ order.status }}
                </p>
                <!-- <p class="px-4 py-2 text-xs text-center text-yellow-500 rounded-md " v-else>{{ order.status }}</p> -->
              </div>
            </a>
          </div>
          <div class="py-5 border-b" v-else-if="order.vendor == null">
            <!-- <p class="text-black">{{ order }}</p> -->
            <a
              v-if="order"
              :href="
                `order/details/${order.id}/` + sanitizeTitle(`${order.code}`)
              "
              class="flex items-center justify-between"
            >
              <div :aria-label="order.code" class="">
                <img
                  v-if="order"
                  v-bind:src="order.photo"
                  class="w-32 h-12 m-0 md:h-16"
                  alt=""
                />
              </div>
              <div
                :aria-label="order.code"
                class="w-32 p-2 m-0 text-center text-gray-600"
              >
                <p
                  class="font-semibold text-smallest md:text-base"
                  v-if="order.pickup_location == null"
                >
                  No location
                </p>
                <p class="md:text-base text-smallest">
                  {{ order.products.length }} Product(s)
                </p>
              </div>
              <div class="w-32 p-2 m-0 text-center text-gray-600">
                <p class="text-smallest md:text-base">#{{ order.code }}</p>
                <p class="md:text-xs text-smallest">
                  {{ order.formatted_date }}
                </p>
              </div>
              <div class="w-32 p-2 m-0 text-center" v-if="order">
                <p class="font-semibold text-center md:text-base text-smallest">
                  {{ currency }}{{ order.total.toFixed(2) }}
                </p>
                <p
                  class="text-center text-gray-500 md:text-base text-smallest"
                  v-if="order.status == 'cancelled'"
                >
                  {{ order.status }}
                </p>
                <p
                  class="text-center text-green-500 md:text-base text-smallest"
                  v-else-if="order.status == 'delivered'"
                >
                  {{ order.status }}
                </p>
                <p
                  class="text-center text-blue-500 md:text-base text-smallest"
                  v-else
                >
                  {{ order.status }}
                </p>
                <!-- <p class="px-4 py-2 text-xs text-center text-yellow-500 rounded-md " v-else>{{ order.status }}</p> -->
              </div>
            </a>
          </div>
          <div class="py-5 border-b" v-else>
            <!-- <p class="text-black">{{ order }}</p> -->
            <a
              v-if="order.vendor"
              :href="
                `order/details/${order.id}/` + sanitizeTitle(`${order.code}`)
              "
              class="flex items-center justify-between"
            >
              <div :aria-label="order.vendor.name" class="">
                <img
                  v-if="order"
                  v-bind:src="order.vendor.feature_image"
                  class="w-32 h-12 m-0 md:h-16"
                  alt=""
                />
              </div>
              <div
                :aria-label="order.vendor.name"
                class="w-32 p-2 m-0 text-center text-gray-600"
              >
                <p class="font-semibold text-smallest md:text-base">
                  {{ order.vendor.name }}
                </p>
                <p class="md:text-base text-smallest">
                  {{ order.products.length }} Product(s)
                </p>
              </div>
              <div class="w-32 p-2 m-0 text-center text-gray-600">
                <p class="text-smallest md:text-base">#{{ order.code }}</p>
                <p class="md:text-xs text-smallest">
                  {{ order.formatted_date }}
                </p>
              </div>
              <div class="w-32 p-2 m-0 text-center" v-if="order">
                <p class="font-semibold text-center md:text-base text-smallest">
                  {{ currency }}{{ order.total.toFixed(2) }}
                </p>
                <p
                  class="text-center text-gray-500 md:text-base text-smallest"
                  v-if="order.status == 'cancelled'"
                >
                  {{ order.status }}
                </p>
                <p
                  class="text-center text-green-500 md:text-base text-smallest"
                  v-else-if="order.status == 'delivered'"
                >
                  {{ order.status }}
                </p>
                <p
                  class="text-center text-blue-500 md:text-base text-smallest"
                  v-else
                >
                  {{ order.status }}
                </p>
                <!-- <p class="px-4 py-2 text-xs text-center text-yellow-500 rounded-md " v-else>{{ order.status }}</p> -->
              </div>
            </a>
          </div>
        </div>
      </div>
      <!-- <a href="{{orders.next_page_url}}"> Next</a> -->
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
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'
import {useStorageStore} from '@/store/storage'

export default {
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
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
      orders: null,
      AuthStr: null,
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

    this.AuthStr = `Bearer ${!process.server ? localStorage.getItem("authToken") : null}`

    this.getCurrency();

    this.store.setLoading(true)
    axios
      .get(this.base_url + "api/orders?page="+ this.pageNo, {
        headers: { Authorization: this.AuthStr },
      })
      .then((response) => {
        this.store.setLoading(false),
          this.orders = response.data.data,
          this.pagination = response.data
      })
      .catch((error) => console.log(error));
  },

  methods: {
    getCurrency() {
      let base_url = this.store.baseUrl;
      let setting;
      axios.get(base_url + "api/app/settings").then((response) => {
        setting = response.data;
        this.currency = setting.strings.currency;
      });
      return this.currency;
    },

   prevPage() {
      this.store.setLoading(true)
      this.pageNo--
      axios.get(this.base_url + "api/orders?page="+this.pageNo,{
        headers: { Authorization: this.AuthStr },
      })
      .then((response) => {
        this.store.setLoading(false)
        this.orders = response.data.data;
      })
        
    },

    nextPage() {
      this.store.setLoading(true)
      this.pageNo++
      axios.get(this.base_url + "api/orders?page="+this.pageNo, {
        headers: { Authorization: this.AuthStr },
      })
      .then((response) => {
        this.store.setLoading(false)
        this.orders = response.data.data;
      })
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
