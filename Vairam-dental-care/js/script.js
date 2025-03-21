let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};

window.addEventListener("scroll", function () {
  const nav = document.querySelector("header");
  nav.classList.toggle("sticky", window.scrollY)});



document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".appointment form");
  const confirmationMessage = document.createElement("p");
  confirmationMessage.classList.add("confirmation-message");
  form.appendChild(confirmationMessage);

  // Restrict past dates
  const dateInput = form.querySelector("input[type='date']");
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today); // Disable past dates

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = form.querySelector("input[placeholder='Name']").value;
    const contact = form.querySelector("input[placeholder='Contact']").value;
    const age = form.querySelector("input[placeholder='Age']").value;
    const time = form.querySelector("input[placeholder='Time']").value;
    const date = form.querySelector("input[placeholder='Date']").value;

    if (!name || !contact || !age || !time || !date) {
      alert("Please fill all the details correctly.");
      return;
    }

    const appointmentData = { name, contact, age, time, date };
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(appointmentData);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    console.log("Saved Appointment Data:", appointmentData);

    confirmationMessage.textContent = "Appointment booked successfully!";
    confirmationMessage.style.color = "green";
    confirmationMessage.style.marginTop = "10px";
    form.reset();

    // Send via Email
    const mailtoLink = `mailto:akarun4431035@gmail.com?subject=New Appointment&body=
      Name: ${name}%0D%0A
      Contact: ${contact}%0D%0A
      Age: ${age}%0D%0A
      Date: ${date}%0D%0A
      Time: ${time}`;

    window.location.href = mailtoLink;
  });
});
