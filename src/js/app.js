document.addEventListener("DOMContentLoaded", function () {
  var map = L.map("map").setView([20.737011, -103.452432], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([20.737011, -103.452432]).addTo(map);
});

displayStudents();

function displayStudents() {
  degrees = ['phd','master','undergraduate'];
  fetch("./students.json")
    .then((res) => res.json())
    .then((data) => (obj = data))
    .then(() => {
      obj.forEach((element) => {
        if (degrees.includes(element.degree)) {
            const studentsGrid = document.querySelector(".accordion-student-" + element.degree);
            const imagen = document.createElement("div");
            imagen.innerHTML = `
          <picture>
                <source srcset="build/img/students/${element.name
                  .split(" ")
                  .join("")}.avif" type="image/avif">
                <source srcset="build/img/students/${element.name
                  .split(" ")
                  .join("")}.webp" type="image/webp">
                <img loading="lazy" src="build/img/students/${element.name
                  .split(" ")
                  .join("")}.jpg" alt="Student">
          </picture>
          <div class="student-description">
              <h4>${element.name}</h4>
              <p>${element.programme}</p>
              <p>${element.co_advisor}</p>
          </div>
          `;
            studentsGrid.appendChild(imagen);
            imagen.classList.add("imagen");
        }
      });
    });
}
