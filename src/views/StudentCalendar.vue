<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import MenuBar from "../components/MenuBar.vue";

const router = useRouter();


const dialog = ref(false);
const currentItem = ref(0);

const shopItems = ref(
  [{ name: "White Dress Shirt", points: "100", description: "White button up dress shirt with collar", imageLink:"src/assets/shop/white-dress-shirt.png"},
  { name: "Light Blue Dress Shirt", points: "130", description: "Light blue button up dress shirt with chest pocket", imageLink:"src/assets/shop/blue-dress-shirt.png"},
  { name: "Black Tie", points: "50", description: "Black neck tie", imageLink:"src/assets/shop/black-dress-tie.png"},
  { name: "White Dress Shirt", points: "100", description: "White button up dress shirt with collar", imageLink:"src/assets/shop/white-dress-shirt.png"},
  
  ]);

</script>

<template>
    <v-app>
      <v-main> <!--            MAIN            -->
        <v-card-title class="page-title">Event Calendar</v-card-title>
        <!-- <v-card > -->
          <v-container width="90%" fluid style="background: lightgray; height:100%;">

          </v-container>
          

        
        

        <!-- </v-card> -->


      </v-main>

      
    </v-app>
  </template>

  

<style scoped>
.fill-height {
  background-color: #f5e7d0;
  min-height: 100vh;
}
.v-btn {
  width: 150px;
}
.card-list-item{
  min-height: 10px;
}
.card-link-text{
  opacity: 0.5;
  color: black;
  text-decoration: none;
}

.card-link-text-wrapper{
  text-align: right;
  padding-top: 1%;
  padding-bottom: 3%;
}

.navigation-drawer{
  border: 0;
  /* padding-left: 2%;
  padding-right: 2%; */
}
.points-text{
  text-align: center;
  font-size: 3rem;
  font-weight:bold;
  line-height: 0.7;
  padding-top: 3%;
}
.badge-image{
  max-height:10%;
}
.main-tasks{
  
}


</style>
