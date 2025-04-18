<script setup>
import { useRouter } from 'vue-router';
import { ref,onMounted } from 'vue';
import shopItemServices from '../services/shopItemServices';

const router = useRouter();


const dialog = ref(false);
const currentItem = ref(0);

const shopItems = ref([]);

const getShopItems = async () => {
  const response = await shopItemServices.getAllShopItems();
  shopItems.value =  response.data;
  console.log("shopitems" + shopItems);
}

const addShopItem = () => {
  router.push({ name: 'AddShopItem' });
};

const editShopItem = (itemId) => router.push({ name: 'EditShopItem', params: { id: itemId } });

const deleteShopItem = async (itemId) => {
  await shopItemServices.deleteShopItem(itemId);
  console.log("deleted shop item " + itemId);
  getShopItems();
}

const resolveFrontendImage = (path) => {
  try {
    return new URL(`../assets/${path}`, import.meta.url).href;
  } catch {
    return new URL('../assets/shop/image_placeholder.jpg', import.meta.url).href;
  }
};


onMounted(() => {
  getShopItems();
})
</script>

<template>
    <v-app class="rounded rounded-md">
      <v-main> <!--            MAIN            -->
        <v-list-item></v-list-item><!-- SPACE ABOVE TIMELINE -->
        <v-card-title class="page-title">Shop</v-card-title>
        <div class="buttons">
          <v-btn color="red" @click="addShopItem()">add Shop Item</v-btn> <!-- EDIT BUTTON -->
        </div>
        <!-- <v-card > -->
          <v-container width="70%" fluid style="background: lightgray; height:100%;">
            
            <v-row justify="left">
              <v-col
                v-for="shopItem in shopItems"
                :key="shopItem"
                cols="12"
                sm="6"
              >
                <v-card variant="text" elevation="5" class="d-flex ga-4" style="padding: 5%; background: white">
                  <v-card variant="outlined" style="background: white;">
                    <v-img
                      :src="resolveFrontendImage(shopItem.imageLink)"
                      width="110"
                      height="120"
                      cover
                    />

                  </v-card>
                  <v-card variant="text" style="padding: 0%;">
                    <v-card-title>{{shopItem.name}}</v-card-title>
                      <v-card-subtitle >{{shopItem.points}} pts.</v-card-subtitle>
                      <v-card-text >{{shopItem.description}}</v-card-text>
                      <div class="buttons">
                        <v-btn color="red" @click="editShopItem(shopItem.id)" width = auto>Edit</v-btn> <!-- EDIT BUTTON -->
                        <v-btn color="red" @click="deleteShopItem(shopItem.id)" width = auto>Delete</v-btn> <!-- EDIT BUTTON -->
                      </div>
                  </v-card>
                    
                    
                    
                </v-card>
              </v-col>
            </v-row>
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
.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}


</style>
