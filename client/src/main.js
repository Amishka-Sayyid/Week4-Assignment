import "./style.css";
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

//We need to build an event that handles the data from the form
//event handler
//event listener

//the server url should be your local host while you are developing
//! when you finish, you should replace it with your RENDER server url
//https://week4-assignment-rwnh.onrender.com
fetch("https://week4-assignment-rwnh.onrender.com", {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify({ formValues }),
});

//The same way as we fetch the POST route, we also need to fetch the GET route, so we can display the data from the database on the DOM
