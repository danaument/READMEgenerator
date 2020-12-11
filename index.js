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
        name: 'licence',
        message: 'Select the licence that you would like to use for this project.',
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
    let dataInTemplate = `here is your test data: ${data.test}
    `

    fs.writeFile(`${fileName}.md`, dataInTemplate, (err) => {
        if (err) throw err;
        console.log(`${fileName}.md has been created!`);
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
