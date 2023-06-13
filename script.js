"use strict";

// Data
const account1 = {
  owner: "Mohsin Zia",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 244,
  movementsDates: [
    "2023-07-01T10:51:36.790Z",
    "2023-07-03T23:36:17.929Z",
    "2023-07-06T17:01:17.194Z",
    "2023-07-08T14:11:59.604Z",
    "2023-07-09T10:17:24.185Z",
    "2023-07-10T09:15:04.904Z",
    "2023-07-11T07:42:02.383Z",
    "2023-07-12T21:31:17.178Z",
  ],
  currency: "USD",
  locale: "en-US", // de-DE
};

const account2 = {
  owner: "Syed Irtaza Haider Zaidi",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 474,
  movementsDates: [
    "2023-07-01T10:51:36.790Z",
    "2023-07-03T23:36:17.929Z",
    "2023-07-06T17:01:17.194Z",
    "2023-07-08T14:11:59.604Z",
    "2023-07-09T10:17:24.185Z",
    "2023-07-10T09:15:04.904Z",
    "2023-07-11T07:42:02.383Z",
    "2023-07-12T21:31:17.178Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Abdullah Qatri",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 256,
  movementsDates: [
    "2023-07-01T10:51:36.790Z",
    "2023-07-03T23:36:17.929Z",
    "2023-07-06T17:01:17.194Z",
    "2023-07-08T14:11:59.604Z",
    "2023-07-09T10:17:24.185Z",
    "2023-07-10T09:15:04.904Z",
    "2023-07-11T07:42:02.383Z",
    "2023-07-12T21:31:17.178Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: "Shaheer Nashid",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 442,
  movementsDates: [
    "2023-07-01T10:51:36.790Z",
    "2023-07-03T23:36:17.929Z",
    "2023-07-06T17:01:17.194Z",
    "2023-07-08T14:11:59.604Z",
    "2023-07-09T10:17:24.185Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account5 = {
  owner: "Syed Mustafa Ali",
  movements: [99, 32, 12, -600, 900, 200, -320, 400, 1100],
  interestRate: 0.9,
  pin: 482,
  movementsDates: [
    "2023-06-29T10:51:36.790Z",
    "2023-07-01T10:51:36.790Z",
    "2023-07-03T23:36:17.929Z",
    "2023-07-06T17:01:17.194Z",
    "2023-07-08T14:11:59.604Z",
    "2023-07-09T10:17:24.185Z",
    "2023-07-10T09:15:04.904Z",
    "2023-07-11T07:42:02.383Z",
    "2023-07-12T21:31:17.178Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4, account5];

// Elements Selection
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// Create UserNames.
const createUserNames = (theAccounts) => {
  theAccounts.forEach((account, i) => {
    let userName = account.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");

    account.userName = userName;
  });
};

let sorted;
createUserNames(accounts);
let dateToday = new Date();
let day = String(dateToday.getDate()).padStart(2, 0);
let month = String(dateToday.getMonth()).padStart(2, 0);
let year = dateToday.getFullYear();
let hours = dateToday.getHours();
let minutes = dateToday.getMinutes();

let dateAndTime = `${day}/${month}/${year}, ${String(hours).padStart(
  2,
  0
)}:${String(minutes).padStart(2, 0)}`;

labelDate.textContent += dateAndTime;

// Display the movements made so far.
const displayMovements = (account, isSorted = true) => {
  //To Empty the fake data.
  containerMovements.innerHTML = "";

  let updatedArray = !isSorted
    ? [...currentAccount.movements].sort((a, b) => a - b)
    : currentAccount.movements;

  updatedArray.forEach((movement, i) => {
    let type = movement > 0 ? "deposit" : "withdrawal";

    let movDate = new Date(account.movementsDates[i]);
    let day = String(movDate.getDate()).padStart(2, 0);
    let month = String(movDate.getMonth()).padStart(2, 0);
    let year = movDate.getFullYear();

    let movementsDate = `${day}/${month}/${year}`;

    let code = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${movementsDate}</div>
      <div class="movements__value">${movement.toFixed(2)}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", code);
  });
};

// Compute the total Balance.
const computeTotalBalance = (account) => {
  let totalBalance = account.movements.reduce(
    (accumulator, movement) => accumulator + movement,
    0
  );

  labelBalance.textContent = `${totalBalance.toFixed(2)}€`;
  account.totalBalance = totalBalance;
};

// Calculate deposit, withdrawls, &interest.
const calculateSummary = (account) => {
  let deposits = account.movements
    .filter((movement) => movement > 0)
    .reduce((accumulator, movement) => accumulator + movement, 0);

  labelSumIn.textContent = `${deposits.toFixed(2)}€`;

  let withdrawals = account.movements
    .filter((movement) => movement < 0)
    .reduce((accumulator, movement) => accumulator + movement, 0);

  labelSumOut.textContent = `${Math.abs(withdrawals).toFixed(2)}€`;

  let interest = account.movements
    .filter((movement) => movement >= 1)
    .map((deposit) => deposit * (account.interestRate / 100))
    .reduce((accumulator, movement) => accumulator + movement, 0);

  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

// By default
let currentAccount;
// Creating a Fake Login By Default:
// inputLoginUsername.value = "mz";
// inputLoginPin.value = 244;
// btnLogin.click();
// console.log(currentAccount);

// Login
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  sorted = false;
  currentAccount = accounts.find(
    (theAccount) =>
      inputLoginUsername.value.toLowerCase() === theAccount.userName
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Show the UI.
    containerApp.style.opacity = 100;

    //Empty input fields.
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    //Update Welcome Message.
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(" ")[0]
    }`;

    setTimeout(() => {
      //Update Total Balance.
      computeTotalBalance(currentAccount);

      //Update Movements.
      displayMovements(currentAccount);

      //Update Display Summary.
      calculateSummary(currentAccount);
    }, 100);
  }
});

//Transfer Money.
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();

  let transferTo = accounts.find(
    (theAccount) => inputTransferTo.value.toLowerCase() === theAccount.userName
  );

  let transferAmount = Number(inputTransferAmount.value);

  inputTransferTo.value = inputTransferAmount.value = "";

  if (
    transferTo &&
    transferAmount > 0 &&
    currentAccount.totalBalance > transferAmount &&
    transferTo.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(transferAmount * -1);
    currentAccount.movementsDates.push(new Date().toISOString());

    transferTo.movements.push(transferAmount);
    transferTo.movementsDates.push(new Date().toISOString());

    setTimeout(() => {
      //Update Total Balance.
      computeTotalBalance(currentAccount);

      //Update Movements.
      displayMovements(currentAccount);

      //Update Display Summary.
      calculateSummary(currentAccount);
    }, 500);
  }
});

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();

  let loanAmount = Math.floor(inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentAccount.movements.some((movement) => movement >= loanAmount * 0.1)
  ) {
    currentAccount.movements.push(loanAmount);
    currentAccount.movementsDates.push(new Date().toISOString());

    setTimeout(() => {
      //Update Total Balance.
      computeTotalBalance(currentAccount);

      //Update Movements.
      displayMovements(currentAccount);

      //Update Display Summary.
      calculateSummary(currentAccount);
    }, 500);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault();

  let deleteAccount = accounts.findIndex(
    (account) => account.userName === inputCloseUsername.value.toLowerCase()
  );

  if (
    deleteAccount != -1 &&
    inputCloseUsername.value.toLowerCase() === currentAccount.userName &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    accounts.splice(deleteAccount, 1);
    containerApp.style.opacity = 0;

    labelWelcome.textContent = `Log in to get started`;
  }
  inputCloseUsername.value = inputClosePin.value = "";
  inputClosePin.blur();
});

sorted = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();

  displayMovements(currentAccount, sorted);
  sorted = !sorted;
});

// Creating a Fake Login By Default:
inputLoginUsername.value = "mz";
inputLoginPin.value = 244;
btnLogin.click();
