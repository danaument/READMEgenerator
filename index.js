const inquirer = require('inquirer');

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
    
];

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {
    inquirer
        .prompt(questions)
        .then(answers => {
            // Use user feedback for... whatever!!
            console.log(JSON.stringify(answers, null, '  '));
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
