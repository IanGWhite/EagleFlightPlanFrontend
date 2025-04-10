<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import MenuBar from "../components/MenuBar.vue";
import Utils from "../config/utils.js";
import shopItemServices from "../services/shopItemServices.js";

const router = useRouter();
const user = ref({});

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

const saveShopItem5 = () => {
  ExperienceServices.createExperience(user.value.studentId,experience.value)
    .then(() => {
      message.value = "Experience saved successfully";
      router.push({ name: "StudentInfo" }); // hypothetical route name for experience list
    })
    .catch((e) => {
      message.value = "An error occurred";
    });
};

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
})

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
</script>

<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title class="text-center">
          Add Shop Item
        </v-card-title>
        <v-card-text>
          <p>{{ message }}</p>
          <v-form>
            <v-text-field
              v-model="shopItem.name"
              label="Item Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="shopItem.points"
              label="Points"
              type="number"
              required
            ></v-text-field>

            <!-- <v-text-field
              v-model="shopItem.state"
              label="State"
              required
            ></v-text-field> -->

            <div class="row">
              <!-- <v-text-field
                v-model="shopItem.startDate"
                label="Start Month"
                class="mr-2"
                required
              ></v-text-field>
              <v-text-field
                v-model="shopItem.endDate"
                label="End Month"
                required
              ></v-text-field> -->
            </div>

            <v-textarea
              v-model="shopItem.description"
              label="Description"
              rows="4"
            ></v-textarea>

            <div class="buttons">
              <v-btn color="error" @click="cancel">Cancel</v-btn>
              <v-btn color="red" type="submit">Save</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
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
</style>
