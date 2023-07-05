<template>
    <div class="mt-10 sm:mt-0" v-show="isLoggedIn">
      <div class="max-w-xl mx-auto mt-5 overflow-hidden shadow sm:rounded-md">
        <div class="">
          <!-- <form action="#" method="POST"> -->
            <div class="overflow-hidden shadow sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <p class="mb-1 text-3xl font-extrabold">{{ $t('parcel.packageParameters') }}</p>
                <p class="mb-5 text-xs font-light text-gray-500">{{ $t('parcel.subHeader3') }}</p>
                <div class="flex flex-col">
                    <div class="mb-3">
                        <label for="weight" class="flex block space-x-2 text-sm font-medium text-gray-700">
                          <span>{{ $t('parcel.weight') }}(kg) <span class="text-red-500">*</span></span>
                        </label>
                        <input type="number" v-model="weight" name="weight" id="weight" placeholder="10" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                   
                    <div class="mb-3">
                      <label for="width" class="flex block space-x-2 text-sm font-medium text-gray-700">
                        <span>{{ $t('parcel.width') }}(cm)</span>
                      </label>
                      <input type="number" v-model="width" name="width" id="width" placeholder="10" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div class="mb-3">
                      <label for="height" class="flex block space-x-2 text-sm font-medium text-gray-700">
                        <span>{{ $t('parcel.height') }}(kg)</span>
                      </label>
                      <input type="number" v-model="height" name="height" id="height" placeholder="10" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    
                     <div class="">
                        <label for="plength" class="flex block space-x-2 text-sm font-medium text-gray-700">
                          {{ $t('parcel.length') }}(kg)
                        </label>
                      <input type="number" v-model="plength" name="plength" id="plength" placeholder="10" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                </div>
              </div>
              <div class="px-4 py-3 text-right bg-gray-50 sm:px-6" v-if="weight">
                <Navigation></Navigation>
              </div>
              <div class="flex justify-between px-4 py-3 text-right bg-gray-50 sm:px-6" v-else>
                <a href="/recipient" class="px-4 py-2 text-white uppercase bg-green-500 rounded">{{ $t('parcel.previous') }}</a>
                <div class="px-4 py-2 mr-5 text-white uppercase bg-gray-200 border border-gray-300 rounded">{{ $t('parcel.next') }}</div>
              </div>
            </div>
          <!-- </form> -->
        </div>
      </div>
    </div>
</template>
<script>
import Navigation from '@/components/parcel/Navigation.vue'
export default {
    components: {
      Navigation
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
          isLoggedIn: false,
          user: null,
          weight: 0,
          plength: 0,
          width: 0,
          height: 0
        }
    },
    mounted() {

      if (!process.server ? localStorage.getItem("authToken") : null) {
        this.isLoggedIn = true;
        this.user = JSON.parse(!process.server ? localStorage.getItem("user") : null)
        }

      if(this.isLoggedIn == false) {
            this.$router.push("/login");
      }

      if (!process.server ? localStorage.weight : null) {
        this.weight = !process.server ? localStorage.weight : null;
      }

      if (!process.server ? localStorage.plength : null) {
        this.plength = !process.server ? localStorage.plength : null
      }

      if (!process.server ? localStorage.width : null) {
        this.width = !process.server ? localStorage.width : null;
      }

      if (!process.server ? localStorage.height : null) {
        this.height = !process.server ? localStorage.height : null;
      }
    },

    watch: {
      weight(newWeight) {
        localStorage.weight = newWeight;
      },

      plength(newLength) {
        localStorage.plength = newLength;
      },
      
      width(newWIdth) {
        localStorage.width = newWIdth;
      },

      height(newHeight) {
        localStorage.height = newHeight;
      },

    },
}
</script>