<template>
  <v-container>
    <v-carousel cycle height="600" hide-delimiter-background show-arrows-on-hover>
      
      <v-carousel-item v-for="(bike, i) in welcoming" :key="i">
        
        <h1 id='describe' class='d-flex justify-center'>{{ bike.bike_type}}</h1>
        <img id="img1" :src="bike.bike_img "/>
        
      </v-carousel-item>

    </v-carousel>
  </v-container>
</template>

<script>
import { mapactions, mapGetters } from "vuex";
export default {
  name: "noUserPage",
  props: {
    noUserPage: Object
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getAllBikesJson"]),
    welcoming() {
      return this.$store.getters.getAllBikesJson.bikes_inventory;
    }
  },
};
</script>

<style>
#img1 {
  width: 100%;
}
#describe{
background-color:#c8e6c9;
  padding-left:.4rem;
  border-radius:4px;
  padding-right:.4rem;
}

@media only screen and (max-device-width: 375px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
}
@media only screen and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
#img1 {
  height:30%
}
}

</style>