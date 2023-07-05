<template>
    <div class="max-w-full mx-auto bg-gray-100">
        <div class="flex flex-row items-center justify-center p-5 space-x-16" >
            <div v-for="vendor in vendors" :key="vendor.id">
                <img :src="vendor.logo" class="w-16 h-16 rounded-md">
            </div>
        </div>
    </div>  
</template>
<script>
import axios from 'axios'
import {useStorageStore} from '@/store/storage.js'

export default {
  data () {
    return {
        vendors: null,
        base_url: this.store.baseUrl
    }
  },
  setup() { 
    const store = useStorageStore();
    return {store}
  },

  mounted() {
        
    axios.get(this.base_url+'api/vendors')
    .then((response) => {
        this.vendors = response.data.data
    })
    .catch(error => console.log(error))
  },

};
</script>