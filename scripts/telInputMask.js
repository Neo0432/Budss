const inputTel = document.getElementById("telInput");
const formInputTel = document.querySelector(
  ".input-div__form-input[type='tel']"
);
const flag = document.querySelector(".form-input__tel-flag");

function telMaskInput(e) {
  let value = inputTel.value.replace(/\D/g, "");
  if (value.startsWith("7")) {
    value = "+" + value;
  } else if (value == "") {
    value = "+7" + value;
  }
  inputTel.value = value;

  if (value.length > 1 && value.length <= 5) {
    inputTel.value = value.replace(/(\+7)(d{3})?/, "$1 $2");
  } else if (value.length > 5 && value.length <= 8) {
    inputTel.value = value.replace(/(\+7)(\d{3})?(\d{3})?/, "$1 $2 $3");
  } else if (value.length > 8 && value.length <= 11) {
    inputTel.value = value.replace(
      /(\+7)(\d{3})?(\d{3})?(\d{2})?/,
      "$1 $2 $3 $4"
    );
  } else {
    inputTel.value = value
      .replace(/(\+7)(\d{3})?(\d{3})?(\d{2})?(\d{2})?/, "$1 $2 $3 $4 $5")
      .slice(0, 16);
  }
}
inputTel.addEventListener("keyup", telMaskInput);
inputTel.addEventListener("keydown", telMaskInput);
inputTel.addEventListener("change", telMaskInput);
inputTel.addEventListener("focus", (e) => {
  formInputTel.classList.add("input-div__form-input--tel");
  flag.style.opacity = "1";
  telMaskInput();
});
inputTel.addEventListener("blur", (e) => {
  formInputTel.classList.remove("input-div__form-input--tel");
  flag.style.opacity = "";
  e.target.value = "";
});
