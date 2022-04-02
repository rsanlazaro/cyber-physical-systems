document.addEventListener("DOMContentLoaded", function () {
  displayStudents();
  displayResearchers();
  createGallery();
});

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
          <span class="researcher-name"> ${element2.name} </span> <span class="hyphen"> - </span> ${element2.university}
          `;
        researchersList.appendChild(list);
      });
    });
}

function createGallery() {
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= 5; i++) {
    const galleryImage = document.createElement("div");
    galleryImage.innerHTML = `
          <img src="build/img/divulgation/gallery/${i}.webp" alt="Image">
      `;
    galleryImage.onclick = function () {
      showImage(i);
    };
    galeria.appendChild(galleryImage);
  }
}

function showImage(i) {
  const showImage = document.createElement("div");
  showImage.innerHTML = `
    <img src="build/img/divulgation/gallery/${i}.webp" alt="Image">
  `;

  // Crea el Overlay con la imagen
  const overlay = document.createElement("DIV");
  overlay.appendChild(showImage);
  overlay.classList.add("overlay");
  overlay.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove();
  };

  // Boton para cerrar el Modal
  const cerrarModal = document.createElement("P");
  cerrarModal.textContent = "X";
  cerrarModal.classList.add("btn-cerrar");
  cerrarModal.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove();
  };
  overlay.appendChild(cerrarModal);

  // Añadirlo al HTML
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fijar-body");
}
