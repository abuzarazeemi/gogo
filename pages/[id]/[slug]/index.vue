<template>

<div v-if="vendor_types">
    <!-- <div v-if="vendor_types[0].slug == 'food'">
      <Food/>
    </div> -->
    
    <!-- <div v-else-if="vendor_types[2].slug == 'grocery'">
      <Food/>
    </div>
    <div v-else-if="vendor_types[3].slug == 'pharmacy'">
      <Pharmacy/>
    </div>
    <div v-else-if="vendor_types[4].slug == 'service'">
      <Food/>
    </div> -->
    
</div>

<div></div>
  
</template>
<script>
import axios from 'axios'
// import Food from '@/components/Food.vue'
// import Pharmacy from '@/components/pharmacy/Home.vue'
export default {
  name: 'Home',
  // components: {
  //   Food,
  //   Pharmacy
  // },
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
      base_url: this.store.baseUrl,
      vendor_types: null
    }
  },
  
  mounted () {
    axios.get(this.base_url+'api/vendor/types')
        .then((response) => {
          this.vendor_types = response.data
          console.log(this.vendor_types)
        }
    )
    .catch(error => console.log(error))
  },

}
</script>