const log = require("./log");

const APICallerrorHandler =
  (APICallFunction) =>
  async (...args) => {
    try {
      const response = await APICallFunction(...args);
      return response;
    } catch (error) {
      log("Some error connecting to JIRA:");

      if (error.response) {
        log(`Status Code: ${error.response.status}`);
        log(`Error Data: ${JSON.stringify(error.response.data, null, 2)}`);
      } else if (error.request) {
        log("No response received from the server.");
      } else {
        log(`Error: ${error.message}`);
      }
    }
  };

module.exports = APICallerrorHandler;
