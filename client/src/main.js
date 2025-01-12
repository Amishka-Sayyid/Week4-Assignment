import "./style.css";
import "./mediaQueries.css";
//---------------------------
//menu icon
//select dom
const dropdownmenu = document.getElementById("myDropdown");
const menu = document.getElementById("menu");

// Set up event listeners
menu.addEventListener("click", handlebutton);

function handlebutton(event) {
  dropdownmenu.classList.toggle("show");
  //to avoid immediately closing the dropdown
  event.stopPropagation();
}
// Closing the dropdown menu if the user clicks outside of it
window.addEventListener("click", function (event) {
  // If the click is outside of the dropdown or menu, hide the dropdown
  if (!event.target.matches("#menu") && !dropdownmenu.contains(event.target)) {
    dropdownmenu.classList.remove("show");
  }
});
//---------------------------------

//The main purpose is to handle the data from the form

//Select the form from the DOM
const messageForm = document.querySelector("#messageForm");
//We need to build an event that handles the data from the form
messageForm.addEventListener("submit", handleSubmitMessageForm);

function handleSubmitMessageForm(event) {
  event.preventDefault();
  const formData = new FormData(messageForm);
  const formValues = Object.fromEntries(formData);
  // https://week4-assignment-rwnh.onrender.com
  fetch("http://localhost:8080/new-data", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
  console.log(formValues);
  alert("message sent successfully");
}

//The same way as we fetch the POST route, we also need to fetch the GET route, so we can display the data from the database on the DOM

const messageContainer = document.getElementById("app2");

async function fetchFormData() {
  const response = await fetch("http://localhost:8080/messages", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  // Parsing the response
  const data = await response.json();

  //log to see the data array
  console.log(data);

  data.forEach((singledata) => {
    const userDiv = document.createElement("div");
    userDiv.className = "UserDiv";

    userDiv.style.backgroundColor = singledata.favourite_colour;

    const messageInput = document.createElement("p");

    messageInput.textContent = ` ${singledata.message}`;

    const userName = document.createElement("p");
    userName.textContent = singledata.user_name;

    userDiv.appendChild(messageInput);
    userDiv.appendChild(userName);

    messageContainer.appendChild(userDiv);
  });
}

// Call the function to fetch and display data when needed
fetchFormData();
