// "use strict";

// const euro = "&#8364";
// const dollar = "&#8364;";

// const account1 = {
//   owner: "Jonas Schmedtmann",
//   movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,

//   movementsDates: [
//     "2019-11-18T21:31:17.178Z",
//     "2019-12-23T07:42:02.383Z",
//     "2020-01-28T09:15:04.904Z",
//     "2020-04-01T10:17:24.185Z",
//     "2020-05-08T14:11:59.604Z",
//     "2020-05-27T17:01:17.194Z",
//     "2020-07-11T23:36:17.929Z",
//     "2020-07-12T10:51:36.790Z",
//   ],
//   currency: "EUR",
//   locale: "pt-PT", // de-DE
// };

// const account2 = {
//   owner: "Jessica Davis",
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,

//   movementsDates: [
//     "2019-11-01T13:15:33.035Z",
//     "2019-11-30T09:48:16.867Z",
//     "2019-12-25T06:04:23.907Z",
//     "2020-01-25T14:18:46.235Z",
//     "2020-02-05T16:33:06.386Z",
//     "2020-04-10T14:43:26.374Z",
//     "2020-06-25T18:49:59.371Z",
//     "2020-07-26T12:01:20.894Z",
//   ],
//   currency: "USD",
//   locale: "en-US",
// };

// // const account3 = {
// //   owner: "Steven Thomas Williams",
// //   movements: [200, -200, 340, -300, -20, 50, 400, -460],
// //   interestRate: 0.7,
// //   pin: 3333,
// // };

// // const account4 = {
// //   owner: "Sarah Smith",
// //   movements: [430, 1000, 700, 50, 90],
// //   interestRate: 1,
// //   pin: 4444,
// // };
// // const account5 = {
// //   owner: "Muhammad Salem Hussein",
// //   movements: [1000, -2000, 3200, 50, -100, 90, -200, 4500, 3200, -500],
// //   interestRate: 1,
// //   pin: 5555,
// // };
// // const account6 = {
// //   owner: "Rehab Aleem",
// //   movements: [1000, -2000, 3200, 50, -100, 90, -200, 4500, 3200, -500],
// //   interestRate: 1,
// //   pin: 6666,
// // };

// const accounts = [account1, account2];

// /////////////// Elements ///////////////
// // inputs
// const userInput = document.forms[0].user;
// const pinInput = document.forms[0].pin;
// const transferTo = document.forms[1].receiver;
// const transferAmount = document.forms[1].trans_amount;
// const loanAmount = document.forms[2].loan;
// const confirmUser = document.forms[3].user_confirm;
// const confirmPIN = document.forms[3].pin_confirm;

// // btns
// const loginBtn = document.getElementById("btn_login");
// const transferBtn = document.getElementById("btn_transfer");
// const loanBtn = document.getElementById("btn_loan");
// const closeBtn = document.getElementById("btn_close");
// const sortBtn = document.getElementById("btn_sort");

// // elements
// const app = document.querySelector("main");
// const movementsContainer = document.querySelector(".movements");
// const balance = document.querySelector(".balance__amount");
// const welcomeMsg = document.querySelector(".welcome__msg");
// const summaryIn = document.querySelector(".summary__value--in");
// const summaryOut = document.querySelector(".summary__value--out");
// const summaryInterest = document.querySelector(".summary__value--interest");
// const timer = document.querySelector(".timer span");
// const loginDate = document.querySelector(".balance__date span");
// const movementDates = document.querySelector(".movements__date");
// console.log(movementDates.innerHTML);
// ///////////////////////////////////////////////////////////////////////////////

// // app.style.opacity = "1";

// //////////////////////////// Geneerate UserName /////////////////////
// const generateUserName = function (accounts) {
//   accounts.forEach((acc) => {
//     acc.userName = acc.owner
//       .toLowerCase()
//       .split(" ")
//       .map((n) => n[0])
//       .reduce((acc, letter) => acc + letter);
//   });
// };
// generateUserName(accounts);

// //////////////////////////// Display balance /////////////////////////
// const displayBalance = function (acc) {
//   acc.balance = acc.movements.reduce((acc, move) => acc + move);
//   balance.innerHTML = `${acc.balance.toFixed(2)}${euro}`;
// };

// //////////////////////////// Display summary /////////////////////////
// const displaySummary = function (acc) {
//   const income = acc.movements
//     .filter((move) => move > 0)
//     .reduce((acc, deposite) => acc + deposite);

//   const withdraw = acc.movements
//     .filter((move) => move < 0)
//     .reduce((acc, withdraw) => acc + withdraw);

//   const interest = acc.movements
//     .filter((move) => move > 0)
//     .map((deposite) => (deposite * acc.interestRate) / 100)
//     .filter((int) => int >= 1)
//     .reduce((acc, int) => acc + int);

//   summaryIn.innerHTML = `${income.toFixed(2)}${euro}`;
//   summaryOut.innerHTML = `${Math.abs(+withdraw.toFixed(2))}${euro}`;
//   summaryInterest.innerHTML = `${interest.toFixed(2)}${euro}`;
// };

// //////////////////////////// display movements /////////////////////////
// const displayMovements = function (acc, sort) {
//   movementsContainer.innerHTML = "";
//   app.style.opacity = "1";

//   const movs = sort
//     ? acc.movements.slice().sort((a, b) => a - b)
//     : acc.movements;

//   movs.forEach((mov, i) => {
//     const type = mov > 0 ? "deposite" : "withdraw";

//     const date = new Date(acc.movementsDates[i]);
//     const year = date.getFullYear();
//     const month = date.getMonth() + 1;
//     const day = date.getDate();
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const movDate = `${month}/${day}/${year} ${hours}:${minutes}${
//       hours > 12 ? "PM" : "AM"
//     }`;
//     const movementDetails = `
//         <div class="movements__row">
//         <div>
//           <p class="movements__type ${type}">${i + 1} ${type}</p>
//           <p class="movements__date">${movDate}</p>
//         </div>
//         <p class="movements__amount">${mov.toFixed(2)}&#8364;</p>
//       </div>
//       `;
//     movementsContainer.insertAdjacentHTML("afterbegin", movementDetails);
//   });
// };

// //////////////////////////// welcome Msg //////////////////////////////
// const welcome = function (acc, state) {
//   const user = acc.owner.split(" ")[0];
//   if (state) {
//     welcomeMsg.innerHTML = `Good Day, ${user}`;
//     welcomeMsg.style.backgroundImage = "var(--deposit)";
//   } else {
//     welcomeMsg.innerHTML = `Invalid User or PIN`;
//     welcomeMsg.style.backgroundImage = "var(--withdraw)";
//   }
// };

// //////////////////////////// Date ////////////////////////////////////
// const chngDates = function () {
//   const date = new Date();
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1;
//   const day = date.getDate();
//   const hours = date.getHours();
//   const minutes = date.getMinutes();
//   loginDate.innerHTML = `${month}/${day}/${year} ${hours}:${minutes}${
//     hours > 12 ? "PM" : "AM"
//   }`;
// };
// chngDates();
// //////////////////////////// Update UI //////////////////////////////
// const updateUI = function (acc) {
//   // Display balance
//   displayBalance(acc);
//   // Display summary
//   displaySummary(acc);
//   // Display movements
//   displayMovements(acc);
// };

// //////////////////////////// Implement Login /////////////////////////
// let loginUser;
// loginBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   // window.reload();
//   loginUser = accounts.find((acc) => acc.userName === userInput.value);

//   if (loginUser.pin === +pinInput.value) {
//     updateUI(loginUser);
//     welcome(loginUser, true);
//   } else {
//     welcome(loginUser, false);
//   }

//   // Empty login form inputs
//   userInput.value = pinInput.value = "";
//   pinInput.blur();
// });

// ///////////////////////// Implement transfer ///////////////////////////////
// transferBtn.addEventListener("click", function (e) {
//   e.preventDefault();

//   const recievedAcc = accounts.find((acc) => acc.userName === transferTo.value);
//   const amount = +transferAmount.value;

//   if (amount > 0 && amount <= loginUser?.balance && recievedAcc) {
//     // Add withdraw movement to sender and time
//     loginUser.movements.push(-amount);
//     loginUser.movementsDates.push(new Date());
//     // Add deposite movement to recipient
//     recievedAcc.movements.push(amount);
//     recievedAcc.movementsDates.push(new Date());

//     // Update UI
//     updateUI(loginUser);
//   }
//   transferTo.value = transferAmount.value = "";
// });
// ///////////////////////// Implement loan ///////////////////////////////
// loanBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   const amount = Math.floor(loanAmount.value);
//   const checkDeposite = loginUser?.movements.some(
//     (move) => move >= amount * 0.1
//   );

//   if (amount > 0 && checkDeposite) {
//     // Add deposite movements to current user and time
//     loginUser.movements.push(amount);
//     loginUser.movementsDates.push(new Date());
//     // Update UI
//     updateUI(loginUser);
//   }
//   loanAmount.value = "";
// });

// ///////////////////////// Implement close account ///////////////////////////////
// closeBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   const user = accounts.find((acc) => acc.userName === confirmUser.value);
//   const userIndex = accounts.findIndex(
//     (acc) => acc.userName === confirmUser.value
//   );
//   const pin = +confirmPIN.value;

//   confirmUser.value = confirmPIN.value = "";
//   confirmPIN.blur();

//   if (user.pin === pin && user === loginUser) {
//     let confirmation = confirm(
//       `Are you sure to delete your account, ${loginUser.owner.split(" ")[0]}?`
//     );
//     if (confirmation) {
//       const deleted = accounts.splice(userIndex, 1);
//       console.log(deleted);
//       console.log(accounts);
//       window.location.reload();
//     }
//   }
// });

// //////////////////////////// Implement sort /////////////////////////////
// let sorted = false;
// sortBtn.addEventListener("click", function () {
//   displayMovements(loginUser, !sorted);
//   sorted = !sorted;
// });

// ///////////////////////////////////////////////////////////////////////////

// const dayPassed = (date1, date2) => date2 - date1;

// console.log();

window.setInterval(function () {
  document.querySelector(".timer-set").innerHTML -= 1;
}, 1000);
