<template>
<v-app>
    <v-container v-if="getAllBikesJson.user!=null">
       <UserProfile></UserProfile>
    </v-container>
</v-app>
  
</template>

<script>
import{mapActions,mapGetters} from 'vuex';
export default {
name:"UserView",
data(){
    return{

    }
},
methods:{...mapActions(["fetchAllBikesJson", "fetchRentBike"]),},
computed:{...mapGetters(["getAllBikesJson"]),},
created(){},
watch:{}
}
</script>

<style>

</style>