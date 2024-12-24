const inquirer = require("inquirer").default;

const getUserInputs = async (questions) => {
  const answers = await inquirer.prompt(questions);
  return answers;
};

module.exports = getUserInputs;
