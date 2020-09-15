<template>
  <v-app>
    <v-container v-if="getAllBikesJson.user!=null">
     
      <h3 id='welcomeColor'>Welcome: {{getAllBikesJson.user.user_name}}</h3>
    
    </v-container>

    <v-container>

      <v-card id="cardUser" width="250" v-for="(rent,index) in getAllBikesJson.user.user_log_rent"
       :key="index">
        <div id="aligner">

          <div id="some">

            <h4># {{rent.rent_id}}</h4>
            <h4>Cost: ${{rent.rent_bike_total_cost.toFixed(2)}}</h4>

          </div>

          <router-link :to="'/profile/rent/'+rent.rent_id">
            
            <v-btn x-small icon>
              <v-icon small>mdi-eye-outline</v-icon>
            </v-btn>

          </router-link>

        </div>

      </v-card>

    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UserProfile",
  props: {
    UserProfile: Object
  },
  data() {
    return {};
  },
  methods: { ...mapActions(["fetchAllBikesJson", "fetchRentBike"]) },
  computed: {
    ...mapGetters(["getAllBikesJson"]),
    rentSet() {
      return this.$store.getters.getAllBikesJson.user.user_log_rent;
    }
  },
  created() {
  },
  watch: {}
};
</script>

<style>
#cardUser {
  margin-bottom: 0.3rem;
  background-color:#c8e6c9
}
#aligner {
  display: flex;
  flex-direction: row;
  margin-right:.2rem
}
#some{
  display: flex;
  flex-direction: row;
  margin-right:.2rem;
  width:9.5rem;
  justify-content: space-between;
}
#welcomeColor{
  background-color:#c8e6c9;
  padding-left:.4rem;
  border-radius:4px;
  padding-right:.4rem;
}
</style>