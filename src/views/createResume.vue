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
import jsPDF from 'jspdf';
import Utils from "../config/utils.js";
import resumeExperienceServices from "../services/resumeExperienceServices.js";
import resumeEducationServices from "../services/resumeEducationServices.js";
import resumeLinkServices from "../services/resumeLinkServices.js";
import resumeAwardServices from "../services/resumeAwardServices.js";
import resumeInterestServices from "../services/resumeInterestServices.js";
import resumeProjectServices from "../services/resumeProjectServices.js";
import resumeSkillServices from "../services/resumeSkillServices.js";
import resumeService from "../services/resumeService.js";

const user = ref({});
const thisResumeId = ref({});
const router = useRouter();
//const resumeName = ref("");
const resumeData = ref({
  name: "",
  summary: "",
});
const personalLinks = ref({ type: "", link: "" });
const contactInfo = ref({
  firstName: "",
  lastName: "",
  city: "",
  state: "",
  email: ""
});
//const professionalSummary = ref("");
const skills = ref([{description :""}]);
const interests = ref([{description :""}]);
const educations = ref({
  name: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  degree: "",
  gpa: "",
  coursework: ""
});
const experiences = ref({
  name: "",
  position: "",
  monthStart: "",
  monthEnd: "",
  description: ""
});
const awards = ref({
  organization: "",
  title: "",
  monthStart: "",
  monthEnd: "",
  description: ""
});
const projects = ref({
  name: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  position: "",
  description: ""
});


const sections = ref({
  personalLink: [{ name: "link 1", checked: true }],
  education: [{ name: "School 1", checked: true }],
  experience: [{ name: "Company 1", checked: true }],
  projects: [{ name: "Project 1", checked: true }],
  skills: [{ name: "Skill 1", checked: true }],
  interests: [{ name: "Interest 1", checked: true }],
  awards: [{ name: "Award 1", checked: true }],
});


const addSectionItem = (sectionKey) => {
  sections.value[sectionKey].push({ name: "", checked: false });
};

onMounted(() => {
  user.value = Utils.getStore('user')
  //console.log(user.value)
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
      sections.value.personalLink = response.data.map((link) => ({
        name: link.link,
      })); // Assuming the backend returns an array of links
      personalLinks.value = response.data;
      console.log("Fetched links:", personalLinks.value[0].link);
    })
    .catch((error) => {
      console.error("Error fetching links:", error);
    });
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
const fetchSkills = () => {
  skillServices.getAllSkills(user.value.studentId)
    .then((response) => {
      sections.value.skills = response.data.map((skill) => ({
        name: skill.description,
      }));
      skills.value = response.data; // Assuming the backend returns an array of skills
      console.log("Fetched skills:", skills.value);
    })
    .catch((error) => {
      console.error("Error fetching skills:", error);
    })
};
const fetchEducation = () => {
  educationServices.getAllEducations(user.value.studentId)
    .then((response) => {
      sections.value.education = response.data.map((edu) => ({
        name: edu.name,
      }));
      educations.value = response.data; // Assuming the backend returns an array of links
      console.log("Fetched Educations:", educations.value);
    })
    .catch((error) => {
      console.error("Error fetching Educations:", error);
    });
};
const fetchExperiences = () => {
  experienceServices.getAllExperiences(user.value.studentId)
    .then((response) => {
      sections.value.experience = response.data.map((exp) => ({
        name: exp.name,
      }));
      experiences.value = response.data; 
      console.log("Fetched Experiences:", experiences.value);
    })
    .catch((error) => {
      console.error("Error fetching Experiences:", error);
    });
};
const fetchInterests = () => {
  interestServices.getAllInterests(user.value.studentId)
    .then((response) => {
      interests.value = response.data; 
      sections.value.interests = response.data.map((interest) => ({
        name: interest.description,
      }));
      interests.value = response.data; 
      console.log("Fetched interests:", interests.value);
    })
    .catch((error) => {
      console.error("Error fetching interests:", error);
    })
};
const fetchProject= () => {
  projectServices.getAllProjects(user.value.studentId)
    .then((response) => {
      sections.value.projects = response.data.map((project) => ({
        name: project.name,
      }));
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
      sections.value.awards = response.data.map((award) => ({
        name: award.description,
      }));
      awards.value = response.data; 
      console.log("Fetched Awards:", awards.value);
    })
    .catch((error) => {
      console.error("Error fetching Awards:", error);
    });
};

const saveResume = () => {
  try {
    console.log("Resume data being saved:", {
      resumeData,
      personalLinks,
      sections,
    });

    // Call save function and handle any issues
    saveResumeToDatabase();

    // Generate resume logic
    generateResume1();
    router.push({ name: 'ResumeListStudents' });
  } catch (error) {
    console.error("Error occurred in saveResume:", error);
  }
};


const font = "times";
const generateResume1 = () => {
  var doc = new jsPDF();
  //console.log(doc.getFontList());
  var pageWidth = doc.internal.pageSize.getWidth(); 
  var pageHeight = doc.internal.pageSize.getHeight();
  var pageCenter = pageWidth/2
  var currentY = 25;

  doc.setFontSize(20);
  doc.setFont(font, "bold");
  var tempString = contactInfo.value.firstName + " " + contactInfo.value.lastName;
  doc.text(tempString, pageCenter, currentY, {align: "center"}); currentY += 6;
  doc.setFont(font, "normal");
  AddContactInfo(doc, currentY, pageCenter);
  currentY += 15;
  currentY = AddSummary(doc, currentY);
  
  
  currentY += 10;
  
  //education header
  
  currentY = AddEducationInfo(doc, currentY);
  currentY =  AddAwardInfo(doc, currentY);
  currentY += 5;
  currentY = AddExperienceInfo(doc, currentY);
  
  currentY = AddSkills(doc, currentY);
  
  doc.output('dataurlnewwindow');
  //doc.save("Resume");
};

const AddContactInfo = (doc, currentY, pageCenter) => {
  doc.setFontSize(11);
  var contactString = "";
  contactString = contactInfo.value.city + ", " + contactInfo.value.state + " | ";
  contactString += contactInfo.value.email;
  //if(sections.personalLink.checked.value)
  for(let i=0; i<sections.value.personalLink.length; i++)
  {
    var link = sections.value.personalLink[i];
    if(link.checked)
    {
      contactString += " | ";
      contactString += personalLinks.value[i].link;
      //contactString += link.name;
    }
  }
  doc.text(contactString, pageCenter, currentY, {align: "center"});
}

const AddSummary = (doc, currentY) => {
  currentY = AddHeader(doc, currentY, "SUMMARY");
  var pageWidth = doc.internal.pageSize.getWidth(); 
  doc.setFontSize(12);
  doc.setFont(font, "normal");
  var splitSummary = doc.splitTextToSize(resumeData.value.summary, pageWidth-20);
  doc.text(splitSummary, 10, currentY, {align: "left"});
  currentY += doc.getTextDimensions(splitSummary).h;
  return currentY;
}

const AddEducationInfo = (doc, currentY) => {

  currentY = AddHeader(doc, currentY, "EDUCATION");
  var pageWidth = doc.internal.pageSize.getWidth(); 
  var pageHeight = doc.internal.pageSize.getHeight();
  var pageCenter = pageWidth/2
  var lineHeight = 5;
  doc.setFontSize(11);
  
  for(let i=0; i<sections.value.education.length; i++)
  {
    var edu = sections.value.education[i];
    if(edu.checked)
    {
      // get school name and city and state
      doc.setFont(font, "bold");
  var workName = educations.value[i].name + ",";
  var temp = doc.text(workName, 10, currentY);
  
  doc.setFont(font, "normal");
  var cityState = educations.value[i].city + ", " + educations.value[i].state;
  doc.text(cityState, 10+(doc.getTextDimensions(workName).w * 1.1), currentY);

      var startEndDate = educations.value[i].startDate + " - " + educations.value[i].endDate;
      doc.text(startEndDate, pageWidth-10, currentY, {align:"right"});
      currentY += lineHeight;
      doc.setFont(font, "italic");
      doc.text(educations.value[i].degree, 10, currentY); currentY += lineHeight;
      doc.text("GPA: ", 10, currentY); 
      doc.text(educations.value[i].gpa, 20, currentY); currentY += lineHeight;
      doc.setFont(font, "normal");
      if(educations.value[i].coursework != "")
      {
        doc.text("Coursework: " + educations.value[i].coursework, 10, currentY); currentY+=lineHeight;
      }
    }
  }
  return currentY;
}

const AddAwardInfo = (doc, currentY) => {
  var pageWidth = doc.internal.pageSize.getWidth(); 
  if(sections.value.awards.length >= 1)
  {
    doc.setFont(font, "italic");
      doc.text("Awards: ", 10, currentY);
      doc.setFont(font, "normal");
  }
  for(let i=0; i<sections.value.awards.length; i++)
  {
    var award = sections.value.awards[i];
    if(award.checked)
    {
      doc.text(awards.value[i].title, 24, currentY);
      doc.text(awards.value[i].startDate, pageWidth-10, currentY, {align:"right"});
      currentY += 5;
      doc.text(awards.value[i].description, 15, currentY); currentY += 5;
      
    }
  }
  return currentY;
}

const AddExperienceInfo = (doc, currentY) => {
  currentY = AddHeader(doc, currentY, "PROFESSIONAL EXPERIENCE");
  var pageWidth = doc.internal.pageSize.getWidth(); 
  for(let i=0; i<sections.value.experience.length; i++)
  {
  var exp = sections.value.experience[i];
    if(exp.checked)
  {
  doc.setFontSize(11);
  doc.setFont(font, "bold");
  var workName = "Oklahoma Christian University";
  workName = experiences.value[i].name;
  workName += ",";
  var temp = doc.text(workName, 10, currentY);
  
  doc.setFont(font, "normal");
  temp = experiences.value[i].position + ", ";
  temp += experiences.value[i].state;
  doc.text(temp, 10+(doc.getTextDimensions(workName).w * 1.1), currentY);
  //console.log(doc.getTextDimensions(temp.text));
  temp = experiences.value[i].startDate + " - ";
  temp += experiences.value[i].endDate;
  doc.text(temp, pageWidth-10, currentY, {align:"right"});
  currentY += 5;
  temp = experiences.value[i].description;
  var splitSummary = doc.splitTextToSize(temp, pageWidth-40);
  doc.text(splitSummary, 20, currentY, {align: "left"});
  currentY += doc.getTextDimensions(splitSummary).h;
}
}
  return currentY + 5;
}

const AddSkills = (doc, currentY) => {
  currentY = AddHeader(doc, currentY, "SKILLS | INTERESTS");
  doc.setFont(font, "italic");
  doc.setFontSize(11);
  for(let i=0; i<sections.value.skills.length; i++)
  {
    var skill = sections.value.skills[i];
    if(skill.checked)
    {
      doc.setFont("Symbol");
      doc.setFontSize(20);
      doc.text('·', 15, currentY+1);
      doc.setFont(font, "italic");
      doc.setFontSize(11);
      doc.text(skills.value[i].description, 20, currentY);
      currentY += 5;

    }
  }
  for(let i=0; i<sections.value.interests.length; i++)
  {
    var interest = sections.value.interests[i];
    if(interest.checked)
    {
      doc.setFont("Symbol");
      doc.setFontSize(20);
      doc.text('·', 15, currentY+1);
      doc.setFont(font, "italic");
      doc.setFontSize(11);
      doc.text(interests.value[i].description, 20, currentY);
      currentY += 5;

    }
  }
}

const AddHeader = (doc, currentY, title) => {
  doc.setFontSize(13);
  doc.setFont(font, "bold");
  doc.text(title, 10, currentY, {});
  currentY += 5;
  doc.line(9, currentY, 200, currentY);
  currentY += 5;
  doc.setFont(font, "normal");
  return currentY;
}

const saveResumeToDatabase = () =>{

  resumeService.createResume(user.value.studentId, resumeData.value)
    .then((response) => {
      thisResumeId.value = response.data.id 
      console.log(thisResumeId.value);
      console.log("the resume was created");
      saveExperienceDatabase();
      saveEducationDatabase();
      saveProjectDatabase();
      saveLinkDatabase();
      saveAwardDatabase();
      saveInterestDatabase();
      saveSkillDatabase();
      console.log("it past the functions");
    })
    .catch((e) => {
      console.log("An error occurred");
      //console.log(thisResumeId);
    });
    console.log(thisResumeId.value);
}

const saveExperienceDatabase = () =>{
  console.log("it called the experience function");
  for(let i=0; i<sections.value.experience.length; i++)
    {
      var exp = sections.value.experience[i];
      if(exp.checked)
      {
        console.log("student id " + user.value.studentId);
        console.log("Resume id " + thisResumeId.value);
        console.log("experience id " + experiences.value[i].id );
        resumeExperienceServices.createResumeExperience(user.value.studentId, thisResumeId.value, experiences.value[i].id ) 
        .then(() => {
          console.log("ResumeExperience created successfully");
        })
        .catch((e) => {
          console.log("An error occurred");
        });
      }
    }
};

const saveEducationDatabase = () =>{
  console.log("it called the educaton function");
  for(let i=0; i<sections.value.education.length; i++)
    {
      var exp = sections.value.education[i];
      if(exp.checked)
      {
        console.log("student id " + user.value.studentId);
        console.log("Resume id " + thisResumeId.value);
        console.log("education id " + educations.value[i].id );
        resumeEducationServices.createResumeEducation(user.value.studentId, thisResumeId.value, educations.value[i].id ) 
        .then(() => {
          console.log("ResumeEducation created successfully");
        })
        .catch((e) => {
          console.log("An error occurred");
        });
      }
    }
};

const saveProjectDatabase = () =>{
  console.log("it called the project function");
  for(let i=0; i<sections.value.projects.length; i++)
    {
      var exp = sections.value.projects[i];
      if(exp.checked)
      {
        console.log("student id " + user.value.studentId);
        console.log("Resume id " + thisResumeId.value);
        console.log("project id " + projects.value[i].id );
        resumeProjectServices.createResumeProject(user.value.studentId, thisResumeId.value, projects.value[i].id ) 
        .then(() => {
          console.log("ResumeProject created successfully");
        })
        .catch((e) => {
          console.log("An error occurred");
        });
      }
    }
};

const saveLinkDatabase = () =>{
  console.log("it called the link function");
  for(let i=0; i<sections.value.personalLink.length; i++)
    {
      var exp = sections.value.personalLink[i];
      if(exp.checked)
      {
        console.log("student id " + user.value.studentId);
        console.log("Resume id " + thisResumeId.value);
        console.log("link id " + personalLinks.value[i].id );
        resumeLinkServices.createResumeLink(user.value.studentId, thisResumeId.value, personalLinks.value[i].id ) 
        .then(() => {
          console.log("ResumeLink created successfully");
        })
        .catch((e) => {
          console.log("An error occurred");
        });
      }
    }
};

const saveAwardDatabase = () =>{
  console.log("it called the award function");
  for(let i=0; i<sections.value.awards.length; i++)
    {
      var exp = sections.value.awards[i];
      if(exp.checked)
      {
        console.log("student id " + user.value.studentId);
        console.log("Resume id " + thisResumeId.value);
        console.log("award id " + awards.value[i].id );
        resumeAwardServices.createResumeAward(user.value.studentId, thisResumeId.value, awards.value[i].id ) 
        .then(() => {
          console.log("ResumeAward created successfully");
        })
        .catch((e) => {
          console.log("An error occurred");
        });
      }
    }
};

const saveInterestDatabase = () =>{
  console.log("it called the interest function");
  for(let i=0; i<sections.value.interests.length; i++)
    {
      var exp = sections.value.interests[i];
      if(exp.checked)
      {
        console.log("student id " + user.value.studentId);
        console.log("Resume id " + thisResumeId.value);
        console.log("interest id " + interests.value[i].id );
        resumeInterestServices.createResumeInterest(user.value.studentId, thisResumeId.value, interests.value[i].id ) 
        .then(() => {
          console.log("ResumeInterest created successfully");
        })
        .catch((e) => {
          console.log("An error occurred");
        });
      }
    }
};

const saveSkillDatabase = () =>{
  console.log("it called the skill function");
  for(let i=0; i<sections.value.skills.length; i++)
    {
      var exp = sections.value.skills[i];
      if(exp.checked)
      {
        console.log("student id " + user.value.studentId);
        console.log("Resume id " + thisResumeId.value);
        console.log("skill id " + skills.value[i].id );
        resumeSkillServices.createResumeSkill(user.value.studentId, thisResumeId.value, skills.value[i].id ) 
        .then(() => {
          console.log("ResumeSkill created successfully");
        })
        .catch((e) => {
          console.log("An error occurred");
        });
      }
    }
};

</script>

<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title>
          Resume Name
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="resumeData.name"
            label="name"
            outlined
            dense
          ></v-text-field>
        </v-card-text>
      </v-card>

       <!-- Professional Summary Section -->
       <v-card class="mt-3">
        <v-card-title>Professional Summary</v-card-title>
        <v-card-text>
          <v-textarea
            v-model="resumeData.summary"
            label="summary"
            outlined
            dense
          ></v-textarea>
        </v-card-text>
      </v-card>

      <!-- Sections with Checkboxes -->
      <template v-for="(sectionItems, sectionKey) in sections" :key="sectionKey">
        <v-card class="mt-3">
          <v-card-title>{{ sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1) }}</v-card-title>
          <v-card-text>
            <div v-for="(item, idx) in sectionItems" :key="idx">
              <v-row>
                <v-checkbox v-model="item.checked"></v-checkbox>
                <v-text-field
                  v-model="item.name"
                  :label="sectionKey.slice(0, -1).charAt(0).toUpperCase() + sectionKey.slice(1, -1) + ' Name'"
                  outlined
                  dense
                ></v-text-field>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </template>

      <!-- Create Button -->
      <v-btn class="mt-4" color="primary" @click="saveResume">Create</v-btn>
    </v-container>
  </v-app>
</template>

<style scoped>
.container {
  background-color: #f5e4d7;
}
</style>