//Directory changed

// Kodlar Buraya
let temp_div = document.querySelector(".description");
let temp_body = document.getElementsByTagName("body")[0];
let btn = document.createElement("button");
btn.setAttribute("id", "ackapa");
btn.textContent = "Karanlık temayı aç";
temp_div.append(btn);

function karanlikTemayiAcKapa(thema) {
  btn.addEventListener("click", function () {
    if (btn.textContent === "Karanlık temayı aç") {
      temp_body.classList.add(thema);
      btn.textContent = "Karanlık temayı kapat";
    } else if (btn.textContent === "Karanlık temayı kapat") {
      temp_body.classList.remove(thema);
      btn.textContent = "Karanlık temayı aç";
    }
  });
}

karanlikTemayiAcKapa("dark");
