<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import TaskServices from "../services/eagleTaskServices";
import CategoryServices from "../services/categoryServices";
import MenuBar from "../components/MenuBar.vue";
import Utils from "../config/utils.js";

const router = useRouter();
const route = useRoute();
const user = ref({});

const otherTasks = ref([]);
const otherTasksNames = ref([]);

const taskId = ref('');

const categories = ref([]);
const categoryNames = ref([]);

const message = ref("");

const taskCategoryName = ref({ name: "" });

const task = ref({
  name: '',
  description: '',
  points: 0,
  semestersFromGrad: 0,
  rationale: '',
  reflectionReq: 0,
  canUpload: 0,
  prereqName: '',
  hyperLink: '',
  categoryId: null,
});

const getEagleTask = async () => {
  const response = await TaskServices.getEagleTasks(taskId.value);
  task.value = response.data;

  const category = categories.value.find(
    (cat) => cat.id === task.value.categoryId
  );
  if (category) taskCategoryName.value.name = category.name;
};

const getEagleTaskNames = () => {
  otherTasksNames.value = otherTasks.value.map(task => task.name);
};

const getCategoryNames = () => {
  categoryNames.value = categories.value.map(cat => cat.name);
};

const fetchEagleTasks = () => {
  TaskServices.getAllEagleTasks()
    .then((response) => {
      otherTasks.value = response.data;
      getEagleTaskNames();
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });
};

const fetchCategories = () => {
  return CategoryServices.getAllCategories() // <== return this
    .then((response) => {
      categories.value = response.data;
      getCategoryNames();
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });
};


const saveTask = () => {
  const category = categories.value.find(
    (cat) => cat.name.toLowerCase() === taskCategoryName.value.name.toLowerCase()
  );
  if (category) {
    task.value.categoryId = category.id;
  }

  TaskServices.updateEagleTask(taskId.value,task.value)
    .then(() => {
      message.value = "Task saved successfully";
      router.push({ name: "viewAllTasks" });
    })
    .catch(() => {
      message.value = "Please enter correct data for all fields";
    });
};

const cancel = () => {
  router.push({ name: "viewAllTasks" });
};

onMounted(async () => {
  user.value = Utils.getStore('user');
  taskId.value = route.params.id;

 await fetchCategories(); // ✅ Wait for categories to load
  fetchEagleTasks();       // optional to await
  if (taskId.value) getEagleTask();
});

</script>

<template>
  <v-app class="rounded rounded-md">
    <v-main>
      <v-list-item></v-list-item>
      <v-card-title class="page-title">Task</v-card-title>

      <v-container width="70%" fluid style="background: lightgrey; height:100%;">
        <p style="color: red">{{ message }}</p>
        <p>Required *</p>
        <v-row justify="left">
          <v-col>
            <v-form>
              <v-text-field
                v-model="task.name"
                label="Name*"
                required
                bg-color="white"
              ></v-text-field>

              <v-sheet>
                <v-autocomplete 
                  v-model="taskCategoryName.name"
                  label="Category"
                  :items="categoryNames"
                  bg-color="white"
                ></v-autocomplete>
              </v-sheet>

              <v-textarea
                v-model="task.description"
                label="Description"
                class="mr-2"
                required
                bg-color="white"
              ></v-textarea>

              <div class="row">
                <v-text-field
                  v-model="task.points"
                  label="Points*"
                  type="number"
                  required
                  bg-color="white"
                ></v-text-field>
                <v-text-field
                  v-model="task.semestersFromGrad"
                  label="Semesters from Graduation*"
                  class="mr-2"
                  type="number"
                  required
                  bg-color="white"
                ></v-text-field>
              </div>

              <v-textarea
                v-model="task.rationale"
                label="Rationale"
                rows="4"
                bg-color="white"
              ></v-textarea>

              <v-row>
                <v-checkbox
                  v-model="task.reflectionReq"
                  :value="1"
                  label="Requires Reflection"
                  @change="task.reflectionReq = task.reflectionReq ? 1 : 0"
                ></v-checkbox>
                <v-checkbox
                  v-model="task.canUpload"
                  :value="1"
                  label="Requires Upload"
                  @change="task.canUpload = task.canUpload ? 1 : 0"
                ></v-checkbox>
              </v-row>

              <v-sheet>
                <v-autocomplete 
                  v-model="task.prereqName"
                  label="Prerequisite"
                  :items="otherTasksNames"
                  bg-color="white"
                ></v-autocomplete>
              </v-sheet>

              <v-text-field
                v-model="task.hyperLink"
                label="Hyperlink"
                bg-color="white"
              ></v-text-field>

              <p style="color: red">{{ message }}</p>

              <div class="buttons">
                <v-btn color="error" @click="cancel">Cancel</v-btn>
                <v-btn color="red" @click="saveTask">Save</v-btn>
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
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
.card-list-item {
  min-height: 10px;
}
.card-link-text {
  opacity: 0.5;
  color: black;
  text-decoration: none;
}
.card-link-text-wrapper {
  text-align: right;
  padding-top: 1%;
  padding-bottom: 3%;
}
.navigation-drawer {
  border: 0;
}
.points-text {
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  line-height: 0.7;
  padding-top: 3%;
}
.badge-image {
  max-height: 10%;
}
.check-row {
  display: inline-block;
}
.v-autocomplete {
  background-color: lightgray;
}
</style>
