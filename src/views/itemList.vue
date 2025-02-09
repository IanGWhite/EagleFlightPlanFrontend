<script setup>
import { ref,onMounted } from "vue";
import { useRouter } from "vue-router";
import linkServices from "../services/linkServices";
import skillServices from "../services/skillServices.js";
import contactServices from "../services/contactServices.js";
import educationServices from "../services/educationServices";
import experienceServices from "../services/experienceServices";
import interestServices from "../services/interestServices.js";
import projectServices from "../services/projectServices.js";
import awardServices from "../services/awardServices.js";
import Utils from "../config/utils.js";


const router = useRouter(); 
const user = ref({});
const contactInfo = ref({
  firstName: "",
  lastName: "",
  city: "",
  state: "",
  email: ""
});



const personalLinks = ref([{ type: "", link: "" }]);
const experiences = ref([{ name: ""}]);
const educations = ref([{name: ""}]);
const skills = ref([{description :""}]);
const interests = ref([{description: ""}]);
const projects = ref([{name : ""}]);
const awards =  ref([{title: ""}]);
 

const addPersonalLink = () => personalLinks.value.push({ type: "", link: "" }); 
const addEducation = () => router.push({ name: 'addEducation' });
const editEducation = (myEducation) => router.push({ name: 'EditEducation', params: { id: myEducation.id } });
const addExperience = () => router.push({ name: 'AddExperience' });
const editExperience = (myExperience) => router.push({ name: 'EditExperience', params: {id: myExperience.id} });
const addProject = () => router.push({ name: 'AddProject' });
const editProject = (myProject) => router.push({ name: 'EditProject', params: { id: myProject.id } });
const addSkill = () => skills.value.push({ description: ""}); 
const addInterest = () => interests.value.push({ description: ""});
const addAward = () => router.push({ name: 'AddAward' });
const editAward = (myAward) => router.push({ name: 'EditAward', params: { id: myAward.id } });

const savePersonalLink = (index) => {
  const link = personalLinks.value[index];
  if (link.id) {
    // Update an existing link
    linkServices.updateLink(user.value.studentId, link.id, link)
      .then(() => {
        console.log("Link updated successfully:", link);
      })
      .catch((error) => {
        console.error("Error updating link:", error);
      });
  } else {
    linkServices.createLink(user.value.studentId, link) // Send only the specific link
      .then((response) => {
        personalLinks.value[index].id = response.data.id; // Update the ID if backend assigns it
        console.log("Added:", personalLinks.value[index]);
    })
      .catch((e) => {
        message.value =  "An error occurred";
    });
  }
};

const deleteLink = (index) => {
  const linkToDelete = personalLinks.value[index];
  if (linkToDelete.id) {
    linkServices.deleteLink(user.value.studentId, linkToDelete.id) // Delete link from backend
      .then(() => {
        personalLinks.value.splice(index, 1);
        console.log("Link deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting link:", error);
      });
  } else {
    personalLinks.value.splice(index, 1); // Remove locally if not saved to backend
  }
};


const deleteEducation = (myEducation) => {
  if (myEducation.id) {
    educationServices.deleteEducation(user.value.studentId, myEducation.id) // Delete link from backend
      .then(() => {
        console.log("Education deleted successfully");
        fetchEducation();
        educations.value.splice(myEducation.id, 1);
      })
      .catch((error) => {
        console.error("Error deleting Education:", error);
      });
  }
};


const deleteProject = (myProject) => {
  if (myProject.id) {
    projectServices.deleteProject(user.value.studentId, myProject.id) // Delete link from backend
      .then(() => {
        console.log("Project deleted successfully");
        fetchProject();
        projects.value.splice(myProject.id, 1);
      })
      .catch((error) => {
        console.error("Error deleting Project:", error);
      });
    }
  };

const deleteExperience = (myExperience) => {
  if (myExperience.id) {
    experienceServices.deleteExperience(user.value.studentId, myExperience.id) // Delete link from backend
      .then(() => {
        console.log("Education deleted successfully");
        fetchExperiences();
        experiences.value.splice(myExperience.id, 1);
      })
      .catch((error) => {
        console.error("Error deleting Education:", error);

      });
  }
};

const deleteAward = (myAward) => {
  if (myAward.id) {
    awardServices.deleteAward(user.value.studentId, myAward.id) // Delete link from backend
      .then(() => {
        console.log("Award deleted successfully");
        fetchAward();
        experiences.value.splice(myAward.id, 1);
      })
      .catch((error) => {
        console.error("Error deleting Award:", error);
      });
  }
};


const saveSkill = (index) => {
  const skill = skills.value[index];
  if (skill.id) {
    // Update an existing skill
    skillServices.updateSkill(user.value.studentId, skill.id, skill)
      .then(() => {
        console.log("Skill updated successfully:", skill);
      })
      .catch((error) => {
        console.error("Error updating skill:", error.response?.data?.message || error.message);
      });
  } else {
    // Create a new skill
    skillServices.createSkill(user.value.studentId, skill)
      .then((response) => {
        skills.value[index].id = response.data.id; // Update the ID assigned by the backend
        console.log("Skill added successfully:", skills.value[index]);
      })
      .catch((error) => {
        console.error("Error saving skill:", error.response?.data?.message || error.message);
      });
  }
};

const deleteSkill = (index) => {
  const skillToDelete = skills.value[index];
  
  if (skillToDelete.id) {
    // Delete from backend if it has an ID
    skillServices.deleteSkill(user.value.studentId, skillToDelete.id)
      .then(() => {
        skills.value.splice(index, 1); // Remove from local array
        console.log("Skill deleted successfully:", skillToDelete);
      })
      .catch((error) => {
        console.error("Error deleting skill:", error.response?.data?.message || error.message);
      });
  } else {
    // If no ID, just remove locally
    skills.value.splice(index, 1);
  }
};



const saveContactInfo = () => {
 const contact = contactInfo.value;
  if (contact.id) {
    // Update an existing contact
    contactServices.updateContact(user.value.studentId, contact.id, contact)
      .then(() => {
        console.log("contact updated successfully:", contact);
      })
      .catch((error) => {
        console.error("Error updating contact:", error);
      });
  } else {
    contactServices.createContact(user.value.studentId, contact)
      .then((response) => {
        contactInfo.value.id = response.data.id; // Update the ID if backend assigns it
        console.log("Added:", contactInfo.value);
    })
      .catch((e) => {
        message.value =  "An error occurred";
    });
  }
};

const saveInterest = (index) => {
  const interest = interests.value[index];
  if (interest.id) {
    // Update an existing interest
    interestServices.updateInterest(user.value.studentId, interest.id, interest)
      .then(() => {
        console.log("Interest updated successfully:", interest);
      })
      .catch((error) => {
        console.error("Error updating interest:", error.response?.data?.message || error.message);
      });
  } else {
    // Create a new interest
    interestServices.createInterest(user.value.studentId, interest)
      .then((response) => {
        interests.value[index].id = response.data.id; // Update the ID assigned by the backend
        console.log("Interest added successfully:", interests.value[index]);
      })
      .catch((error) => {
        console.error("Error saving interest:", error.response?.data?.message || error.message);
      });
  }
};

const deleteInterest = (index) => {
  const interestToDelete = interests.value[index];
  
  if (interestToDelete.id) {
    // Delete from backend if it has an ID
    interestServices.deleteInterest(user.value.studentId, interestToDelete.id)
      .then(() => {
        interests.value.splice(index, 1); // Remove from local array
        console.log("Interest deleted successfully:", interestToDelete);
      })
      .catch((error) => {
        console.error("Error deleting interest:", error.response?.data?.message || error.message);
      });
  } else {
    // If no ID, just remove locally
    interests.value.splice(index, 1);
  }
};

onMounted(() => {
  user.value = Utils.getStore('user')
  console.log(user.value)
  fetchLinks();
  fetchSkills();
  fetchContact();
  fetchEducation();
  fetchExperiences();
  fetchInterests();
  fetchProject();
  fetchAward();
})

// Fetch links from the database
const fetchLinks = () => {
  linkServices.getAllLinks(user.value.studentId)
    .then((response) => {
      personalLinks.value = response.data; // Assuming the backend returns an array of links
      console.log("Fetched links:", personalLinks.value);
    })
    .catch((error) => {
      console.error("Error fetching links:", error);
    });
};

const fetchSkills = () => {
  skillServices.getAllSkills(user.value.studentId)
    .then((response) => {
      skills.value = response.data; // Assuming the backend returns an array of skills
      console.log("Fetched skills:", skills.value);
    })
    .catch((error) => {
      console.error("Error fetching skills:", error);
    })
};

const fetchInterests = () => {
  interestServices.getAllInterests(user.value.studentId)
    .then((response) => {
      interests.value = response.data; 
      console.log("Fetched interests:", interests.value);
    })
    .catch((error) => {
      console.error("Error fetching interests:", error);
    })
};

const fetchContact = () => {
  contactServices.getAllContacts(user.value.studentId)
    .then((response) => {
      if (response.data && response.data.length > 0) {
        contactInfo.value = response.data[0]; // Assuming only one contact entry per user
      } else {
        console.log("No contact info found.");
      }
      console.log("Fetched Contact Info:", contactInfo.value);
    })
    .catch((error) => {
      console.error("Error fetching contact info:", error);
    });
};

const fetchExperiences = () => {
  experienceServices.getAllExperiences(user.value.studentId)
    .then((response) => {
      experiences.value = response.data; // Assuming the backend returns an array of links
      console.log("Fetched Experiences:", experiences.value);
    })
    .catch((error) => {
      console.error("Error fetching Experiences:", error);
    });
};

const fetchEducation = () => {
  educationServices.getAllEducations(user.value.studentId)
    .then((response) => {
      educations.value = response.data; 
      console.log("Fetched Educations:", educations.value);
    })
    .catch((error) => {
      console.error("Error fetching Educations:", error);
    });
};

const fetchProject= () => {
  projectServices.getAllProjects(user.value.studentId)
    .then((response) => {
      projects.value = response.data; 
      console.log("Fetched Projects:", projects.value);
    })
    .catch((error) => {
      console.error("Error fetching Projects:", error);
    });
};
const fetchAward= () => {
  awardServices.getAllAwards(user.value.studentId)
    .then((response) => {
      awards.value = response.data; 
      console.log("Fetched Awards:", awards.value);
    })
    .catch((error) => {
      console.error("Error fetching Awards:", error);
    });
};

</script>

<template>
  <v-container>

    <!-- Contact Info Section -->
    <v-card class="mb-6">
      <v-card-title>Contact Info</v-card-title>
      <v-card-text>
        <v-text-field v-model="contactInfo.firstName" label="First Name" />
        <v-text-field v-model="contactInfo.lastName" label="Last Name" />
        <v-text-field v-model="contactInfo.city" label="City" />
        <v-text-field v-model="contactInfo.state" label="State" />
        <v-text-field v-model="contactInfo.email" label="E-mail" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="red" text @click="saveContactInfo">Save</v-btn>
      </v-card-actions>
    </v-card>

    <!-- Personal Links Section -->
<v-card class="mb-6">
  <v-card-title>Personal Links</v-card-title>
  <v-card-text>
    <v-row v-for="(link, index) in personalLinks" :key="index">
      <v-col cols="5">
        <v-text-field v-model="link.type" label="Type (GitHub, Social)" />
      </v-col>
      <v-col cols="5">
        <v-text-field v-model="link.link" label="Link" />
      </v-col>
      <v-col cols="2">
        <v-btn icon @click="deleteLink(index)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn icon @click="savePersonalLink(index)">
          Save
        </v-btn>
      </v-col>
    </v-row>
    <v-btn color="red" text @click="addPersonalLink">+ Add Link</v-btn>
  </v-card-text>
</v-card>


<v-card class="mb-6">
  <v-card-title>Education</v-card-title>
  <v-card-text>
    <v-row v-for="(education, index) in educations" :key="index">
      <v-col cols="10">
        <v-card-text> {{ education.name }}</v-card-text>
      </v-col>
      <v-col cols="2">
        <v-btn icon @click="deleteEducation(education)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn icon @click="editEducation(education)">
          Edit
        </v-btn>
      </v-col>
    </v-row>
    <v-btn color="red" text @click="addEducation">+ Add Education</v-btn>
  </v-card-text>
</v-card>

<v-card class="mb-6">
  <v-card-title>Experience</v-card-title>
  <v-card-text>
    <v-row v-for="(experience, index) in experiences" :key="index">
      <v-col cols="10">
        <v-card-text> {{ experience.name }}</v-card-text>
      </v-col>
      <v-col cols="2">
        <v-btn icon @click="deleteExperience(experience)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn icon @click="editExperience(experience)">
          Edit
        </v-btn>
      </v-col>
    </v-row>
    <v-btn color="red" text @click="addExperience">+ Add Experience</v-btn>
  </v-card-text>
</v-card>
    

  <v-card class="mb-6">
    <v-card-title>Project</v-card-title>
    <v-card-text>
      <v-row v-for="(project, index) in projects" :key="index">
        <v-col cols="10">
          <v-card-text> {{ project.name }}</v-card-text>
        </v-col>
        <v-col cols="2">
          <v-btn icon @click="deleteProject(project)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn icon @click="editProject(project)">
            <v-icon>mdi-edit</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-btn color="red" text @click="addProject">+ Add</v-btn>
    </v-card-text>
  </v-card>

  
 <v-card class="mb-6">
 <v-card-title>Skills</v-card-title>
 <v-card-text>
   <v-row v-for="(skill, index) in skills" :key="index">
     <v-col cols="10">
      <v-text-field v-model="skill.description" label="Skill" />
     </v-col>
     <v-col cols="2">
       <v-btn icon @click="deleteSkill(index)">
         <v-icon>mdi-delete</v-icon>
       </v-btn>
       <v-btn icon @click="saveSkill(index)">
          Save
       </v-btn> 
     </v-col>
   </v-row>
   <v-btn color="red" text @click="addSkill">+ Add Skill</v-btn>
 </v-card-text>
</v-card>

  <v-card class="mb-6">
    <v-card-title>Interests</v-card-title>
    <v-card-text>
      <v-row v-for="(interest, index) in interests" :key="index">
        <v-col cols="10">
          <v-text-field v-model="interest.description" label="Interests" />
        </v-col>
        <v-col cols="2">
          <v-btn icon @click="deleteInterest(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn icon @click="saveInterest(index)">
            Save
          </v-btn> 
        </v-col>
      </v-row>
      <v-btn color="red" text @click="addInterest">+ Add Interest</v-btn>
    </v-card-text>
  </v-card>


  <v-card class="mb-6">
    <v-card-title>Awards</v-card-title>
    <v-card-text>
      <v-row v-for="(award, index) in awards" :key="index">
        <v-col cols="10">
          <v-card-text> {{ award.title }}</v-card-text>
        </v-col>
        <v-col cols="2">
          <v-btn icon @click="deleteAward(award)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn icon @click="editAward(award)">
            Edit
          </v-btn> 
        </v-col>
      </v-row>
      <v-btn color="red" text @click="addAward">+ Add Award</v-btn>
    </v-card-text>
  </v-card>
  </v-container>
</template>

<style scoped>
.v-container {
  max-width: 800px;
  margin: auto;
}
</style>
