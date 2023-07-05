<template>
    <div id="tabs" class="mx-auto md:mt-10" v-if="vendor">
        
        <div v-if="vendor.menus" >
            <div class="tabs" v-for="menu in vendor.menus" :key="menu.id">
                <p class="mt-10 mb-5 text-4xl font-light">{{ menu.name }}</p>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div class="relative group" v-for="product in menu.products" :key="product.id">
                        <!-- <router-link :to="{ name: 'Product', params: { id: product.id, slug: sanitizeTitle(product.name) }}" > -->
                        <a :href="`/product/${product.id}/${sanitizeTitle(product.name)}`" >
                            <div class="w-full overflow-hidden bg-gray-200 rounded-md min-h-80 aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                 <img  v-if="product.photo" v-bind:src="product.photo" class="object-cover object-center w-full h-full lg:w-full lg:h-full">
                            </div>
                            <div class="flex justify-between mt-4">
                                <span aria-hidden="true" class="absolute inset-0"></span>
                                <p class="text-sm text-gray-700">{{ truncate(product.name, 20) }}</p>
                                <span v-if="product.discount_price > 0">
                                    <p class="text-sm font-semibold text-gray-900">{{ currency }} <span class="line-through">{{ product.price ? product.price.toFixed(2) : '0.00' }}</span> <span class="text-base">{{ product.discount_price ? product.discount_price.toFixed(2) : '0.00' }}</span></p>
                                </span>
                                <span v-else>
                                    <p class="text-sm font-semibold text-gray-900">{{ currency }}{{ product.price ? product.price.toFixed(2) : '0.00' }}</p>
                                </span>
                            </div>
                        </a>
                        <!-- </router-link> -->
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>No Menu yet</p>
        </div>
  
    </div>
    
</template>
<script>
import axios from 'axios'
import {useStorageStore} from '@/store/storage.js'
export default {
    el: '#tabs',
    data: function() {
        return { 
            vendor: null,
            currency: null,
            base_url: this.store.baseUrl
        };
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
            // console.log(this.vendor)
        })
        .catch(error => console.log(error))
    },

    created() {
        this.getCurrency();
    },

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
