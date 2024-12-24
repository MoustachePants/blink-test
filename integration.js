const axios = require("axios");
const dotenv = require("dotenv");

const userInputQuestions = require("./userInputQuestions");
const log = require("./utils/log");
const getUserInputs = require("./utils/getUserInputs");
const APICallerrorHandler = require("./utils/APICallErrorHandler");

dotenv.config();

// functionality
const createJiraIssue = APICallerrorHandler(
  async (jiraURLWithDomain, jiraUserName, jiraAPIToken, newIssueData) => {
    const jiraIssueUrl = `${jiraURLWithDomain}/issue`;

    const { projectID, summary, description } = newIssueData;

    const bodyData = {
      fields: {
        project: {
          id: projectID,
        },
        summary, // Replace with your issue summary
        description,
        issuetype: {
          id: "10000",
        },
      },
    };

    const response = axios.post(jiraIssueUrl, bodyData, {
      headers: {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${jiraUserName}:${jiraAPIToken}`
          ).toString("base64")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    });

    // log(response.data)...
    // No permissions with the free account :(
    // So it ends up here

    // log("Issue created successfully.", "success");
  }
);

const getJiraIssue = APICallerrorHandler(
  async (jiraURLWithDomain, issueIdOrKey, jiraUserName, jiraAPIToken) => {
    const jiraIssueUrl = `${jiraURLWithDomain}/issue/${issueIdOrKey}`;

    const issue = await axios.get(jiraIssueUrl, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${jiraUserName}:${jiraAPIToken}`
        ).toString("base64")}`,
        Accept: "application/json",
      },
    });

    log(`Successfully retrieved issue ${issueIdOrKey}.`);

    const issueData = issue.data.fields;
    log("Issue Summary: " + issueData.summary);
    log("Issue Parent: " + issueData.parent.key);
    log("Created by: " + issueData.creator.displayName);
    log("Status: " + issueData.status.name);
  }
);

// app
const runIntegrationApp = async (jiraBaseURL) => {
  log(
    'Welcome to the JIRA integrational! You can exit whenever by pressing "Ctrl+C"'
  );

  // Get user inputs
  const { jiraDomain, userEmail, jiraTokenKey, userSelection } =
    await getUserInputs(userInputQuestions.setupQuestions);

  const jiraURLWithDomain = jiraBaseURL.replace("<userdomain>", jiraDomain);

  // Functionality
  if (userSelection === "Get an specific issue by key or ID") {
    const { issueKeyOrID } = await getUserInputs(
      userInputQuestions.getIssueQuestions
    );

    await getJiraIssue(
      jiraURLWithDomain,
      issueKeyOrID,
      userEmail,
      jiraTokenKey
    );
  }

  if (userSelection === "Create an issue") {
    const { issueProjectId, issueSummary, issueDescription } =
      await getUserInputs(userInputQuestions.createIssueQuestions);

    const newIssueData = {
      projectID: issueProjectId,
      summery: issueSummary,
      description: issueDescription,
    };

    await createJiraIssue(
      jiraURLWithDomain,
      userEmail,
      jiraAPIToken,
      newIssueData
    );
  }

  if (userSelection === "Exit") {
    log("Goodbye!");
  }
};

const jiraBaseURL = process.env.JIRA_BASE_URL;
const jiraAPIToken = process.env.JIRA_API_TOKEN;

// run app
runIntegrationApp(jiraBaseURL, jiraAPIToken);
