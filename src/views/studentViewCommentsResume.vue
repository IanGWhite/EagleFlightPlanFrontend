<script setup>
import { ref, onMounted } from "vue";
import Utils from "../config/utils.js";
import commentServices from "../services/commentServices.js";
import { useRouter, useRoute } from "vue-router";
import linkServices from "../services/linkServices";
import skillServices from "../services/skillServices.js";
import contactServices from "../services/contactServices.js";
import educationServices from "../services/educationServices";
import experienceServices from "../services/experienceServices";
import interestServices from "../services/interestServices.js";
import projectServices from "../services/projectServices.js";
import awardServices from "../services/awardServices.js";
import jsPDF from 'jspdf';
import resumeExperienceServices from "../services/resumeExperienceServices.js";
import resumeEducationServices from "../services/resumeEducationServices.js";
import resumeLinkServices from "../services/resumeLinkServices.js";
import resumeAwardServices from "../services/resumeAwardServices.js";
import resumeInterestServices from "../services/resumeInterestServices.js";
import resumeProjectServices from "../services/resumeProjectServices.js";
import resumeSkillServices from "../services/resumeSkillServices.js";
import resumeService from "../services/resumeService.js";


const user = Utils.getStore("user");
const pdfUrl = "path/to/resume.pdf"; // URL for the PDF

const comments = ref([]);
const newComment = ref("");

const loadComments = (resumeId) => {
  commentServices.getAllComments(user.value.studentId, resumeId)
  .then((response) => {
      comments.value = response.data;
      console.log("retrived comments ", comments.value);
    })
    .catch((error) => {
      console.error("Error fetching comments:", error);
      currentComment.value = "";
      //create a comment
    });
};

const resumes = ref([]);
const router = useRouter();
const route = useRoute();
const pdfBlobUrl = ref(null);

const refreshPage = () => {
  window.location.reload();
};





const CreateResume = async (resumeId) => {
  //thisResumeId = resumeId;
  try {
    console.log("Resume data being saved:", {
      resumeName,
      personalLinks,
      sections,
    });
    console.log(resumeName);
    await fetchLinks(resumeId);
    fetchContact();
    fetchSummary(resumeId);
    await fetchSkills(resumeId);
    await fetchInterests(resumeId);
    await fetchEducations(resumeId);
    await fetchAwards(resumeId);
    await fetchExperiences(resumeId);
    // Generate resume logic
  } catch (error) {
    console.error("Error occurred in getting the data:", error);
  }
  try {
    generateResume1();
    //refreshPage();
  } catch (error){
    console.error("Error occurred in making the resume:", error);
  }
};

onMounted(() => {
  const resumeId = route.params.id;
  user.value = Utils.getStore('user');
  console.log(user.value);
  console.log(resumeId);
  
  CreateResume(resumeId);
      if (resumeId) {
        loadComments(resumeId);
      } else {
        console.error('No resume ID provided in route');
      }
});

const thisResumeId = ref({});
const resumeName = ref({});
const personalLinks = ref([
  { type: "", link: "" }
]);
const resumeLinks = ref({});
const contactInfo = ref({
  firstName: "",
  lastName: "",
  city: "",
  state: "",
  email: ""
});
const summary = ref("");
const skills = ref([{description :""}]);
const resumeSkills = ref({});
const interests = ref([{description :""}]);
const resumeInterests = ref({});
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
const resumeEducations = ref ({});
const experiences = ref({
  name: "",
  position: "",
  monthStart: "",
  monthEnd: "",
  description: ""
});
const resumeExperiences = ref({});
const awards = ref({
  organization: "",
  title: "",
  monthStart: "",
  monthEnd: "",
  description: ""
});
const resumeAwards = ref ({});
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
  educations: [{ name: "School 1", checked: true }],
  experience: [{ name: "Company 1", checked: true }],
  projects: [{ name: "Project 1", checked: true }],
  skills: [{ name: "Skill 1", checked: true }],
  interests: [{ name: "Interest 1", checked: true }],
  awards: [{ name: "Award 1", checked: true }],
});


const addSectionItem = (sectionKey) => {
  sections.value[sectionKey].push({ name: "", checked: false });
};

// onMounted(() => {
//   user.value = Utils.getStore('user')
//   //console.log(user.value)
//   fetchLinks();
//   fetchSkills();
//   fetchContact();
//   fetchEducation();
//   fetchExperiences();
//   fetchInterests();
//   fetchProject();
//   fetchAward();
// })

const fetchLinks = async (resumeId) => {
  try {
    // Fetch all resume links
    const resumeResponse = await resumeLinkServices.getAllResumeLinks(user.value.studentId, resumeId);
    resumeLinks.value = resumeResponse.data;

    // Fetch details for each link in parallel
    const linkPromises = resumeLinks.value.map(async (resumeLink) => {
      try {
        const linkResponse = await linkServices.getLinks(user.value.studentId, resumeLink.linkId);
        return linkResponse.data; // Return fetched data
      } catch (error) {
        console.error(`Error fetching link with ID ${resumeLink.id}:`, error);
        return []; // Return an empty array in case of error
      }
    });

    // Wait for all links to be fetched
    const allLinks = await Promise.all(linkPromises);

    // Flatten the results and update `personalLinks` and `sections.value.personalLink`
    const flattenedLinks = allLinks.flat();
    personalLinks.value = flattenedLinks;
    sections.value.personalLink = flattenedLinks.map(link => ({
      name: link.link, // Assuming each link object has a `link` property
    }));
  } catch (error) {
    console.error("Error fetching resume links:", error);
  }
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

const fetchSummary = (resumeId) => {
  resumeService.getResumes(user.value.studentId, resumeId)
    .then((response) => {
      console.log("API Response:", response);  // Check the full response structure
      if (response.data && response.data.summary) {
        summary.value = response.data.summary;
        resumeName.value = response.data.name;
        console.log("Summary data fetched:", summary.value); // Check the summary value
      } else {
        console.error("Summary not found in API response.");
      }
    })
    .catch((error) => {
      console.error("Error fetching resume:", error);
    });
};



const fetchSkills = async (resumeId) => {
  try {
    // Fetch all resume skills
    const resumeResponse = await resumeSkillServices.getAllResumeSkills(user.value.studentId, resumeId);
    resumeSkills.value = resumeResponse.data || []; // Default to an empty array if no data

    if (!Array.isArray(resumeSkills.value)) {
      console.error("Unexpected response format for resume skills:", resumeResponse.data);
      return;
    }

    // Fetch details for each skill in parallel
    const skillPromises = resumeSkills.value.map(async (resumeSkill) => {
      if (!resumeSkill.skillId) {
        console.warn("Missing skillId in resumeSkill:", resumeSkill);
        return []; // Skip if skillId is missing
      }
      try {
        const skillResponse = await skillServices.getSkills(user.value.studentId, resumeSkill.skillId);
        return skillResponse.data; // Return fetched skill data
      } catch (error) {
        console.error(`Error fetching skill with ID ${resumeSkill.skillId}:`, error);
        return []; // Return an empty array in case of error
      }
    });

    // Wait for all skills to be fetched
    const allSkills = await Promise.all(skillPromises);

    // Flatten the results and update `skills` and `sections.value.skills`
    const flattenedSkills = allSkills.flat();
    skills.value = flattenedSkills; // Update skills reactive variable
    sections.value.skills = flattenedSkills.map((skill) => ({
      name: skill.skill || "Unnamed Skill", // Default to "Unnamed Skill" if skill property is missing
    }));
  } catch (error) {
    console.error("Error fetching resume skills:", error);
  }
};


const fetchEducations = async (resumeId) => {
    try {
      // Fetch all resume educations
      const resumeResponse = await resumeEducationServices.getAllResumeEducations(user.value.studentId, resumeId);
      resumeEducations.value = resumeResponse.data || []; // Default to an empty array if no data
  
      if (!Array.isArray(resumeEducations.value)) {
        console.error("Unexpected response format for resume educations:", resumeResponse.data);
        return;
      }
  
      // Fetch details for each education in parallel
      const educationPromises = resumeEducations.value.map(async (resumeEducation) => {
        if (!resumeEducation.educationId) {
          console.warn("Missing educationId in resumeEducation:", resumeEducation);
          return []; // Skip if educationId is missing
        }
        try {
          const educationResponse = await educationServices.getEducations(user.value.studentId, resumeEducation.educationId);
          return educationResponse.data; // Return fetched education data
        } catch (error) {
          console.error(`Error fetching education with ID ${resumeEducation.educationId}:`, error);
          return []; // Return an empty array in case of error
        }
      });
  
      // Wait for all educations to be fetched
      const allEducations = await Promise.all(educationPromises);
  
      // Flatten the results and update `educations` and `sections.value.educations`
      const flattenedEducations = allEducations.flat();
      educations.value = flattenedEducations; // Update educations reactive variable
      sections.value.educations = flattenedEducations.map((education) => ({
        name: education.education || "Unnamed Education", // Default to "Unnamed Education" if education property is missing
      }));
    } catch (error) {
      console.error("Error fetching resume educations:", error);
    }
  };

  const fetchExperiences = async (resumeId) => {
    try {
      // Fetch all resume experiences
      const resumeResponse = await resumeExperienceServices.getAllResumeExperiences(user.value.studentId, resumeId);
      resumeExperiences.value = resumeResponse.data || []; // Default to an empty array if no data
  
      // if (!Array.isArray(resumeExperiences.value)) {
      //   console.error("Unexpected response format for resume experiences:", resumeResponse.data);
      //   return;
      // }
  
      // Fetch details for each experience in parallel
      console.log(resumeExperiences);
      const experiencePromises = resumeExperiences.value.map(async (resumeExperience) => {
        if (!resumeExperience.experienceId) {
          console.warn("Missing experienceId in resumeExperience:", resumeExperience);
          return []; // Skip if experienceId is missing
        }
        try {
          const experienceResponse = await experienceServices.getExperiences(user.value.studentId, resumeExperience.experienceId);
          return experienceResponse.data; // Return fetched experience data
        } catch (error) {
          console.error(`Error fetching experience with ID ${resumeExperience.experienceId}:`, error);
          return []; // Return an empty array in case of error
        }
      });
  
      // Wait for all experiences to be fetched
      const allExperiences = await Promise.all(experiencePromises);
  
      // Flatten the results and update `experiences` and `sections.value.experiences`
      const flattenedExperiences = allExperiences.flat();
      experiences.value = flattenedExperiences; // Update experiences reactive variable
      sections.value.experience = flattenedExperiences.map((experience) => ({
        name: experience.experience || "Unnamed Experience", // Default to "Unnamed Experience" if experience property is missing
      }));
    } catch (error) {
      console.error("Error fetching resume experiences:", error);
    }
  };

const fetchInterests = async (resumeId) => {
  try {
    // Fetch all resume interests
    const resumeResponse = await resumeInterestServices.getAllResumeInterests(user.value.studentId, resumeId);
    resumeInterests.value = resumeResponse.data || []; // Default to an empty array if no data

    if (!Array.isArray(resumeInterests.value)) {
      console.error("Unexpected response format for resume interests:", resumeResponse.data);
      return;
    }

    console.log("Fetched resume interests:", resumeInterests.value); // Debug log

    // Fetch details for each interest in parallel
    const interestPromises = resumeInterests.value.map(async (resumeInterest) => {
      if (!resumeInterest.interestId) {
        console.warn("Missing interestId in resumeInterest:", resumeInterest);
        return []; // Skip if interestId is missing
      }
      try {
        const interestResponse = await interestServices.getInterests(user.value.studentId, resumeInterest.interestId);
        console.log(`Fetched details for interest ID ${resumeInterest.interestId}:`, interestResponse.data); // Debug log
        return interestResponse.data; // Return fetched interest data
      } catch (error) {
        console.error(`Error fetching interest with ID ${resumeInterest.interestId}:`, error);
        return []; // Return an empty array in case of error
      }
    });

    // Wait for all interests to be fetched
    const allInterests = await Promise.all(interestPromises);

    console.log("All interests fetched:", allInterests); // Debug log

    // Flatten the results and update `interests` and `sections.value.interests`
    const flattenedInterests = allInterests.flat();
    interests.value = flattenedInterests; // Update interests reactive variable
    sections.value.interests = flattenedInterests.map((interest) => ({
      name: interest.interest || "Unnamed Interest", // Default to "Unnamed Interest" if interest property is missing
    }));

    console.log("Updated sections with interests:", sections.value.interests); // Debug log
  } catch (error) {
    console.error("Error fetching resume interests:", error);
  }
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
const fetchAwards = async (resumeId) => {
    try {
      // Fetch all resume awards
      const resumeResponse = await resumeAwardServices.getAllResumeAwards(user.value.studentId, resumeId);
      resumeAwards.value = resumeResponse.data || []; // Default to an empty array if no data
  
      if (!Array.isArray(resumeAwards.value)) {
        console.error("Unexpected response format for resume awards:", resumeResponse.data);
        return;
      }
  
      // Fetch details for each award in parallel
      const awardPromises = resumeAwards.value.map(async (resumeAward) => {
        if (!resumeAward.awardId) {
          console.warn("Missing awardId in resumeAward:", resumeAward);
          return []; // Skip if awardId is missing
        }
        try {
          const awardResponse = await awardServices.getAwards(user.value.studentId, resumeAward.awardId);
          return awardResponse.data; // Return fetched award data
        } catch (error) {
          console.error(`Error fetching award with ID ${resumeAward.awardId}:`, error);
          return []; // Return an empty array in case of error
        }
      });
  
      // Wait for all awards to be fetched
      const allAwards = await Promise.all(awardPromises);
  
      // Flatten the results and update `awards` and `sections.value.awards`
      const flattenedAwards = allAwards.flat();
      awards.value = flattenedAwards; // Update awards reactive variable
      sections.value.awards = flattenedAwards.map((award) => ({
        name: award.award || "Unnamed Award", // Default to "Unnamed Award" if award property is missing
      }));
    } catch (error) {
      console.error("Error fetching resume awards:", error);
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
  
  // doc.output('dataurlnewwindow');
  const pdfBlob = doc.output("blob");
  pdfBlobUrl.value = URL.createObjectURL(pdfBlob);
  //doc.save("Resume");
};

const AddContactInfo = (doc, currentY, pageCenter) => {
  doc.setFontSize(11);
  var contactString = "";
  contactString = contactInfo.value.city + ", " + contactInfo.value.state + " | ";
  contactString += contactInfo.value.email;
  
  for(let i=0; i<sections.value.personalLink.length; i++)
  {
      contactString += " | ";
      contactString += personalLinks.value[i].link;
      //contactString += link.name;
  }
  doc.text(contactString, pageCenter, currentY, {align: "center"});
}

const AddSummary = (doc, currentY) => {
  currentY = AddHeader(doc, currentY, "SUMMARY");
  var pageWidth = doc.internal.pageSize.getWidth();
  console.log("Summary value before rendering:", summary.value);
  // Make sure summary.value is a valid string and handle cases where it's empty or invalid
  let summaryText = summary.value.trim(); // Trim any leading/trailing spaces

  
  // Check if it's empty and provide a default value if necessary
  if (!summaryText) {
    summaryText = "No summary available.";  // Provide a default summary if it's empty
  }

  doc.setFontSize(12);
  doc.setFont(font, "normal");

  // Split the summary text to fit within the page width
  var splitSummary = doc.splitTextToSize(summaryText, pageWidth - 20);
  
  // Draw the text on the page
  doc.text(splitSummary, 10, currentY, { align: "left" });
  
  // Update the currentY based on the height of the text added
  currentY += doc.getTextDimensions(splitSummary).h;

  return currentY;
};




const AddEducationInfo = (doc, currentY) => {

  currentY = AddHeader(doc, currentY, "EDUCATION");
  var pageWidth = doc.internal.pageSize.getWidth(); 
  var pageHeight = doc.internal.pageSize.getHeight();
  var pageCenter = pageWidth/2
  var lineHeight = 5;
  doc.setFontSize(11);
  
  for(let i=0; i<sections.value.educations.length; i++)
  {
    var edu = sections.value.educations[i];
    
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
      doc.text(awards.value[i].title, 24, currentY);
      doc.text(awards.value[i].startDate, pageWidth-10, currentY, {align:"right"});
      currentY += 5;
      doc.text(awards.value[i].description, 15, currentY); currentY += 5;
  }
  return currentY;
}

const AddExperienceInfo = (doc, currentY) => {
  currentY = AddHeader(doc, currentY, "PROFESSIONAL EXPERIENCE");  // Assuming AddHeader is a function for section headers
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Loop through the experiences array
  for (let i = 0; i < sections.value.experience.length; i++) {
    doc.setFontSize(11);
    doc.setFont(font, "bold");

    let workName = experiences.value[i].name || "Unknown Organization";
    doc.text(workName, 10, currentY);

    // Set font to normal for other text
    doc.setFont(font, "normal");
    
    let positionInfo = `${experiences.value[i].position || "Unknown Position"}, ${experiences.value[i].state || "Unknown State"}`;
    doc.text(positionInfo, 10 + doc.getTextDimensions(workName).w + 10, currentY);

    let dateRange = `${experiences.value[i].startDate || "Start Date"} - ${experiences.value[i].endDate || "End Date"}`;
    doc.text(dateRange, pageWidth - 10, currentY, { align: "right" });

    // Move to the next line for description
    currentY += 5;

    let description = experiences.value[i].description || "No Description Provided";
    let splitSummary = doc.splitTextToSize(description, pageWidth - 40);
    doc.text(splitSummary, 20, currentY, { align: "left" });

    // Update the vertical position after the description
    currentY += doc.getTextDimensions(splitSummary).h + 5;

    // Check if currentY exceeds the page height and add a new page if necessary
    if (currentY > pageHeight - 40) {
      doc.addPage();
      currentY = 20; // Reset to top of new page
    }
  }
  
  return currentY + 5;  // Return updated Y position after content
}


const AddSkills = (doc, currentY) => {
  currentY = AddHeader(doc, currentY, "SKILLS | INTERESTS");
  doc.setFont(font, "italic");
  doc.setFontSize(11);
  for(let i=0; i<sections.value.skills.length; i++)
  {
    
      doc.setFont("Symbol");
      doc.setFontSize(20);
      doc.text('·', 15, currentY+1);
      doc.setFont(font, "italic");
      doc.setFontSize(11);
      doc.text(skills.value[i].description, 20, currentY);
      currentY += 5;
  }
  for(let i=0; i<sections.value.interests.length; i++)
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
</script>

<template>
  <v-app>
    <v-container>
      <v-toolbar color="red">
        <v-toolbar-title class="text-h4">{{ resumeName }}</v-toolbar-title>

      </v-toolbar>
      <br />
      
      <!-- PDF Viewer -->
      <v-card v-if="pdfBlobUrl" class="pdf-container">
        <iframe :src="pdfBlobUrl" width="100%" height="600px" frameborder="0"></iframe>
      </v-card>


      <!-- Display Comments -->
      <v-card class="my-4" outlined>
        <v-card-title>Comments</v-card-title>
        <v-divider></v-divider>
        <v-card-text v-if="comments.length === 0">No comments available</v-card-text>
        <v-card-text v-for="(comment, index) in comments" :key="index" class="my-2">
          <v-card outlined class="p-2">
            <p outline-style: solid>{{ comment.summary }}</p>
          </v-card>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<style scoped>
iframe {
  border-radius: 8px;
}
.pdf-container {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.v-toolbar {
  padding: 16px;
  background-color: #6200ea; /* Primary color example */
}

.v-toolbar-title {
  font-size: 20px;
  color: white;
}
</style>
