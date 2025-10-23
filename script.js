document.addEventListener("DOMContentLoaded", () => {
  let allExpnese = JSON.parse(localStorage.getItem("expenses")) || [];
  let ExpenseName = document.querySelector("#expanse-name");
  let Amount = document.querySelector("#expanse-amount");
  let ExpensList = document.querySelector(".expensList");
  let form = document.querySelector("form");
  let totalAmount = document.querySelector(".amount");

  let total = 0;
  totalAmount.textContent = total;
  if (allExpnese.length > 0) {
    allExpnese.forEach((element) => {
      renderexpense(element.name, element.amount, element.id);
    });
    updateTotal(allExpnese, total);
    total = updateTotal(allExpnese, total);
    totalAmount.textContent = total;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    renderexpense(ExpenseName.value.trim(), Amount.value);
    savetolocal();

    totalAmount.textContent = updateTotal(allExpnese, total);
    console.log(allExpnese);

    form.reset();
  });
  function renderexpense(nam, aount, id = null) {
    let espensses = document.createElement("div");
    espensses.classList.add("dynamic");

    let nameamout = document.createElement("div");
    nameamout.classList.add("nameamout");
    let name = document.createElement("span");
    name.textContent = `${nam} -`;
    let amount = document.createElement("span");
    amount.textContent = `$${aount}`;
    let delet = document.createElement("button");
    delet.classList.add("delete");
    delet.textContent = "Delete";
    nameamout.appendChild(name);
    nameamout.appendChild(amount);
    espensses.appendChild(nameamout);
    espensses.appendChild(delet);
    ExpensList.appendChild(espensses);
    let expenseObj;
    if (id === null) {
      expenseObj = {
        id: Date.now(),
        name: nam,
        amount: aount,
      };
      allExpnese.push(expenseObj);
    } else {
      expenseObj = { id: id, name: nam, amount: aount };
    }
    espensses.dataset.id = expenseObj.id;

    total = updateTotal(allExpnese, total);
    totalAmount.textContent = total;

    delet.addEventListener("click", (e) => {
      Delete(e, allExpnese);
    });
  }
  function updateTotal(arr, tota) {
    tota = 0;
    arr.forEach((e) => {
      tota += parseInt(e.amount) || 0;
    });
    return tota;
  }
  function savetolocal() {
    localStorage.setItem("expenses", JSON.stringify(allExpnese));
  }
  function Delete(e, array) {
    let idfordel = parseInt(e.target.parentElement.dataset.id);
    e.target.parentElement.remove();
    allExpnese = allExpnese.filter((exp) => exp.id !== idfordel);
    savetolocal();
    total = updateTotal(allExpnese, total) || 0;
    totalAmount.textContent = total;
  }
});
