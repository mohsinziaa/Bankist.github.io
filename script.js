"use strict";

// Data
const account1 = {
  owner: "Mohsin Zia",
  movements: [200.2, 450.6, -400.82, 3000, -650.5, -130, 70, 1300.1],
  interestRate: 1.2,
  pin: 244,
  movementsDates: [
    "2023-06-01T10:51:36.790Z",
    "2023-06-03T23:36:17.929Z",
    "2023-06-06T17:01:17.194Z",
    "2023-06-08T14:11:59.604Z",
    "2023-06-09T10:17:24.185Z",
    "2023-06-10T09:15:04.904Z",
    "2023-06-11T06:42:02.383Z",
    "2023-06-12T06:31:17.178Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account2 = {
  owner: "Irtaza Haider Zaidi",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 474,
  movementsDates: [
    "2023-06-01T10:51:36.790Z",
    "2023-06-03T23:36:17.929Z",
    "2023-06-06T17:01:17.194Z",
    "2023-06-08T14:11:59.604Z",
    "2023-06-09T10:17:24.185Z",
    "2023-06-10T09:15:04.904Z",
    "2023-06-11T06:42:02.383Z",
    "2023-06-12T21:31:17.178Z",
  ],
  currency: "PKR",
  locale: "UR-pk",
};

const account3 = {
  owner: "Abdullah Qatri",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 256,
  movementsDates: [
    "2023-06-01T10:51:36.790Z",
    "2023-06-03T23:36:17.929Z",
    "2023-06-06T17:01:17.194Z",
    "2023-06-08T14:11:59.604Z",
    "2023-06-09T10:17:24.185Z",
    "2023-06-10T09:15:04.904Z",
    "2023-06-11T06:42:02.383Z",
    "2023-06-12T21:31:17.178Z",
  ],
  currency: "PKR",
  locale: "UR-pk",
};

const account4 = {
  owner: "Shaheer Nashid",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 442,
  movementsDates: [
    "2023-06-01T10:51:36.790Z",
    "2023-06-03T23:36:17.929Z",
    "2023-06-06T17:01:17.194Z",
    "2023-06-08T14:11:59.604Z",
    "2023-06-09T10:17:24.185Z",
  ],
  currency: "PKR",
  locale: "UR-pk",
};

const account5 = {
  owner: "Mustafa Ali",
  movements: [99, 32, 12, -600, 900, 200, -320, 400, 1100],
  interestRate: 0.9,
  pin: 482,
  movementsDates: [
    "2023-06-29T10:51:36.790Z",
    "2023-06-01T10:51:36.790Z",
    "2023-06-03T23:36:17.929Z",
    "2023-06-06T17:01:17.194Z",
    "2023-06-08T14:11:59.604Z",
    "2023-06-09T10:17:24.185Z",
    "2023-06-10T09:15:04.904Z",
    "2023-06-11T06:42:02.383Z",
    "2023-06-12T21:31:17.178Z",
  ],
  currency: "PKR",
  locale: "UR-pk",
};

const accounts = [account1, account2, account3, account4, account5];
let timer, sorted;

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

createUserNames(accounts);

//Implementation of LogOutTimer.
const logoutTimer = () => {
  // set timer of 2.5 seconds
  let totalTime = 60 * 0.5;
  let minutes = String(Math.floor(totalTime / 60)).padStart(2, 0);
  let seconds = String(Math.floor(totalTime % 60)).padStart(2, 0);

  labelTimer.textContent = `${minutes}:${seconds}`;
  totalTime--;

  timer = setInterval(() => {
    minutes = String(Math.floor(totalTime / 60)).padStart(2, 0);
    seconds = String(Math.floor(totalTime % 60)).padStart(2, 0);

    labelTimer.textContent = `${minutes}:${seconds}`;

    if (totalTime === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Log in to get started`;
    }

    totalTime--;
  }, 1000);
  return timer;
};

// Format the dates.
const formatDates = (date) => {
  // let day = String(date.getDate()).padStart(2, 0);
  // let month = String(date.getMonth()).padStart(2, 0);
  // let year = date.getFullYear();

  return new Intl.DateTimeFormat(navigator.language).format(date);
};

let dateToday = new Date();
let formattedDate = formatDates(dateToday);
let hours = dateToday.getHours();
let minutes = dateToday.getMinutes();

let dateAndTime = `${formattedDate}, ${String(hours).padStart(2, 0)}:${String(
  minutes
).padStart(2, 0)}`;

// labelDate.textContent = dateAndTime;

// We can use API instead.
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric",
  year: "numeric",
};

const locale = navigator.language;

labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
  new Date()
);

// Updates the time everyminute.
setInterval(() => {
  labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
    new Date()
  );
}, 60000);

//To calculate the days that has passed from today.
const calculateDaysPassed = (date1, date2) => {
  let numberOfDays = Math.round(
    Math.abs(date2 - date1) / (1000 * 24 * 60 * 60)
  );

  if (numberOfDays === 0) {
    return "Today";
  } else if (numberOfDays === 1) {
    return "Yesterday";
  } else if (numberOfDays <= 7) {
    return `${numberOfDays} days ago`;
  } else {
    return formatDates(date1);
  }
};

//To display numbers in formatted according to the region of user.
const formatNumbers = (amount) =>
  new Intl.NumberFormat(currentAccount.locale, {
    style: "currency",
    currency: currentAccount.currency,
  }).format(amount);

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
    let movementsDate = calculateDaysPassed(movDate, new Date());
    let formattedMovement = formatNumbers(movement);

    let code = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    }. ${type}</div>
      <div class="movements__date">${movementsDate}</div>
      <div class="movements__value">${formattedMovement}</div>
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

  labelBalance.textContent = `${formatNumbers(totalBalance)}`;
  account.totalBalance = totalBalance;
};

// Calculate deposit, withdrawls, &interest.
const calculateSummary = (account) => {
  let deposits = account.movements
    .filter((movement) => movement > 0)
    .reduce((accumulator, movement) => accumulator + movement, 0);

  labelSumIn.textContent = `${formatNumbers(deposits)}`;

  let withdrawals = account.movements
    .filter((movement) => movement < 0)
    .reduce((accumulator, movement) => accumulator + movement, 0);

  labelSumOut.textContent = `${formatNumbers(Math.abs(withdrawals))}`;

  let interest = account.movements
    .filter((movement) => movement >= 1)
    .map((deposit) => deposit * (account.interestRate / 100))
    .reduce((accumulator, movement) => accumulator + movement, 0);

  labelSumInterest.textContent = `${formatNumbers(interest)}`;
};

let currentAccount;

// Login
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  if (timer) {
    clearInterval(timer);
  }
  timer = logoutTimer();
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
      //Reset timer.
      clearInterval(timer);
      timer = logoutTimer();

      //Update Total Balance.
      computeTotalBalance(currentAccount);

      //Update Movements.
      displayMovements(currentAccount);

      //Update Display Summary.
      calculateSummary(currentAccount);
    }, 500);
  }
});

// Loan
btnLoan.addEventListener("click", (e) => {
  e.preventDefault();

  let loanAmount = +inputLoanAmount.value;

  if (
    loanAmount > 0 &&
    currentAccount.movements.some((movement) => movement >= loanAmount * 0.1)
  ) {
    currentAccount.movements.push(loanAmount);
    currentAccount.movementsDates.push(new Date().toISOString());

    setTimeout(() => {
      //Reset timer.
      clearInterval(timer);
      timer = logoutTimer();

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

// Account close.
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

// Sort the movements.
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
