const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    popupTitle.innerText = "Add a new Note";
    addBtn.innerText = "Add Note";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if(window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});

function showNotes() {
    if(!notes) return;
    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.forEach((note, id) => {
        let filterDesc = note.description.replaceAll("\n", '<br/>');
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, filterDesc) {
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    updateId = noteId;
    isUpdate = true;
    addBox.click();
    titleTag.value = title;
    descTag.value = description;
    popupTitle.innerText = "Update a Note";
    addBtn.innerText = "Update Note";
}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let title = titleTag.value.trim(),
    description = descTag.value.trim();

    if(title || description) {
        let currentDate = new Date(),
        month = months[currentDate.getMonth()],
        day = currentDate.getDate(),
        year = currentDate.getFullYear();

        let noteInfo = {title, description, date: `${month} ${day}, ${year}`}
        if(!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        closeIcon.click();
    }
});

//login
// Mendapatkan elemen formulir login
var loginForm = document.querySelector("form");

// Menambahkan event listener pada saat formulir disubmit
loginForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Mencegah pengiriman formulir

  // Mendapatkan nilai input email dan password
  var emailInput = document.querySelector(".email input");
  var passwordInput = document.querySelector(".password input");
  var emailValue = emailInput.value.trim();
  var passwordValue = passwordInput.value.trim();

  // Validasi email
  if (emailValue === "") {
    showError(emailInput, "Email cannot be blank");
  } else if (!isValidEmail(emailValue)) {
    showError(emailInput, "Invalid email format");
  } else {
    showSuccess(emailInput);
  }

  // Validasi password
  if (passwordValue === "") {
    showError(passwordInput, "Password cannot be blank");
  } else {
    showSuccess(passwordInput);
  }

  // Jika semua input valid, lakukan pengiriman formulir
  if (emailValue !== "" && passwordValue !== "" && isValidEmail(emailValue)) {
    loginForm.submit();
  }
});

// Fungsi untuk menampilkan pesan error
function showError(input, errorMessage) {
  var field = input.parentElement;
  var errorTxt = field.querySelector(".error-txt");
  var errorIcon = field.querySelector(".error-icon");

  errorTxt.innerText = errorMessage;
  field.classList.add("error");
  errorIcon.style.display = "block";
}

// Fungsi untuk menampilkan indikator input berhasil
function showSuccess(input) {
  var field = input.parentElement;
  var errorIcon = field.querySelector(".error-icon");

  field.classList.remove("error");
  errorIcon.style.display = "none";
}

// Fungsi untuk memvalidasi format email
function isValidEmail(email) {
  // Validasi email menggunakan regular expression
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}