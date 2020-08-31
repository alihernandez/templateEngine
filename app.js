const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "main.html");

const render = require("./lib/htmlRenderer");

const team = [];

//new manager
function managerPrompt(){
    inquirer
        .prompt([
            {
            type: "input",
            name: "managerName",
            message: "Enter managers name here: "    
            },
            
            {
            type: "input",
            name: "id",
            message: "Enter manager's ID number here: "
            },

            {
            type: "input",
            name: "email",
            message: "Enter manager's email here: ",
            validate: (answer) => {
                const emailVal = answer.match(/\S+@\S+\.\S+/);
                if (emailVal){
                    return true;
                }
                return "Please get your sh*t togther";
            }
            },

            {
                type: "input",
                name: "offNumber",
                message: "Enter manager's office number here: "
            },


        ])
        .then(function (answers) {
            const manager = new Manager(
                answers.managerName,
                answers.id,
                answers.email,
                answers.offNumber,
            );
            team.push(manager);
            promptUser();
        })
};

//new engineer
function engineerPrompt(){
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Enter engineers name here: ",
            },

            {
                type: "input" ,
                name: "id",
                message: "Enter engineer's ID number here: ",
            },

            {
                type: "input",
                name: "email",
                message: "Enter engineer's email here:",
                validate: (answer) => {
                    const emailVal = answer.match(/\S+@\S+\.\S+/);
                    if (emailVal){
                        return true;
                    }
                    return "Please enter valid email!";
                }
            },

            {
                type: "input",
                name: "github",
                message: "Enter engineer's gitHub username here: ",
            },
        ])
        .then(function (answers) {
            const engineer = new Engineer(
                answers.name,
                answers.id,
                answers.email,
                answers.github,
            );
            team.push(engineer);
            promptUser();
        })
};


//new intern
function internPrompt(){
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Enter intern's name here: ",
            },

            {
                type: "input" ,
                name: "id",
                message: "Enter intern's ID number here: ",
            },

            {
                type: "input",
                name: "email",
                message: "Enter interns's email here:",
                validate: (answer) => {
                    const emailVal = answer.match(/\S+@\S+\.\S+/);
                    if (emailVal){
                        return true;
                    }
                    return "Please enter valid email!";
                }
            },

            {
                type: "input",
                name: "school",
                message: "Enter intern's current school here: ",
            },
        ])
        .then(function (answers) {
            const intern = new Intern(
                answers.name,
                answers.id,
                answers.email,
                answers.school,
            );
            team.push(intern);
            promptUser();
        })
};

function promptUser(){
    return inquirer.prompt([
        {
            type: "list",
            name:"role",
            message:"Please select employee's position: ",
            choices: ["Manager", "Engineer", "Intern", "Done"],
        },

    ])
    .then((answers) => {
        switch (answers.role){
            case "Manager" :
                managerPrompt();
                break;
            case "Engineer" :
                engineerPrompt();
                break;
            case "Intern" :
                internPrompt();
                break;
            case "Done" :
                fs.writeFile(outputPath, render(team), "utf-8", (err) => {
                    if (err) throw err;
                })
        }
    })
};

promptUser();




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
