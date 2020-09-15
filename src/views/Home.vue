<template>
  <v-app>
    <v-container>

      <v-container

        id="cardContainerBike" v-if="getAllBikesJson.user!=null && getAllBikesJson.user!=undefined" >
       
        <BikeCard v-for="(bikes,index) in allBikes.bikes_inventory " :key="index" :BikeCard="bikes"></BikeCard>
     
      </v-container>

      <v-container v-else>

        <noUserPage></noUserPage>

        <v-dialog v-model="alertPopUp" width="400" height="100">
      <v-alert>
        <v-alert prominent type="error">
          <v-row align="center">Error trying to Sign In.</v-row>
          <v-row align="center">Please try again or Sign Up.</v-row>
        </v-alert>
      </v-alert>
    </v-dialog>

      </v-container>

    </v-container>

  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  data(){
    return {
      alertPopUp: this.$store.getters.getPop
    }
  },
  components: {},
  /////////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    ...mapActions(["fetchAllBikesJson"])
  },
  ////////////////////////////////////////////////////////////////////////////////
  computed: {
    ...mapGetters(["getAllBikesJson","getPop"]),
//----------------------------------------------------------------------------------
    allBikes() {
      return this.$store.getters.getAllBikesJson;
    }
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  created() {
    this.fetchAllBikesJson, this.allBikes;
  }
};
</script>
<style>
#cardContainerBike {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
::-webkit-scrollbar-thumb {
  background :#c8e6c9;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background :#c8e6c9
}

@media only screen and (min-device-width: 310px) and (max-device-height: 575px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {

#cardContainerBike {
  overflow:scroll;
  height:480px;
}
}

 @media only screen and (min-device-width: 310px) and (min-device-height: 576px) and (max-device-height: 675px)
and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
#cardContainerBike {
  overflow:scroll;
  height:590px;
 
}
}
 @media only screen and (min-device-width: 320px) and (max-device-height: 740px) and (min-device-height: 577px)
and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
#cardContainerBike {
  overflow:scroll;
  height:650px;
 
}

} 


@media only screen and (max-device-width: 575px) and (max-device-height: 375px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
#cardContainerBike {
  overflow:scroll;
  height:240px;
 
}
} 
@media only screen and (min-device-width: 577px) and (max-device-height: 375px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
#cardContainerBike {
  overflow:scroll;
  height:290px;
 
}
} 
@media only screen and (min-device-width: 580px) and (min-device-height: 376px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
#cardContainerBike {
  overflow:scroll;
  height:330px;
 
}
} 

@media only screen and (min-device-width: 741px) and (min-device-height: 740px) and (-webkit-min-device-pixel-ratio: 2)  {
#cardContainerBike {
  overflow:scroll;
 height:100%
}
} 





</style>
