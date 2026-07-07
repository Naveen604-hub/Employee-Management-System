const employeeForm = document.getElementById("employeeForm");
const employeeTable = document.getElementById("employeeTable");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const genderInput = document.getElementById("gender");
const departmentInput = document.getElementById("department");
const positionInput = document.getElementById("position");
const salaryInput = document.getElementById("salary");
const joiningDateInput = document.getElementById("joiningDate");

const searchInput = document.getElementById("search");
const filterDepartment = document.getElementById("filterDepartment");

const totalEmployees = document.getElementById("totalEmployees");
const itEmployees = document.getElementById("itEmployees");
const hrEmployees = document.getElementById("hrEmployees");
const financeEmployees = document.getElementById("financeEmployees");

const themeBtn = document.getElementById("themeBtn");
const clearBtn = document.getElementById("clearBtn");
const submitBtn = document.getElementById("submitBtn");



let employees = JSON.parse(localStorage.getItem("employees")) || [];

let editIndex = -1;


function saveEmployees(){

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

}


function generateEmployeeId(){

    return "EMP" + Date.now();

}


function displayEmployees(employeeList = employees){


    employeeTable.innerHTML = "";


    employeeList.forEach((employee)=>{


        const originalIndex = employees.findIndex(
            emp => emp.id === employee.id
        );


        let avatar;


        if(employee.gender === "Male"){

            avatar = "male.png";

        }
        else{

            avatar = "female.png";

        }



        employeeTable.innerHTML += `

        <tr>


            <td>
                ${employee.id}
            </td>



            <td>

                <img src="${avatar}"
                class="avatar">

                ${employee.name}

            </td>




            <td>
                ${employee.email}
            </td>




            <td>
                ${employee.phone}
            </td>




            <td>
                ${employee.gender}
            </td>




            <td>
                ${employee.department}
            </td>




            <td>
                ${employee.position}
            </td>




            <td>
                ₹${employee.salary}
            </td>




            <td>
                ${employee.joiningDate}
            </td>




            <td>


                <button 
                class="edit-btn"
                onclick="editEmployee(${originalIndex})">

                Edit

                </button>




                <button
                class="delete-btn"
                onclick="deleteEmployee(${originalIndex})">

                Delete

                </button>



            </td>


        </tr>

        `;


    });


    updateDashboard();

}



employeeForm.addEventListener("submit",function(e){


    e.preventDefault();



    const employee = {


        id:

        editIndex === -1

        ? generateEmployeeId()

        : employees[editIndex].id,



        name:nameInput.value.trim(),


        email:emailInput.value.trim(),


        phone:phoneInput.value.trim(),



        gender:genderInput.value,



        image:

        genderInput.value === "Male"

        ? "male.png"

        : "female.png",



        department:departmentInput.value,


        position:positionInput.value.trim(),


        salary:salaryInput.value,


        joiningDate:joiningDateInput.value


    };





    if(editIndex === -1){


        employees.push(employee);


    }

    else{


        employees[editIndex] = employee;


        editIndex = -1;



        submitBtn.innerHTML =

        '<i class="fa-solid fa-plus"></i> Add Employee';


    }





    saveEmployees();


    displayEmployees();


    employeeForm.reset();



});



function editEmployee(index){


    editIndex = index;


    let employee = employees[index];



    nameInput.value = employee.name;

    emailInput.value = employee.email;

    phoneInput.value = employee.phone;

    genderInput.value = employee.gender;

    departmentInput.value = employee.department;

    positionInput.value = employee.position;

    salaryInput.value = employee.salary;

    joiningDateInput.value = employee.joiningDate;



    submitBtn.innerHTML =

    '<i class="fa-solid fa-pen"></i> Update Employee';



    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


}




function deleteEmployee(index){


    let confirmDelete = confirm(
        "Are you sure you want to delete this employee?"
    );



    if(confirmDelete){


        employees.splice(index,1);



        saveEmployees();


        displayEmployees();


    }


}



searchInput.addEventListener("keyup",function(){


    let keyword = this.value.toLowerCase();



    let filteredEmployees = employees.filter(employee =>


        employee.name.toLowerCase().includes(keyword) ||


        employee.email.toLowerCase().includes(keyword) ||


        employee.department.toLowerCase().includes(keyword) ||


        employee.position.toLowerCase().includes(keyword) ||


        employee.gender.toLowerCase().includes(keyword)


    );



    displayEmployees(filteredEmployees);



});



filterDepartment.addEventListener("change",function(){


    let department = this.value;



    if(department==="All"){


        displayEmployees();

    }

    else{


        let filteredEmployees = employees.filter(employee =>

            employee.department === department

        );



        displayEmployees(filteredEmployees);


    }



});


function updateDashboard(){


    totalEmployees.textContent = employees.length;



    itEmployees.textContent = employees.filter(employee =>

        employee.department==="IT"

    ).length;




    hrEmployees.textContent = employees.filter(employee =>

        employee.department==="HR"

    ).length;




    financeEmployees.textContent = employees.filter(employee =>

        employee.department==="Finance"

    ).length;



}



clearBtn.addEventListener("click",function(){


    searchInput.value="";


    filterDepartment.value="All";


    displayEmployees();


});




let savedTheme = localStorage.getItem("theme");


if(savedTheme==="dark"){


    document.body.classList.add("dark");


}



themeBtn.addEventListener("click",function(){


    document.body.classList.toggle("dark");



    if(document.body.classList.contains("dark")){


        localStorage.setItem("theme","dark");


    }

    else{


        localStorage.setItem("theme","light");


    }



});



document.addEventListener("keydown",function(e){


    if(e.ctrlKey && e.key==="/"){


        e.preventDefault();


        searchInput.focus();


    }


});



window.addEventListener("load",function(){


    displayEmployees();


});



console.log(
"Employee Management System Loaded Successfully"
);