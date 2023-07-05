<template>
<div v-if="categories"> 
   <div class="mb-5">
     <div>
        <p class="text-2xl font-semibold text-gray-700">{{ $t('footer.header5') }}</p>
        <p class="pt-2 text-sm text-black">{{ $t('GroceryHeader') }}</p>
     </div>
    <!-- <div v-if="categoriesToShow < categories.length || categories.length > categoriesToShow">
      <button @click="categoriesToShow += 6" class="items-center justify-center text-sm font-light">Show more</button>
    </div> -->
  </div>
  <!-- <div class="hidden md:block">
    <div class="grid grid-cols-2 gap-4 md:grid-cols-6 place-items-center">
      <div v-for="category in categories" :key="category.id">
        <a :href="$router.resolve({name: 'Category', params: { id: category.id, slug: sanitizeTitle(`${category.name}`) }}).href">
            <div  class="flex items-center justify-center p-5 my-5 bg-gray-100 rounded-full md:w-32 md:h-32 ">
                <img v-bind:src="category.photo" :alt="category.name" class="self-center mx-auto transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 w-14 text-smallest">
            </div>
            <p class="mt-2 text-sm font-semibold text-center text-gray-600 truncate ">{{ truncate(category.name, 15) }}</p>
        </a>
      </div>
    </div>
  </div> -->
  <vue-horizontal ref="horizontal" class="horizontal" responsive v-if="categories">
    <div v-for="category in categories" :key="category.id" class="flex flex-row px-5">
      
      <!-- <a :href="$router.resolve({name: 'Category', params: { id: category.id, slug: sanitizeTitle(`${category.name}`) }}).href"> -->
      <a :href="`/category/${category.id}/${sanitizeTitle(category.name)}`">
        <div  class="flex items-center justify-center w-16 p-4 my-2 rounded-full md:h-16 " :style="{ 'background-color': category.color }">
            <img v-bind:src="category.photo" :alt="category.name" class="self-center w-10 h-10 mx-auto transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
        </div>
        <div class="p-1">
          <p class="text-xs font-medium text-center text-black lowercase truncate">{{ truncate(category.name, 10) }}</p>
          
        </div>
        
      </a>
    </div> 
  </vue-horizontal>
  
  <!-- <span class="flex justify-center" >
    <button v-if="categoriesToShow > 6" @click="categoriesToShow -= 6" class="text-sm font-light text-black">Show less</button>
  </span> -->
</div>
</template>
<script>
import VueHorizontal from "vue-horizontal";
import {useStorageStore} from '@/store/storage.js'
import axios from 'axios'
export default {
  name: 'Category',
  components: {
    VueHorizontal,
  },
  
  data () {
    return {
      categories: [],
      categoriesToShow: 6,
      categoryIndex: 6,
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

    this.store.setLoading(true)

    axios.get(this.base_url+'api/categories?vendor_type_id='+this.$route.params.id)
    .then((response) => {
      this.store.setLoading(false),
      this.categories = response.data.data
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

    truncate(str, n){
      return (str.length > n) ? str.substr(0, n-1) + '...' : str;
    },


    next() {
      this.$refs.horizontal.next()
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