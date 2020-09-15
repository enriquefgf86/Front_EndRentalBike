import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index.js";
import createPersistedState from "vuex-persistedstate";
const url="https://vast-headland-74467.herokuapp.com"
//const url="http://localhost:8080"

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["allBikesJson"],
    }),
  ],
  state: {
    user: null,
    allBikesJson: {},
    rentSelected: {},
    pop: false,
  },
  mutations: {
    setUserAuth(state, payload) {
      state.user = payload;
    },
    setAllBikesJson(state, payload) {
      state.allBikesJson = payload;
    },
    setPop(state, payload) {
      state.pop = payload;
    },
  },
  getters: {
    getUserAuth: (state) => state.allBikesJson,
    getAllBikesJson: (state) => state.allBikesJson,
    getRentSelected: (state) => (rentSelected) => {
    
      return state.allBikesJson.user.user_log_rent.find(
        (rentId) => rentId.rent_id == rentSelected
      );
    },
    getPop: (state) => state.pop,
  },

  actions: {
    //////////////////////////////////sign in////////////////////////////////////////////////
    fetchSignIn({ commit, dispatch }, payload) {
      fetch("/bikes/login", {
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
        body: getBody({
          name: payload.userName,
          password: payload.userPassword,
        }),
      })
        .then((user) => {
          // console.log(user);
          if (user.Error) {
            // console.log("error on log in", user);
            // console.log(user.status);
            user.error
            commit("setUserAuth", false);
          } else if (
            user.status == 401 ||
            user.status == 500 ||
            user.status == 404
          ) {
            commit("setPop", true);
            setTimeout(() => {
              commit("setPop", false);
            }, 2000);
          } else {
            user;
            commit("setUserAuth", true);
            router.push("/");
            dispatch("fetchAllBikesJson");
          }
        })
        .catch((error) => {
          // console.log("error", error);
          error
        });
      function getBody(json) {
        var body = [];
        for (var key in json) {
          var encKey = encodeURIComponent(key);
          var encVal = encodeURIComponent(json[key]);
          body.push(encKey + "=" + encVal);
        }
        return body.join("&");
      }
    },

    ///////////////////////////////////////sign up ////////////////////////////////////////////
    fetchSignUp({ commit, dispatch }, payload) {
      fetch("/bikes/user/register", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      })
        .then((user) => {
          // console.log("data sent :", JSON.stringify(user));
          return user.json();
        })
        .then((user) => {
          if (user.Error) {
            // console.log("error", user);
            user.Error
            commit("setUserAuth", false);
          } else {
            // console.log("Success", user);
            user
            dispatch("fetchSignIn", payload);
            commit("setUserAuth", true);
          }
        })
        .catch((error) => {
          // console.log("Error on SignUp", error);
          error
        });
    },

    ///////////////////////////////////////////json log out user////////////////////////////////////
    fetchUserOut({ commit, dispatch }) {
      fetch("/api/logout", {
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
      })
        .then((userData) => {
          userData;
          commit("setUserAuth", false);
          router.push("/signin");
          dispatch("fetchAllBikesJson");
        })
        .catch((error) => {
          // console.log("Error on Log Out: ", error);
          error
        });
    },

    //////////////////////////////////////json all bikes details//////////////////////////////////////
    fetchAllBikesJson({ commit, dispatch }, payload) {
      fetch("/bikes/all", {
        credentials: "include",
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          // console.log(response);
          response
          commit("setAllBikesJson", response);
        })
        .catch((error) => {
          // console.log("error", error);
          error
        });
    },
    /////////////////////////////////////renting bike///////////////////////////////
    fetchRentBike({ commit, dispatch }, { bike, rent }) {

      fetch("/bikes/rentBike/rent/" + bike, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(rent),
      })
        .then((response) => {
          // console.log("Rent Done", JSON.stringify(response));
          return response.json();
        })
        .then((response) => {
          if (response.Error) {
            // console.log("Error en proceso de renta", response);
            response.Error
          } else {
            setTimeout(() => {
              location.reload();
            }, 1000);
            dispatch("fetchAllBikesJson");
          }
        })
        .catch(function(error) {
          // console.log("Request failure: ", error);
          error
        });
    },
    //////////////////////////////////////devolution of bike/////////////////////////
    fetchDevolutionRentBike(
      { commit, dispatch },
      { bike, devolutionRent, rentId }
    ) {
      fetch("/bikes/rentBike/devolution/" + bike + "/" + rentId, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(devolutionRent),
      })
        .then((response) => {
          // console.log("Rent Done", JSON.stringify(response));
          return response.json();
        })
        .then((response) => {
          if (response.Error) {
            // console.log("Error en proceso de renta", response);
            response.Error
          } else {
            dispatch("fetchAllBikesJson");
          }
        })
        .catch(function(error) {
          // console.log("Request failure: ", error);
          error
        });
    },
  },
});
