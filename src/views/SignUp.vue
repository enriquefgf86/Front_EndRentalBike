<template>
      <v-container class="d-flex justify-center" id='cardContainerUp' fluid>
            <v-card id='cardSignUp' width='340'>
              <v-toolbar id="signUpBar" class="d-flex justify-center" dark flat>
                <img id="logoBar" src="../assets/logo.png" />
                <v-toolbar-title>Sign Up Form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="signUpMethod()">
                  <v-text-field label="Name" name="name" type="text" v-model="name" required />

                  <v-text-field label="Email" name="email" type="text" v-model="email" required />

                  <v-text-field
                    label="Password"
                    name="password"
                    v-model="password"
                    type="password"
                    required
                  />
                  <v-text-field
                    label="Confirm Password"
                    name="confirm password"
                    v-model="confirmPassword"
                    type="password"
                    required
                    v-bind:rules="[passwordChecker]"
                  />
                  <v-spacer />
                  <v-btn :disabled="!formValidator" type="submit" id="signUpButton">Sign Up</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
      </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      name: ""
    };
  },
  methods: {
    ...mapActions(["fetchSignUp", "fetchAllBikesJson"]),

    signUpMethod() {
      return this.$store.dispatch("fetchSignUp", {
        userName: this.name,
        userPassword: this.password
      });
    }
  },
  computed: {
    formValidator() {
      return (
        this.name != "" &&
        this.email != "" &&
        this.password != "" &&
        this.confirmPassword != ""&&
        this.password == this.confirmPassword 
      );
    },
    passwordChecker() {
      if (this.password != this.confirmPassword) {
        return "These Passwords do not match";
      } else {
        return "";
      }
    }
  },
  created() {
    this.fetchAllBikesJson;
  },
  watch:{
    // password(){
    //   if(this.confirmPassword!=this.password){
    //     document.getElementById("signUpButton").classList.add("disabler")
    //   }
    // }
  }
};
</script>

<style>
#signUpBar,#signUpButton{
  background-color:#c8e6c9;
  color:black;
  font-weight:bold;
  font-style: oblique;
}
#cardContainerUp{
  position:absolute;
  margin-top:5rem;
  justify-content: center;
}

</style>