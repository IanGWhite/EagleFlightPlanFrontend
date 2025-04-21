<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import MenuBar from "../components/MenuBar.vue";
import Utils from "../config/utils.js";
import shopItemServices from "../services/shopItemServices.js";

const router = useRouter();
const route = useRoute();
const user = ref({});
const image = ref(undefined);
const imageUrl= ref("");
// var imageUrl = "";
const placeholderImage = new URL('../assets/shop/image_placeholder.jpg', import.meta.url).href;


const shopItem = ref({});
const rules = ref(
  {required: value => !!value || 'Field is required', notZero: value => value > 0 || 'Cannot be 0 or less points'
  },
)

const message = ref("");

const submit = async (event) => {
  var results = await event;
  console.log(results)
  if(results.valid) {
    saveShopItem();
    // console.log("Yay submit")
  }
  else
    console.log("submit failed")
};

const saveShopItem = () => {
  // shopItem.value.imageLink = imageUrl.value;
  // console.log("imageURL in save: ", imageUrl.value)
  shopItemServices.updateShopItem(shopItem.value.id, shopItem.value)
    .then(() => {
      message.value = "shop Item saved successfully";
      cancel();
    })
    .catch((e) => {
      message.value = "An error occurred";
      console.log(e);
    });
};

const getShopItem = async (shopItemId) => {
  const response = await shopItemServices.getShopItem(shopItemId)
  console.log("shop item info:");
  console.log(response.data);

  shopItem.value = response.data;

};

const cancel = () => {
  router.push({ name: "AdminShop" }); // hypothetical route for cancel action
};

onMounted(() => {
  user.value = Utils.getStore('user')
  const shopItemId = route.params.id;
  if (shopItemId) {
    getShopItem(shopItemId);
  } else {
    console.error('No course ID provided in route');
  }
});

const resolveFrontendImage = (fullPath) => {
  try {
    if (!fullPath) throw new Error("No image path provided");

    const fileName = fullPath.split('/').pop();
    return new URL(`../assets/shop/${fileName}`, import.meta.url).href;
  } catch (err) {
    console.warn("Invalid image path:", fullPath);
    return new URL('../assets/shop/image_placeholder.jpg', import.meta.url).href;
  }
};



const createImage = (file) => {
  const reader = new FileReader();

  reader.onload = e => {
    imageUrl.value = e.target.result;
    // imageUrl = e.target.result;
  };
  reader.readAsDataURL(file);
  console.log("imageUrl: ", imageUrl)
};

const onFileChange = (file) => {
  if (!file) return;

  createImage(file);

  // Automatically update imageLink with just the filename (or a relative path)
  const fileName = file.name;
  shopItem.value.imageLink = `shop/${fileName}`;
};

</script>

<template>
  <v-app>
    <v-container width="70%" fluid style="background: lightgrey; height:100%;">
        <v-card-title class="text-center">
          Edit Shop Item
        </v-card-title>
        <v-card-text>
          <p>{{ message }}</p>
          <v-form @submit.prevent="submit" validate-on="submit lazy">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="shopItem.name"
                  label="Name"
                  required
                  :rules="[rules.required]"
                  bg-color="white"
                ></v-text-field>

                <v-text-field
                  v-model="shopItem.points"
                  label="Points"
                  type="number"
                  required
                  :rules="[rules.notZero]"
                  bg-color="white"
                ></v-text-field>
                
                <v-textarea
                  v-model="shopItem.description"
                  label="Description"
                  rows="4"
                  required
                  :rules="[rules.required]"
                  bg-color="white"
                ></v-textarea>
              </v-col>

              <v-col>
                <v-card>
                  <v-sheet class="text-center rounded">
                    <v-img
                      :src="imageUrl || resolveFrontendImage(shopItem.imageLink)"
                      :lazy-src="placeholderImage"
                      aspect-ratio="1"
                      class="text-center ma-3 rounded"
                      height="250"
                    />



                  </v-sheet>
                  <v-card-subtitle>
                    <v-text-field
                      v-model="shopItem.imageLink"
                      label="Image Path"
                      bg-color="white"
                    ></v-text-field>
                  </v-card-subtitle>

                  <v-card-text>
                    <v-file-input 
                      @update:model-value="onFileChange"
                      v-model="image"
                      label="Upload Image"
                      prepend-icon=""
                      append-inner-icon="mdi-camera"
                      variant="solo"
                      accept="image/png, image/jpeg"
                    >
                  </v-file-input>
                  </v-card-text>
                </v-card>
              </v-col>
              
            </v-row>
            

            <div class="buttons">
              <v-btn color="error" @click="cancel">Cancel</v-btn>
              <v-btn color="red" type="submit">Save</v-btn>
            </div>
          </v-form>
        </v-card-text>
    </v-container>
  </v-app>
</template>

<style scoped>
.container {
  width: 300px;
  padding: 20px;
  text-align: center;
  background-color: #f5e4d7;
}
.row {
  display: flex;
  justify-content: space-between;
}
.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.v-field__overlay{
  opacity: 1;
  background-color: white;
}
</style>
