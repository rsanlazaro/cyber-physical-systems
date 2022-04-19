document.addEventListener("DOMContentLoaded", function () {
  const view = document.querySelector(".hero-text").innerText;
  console.log(view);
  if (view == "Home") {
    displayMap();
  } else if (view == "Students") {
    displayStudents();
  } else if (view == "Collaboration") {
    displayResearchers();
  } else if (view == "Papers and patents") {
    displayPatents();
  } else if (view == "Divulgation") {
    createGallery();
  } else if (view == "Undergraduate projects") {
    displayUndergraduate();
  } else if (view == "Master's projects") {
    displaymaster();
  } else if (view == "Phd projects") {
    displayphd();
  } else if (view == "Press") {
    displayPress();
  }
});

function displayMap() {
  var map = L.map("map").setView([20.737011, -103.452432], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([20.737011, -103.452432]).addTo(map);
}

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
  for (let i = 1; i <= 50; i++) {
    const galleryImage = document.createElement("div");
    galleryImage.innerHTML = `
          <img src="build/img/divulgation/gallery/${i}.webp" alt="Image" onerror="this.onerror=null; this.src='build/img/divulgation/gallery/not-found.jpg'">
      `;
    fetch(`./build/img/divulgation/gallery/${i}.webp`).then((res2) => {
      if (res2.ok) {
        galleryImage.onclick = function () {
          showImage(i);
        };
        galeria.appendChild(galleryImage);
      }
    });
  }
}

function showImage(i) {
  const showImage = document.createElement("div");
  showImage.innerHTML = `
    <img src="build/img/divulgation/gallery/${i}.webp" alt="Image" onerror="this.onerror=null; this.src='build/img/divulgation/gallery/not-found.jpg'">
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

function displayPatents() {
  fetch("./patents.json")
    .then((resPatents) => resPatents.json())
    .then((dataPatents) => (objPatents = dataPatents))
    .then(() => {
      objPatents.forEach((patent) => {
        const patentsList = document.querySelector(".patents-text");
        const patentData = document.createElement("li");
        patentData.innerHTML = `
          ${patent.name} <span class="patent-state"> ${patent.state} </span>
          <p class="patent-link"> Available at: <a href="${patent.link}">${patent.link}</a></p>
          `;
        const patentState = patentData.querySelector(".patent-state");
        const patentLink = patentData.querySelector(".patent-link");
        if (patent.state == "Granted") {
          patentState.classList.add("granted");
        } else {
          patentState.classList.add("pending");
        }
        if (patent.link) {
          patentLink.classList.add("d-block");
        } else {
          patentLink.classList.add("d-none");
        }
        patentData.classList.add("list-group-item");
        patentsList.appendChild(patentData);
        // const patentElement = document.querySelector("li");
        // patientElement.classList.add("list-group-item");
      });
    });
}

function displayPress() {
  fetch("./press.json")
    .then((resPress) => resPress.json())
    .then((dataPress) => (objPress = dataPress))
    .then(() => {
      objPress.forEach((PressProject) => {
          const PressGrid = document.querySelector(".main-container");
          const imagenPress = document.createElement("div");
          imagenPress.innerHTML = `
            <a
              href="${PressProject.link}"
            >
            <img
              class="card-img-top"
              src="build/img/news/${PressProject.image}.webp"
              alt="Card image cap"
            />
              <div class="card-body">
                <h2 class="card-title">${PressProject.title}</h2>
                <p class="card-text">
                ${PressProject.description}
                </p>
              </div>
            </a>
          `;
          imagenPress.classList.add("card");
          PressGrid.appendChild(imagenPress);
      });
    });
}

function displayUndergraduate() {
  fetch("./projects.json")
    .then((resUndergraduate) => resUndergraduate.json())
    .then((dataUndergraduate) => (objUndergraduate = dataUndergraduate))
    .then(() => {
      objUndergraduate.forEach((undergraduateProject) => {
        if (undergraduateProject.degree == "undergraduate") {
          const undergraduateGrid = document.querySelector(".main-container");
          const imagenUndergraduate = document.createElement("div");
          imagenUndergraduate.innerHTML = `
            <div>
              <img
                class="card-img-top"
                src="build/img/projects/${undergraduateProject.image}.webp"
                alt="Card image cap"
                onerror="this.onerror=null; this.src='build/img/projects/default.png'"
              />
              <div class="card-body">
                <h2 class="card-title">${undergraduateProject.name}</h2>
                <p class="card-text">
                  ${undergraduateProject.description}
                </p>
              </div>
            </div>
          `;
          imagenUndergraduate.classList.add("card");
          undergraduateGrid.appendChild(imagenUndergraduate);
        }
      });
    });
}

function displaymaster() {
  fetch("./projects.json")
    .then((resmaster) => resmaster.json())
    .then((datamaster) => (objmaster = datamaster))
    .then(() => {
      objmaster.forEach((masterProject) => {
        if (masterProject.degree == "master") {
          const masterGrid = document.querySelector(".main-container");
          const imagenmaster = document.createElement("div");
          imagenmaster.innerHTML = `
            <div>
              <img
                class="card-img-top"
                src="build/img/projects/${masterProject.image}.webp"
                alt="Card image cap"
                onerror="this.onerror=null; this.src='build/img/projects/default.png'"
              />
              <div class="card-body">
                <h2 class="card-title">${masterProject.name}</h2>
                <p class="card-text">
                  ${masterProject.description}
                </p>
              </div>
            </div>
          `;
          imagenmaster.classList.add("card");
          masterGrid.appendChild(imagenmaster);
        }
      });
    });
}

function displayphd() {
  fetch("./projects.json")
    .then((resphd) => resphd.json())
    .then((dataphd) => (objphd = dataphd))
    .then(() => {
      objphd.forEach((phdProject) => {
        if (phdProject.degree == "phd") {
          const phdGrid = document.querySelector(".main-container");
          const imagenphd = document.createElement("div");
          imagenphd.innerHTML = `
            <div>
              <img
                class="card-img-top"
                src="build/img/projects/${phdProject.image}.webp"
                alt="Card image cap"
                onerror="this.onerror=null; this.src='build/img/projects/default.png'"
              />
              <div class="card-body">
                <h2 class="card-title">${phdProject.name}</h2>
                <p class="card-text">
                  ${phdProject.description}
                </p>
              </div>
            </div>
          `;
          imagenphd.classList.add("card");
          phdGrid.appendChild(imagenphd);
        }
      });
    });
}
