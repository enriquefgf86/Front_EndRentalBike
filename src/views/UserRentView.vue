<template>
  <v-app>
    <v-container>

    <v-container id="order" fluid>

      <v-container id="containers" >
        <img id="borderImg" :src="selectedRent.rent_bike_img" />
      </v-container>

      <v-container id="containers" class='bgColor'>

        <h3>Days with Bike: {{selectedRent.rent_real_days_with_bike}} days</h3>
        <h3>Total Cost:$ {{selectedRent.rent_bike_total_cost.toFixed(2)}}</h3>
        <h2>Of it:</h2>
        <h4>Cost Contract:$ {{(selectedRent.rent_days_contract*selectedRent.rent_daily_price).toFixed(2)}}</h4>
        <h4>Cost Extra Days :$ {{selectedRent.rent_real_days_with_bike>selectedRent.rent_days_contract?((selectedRent.rent_real_days_with_bike-selectedRent.rent_days_contract)*selectedRent.rent_daily_price).toFixed(2):0.00.toFixed(2)}}</h4>
        <h4 id="underline">
          Cost Fee Extra Days($3.00/day):$ {{selectedRent.rent_real_days_with_bike>selectedRent.rent_days_contract?((selectedRent.rent_real_days_with_bike-selectedRent.rent_days_contract)*3).toFixed(2):0.00.toFixed(2)}}</h4>
        <h4 id="underline1">Total Cost: <h4>${{(selectedRent.rent_bike_total_cost).toFixed(2)}}</h4></h4>
     
      </v-container>

    </v-container>

    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UserRentView",
  props: ["idSelected"],
  data() {
    return {
      //   rent:this.getAllBikesJson.user.user_log_rent
    };
  },
  methods: {
    ...mapActions(["fetchAllBikesJson", "fetchRentBike"])
  },
  computed: {
    ...mapGetters(["getAllBikesJson", "getRentSelected"]),
    selectedRent() {
      return this.getRentSelected(this.idSelected);
    }
  },
  created() {
    this.selectedRent;
  },
  watch: {}
};
</script>

<style>
#underline {
  text-decoration: underline;
}
#underline1 {
  text-decoration: underline;
  border-bottom: double 1px;
  width: 8.8rem;
}
#order{
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
}
#containers{
  margin:auto;
     width:400px;
}
#borderImg{
    border-radius: 130px 10px 122px 10px;
    width:450px;
    padding-right:42px;
}
.bgColor{
  background-color:#c8e6c9;
   border-radius: 30px 10px 122px 10px;

}
</style>