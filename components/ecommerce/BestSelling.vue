<template>
  <div class="px-2">
    <div class="flex justify-between mb-10">
      <p class="text-2xl font-semibold text-gray-700">{{ $t('pages.bestselling') }}</p>
       <a class="flex" href="/search">
           {{ $t('pages.seeall') }}
            <ArrowNarrowRightIcon class="w-2 h-2 ml-1 text-gray-400" aria-hidden="true" />
        </a>
    </div>
    
    <vue-horizontal ref="horizontal" class="horizontal" responsive v-if="products">
        
        <div v-for="product in products" :key="product.id" class="flex flex-row px-5 mb-10">
          
          <!-- <a :href="$router.resolve({name: 'Product', params: { id: product.id, slug: sanitizeTitle(`${product.name}`) }}).href" class="w-60 h-68"> -->
          <a :href="`product/${product.id}/${sanitizeTitle(product.name)}`" class="w-60 h-68">
            <img  v-if="product" v-bind:src="product.photo" class="w-56 mx-auto transition duration-500 ease-in-out transform h-52 hover:-translate-y-1 hover:scale-100 rounded-t-xl">
            <div class="p-3 ">
              <div class="flex justify-between">
                <div>
                  <p class="font-semibold truncate">{{ truncate(product.name, 15) }}</p>
                </div>
                <div>
                  <div class=""  v-if="product.available_qty > 0">
                    <p class="text-xs ">
                        {{ $t('Instock') }}
                    </p>
                  </div>
                  <div v-else>
                    <p class="text-xs ">
                        {{ $t('Outofstock') }}
                    </p>
                </div>
                </div>
              </div>
              <div class="flex justify-between">
                <div>
                  <span v-if="product.discount_price > 0">
                    <p class="text-xs text-gray-700 ">{{ currency }}<span class="mr-1 text-base">{{ product.discount_price.toFixed(1) }}</span>  <span class="line-through">{{ product.price.toFixed(1) }}</span></p>
                  </span>
                  <span v-else>
                    <p class="pt-2 mt-1 text-xs text-gray-700">{{ currency }}{{ product.price.toFixed(2) }}</p>
                  </span>
                </div>
                <div>
                  <div class="px-2 py-1 text-xs text-white bg-yellow-600 rounded-full">{{ $t('BestSeller') }}</div>
                </div>
               
              </div>
            </div>
          </a>
        </div> 
    </vue-horizontal>
    
  </div>
</template>
<script>
import axios from 'axios'
import VueHorizontal from "vue-horizontal"
import { ArrowNarrowRightIcon } from '@heroicons/vue/outline'
import {useStorageStore} from '@/store/storage.js'

export default {
    components: {
    VueHorizontal,
    ArrowNarrowRightIcon
  },
  data () {
    return {
      products: null,
      currency: null,
      hasPrev: false,
      hasNext: true,
      index: 0,
      interval: null,
      forward: true,
      base_url: this.store.baseUrl
        
    }
  },
  setup() { 
    const store = useStorageStore();
    return {store}
  },
  mounted () {
    this.getCurrency()

    axios.get(this.base_url+'api/products?type=best&vendor_type_id='+this.$route.params.id)
    .then((response) => {
      this.products = response.data.data
    })

  },

  destroyed() {
    clearInterval(this.interval)
  },

  methods: {
    onScrollDebounce({hasNext, hasPrev}) {
      this.hasPrev = hasPrev
      this.hasNext = hasNext
    },
    play() {
      // Check if direction need to be reversed
      if (this.hasNext !== this.hasPrev) {
        this.forward = !this.forward
      }

      if (this.forward && this.hasNext) {
        this.$refs.horizontal.next()
      } else if (!this.forward && this.hasPrev) {
        this.$refs.horizontal.prev()
      }
    },
    prev() {
      this.$refs.horizontal.prev()
    },


    next() {
      this.$refs.horizontal.next()
    },
    
    
    getCurrency() {
      let base_url = this.store.baseUrl;
        let setting;
        axios.get(this.base_url+'api/app/settings')
        .then( (response) => {
            setting = response.data;
            this.currency = setting.strings.currency
        })
        return this.currency;
    },
    
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
  }
}
</script>
<style scoped>

nav {
  display: flex;
  align-items: center;
}

svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
  color: black;
}

button.inactive svg {
  color: #BBB;
}

button {
  padding: 4px;
}

button:focus {
  outline: none;
}
</style>
<style scoped>
.horizontal {
  --count: 2;
  --gap: 16px;
}

@media (min-width: 640px) {
  .horizontal {
    --count: 3;
    --gap: 24px;
  }
}

@media (min-width: 768px) {
  .horizontal {
    --count: 4;
  }
}

@media (min-width: 1024px) {
  .horizontal {
    --count: 5;
  }
}

@media (min-width: 1280px) {
  .horizontal {
    --count: 6;
  }
}

.item {
  width: calc((100% - ((var(--count) - 1) * var(--gap))) / var(--count));
  margin-right: var(--gap);
}
</style>