<template>
  <v-app id="app">
    <v-app-bar id="toolBar" dense app>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>
        <router-link to="/">
          <img id="logoBar" src="./assets/logo.png" />
        </router-link>
      </v-toolbar-title>
      <h3> Hi...!!! {{userAuthNameWelcomer}}</h3>

      <v-spacer></v-spacer>

      <div v-for="items in barButtons" :key="items.title">
        <v-btn text x-small :to="items.link">
          <h4 class="hidden-sm-and-down">{{items.title}}</h4>
          <v-icon>{{items.icon}}</v-icon>
        </v-btn>
      </div>
      <v-btn text x-small v-if="userAuthName" @click="logOut">
        <h4 class="hidden-sm-and-down">Log out</h4>
        <v-icon>mdi-exit-run</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content></v-content>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["fetchUserOut"]),
    //-------------------------------------------------------------------------
    logOut() {
      return this.$store.dispatch("fetchUserOut");
    }
  },

  computed: {
    ...mapGetters(["getUserAuth", "getAllBikesJson"]),
    //----------------------------------------------------------------------
    barButtons() {
      let auth = [
        { icon: "mdi-login", title: "Log In", link: "/signin" },
        { icon: "mdi-account-plus", title: "Sign Up", link: "/signup" }
      ];
      if (this.userAuth) {
        auth = [
          // { icon: "mdi-magnify", title: "Search", link: "" },
          {
            icon: "mdi-format-list-bulleted-square",
            title: " Your Logs",
            link: "/profile"
          }
          // { icon: "mdi-dots-vertical", title: "More", link: "/signin" }
        ];
      }
      return auth;
    },
    //---------------------------------------------------------------------
    userAuth() {
      return this.$store.getters.getUserAuth.user !== null;
    },
    //---------------------------------------------------------------------------
    userAuthName() {
      return this.$store.getters.getAllBikesJson.user;
    },
    //------------------------------------------------------------------------
    userAuthNameWelcomer() {
      let welcomer="";
      if(this.userAuthName!=null){
        welcomer=this.userAuthName.user_name
      }
      else welcomer="Visitor"
      return welcomer
    }
    //------------------------------------------------------------------------
  },
  created() {
    this.toolBarButtons;
    this.userAuthName
  }
};
</script>
<style>
#app {
  background-image: url("./assets/baclogo.png");
  background-size: contain;
  background-repeat: no-repeat;
  /* background-color: rgba(255, 255, 255, 0.7); */
}
#logoBar {
  margin-top: 1rem;
  width: 70px;
  height: 60px;
}
#toolBar {
  background-color: #c8e6c9;
}

@media only screen and (min-device-width: 768px) and (min-device-height: 770px) and (-webkit-min-device-pixel-ratio: 2) {
}
</style>
