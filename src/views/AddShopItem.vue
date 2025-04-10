<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import MenuBar from "../components/MenuBar.vue";
import Utils from "../config/utils.js";
import shopItemServices from "../services/shopItemServices.js";

const router = useRouter();
const user = ref({});

const image = ref(undefined);
const imageUrl= ref("");
// var imageUrl = "";

const shopItems = ref(
  [{ name: "", points: 0, description: "", imageLink:""},
  ]);

const shopItem = ref({
  name: "", 
  points: 0, 
  description: "", 
  imageLink:""
});
const message = ref("");
const rules = ref(
  {required: value => !!value || 'Field is required', notZero: value => value > 0 || 'Cannot be 0 or less points'},
)

const saveShopItem = () => {
  shopItemServices.createShopItem(shopItem)
    .then(() => {
      message.value = "Experience saved successfully";
      cancel();
    })
    .catch((e) => {
      message.value = "An error occurred";
    });
};

const cancel = () => {
  router.push({ name: "StudentShop" }); // hypothetical route for cancel action
};

onMounted(() => {
  user.value = Utils.getStore('user')
  // fetchShopItems();
  console.log(user.value)
});


const submit = async (event) => {
  var results = await event;
  if(results.isValid) {saveShopItem()}

}
// const fetchShopItems = () => {
//   shopItemServices.getAllShopItems()
//     .then((response) => {
//       shopItems.value = response.data; // Assuming the backend returns an array of events
//       console.log("Fetched shop items:", shopItems.value);
//     })
//     .catch((error) => {
//       console.error("Error fetching shop items:", error);
//     });
// };

const createImage = (file) => {
  const reader = new FileReader();

  reader.onload = e => {
    imageUrl.value = e.target.result;
    // imageUrl = e.target.result;
  };
  reader.readAsDataURL(file);
  console.log("imageUrl: ", imageUrl)
};

const onFileChange = (file)  => {
  //var returnFile = await file;
  //console.log("myfile: ", returnFile);
  //console.log("file: ", file);
  if (!file) {
    return;
  }
  createImage(file);
};
</script>

<template>
  <v-app>
    <v-container width="70%" fluid style="background: lightgrey; height:100%;">
        <v-card-title class="text-center">
          Add Shop Item
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
                    <v-img style="border: 2px; border-color: black;"
                      :src="imageUrl"
                      aspect-ratio="1"
                      class="text-center ma-3 rounded"
                      height="250"
                    ></v-img>
                  </v-sheet>
                  <v-card-subtitle>
                    <!-- {{imageUrl}} -->
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
                      required
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
