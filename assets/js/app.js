const user1 = {
  Name: "Kareem Yasser",
  UserName: "kimo",
  pin: 2001,
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  movementsDates: [
    "15/03/2020",
    "12/05/2020",
    "08/12/2020",
    "01/11/2020",
    "05/05/2020",
    "10/02/2020",
    "12/03/2020",
    "11/04/2010",
  ],
  interestRate: 1.5,
};
const user2 = {
  Name: "Adel Yasser",
  UserName: "dola",
  pin: 2005,
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  movementsDates: [
    "15/03/2020",
    "12/05/2020",
    "08/12/2020",
    "01/11/2020",
    "05/05/2020",
    "10/02/2020",
    "12/03/2020",
    "11/04/2010",
  ],
  interestRate: 1.2,
};

let users = [user1, user2];

const main = document.getElementById("main");

const balanceUI = document.getElementById("balance");

const movements = document.getElementById("list-history");

const signForm = document.getElementById("sign");
const signUser = document.getElementById("username");
const signPIN = document.getElementById("pin");

const welcome = document.getElementById("welMessage");

const timerUI = document.getElementById("time");

let currentUser = {};
let balance = 0;

const Forms = document.querySelectorAll("form");

const transferForm = document.querySelector("#transfer form");
const transferName = document.querySelector("#transferName");

const loanForm = document.querySelector("#loan form");
const loanAmount = document.getElementById("loanAmount");

const closeForm = document.querySelector("#close form");
const closeUser = document.getElementById("closeUser");
const closePin = document.getElementById("closePin");

const sortBtn = document.getElementById("sort");

const inSum = document.getElementById("in");
const outSum = document.getElementById("out");
const interest = document.getElementById("interest");

let elNum = 0;
let loanMax = 0;
let Sec;
let sort = true;
let mov;
let intotal = 0;
let outotal = 0;
let interstotal = 0;

// Functions
const movementsHtml = function (mov) {
  mov.forEach((e, i) => {
    if (e <= 0) {
      newMovmentsRender("withdrawal", currentUser.movementsDates[i], e);
    } else {
      newMovmentsRender("deposit", currentUser.movementsDates[i], e);
    }
  });
};

const newMovmentsRender = function (type, date, value) {
  elNum += 1;
  const li = `<li class="movements">
  <div class="transfer ${type}">${elNum} ${type}</div>
  <div class="date">${date}</div>
  <div class="value">${value} €</div>
  </li>`;
  movements.insertAdjacentHTML("afterbegin", li);
};

const uptadeUI = function (user, type, value) {
  balance = user.movements.reduce((p, c) => p + c);
  balanceUI.textContent = balance.toLocaleString("en-US", {
    style: "currency",
    currency: "eur",
  });

  if (type == "withdrawal" || type == "deposit") {
    user.movements.push(value);
    balance += value;
    balanceUI.textContent = balance.toLocaleString("en-US", {
      style: "currency",
      currency: "eur",
    });
  }

  movements.textContent = "";
  elNum = 0;

  movementsHtml(currentUser.movements);

  const summary = function () {
    for (i in user.movements) {
      if (user.movements[i] > 0) {
        intotal += Number(user.movements[i]);
        interstotal += user.movements[i] * (user.interestRate / 100);
      } else outotal += Number(user.movements[i]);
    }
    inSum.textContent = ` ${intotal.toLocaleString("en-US", {
      style: "currency",
      currency: "eur",
    })}`;
    outSum.textContent = ` ${Math.abs(outotal).toLocaleString("en-US", {
      style: "currency",
      currency: "eur",
    })}`;
    interest.textContent = ` ${interstotal.toLocaleString("en-US", {
      style: "currency",
      currency: "eur",
    })}`;
  };
  summary();
};

const sorting = function (sort) {
  const mov = sort
    ? currentUser.movements.slice().sort((a, b) => a - b)
    : currentUser.movements;

  movements.textContent = "";
  elNum = 0;

  movementsHtml(mov);
};

const timerfunction = function (start) {
  // timer
  if (start) {
    const timerfun = function () {
      const min = String(Math.floor(Sec / 60)).padStart(2, 0);
      const sec = String(Sec % 60).padStart(2, 0);

      timerUI.textContent = `${min}:${sec}`;

      if (Sec === 0) {
        clearInterval(timer);
        main.classList.add("opacity-0");
        welcome.textContent = `LogOut Done 😥. Sign In Again`;
      }

      Sec--;
    };
    // 600s = 10min
    Sec = 10 * 60;
    timerfun();
    const timer = setInterval(timerfun, 1000);
  }
};

//  Listeners

Forms.forEach((e) => e.addEventListener("submit", (e) => e.preventDefault()));

signForm.addEventListener("submit", () => {
  currentUser = users.find((acc) => acc.UserName === signUser.value);

  if (currentUser != undefined && currentUser.pin == signPIN.value) {
    main.classList.remove("opacity-0");
    signUser.classList.remove("invalid");
    signPIN.classList.remove("invalid");
    signUser.value = "";
    signPIN.value = "";
    signPIN.blur();

    welcome.textContent = `Welcome back, ${currentUser.Name.split(" ")[0]} !`;
    uptadeUI(currentUser);
    timerfunction(true);
  } else {
    signUser.classList.add("invalid");
    signPIN.classList.add("invalid");
  }
});

transferForm.addEventListener("submit", () => {
  let date = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`;
  let value = Number(transferForm.querySelector("#transferAmount").value);

  if (
    -value <= balance &&
    transferName.value.length >= 4 &&
    isNaN(Number(transferName.value)) &&
    value != 0
  ) {
    currentUser.movementsDates.push(date);
    value = -value;

    transferForm.querySelector("#transferAmount").classList.remove("invalid");
    transferName.classList.remove("invalid");

    newMovmentsRender("withdrawal", date, value);
    uptadeUI(currentUser, "withdrawal", value);

    transferForm.querySelector("#transferAmount").value = "";
    transferForm.querySelector("#transferAmount").blur();
    transferName.value = "";
    transferName.blur();
  } else {
    transferForm.querySelector("#transferAmount").classList.add("invalid");
    transferName.classList.add("invalid");
  }
});

loanForm.addEventListener("submit", () => {
  let date = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`;
  let value = Number(loanAmount.value);
  if (value < (balance * 10) / 100 && loanMax != 4 && value > 50) {
    currentUser.movementsDates.push(date);
    newMovmentsRender("deposit", date, value);
    uptadeUI(currentUser, "deposit", value);
    ++loanMax;

    loanAmount.classList.remove("invalid");
    loanAmount.value = "";
    loanAmount.blur();
  } else {
    loanAmount.classList.add("invalid");
  }
});

closeForm.addEventListener("submit", () => {
  if (
    currentUser != undefined &&
    closeUser.value.toLowerCase() == currentUser.UserName.toLowerCase() &&
    closePin.value == currentUser.pin
  ) {
    Sec = 0;
    closeUser.value = "";
    closePin.value = "";
    closeUser.blur();
    closePin.blur();
    main.classList.add("opacity-0");
    welcome.textContent = `LogOut Done 😥. Sign In Again`;
  }
});

sortBtn.addEventListener("click", () => {
  if (sort) {
    sorting(true);
    sort = false;
  } else {
    sorting(false);
    sort = true;
  }
});
