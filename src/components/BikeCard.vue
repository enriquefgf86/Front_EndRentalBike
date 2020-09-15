<template>
  <v-container
    id="containerStyle"  v-if="(getAllBikesJson.user.user_status == 'unactive' &&
        BikeCard.bike_status == false) ||(getAllBikesJson.user.user_status == 'active' &&
          BikeCard.bike_status == true && userRenting == getAllBikesJson.user.user_name) ">
    
    <v-container>

      <v-card id="cardStyle">

        <v-img id="bikeImg" :src="BikeCard.bike_img" />

        <img id="image" src="../assets/letters.png" />

        <v-card-subtitle id="subTitle">

          <h3 id="h3type">Type</h3>
          <h4>{{ BikeCard.bike_type }}</h4>

          <img id="bikes" v-if="BikeCard.bike_type=='normal'" src="../assets/cityBike.png" alt="city"/>
          <img id="bikes" v-else src="../assets/mountainBike.png" alt="city" />
        
        </v-card-subtitle>

        <v-card-actions class="d-flex justify-space-between">

          <v-container id="devContainer" v-if="BikeCard.bike_status == true">

            <h4>Rented</h4>
            <v-btn id="buttonColorDev" @click="devBox" x-small>Dev</v-btn>

          </v-container>

          <v-btn id="buttonColor" @click="rentBox" small v-else>Rent</v-btn>

          <v-menu id="menu" transition="fab-transition">

            <template v-slot:activator="{ on }">
              <v-btn id="details" x-small v-on="on"> Details</v-btn>
            </template>

            <v-list id="menuStyle">

              <img id="imgMenu" src="../assets/logo.png" />

              <v-list-item>

                <v-card-text>
                  <h3>Price:</h3>
                  <h4>${{ BikeCard.bike_daily_price.toFixed(2) }} per day</h4>
                </v-card-text>

              </v-list-item>

              <v-list-item>
                <v-card-text>
                  <h3>Description</h3>
                  <h4>{{ BikeCard.bike_description }}</h4>
                </v-card-text>
              </v-list-item>

            </v-list>

          </v-menu>

        </v-card-actions>

      </v-card>

    </v-container>

    <v-dialog id="dialogRent" width="270" v-model="boxRent">
      <v-card id="cardRent">
        <v-container>
          <img id="imgMenu" src="../assets/logo.png" />
          <v-card-title>
            <h2>Rent Form</h2>
          </v-card-title>
          <v-divider></v-divider>
          <div>
            <h4>Days you want to rent</h4>
            <input
              id="inputDays"
              type="number"
              v-model="preRentBackEnd.daysContract"
              placeholder="insert days"
              ref="inputdays"
            />
          </div>
          <v-divider></v-divider>
          <div>
            <h4>Daily-cost:${{ BikeCard.bike_daily_price.toFixed(2) }}/day</h4>
          </div>
          <v-divider></v-divider>

          <div>
            <h4>
              Pre-cost:${{
              (
              BikeCard.bike_daily_price * preRentBackEnd.daysContract
              ).toFixed(2)
              }}
            </h4>
          </div>
          <v-divider></v-divider>
          <v-container class="d-flex justify-space-between">
            <v-btn id="rentButton" @click="rentBike" @click.stop="boxRent = false" x-small>Rent</v-btn>
            <v-btn id="rentButton" @click="boxRent = false" x-small>
              Cancel
              <img id="cancelImg" src="../assets/cancel.png" />
            </v-btn>
          </v-container>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog width="260" v-model="boxDev">
    
      <v-card width="260">
       
        <v-container>
          <img id="imgMenu" src="../assets/logo.png" />
         
          <v-card-title>
            <h2>Dev Form</h2>
          </v-card-title>
        
          <v-divider></v-divider>
         
          <div>
            
            <h4>Days on your contract: {{ filterRentLog }} days</h4>
            <h5>Real Days With Bike</h5>
            <input id="inputDays" type="number" v-model="rentBackEnd.daysReal"
                   placeholder="insert days with bike"  ref="inputdaysreal" />
          </div>

          <v-divider></v-divider>
          <v-divider></v-divider>
          <v-divider></v-divider>

          <v-container class="d-flex justify-space-between">
           
            <v-btn id="rentButton" @click="rentDevolutionBike" @click.stop="boxDev = false" x-small>
              Finish
              </v-btn>
           
            <v-btn id="rentButton" @click="boxDev = false" x-small>
              Cancel
              <img id="cancelImg" src="../assets/cancel.png" />
            </v-btn>

          </v-container>

        </v-container>

      </v-card>
    </v-dialog>

  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "BikeCard",
  props: { BikeCard: Object },
  data() {
    return {
      showDescritption: false,
      availability: false,

      boxDev: false,
      boxRent: false,
      thisBike: null,
      userRenting: null,

      preRentBackEnd: [
        {
          daysContract: null,
          daysReal: null,
          dailyDelayFee: null,
          // totalCost: null,
          rentState: "unfinished"
        }
      ],
      rentBackEnd: [
        {
          daysContract: null,
          daysReal: null,
          dailyDelayFee: null,
          // totalCost: null,
          rentState: "finished",
          rentId: null
        }
      ]
    };
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    ...mapActions(["fetchAllBikesJson", "fetchRentBike"]),
    //------------------------------------------------------------------------

    rentBox() {
      return (this.boxRent = true);
    },
    //--------------------------------------------------------------
    devBox() {
      return (this.boxDev = true);
    },
    //--------------------------------------------------------------------
    rentBike() {
      this.$store.dispatch("fetchRentBike", {
        rent: {
          daysContract: this.preRentBackEnd.daysContract,
          totalCost:
            this.BikeCard.bike_daily_price * this.preRentBackEnd.daysContract,
          rentState: "unfinished"
        },
        bike: this.BikeCard.bike_id
      });
    },
    //------------------------------------------------------------------------
    rentDevolutionBike() {
      this.$store.dispatch("fetchDevolutionRentBike", {
        devolutionRent: {
          daysContract: this.filterRentLog,
          daysReal: this.rentBackEnd.daysReal,
          rentState: "finished"
        },
        bike: this.BikeCard.bike_id,
        rentId: this.rentBackEnd.rentId
      });
    }
  },
  //////////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    ...mapGetters(["getAllBikesJson"]),
    getAllBikes() {
      return this.$store.getters.getAllBikesJson.bikes_inventory;
    },
    //-------------------------------------------------------------------------
    Availability() {
      return this.$store.getters.getAllBikesJson.bikes_inventory.bike_status;
    },
    //---------------------------------------------------------------------------
    filterRentLog() {
      let daysContract = null;
      let rentId = null;
      let rentuser = null;
      this.BikeCard.bike_log_rent.map(rent => {
        if (rent.rent_state == "unfinished") {
          (daysContract = rent.rent_days_contract), (rentId = rent.rent_id);
          rentuser = rent.rent_user;
          this.userRenting = rentuser;
          this.rentBackEnd.rentId = rentId;
        } else return "finished";
      });
      return daysContract;
      return rentId;
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////
  created() {
    this.fetchAllBikeJson;
    this.filterRentLog;
    this.Availability;
  },
};
</script>

<style>
#cardStyle {
  background-color: #c8e6c9;
  width: 200px;
  height: 255px;
}

#bikeImg {
  width: 300px;
  height: 120px;
}
#subTitle {
  display: flex;
  flex-direction: row;
}
#h3type {
  width: 4rem;
}
#bikes {
  width: 30%;
}
#containerStyle {
  width: 17rem;
  height: 17rem;
}
#dialogRent {
  width: 270px;
}
#cardRent {
  width: 270px;
}
#menuStyle {
  width: 20rem;
  border-radius: 0.4rem;
}
#imgMenu {
  width: 10rem;
  height: 10rem;
  position: absolute;
  opacity: 0.15;
  margin-left: 5rem;
}

#buttonColorDev,
#buttonColor {
  background-color: rgba(154, 245, 35, 0.4);
}
#buttonColor {
  animation: glowing 2000ms infinite;
}
#buttonColor:active,
#details:active {
  transform: translateY(18px);
}
#rentButton {
  background-color: rgba(154, 245, 35, 0.4);
}
#details {
  background-color: rgba(154, 245, 35, 0.4);
}
@keyframes glowing {
  0% {
    box-shadow: 0 0 -10px rgba(245, 119, 35, 0.9);
  }
  40% {
    box-shadow: 0 0 20px rgba(245, 119, 35, 0.9);
  }
  60% {
    box-shadow: 0 0 20px rgba(245, 119, 35, 0.9);
  }
  100% {
    box-shadow: 0 0 -10px rgba(245, 119, 35, 0.9);
  }
}
#inputDays {
  width: 7rem;
  box-shadow: 2px 1px 2px;
  background-color: white;
}
#cancelImg {
  width: 10px;
  height: 10px;
}
#devContainer {
  display: flex;
  flex-direction: column;
  margin-top: -1.8rem;
}
#image {
  position: relative;
  margin-left: 3.5rem;
}

@media only screen and (max-device-width: 375px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
  #cardStyle {
    width: 150px;
    height: 180px;
  }
  #bikeImg {
    width: 220px;
    height: 70px;
  }
  #subTitle {
    justify-content: space-around;
    height: 2rem;
  }
  #h3type {
    width: 3rem;
    font-size: 1rem;
  }
  #bikes {
    display: none;
  }
  #image {
    position: relative;
    margin-left: 2.2rem;
    height: 1.5rem;
  }
  #containerStyle {
    width: 13rem;
    height: 13rem;
  }
  #menuStyle {
    width: 13rem;
    border-radius: 0.4rem;
  }
  #devContainer h4 {
    display: none;
  }
  #buttonColorDev {
    position: absolute;
    margin-top: 0.3rem;
  }
}
@media only screen and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
  #cardStyle {
    width: 150px;
    height: 180px;
  }
  #bikeImg {
    width: 220px;
    height: 70px;
  }
  #subTitle {
    justify-content: space-around;
    height: 2rem;
  }
  #h3type {
    width: 3rem;
    font-size: 1rem;
  }
  #bikes {
    display: none;
  }
  #image {
    position: relative;
    margin-left: 2.2rem;
    height: 1.5rem;
  }
  #containerStyle {
    width: 13rem;
    height: 13rem;
  }
  #menuStyle {
    width: 13rem;
    border-radius: 0.4rem;
  }
  #devContainer h4 {
    display: none;
  }
  #buttonColorDev {
    position: absolute;
    margin-top: 0.3rem;
  }
}
</style>
