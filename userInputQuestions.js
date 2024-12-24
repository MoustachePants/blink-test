const setupQuestions = [
  {
    type: "input",
    name: "jiraDomain",
    message: "Enter your Jira domain (like: bob123): ",
    validate(value) {
      const pass = value.match(/^[a-zA-Z0-9]+$/); // only letters and numbers
      if (pass) {
        return true;
      }
      return "Please enter a valid input containing only letters and numbers.";
    },
  },
  {
    type: "input",
    name: "userEmail",
    message: "Enter your Jira user Email address: ",
    validate(value) {
      const pass = value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); // for email format
      if (pass) {
        return true;
      }
      return "Please enter a valid email address.";
    },
  },
  {
    type: "input",
    name: "jiraTokenKey",
    message: "Enter your Jira token key (can be generated in Jira's Site): ",
    // validate(value) {
    //   const pass = value.match(/^[a-zA-Z0-9-_=]+$/);
    //   if (pass) {
    //     return true;
    //   }
    //   return "Please enter a valid token;
    // },
  },
  {
    type: "rawlist",
    name: "userSelection",
    message: "Select option",
    choices: ["Get an specific issue by key or ID", "Create an issue", "Exit"],
  },
];

const getIssueQuestions = [
  {
    type: "input",
    name: "issueKeyOrID",
    message: "Issue key or ID: ",
    validate(value) {
      const pass = value.match(/^[a-zA-Z0-9-]+$/); // characters
      if (pass) {
        return true;
      }
      return "Please enter a valid issue key or ID containing only letters, numbers, or hyphens.";
    },
  },
];

const createIssueQuestions = [
  {
    type: "input",
    name: "issueProjectId",
    message: "Project ID number to add a new issue: ",
    validate(value) {
      const pass = value.match(/^[0-9]+$/); // numeric project IDs
      if (pass) {
        return true;
      }
      return "Please enter a valid project ID containing only numbers.";
    },
  },
  {
    type: "input",
    name: "issueSummary",
    message: "Issue summary: ",
    validate(value) {
      const pass = value.length > 0 && value.length <= 255; //  summary is not empty and within character limits
      if (pass) {
        return true;
      }
      return "Please enter a valid issue summary (1-255 characters).";
    },
  },
  {
    type: "input",
    name: "issueDescription",
    message: "Issue description: ",
    validate(value) {
      const pass = value.length > 0; // makes sure that the description is not empty
      if (pass) {
        return true;
      }
      return "Please enter a valid issue description.";
    },
  },
];

module.exports = {
  setupQuestions,
  getIssueQuestions,
  createIssueQuestions,
};
