<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import EagleExperienceServices from "../services/eagleExperienceServices.js";
import CategoryServices from "../services/categoryServices.js";
import MenuBar from "../components/MenuBar.vue";
import Utils from "../config/utils.js";

const router = useRouter();
const route = useRoute();
const user = ref({});

const dialog = ref(false);
const currentItem = ref(0);

const categories = ref([]);
const categoryNames = ref([]);

const experienceId = ref('');

const message = ref("");

const experienceCategoryName = ref({name: ""});

const experience = ref({
  categoryId: 0,
  name: null,
  description: null,
  semesterFromGrad: null,
  points: "",
  reflectionReq: false,
});


const getEagleExperience = async () => {
  const response = await EagleExperienceServices.getEagleExperiences(experienceId.value);
  experience.value = response.data;

  const category = categories.value.find(
    (cat) => cat.id === experience.value.categoryId
  );
  if (category) experienceCategoryName.value.name = category.name;
};

const getCategoryNames = () => {
  for(let i = 0; i < categories.value.length; i++){
    categoryNames.value.push(categories.value[i].name);
  }
  console.log("Category Name:", categoryNames.value);
}


const fetchCategories = () => {
  CategoryServices.getAllCategories()
    .then((response) => {
      categories.value = response.data; // Assuming the backend returns an array of categories
      console.log("Fetched categories:", categories.value);
      getCategoryNames();
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });
    
};

const saveEagleExperience = () => {
  for(let i = 0; i < categories.value.length; i++){
    console.log("first name: " + categories.value[i].name);
    console.log("second name: " + experienceCategoryName.value.name);
    if(categories.value[i].name == experienceCategoryName.value.name){
      experience.value.categoryId = categories.value[i].id;
      console.log("id:" + categories.value[i].id);
    }

  }
  if(experience.value.name == "" || experience.value.description == "" || experience.value.semesterFromGrad == "" ){
    message.value =  "Please enter correct data for all fields";
  }else {
  EagleExperienceServices.updateEagleExperiences(experienceId.value, experience.value)
    .then(() => {
      message.value = "Experience saved successfully";
      router.push({ name: "ViewAllEagleExperience" }); // hypothetical route name for education list
    })
    .catch((e) => {
      message.value =  "Please enter correct data for all fields";
    });

  }
};


const cancel = () => {
  router.push({ name: "ViewAllEagleExperience" }); // hypothetical route for cancel action
};

onMounted(() => {
  user.value = Utils.getStore('user')
  experienceId.value = route.params.id;
  console.log(user.value)
  fetchCategories();
  getEagleExperience();
})

</script>

<template>
    <v-app class="rounded rounded-md">
      <v-main> <!--            MAIN            -->
        <v-list-item></v-list-item><!-- SPACE ABOVE TIMELINE -->
        <v-card-title class="page-title">Experience</v-card-title>
        <!-- <v-card > -->
          <v-container width="70%" fluid style="background: lightgrey; height:100%;">
            <p color="red">{{ message }}</p>
            <p>Required *</p>
            <v-row justify="left">
              <v-col>
                    <v-form>
                        <v-text-field
                        v-model="experience.name"
                        label="Name*"
                        required
                        bg-color = "white"
                        ></v-text-field>

                        <v-sheet>
                        <v-autocomplete 
                        v-model="experienceCategoryName.name"
                        label="Category"
                        :items=categoryNames
                        bg-color="white"
                         ></v-autocomplete>
                         </v-sheet>
                                <v-textarea
                                    v-model="experience.description"
                                    label="Description*"
                                    class="mr-2"
                                    required
                                    bg-color = "white"
                                ></v-textarea>
                                <div class="row">
                                    <v-text-field
                                    v-model="experience.points"
                                    label="Points*"
                                    type = "number"
                                    required
                                    bg-color = "white"
                                ></v-text-field>
                                <v-text-field
                                    v-model="experience.semesterFromGrad"
                                    label="Semesters from Graduation*"
                                    class="mr-2"
                                    type = "number"
                                    required
                                    bg-color = "white"
                                ></v-text-field>
                                </div>
                                <p color="red">{{ message }}</p>
                                <div class="buttons">
                                <v-btn color="error" @click="cancel">Cancel</v-btn>
                                <v-btn color="red" @click="saveEagleExperience">Save</v-btn>
                                </div>
                    </v-form>
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

.check-row{
  display: inline-block;
}

.v-autocomplete{
  background-color: lightgray;
}


</style>
