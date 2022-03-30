// document.addEventListener("DOMContentLoaded", function () {
//   // make it as accordion for smaller screens
//   if (window.innerWidth < 992) {
//     // close all inner dropdowns when parent is closed
//     document
//       .querySelectorAll(".navbar .dropdown")
//       .forEach(function (everydropdown) {
//         everydropdown.addEventListener("hidden.bs.dropdown", function () {
//           // after dropdown is hidden, then find all submenus
//           this.querySelectorAll(".submenu").forEach(function (everysubmenu) {
//             // hide every submenu as well
//             everysubmenu.style.display = "none";
//           });
//         });
//       });

//     document.querySelectorAll(".dropdown-menu a").forEach(function (element) {
//       element.addEventListener("click", function (e) {
//         let nextEl = this.nextElementSibling;
//         if (nextEl && nextEl.classList.contains("submenu")) {
//           // prevent opening link if link needs to open dropdown
//           e.preventDefault();
//           if (nextEl.style.display == "block") {
//             nextEl.style.display = "none";
//           } else {
//             nextEl.style.display = "block";
//           }
//         }
//       });
//     });
//   }
//   // end if innerWidth
//   const btn = document.querySelector(".btn");
//   const sidebar = document.getElementById("main_nav");
//   btn.addEventListener("click", function(){
//     sidebar.classList.toggle("sidebar-show");
//     document.querySelector(".navbar-toggler").setAttribute("style","z-index: 2;");
//   })
// });

// function openNav() {
//   document.getElementById("main_nav").classList.add("sidebar-show");
// }

// function closeNav() {
//   document.getElementById("main_nav").classList.remove("sidebar-show");
// }
// DOMContentLoaded  end

document.addEventListener("DOMContentLoaded", function () {

var map = L.map('map').setView([20.737011, -103.452432], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([20.737011, -103.452432]).addTo(map)
    // .bindPopup('')
    // .openPopup();
});