<template>
  <div
    class="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
    v-if="vendors"
  >
    <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
      <div
        class="relative p-3 rounded-md shadow-md group"
        v-for="vendor in vendors"
        :key="vendor.id"
      >
        <!-- <router-link
          :to="{
            name: 'Vendor',
            params: { id: vendor.id, slug: sanitizeTitle(vendor.name) },
          }"
        > -->
        <a :href="`/vendor/${vendor.id}/${sanitizeTitle(vendor.name)}`">
          <div
            class="w-full overflow-hidden rounded-lg aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8"
          >
            <img
              v-if="vendor"
              v-bind:src="vendor.feature_image"
              class="object-cover object-center w-full h-full md:h-56 group-hover:opacity-75"
            />
          </div>
          <div class="p-3 shadow-sm rounded-b-md bg-gray-50">
            <p class="mt-2 mb-1 font-semibold truncate">{{ vendor.name }}</p>
            <div class="flex flex-row ">
              <p class="flex py-1">
                <span
                  class="font-light "
                  v-for="star in vendor.rating"
                  :key="star.id"
                >
                  <starIcon
                    {{
                    star
                    }}
                    class="self-center w-3 h-3 text-yellow-400 md:mt-0 md:w-6 md:h-6"
                    aria-hidden="true"
                  />
                </span>
              </p>
            </div>
            <p class="text-xs font-light text-gray-700 truncate">
              {{ vendor.address }}
            </p>
          </div>
        </a>
        <!-- </router-link> -->
      </div>
    </div>

    <div class="flex items-center justify-between px-4 py-3 mt-5 bg-white border-t border-gray-200 sm:px-6">
          <div class="flex justify-between flex-1 sm:hidden">
            <a @click="prevPage" class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Previous
            </a>
            <a @click="nextPage" class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Next
            </a>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700" v-if="pagination">
                Showing
                {{ ' ' }}
                <span class="font-medium">{{ pagination.current_page }}</span>
                {{ ' ' }}
                to
                {{ ' ' }}
                <span class="font-medium">{{ pagination.per_page }}</span>
                {{ ' ' }}
                of
                {{ ' ' }}
                <span class="font-medium">{{ pagination.last_page }}</span>
                {{ ' ' }}
                results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button :class="page === 1 ? ' relative disabled:bg-gray-300 inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-300 rounded-l-md hover:bg-gray-50' : 'relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50'" @click="prevPage" class="">
                  <span class="sr-only">Previous</span>
                  <ChevronLeftIcon class="w-5 h-5" aria-hidden="true" />
                </button>
                
                <button @click="nextPage" class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">
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
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'
import { StarIcon } from "@heroicons/vue/solid";
import Download from "@/components/Downloads.vue";
import {useStorageStore} from '@/store/storage'

export default {
  name: "Vendors",
  components: {
    StarIcon,
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
      vendors: null,
      settings: null,
      base_url: this.store.baseUrl,
      // products: null,
      currency: null,
      // vendorProducts: null,
      // active: true,
      // selectedVendor: null,
      pageNo: 1,
      page: 1,
      perPage: 20,
      pagination: null,
    };
  },

  setup() { 
    const store = useStorageStore();
    return {store}
  },

  mounted() {
    this.getCurrency();

    axios
      .get(this.base_url + "api/vendors?page="+ this.page)
      .then((response) => {
        this.vendors = response.data.data;
        this.pagination = response.data
        console.log(response);
      })
      .catch((error) => console.log(error));

    // this.store.setLoading(true)
    // axios
    //   .get(this.base_url + "api/products")
    //   .then((response) => {
    //     this.store.setLoading(false)
    //     this.products = response.data.data;
    //   })
    //   .catch((error) => console.log(error));
  },

  // computed: {
  //   getVendorProduct()
  //   {
  //       this.$store.commit('loading', true)
  //       axios.get(this.base_url+'api/vendors/' + this.$route.params.id)
  //       .then((response) => {
  //            this.$store.commit('loading', false)
  //            let prodts = response.data
  //            console.log(prodts)
  //           this.vendorProducts = prodts
  //       })
  //       .catch(error => console.log(error))
  //   },
  // },

  methods: {
    prevPage () {
        this.store.setLoading(true),
        this.page = this.pageNo--
    },

    nextPage () {
        this.store.setLoading(true),
        this.page = this.pagination.current_page++
         axios
        .get(this.base_url + "api/vendors?page="+ this.page++)
        .then((response) => {
          this.store.setLoading(false),
          this.vendors = response.data.data;
          this.pagination = response.data
          // console.log(response);
        })
      .catch((error) => console.log(error));
        // console.log(this.pageNo)
    },
    
    getCurrency() {
      let setting;
      axios.get(this.base_url + "api/app/settings").then((response) => {
        setting = response.data;
        this.currency = setting.strings.currency;
      });
      return this.currency;
    },

    // getVendorProducts(vendorData) {
    //   this.selectedVendor = vendorData;
    //   // console.log(vendorData.id)
    //   let vendorId = vendorData.id;
    //   let vendorName = vendorData.name;
    //   // console.log(vendorId)
    //   this.store.setLoading(true)
    //   axios
    //     .get(this.base_url + "api/vendors/" + vendorId)
    //     .then((response) => {
    //       this.store.setLoading(false)
    //       this.vendorProducts = response.data;
    //       console.log(this.vendorProducts);
    //       this.$router.push({
    //         name: "Vendors",
    //         params: { id: vendorId, slug: this.sanitizeTitle(`${vendorName}`) },
    //       });
    //       // this.$router.push('/vendors/'+vendorId+'/'+vendorName)
    //       // window.location.href = '/vendors/'+vendorId+'/'+vendorName
    //       //  console.log(prodts.menus)
    //       // console.log(this.vendorProducts.menus[0].products)
    //     })
    //     .catch((error) => console.log(error));
    // },

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
