<template>
  <v-container class="d-flex justify-center" id="cardContainer" fluid>
    <v-card id="cardSign" width="340">
      
      <v-toolbar id="signInBar" class="d-flex justify-center" dark flat>
        <img id="logoBar" src="../assets/logo.png" />
        <v-toolbar-title class="d-flex justify-center">Login Form</v-toolbar-title>
        <v-spacer />
      </v-toolbar>

      <v-card-text>
        <v-form @submit.prevent="logInMethod()">
         
          <v-text-field label="Name" name="Name" type="text" v-model="name" required />

          <v-text-field label="Email" name="Email" type="text" v-model="email" required />

          <v-text-field label="Password" name="password" v-model="password" type="password" required />
          
          <v-spacer />
          
          <v-btn :disabled="!formValidator" type="submit" id="signInButton">Login</v-btn>
        
        </v-form>
      </v-card-text>
    </v-card>

    <v-dialog v-model="alertPopUp" width="400" height="100">
      <v-alert>
        <v-alert prominent type="error">
          <v-row align="center">Error trying to Sign In.</v-row>
          <v-row align="center">Please try again or Sign Up.</v-row>
        </v-alert>
      </v-alert>
    </v-dialog>

  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      alertPopUp: false
    };
  },
  methods: {
    ...mapActions(["fetchSignIn", "fetchAllBikesJson"]),

    logInMethod() {
      return this.$store.dispatch("fetchSignIn", {
        userName: this.name,
        userPassword: this.password
      });
    }
  },
  computed: {
    ...mapGetters(['getPop']),
    formValidator() {
      return this.name != "" && this.email != "" && this.password != "";
    },
    popper(){
      return this.$store.getters.getPop
    }
  },
  created() {
    this.fetchAllBikesJson;
    this.getPop;
    
  },
  watch:{
    popper(value){
      if(value==true){
        this.alertPopUp=true
        setTimeout(() => {
          this.alertPopUp=false
        }, 2000);
      }
      
    }
  }
};
</script>

<style>
#signInBar,
#signInButton {
  background-color: #c8e6c9;
  color: black;
  font-weight: bold;
  font-style: oblique;
}
#cardContainer {
  position: absolute;
  margin-top: 5rem;
  justify-content: center;
}
</style>