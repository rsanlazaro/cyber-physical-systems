document.addEventListener("DOMContentLoaded", function () {
  var map = L.map("map").setView([20.737011, -103.452432], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([20.737011, -103.452432]).addTo(map);
});

displayStudents();
displayResearchers();

function displayStudents() {
  degrees = ["phd", "master", "undergraduate"];
  fetch("./students.json")
    .then((res) => res.json())
    .then((data) => (obj = data))
    .then(() => {
      obj.forEach((element) => {
        if (degrees.includes(element.degree) && !element.graduated) {
          const studentsGrid = document.querySelector(
            ".accordion-student-" + element.degree
          );
          const imagen = document.createElement("div");
          imagen.innerHTML = `
            <div class="imagen">
                <img loading="lazy" src="build/img/students/${element.name
                  .split(" ")
                  .join(
                    ""
                  )}.webp" alt="Student" onerror="this.onerror=null; this.src='build/img/students/default.png'">
                  </div>
          <div class="student-description">
              <h4><strong>${element.name}</strong></h4>
              <p>${element.programme}</p>
              <p>${element.co_advisor}</p>
              <p>${element.graduation}</p>
          </div>
          `;
          studentsGrid.appendChild(imagen);
          studentsGrid.classList.remove("no-display");
        }
      });
      obj.forEach((element) => {
        if (degrees.includes(element.degree) && element.graduated) {
          const studentsGrid = document.querySelector(
            `.accordion-student-${element.degree}-graduated`
          );
          const imagen = document.createElement("div");
          imagen.innerHTML = `
            <div class="imagen">
                <img loading="lazy" src="build/img/students/${element.name
                  .split(" ")
                  .join("")
                  .replace(
                    /,/g,
                    ""
                  )}.webp" alt="Student" onerror="this.onerror=null; this.src='build/img/students/default.png'">
                  </div>
          <div class="student-description">
              <h4><strong>${element.name}</strong></h4>
              <p>${element.programme}</p>
              <p>${element.co_advisor}</p>
              <p>${element.graduation}</p>
          </div>
          `;
          studentsGrid.appendChild(imagen);
          const blueBg = document.querySelector(
            `.accordion-student-${element.degree}-graduated`
          );
          blueBg.classList.add("blueBg");
          studentsGrid.classList.remove("no-display");
        }
      });
    });
}


function displayResearchers() {
  fetch("./researchers.json")
    .then((res2) => res2.json())
    .then((data2) => (obj2 = data2))
    .then(() => {
      obj2.forEach((element2) => {
          const researchersList = document.querySelector(".collaboration-text");
          const list = document.createElement("p");
          list.innerHTML = `
          <span> ${element2.name} </span> - ${element2.university}
          `;
          researchersList.appendChild(list);
      });
    });
}
