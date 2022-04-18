"use strict";

// const euro = "&#8364";
// const dollar = "&#8364;";

const account1 = {
  owner: "Muhammad Salem Hussein",
  ownerAr: "محمد سالم حسين",
  movements: [1000, -2000, 3200, 50, -100, 90, -200, 4500, 3200, -500],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2021-05-08T14:11:59.604Z",
    "2022-04-09T11:31:17.178Z",
    "2021-07-11T23:36:17.929Z",
    "2022-04-11T10:51:36.790Z",
    "2021-07-11T23:36:17.929Z",
    "2022-04-12T10:51:36.790Z",
    "2022-04-13T21:31:17.178Z",
    "2022-04-14T21:31:17.178Z",
    "2022-04-15T21:31:17.178Z",
    "2022-04-16T21:31:17.178Z",
  ],
  currency: "EGP",
  locale: "ar-EG", // de-DE
};
const account2 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 2222,

  movementsDates: [
    "2021-05-08T14:11:59.604Z",
    "2022-04-09T11:31:17.178Z",
    "2021-07-11T23:36:17.929Z",
    "2022-04-12T10:51:36.790Z",
    "2022-04-13T21:31:17.178Z",
    "2022-04-14T21:31:17.178Z",
    "2022-04-15T21:31:17.178Z",
    "2022-04-16T21:31:17.178Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account3 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 3333,

  movementsDates: [
    "2021-01-25T14:18:46.235Z",
    "2021-02-05T16:33:06.386Z",
    "2021-04-10T14:43:26.374Z",
    "2021-06-25T18:49:59.371Z",
    "2021-07-26T12:01:20.894Z",
    "2021-12-25T06:04:23.907Z",
    "2022-03-30T09:48:16.867Z",
    "2022-04-01T13:15:33.035Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3];

/////////////// Elements ///////////////
// inputs
const userInput = document.forms[0].user;
const pinInput = document.forms[0].pin;
const transferTo = document.forms[1].receiver;
const transferAmount = document.forms[1].trans_amount;
const loanAmount = document.forms[2].loan;
const confirmUserInput = document.forms[3].user_confirm;
const confirmPINInput = document.forms[3].pin_confirm;

// btns
const loginBtn = document.getElementById("btn_login");
const transferBtn = document.getElementById("btn_transfer");
const loanBtn = document.getElementById("btn_loan");
const closeBtn = document.getElementById("btn_close");
const sortBtn = document.getElementById("btn_sort");

// elements
const app = document.querySelector("main");
const movementsContainer = document.querySelector(".movements");
const balance = document.querySelector(".balance__amount");
const welcomeMsg = document.querySelector(".welcome__msg");
const summaryIn = document.querySelector(".summary__value--in");
const summaryOut = document.querySelector(".summary__value--out");
const summaryInterest = document.querySelector(".summary__value--interest");
const timer = document.querySelector(".timer span");
const loginDate = document.querySelector(".balance__date span");
const movementDates = document.querySelector(".movements__date");
const operationMsg = document.querySelectorAll(".operation__msg");
///////////////////////////////////////////////////////////////////////////////

// app.style.opacity = "1";

////////////////////// Generate Username //////////////////////////////

const generateUserName = (accs) => {
  accs.forEach((acc) => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((n) => n[0])
      .reduce((acc, letter) => acc + letter);
  });
};

generateUserName(accounts);
////////////////// change date ///////////////////////////////////////
const changeDate = function (date, state) {
  const today = new Date();
  const intlDate = new Intl.DateTimeFormat(loginUser.locale, {
    hour: "numeric",
    minute: "numeric",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

  const dayLeft = function (date1, date2) {
    const days = Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
    if (days === 0) {
      if (loginUser.locale === "ar-EG") return "اليوم";
      else return "today";
    }
    if (days === 1) {
      if (loginUser.locale === "ar-EG") return "الأمس";
      else return "yesterday";
    }
    if (days <= 3) {
      if (loginUser.locale === "ar-EG")
        return `${new Intl.NumberFormat(loginUser.locale, {
          day: "numeric",
        }).format(days)} يوم`;
      else return `${days} days ago`;
    } else
      return new Intl.DateTimeFormat(loginUser.locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);
  };

  if (state === "login") return intlDate;
  if (state === "movements") return dayLeft(date, today);
};

////////////////// Format Currency ////////////////////////////////////
const formatCurr = function (acc, value) {
  const option = {
    style: "currency",
    currency: acc.currency,
  };
  const val = Intl.NumberFormat(acc.locale, option).format(Math.abs(value));
  return val;
};
////////////////// Display Movements ////////////////////////////////////

const displayMovements = (acc, sorted = false) => {
  movementsContainer.innerHTML = "";
  app.style.opacity = "1";
  const movs = sorted
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach((move, i) => {
    const type = move > 0 ? "deposite" : "withdraw";
    const movDates = changeDate(new Date(acc.movementsDates[i]), "movements");
    const option = {
      style: "currency",
      currency: loginUser.currency,
    };
    const moveValue = new Intl.NumberFormat(loginUser.locale, option).format(
      Math.abs(move)
    );

    if (loginUser.locale === "ar-EG") {
      const htmlAr = `
      <div class="movements__row">
        <div>
          <p class="movements__type ${type}"> ${new Intl.NumberFormat(
        loginUser.locale
      ).format(i + 1)}\t\t${
        type === "deposite" ? "عملية ايداع" : "عملية سحب"
      }\t\t</p>
          <p class="movements__date">${movDates}</p>
        </div>
        <p class="movements__amount">${moveValue}</p>
      </div>
      `;
      movementsContainer.insertAdjacentHTML("afterbegin", htmlAr);
    } else {
      const html = `
        <div class="movements__row">
          <div>
            <p class="movements__type ${type}">${i + 1} ${type}</p>
            <p class="movements__date">${movDates}</p>
          </div>
          <p class="movements__amount">${moveValue}</p>
        </div>
      `;

      movementsContainer.insertAdjacentHTML("afterbegin", html);
    }
  });
};

///////////////////// calc balance ///////////////////////////////
const calcBalance = function (acc) {
  const accountBalance = acc.movements.reduce((acc, mov) => acc + mov);
  balance.innerHTML = formatCurr(loginUser, accountBalance);
};

///////////////////// calc summary ///////////////////////////////
const calcSummary = function (acc) {
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, deposite) => acc + deposite);

  const withdraw = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, withdraw) => acc + withdraw);

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposite) => (deposite * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int);

  summaryIn.innerHTML = formatCurr(loginUser, income);
  summaryOut.innerHTML = formatCurr(loginUser, withdraw);
  summaryInterest.innerHTML = formatCurr(loginUser, interest);
};

////////////////// Welcome Msg ////////////////////////////////////////
const welcomeMessage = function (acc = false, state = false) {
  if (state && acc) {
    if (acc.locale === "ar-EG") {
      const userAr = acc.ownerAr.split(" ")[0];
      welcomeMsg.innerHTML = `صباح الخير, ${userAr}`;
      welcomeMsg.style.backgroundImage = "var(--deposit)";
    } else {
      const user = acc.owner.split(" ")[0];
      welcomeMsg.innerHTML = `Good Day, ${user}`;
      welcomeMsg.style.backgroundImage = "var(--deposit)";
    }
  } else if (acc.locale === "ar-EG" && state === false) {
    welcomeMsg.innerHTML = `رقم سري او كلمة مرور خاطئين`;
    welcomeMsg.style.backgroundImage = "var(--withdraw)";
  } else {
    welcomeMsg.innerHTML = `Invalid user or PIN`;
    welcomeMsg.style.backgroundImage = "var(--withdraw)";
  }
};

////////////////// Update UI ///////////////////////////////////
const updateUI = function (acc) {
  displayMovements(acc);
  calcBalance(acc);
  calcSummary(acc);
};

///////////////////////// Log out timer //////////////////////////
const logOutTimer = function () {
  let time = 120;
  const tick = () => {
    const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
    const sec = `${time % 60}`.padStart(2, 0);
    timer.textContent = `${min}: ${sec}`;
    if (time === 0) {
      clearInterval(logOut);
      app.style.opacity = "0";
      welcomeMsg.textContent = "Log in to get started";
      welcomeMsg.style.backgroundImage = "none";
    }
    time--;
  };
  tick();
  const logOut = setInterval(tick, 1000);
  return logOut;
};
// logOutTimer();
////////////////// Implement Login ////////////////////////////////////
let loginUser, logOut;
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  operationMsg.forEach((ele) => {
    ele.style.display = "none";
  });

  loginUser = accounts.find((acc) => acc.userName === userInput.value);

  if (loginUser) {
    if (+pinInput.value === loginUser.pin) {
      updateUI(loginUser);
      welcomeMessage(loginUser, true);
      loginDate.innerHTML = changeDate(new Date(), "login");
    } else {
      welcomeMessage("");
      app.style.opacity = "0";
    }
  } else if (!loginUser) {
    welcomeMessage("");
    app.style.opacity = "0";
  }
  userInput.value = pinInput.value = "";
  userInput.blur();
  pinInput.blur();
  if (logOut) clearInterval(logOut);
  logOut = logOutTimer();
});

/////////////////////////// Implement sort ///////////////////////
let sorted = false;
sortBtn.addEventListener("click", function () {
  displayMovements(loginUser, !sorted);
  sorted = !sorted;
});

////////////////////// Change operation msg ////////////////////
const changeOperationMsg = function (msg, color, idx) {
  operationMsg.forEach((ele) => {
    ele.style.display = "none";
  });
  operationMsg[idx].innerHTML = msg;
  operationMsg[idx].style.cssText = `
  display:block;
  background-image: ${color};
  `;
};

////////////////////// Implement transfer ////////////////////
transferBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const recievedUser = accounts.find(
    (acc) => acc.userName === transferTo.value
  );
  const amount = transferAmount.value;
  const balanceAmount = loginUser.movements.reduce((acc, move) => acc + move);

  if (loginUser && recievedUser && amount > 0) {
    if (loginUser === recievedUser) {
      loginUser.locale === "ar-EG"
        ? changeOperationMsg("لا يمكنك الارسال لحسابك", "var(--withdraw)", 0)
        : changeOperationMsg(
            "Can't send to your account",
            "var(--withdraw)",
            0
          );
    } else if (balanceAmount >= amount) {
      recievedUser.movements.push(+amount);
      loginUser.movements.push(-amount);
      recievedUser.movementsDates.push(new Date());
      loginUser.movementsDates.push(new Date());
      loginUser.locale === "ar-EG"
        ? changeOperationMsg("لقد تم التحويل بنجاح", "var(--deposit)", 0)
        : changeOperationMsg("Transfer succeded", "var(--deposit)", 0);

      updateUI(loginUser);
    } else if (balanceAmount < amount) {
      loginUser.locale === "ar-EG"
        ? changeOperationMsg(
            "رصيدك لا يسمح باجراء هذه العملية",
            "var(--withdraw)",
            0
          )
        : changeOperationMsg(
            "Your don't have enough balance!",
            "var(--withdraw)",
            0
          );
    }
  } else if (loginUser && !recievedUser) {
    loginUser.locale === "ar-EG"
      ? changeOperationMsg("اسم مستخدم غير صحيح", "var(--withdraw)", 0)
      : changeOperationMsg("Invalid username!", "var(--withdraw)", 0);
  }
  transferTo.value = transferAmount.value = "";
  clearInterval(logOut);
  logOut = logOutTimer();
});

////////////////// Implement Loan //////////////////
loanBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Math.floor(loanAmount.value);
  const checkDeposite = loginUser.movements.some(
    (move) => move >= amount / 0.1
  );
  if (amount > 0 && checkDeposite) {
    // Add deposite movements to current user and time
    loginUser.movements.push(amount);
    loginUser.movementsDates.push(new Date());
    // Update UI
    loginUser.locale === "ar-EG"
      ? changeOperationMsg("تم قبول طلبك", "var(--deposit)", 1)
      : changeOperationMsg("Request succeeded!", "var(--deposit)", 1);
    updateUI(loginUser);
  } else {
    loginUser.locale === "ar-EG"
      ? changeOperationMsg(
          "قيمة القرض لا تتجاوز 10% من قيمة أعلى ايداع",
          "var(--withdraw)",
          1
        )
      : changeOperationMsg(
          "Loan must be 10% of max deposite!",
          "var(--withdraw)",
          1
        );
  }

  loanAmount.value = "";
  loanAmount.blur();
  clearInterval(logOut);
  logOut = logOutTimer();
});

////////////////////////// Implement close ////////////////////////////
closeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const confirmUser = accounts.find(
    (acc) => acc.userName === confirmUserInput.value
  );
  const userIndex = accounts.findIndex(
    (acc) => acc.userName === confirmUserInput.value
  );
  if (
    confirmUserInput.value === confirmUser.userName &&
    confirmUser.pin === +confirmPINInput.value &&
    confirmUser === loginUser
  ) {
    const response = confirm("Are you sure?");
    if (response) {
      accounts.splice(userIndex, 1);
      welcomeMsg.innerHTML = "Log in to get started";
      welcomeMsg.style.backgroundImage = "none";
      app.style.opacity = "0";
      confirmUserInput.value = confirmPINInput.value = "";
      confirmPINInput.blur();
    }
  } else {
    loginUser.locale === "ar-EG"
      ? changeOperationMsg(
          "اسم مستخدم او كلمة مرور خاطئين",
          "var(--withdraw)",
          2
        )
      : changeOperationMsg("Invalid user or PIN!", "var(--withdraw)", 2);
    confirmUserInput.value = confirmPINInput.value = "";
    confirmPINInput.blur();
  }
});

//////////////////////////////////////////////////////////////////////////
