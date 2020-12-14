const inquirer = require('inquirer');
const fs = require('fs');

// function to test strings for special characters
function isValid(str){
    return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}

// function to trim/replace spaces in a string
function formatFileName(str){
    return str.trim().replace(/ /g, "_");
}

// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'fileName',
        message: "Enter the name of your README file, e.g. 'Project X README'",
        filter: function (value) {
            return formatFileName(value);
        },
        validate: function (value) {
            let pass = isValid(value);
            if (pass) {
                return true;
            }
            return `Your file name cannot contain special characters.`;
        }
    },
    {
        type: 'input',
        name: 'projectTitle',
        message: 'Enter the project title.',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter a description of the project.',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Provide instructions for installation.',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Describe how the project can be used.',
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Provide guidelines for contributing to the project.',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Provide instructions for testing the project.',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Select the license that you would like to use for this project.',
        choices: ['MIT', 'GNU GPL v3', 'CC Attribution-ShareAlike 4.0 International', 'Apache 2.0', 'Mozilla Public License 2.0']
    },
    {
        type: 'input',
        name: 'githubUser',
        message: 'Enter your GitHub username.',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address.',
        validate: function (email) {
  
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

            if (valid) {
                return true;
            }
            return "Please enter a valid email address.";
            
        }
    },
    
];

// function to write README file
function writeToFile(fileName, data) {
    let licenseBadge = "";
    switch (data.license) {
        case "MIT":
            licenseBadge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
            break;
        case "GNU GPL v3":
            licenseBadge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
            break;
        case "CC Attribution-ShareAlike 4.0 International":
            licenseBadge = '[![License: CC BY-SA 4.0](https://licensebuttons.net/l/by-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-sa/4.0/)';
            break;
        case "Apache 2.0":
            licenseBadge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
            break;
        case "Mozilla Public License 2.0":
            licenseBadge = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
            break;
        default:
            licenseBadge = '';
    }
    let dataInTemplate = `# Title: ${data.projectTitle}         ${licenseBadge}

## Table of Contents:
* [Description](#Description)
* [Installation](#Installation)
* [Usage](#Usage)
* [Contributing](#Contributing)
* [Testing](#Testing)
* [Questions](#Questions)
* [License](#License)
    
### <a name="Description">Description:</a>
${data.description}
    
### <a name="Installation">Installation:  </a>
${data.installation}
    
### <a name="Usage">Usage: </a>
${data.usage}

### <a name="Contributing">Contributing: </a>
${data.contributing}

### <a name="Testing">Testing: </a>
${data.tests}

### <a name="Questions">Questions: </a>
You can contact ${data.githubUser} at ${data.email} with questions.

### <a name="License">License: </a>
Distributed under the ${data.license} license.`

    fs.writeFile(`${data.fileName}.md`, dataInTemplate, (err) => {
        if (err) throw err;
        console.log(`${data.fileName}.md has been created!`);
});
}

// function to initialize program
function init() {
    inquirer
        .prompt(questions)
        .then(answers => {
            // Use user feedback for... whatever!!
            console.log(JSON.stringify(answers, null, '  '));
            writeToFile(answers.fileName, answers);
        })
        .catch(error => {
            if(error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            } else {
            // Something else when wrong
            }
        });
}

// function call to initialize program
init();
