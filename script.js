'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'INR',
  locale: 'en-IN',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

// const accounts = [account1, account2, account3, account4];
const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


//////////////////// 
// Functions 

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};


const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ''
  // checking if sort is called or not. 
  //debugger;
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
  //console.log(movs);


  movs.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    // movements Date moved to separate function
    const date = new Date(acc.movementsDates[index]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(movement, acc.locale, acc.currency);


    // Similar to text content 
    // pick the single row isntacne of DOM element and make changes to it and then use insertAdjacentHTML functionality to attach it back. 
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${index + 1
      } ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${movement}</div>
        </div>`

    // Used afterbegin instead of afterend. so new child will come first. 
    containerMovements.insertAdjacentHTML('afterbegin', html);
  })

};

//displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, move) => acc + move, 0);
  // labelBalance.textContent = `Rs ${acc.balance} `
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
}
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {

  // IN 
  const income = acc.movements
    .filter(move => move >= 0)
    .reduce((move, curr) => move + curr, 0);
  //labelSumIn.textContent = `Rs ${income}`;
  labelSumIn.textContent = formatCur(income, acc.locale, acc.currency);

  // Out 
  const out = acc.movements
    .filter(move => move < 0)
    .reduce((move, curr) => Math.abs(move) + Math.abs(curr), 0);
  //labelSumOut.textContent = `Rs ${Math.trunc(out)}`;
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  // Interest 
  const interest = acc.movements.filter(move => move > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    //Only get interest if Rs>= 1
    .filter((int, i, arr) => {
      //console.log(arr);
      return int >= 1;
    })
    .reduce((acc, curr) => acc + curr, 0);

  // labelSumInterest.textContent = `Rs ${interest}`;
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);

}
// calcDisplaySummary(account1.movements);

const createUsernames = function (accs) {

  // We are using forEach as we're manioulating the origianl account object 
  // And using function instead of => function as there's no return.
  //debugger;
  accs.forEach(function (acc) {
    // Create a new property of username inside account object.
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts)
//console.log(accounts);

// const usertrim = user.trim().toLowerCase().split(' ').map(name => name[0]).join('');
// console.log(usertrim);
// let username = [];
// for (const name of username) {
//   username.push(name.splice(0, 1));
//   console.log(username);
// }

const updateUI = function (acc) {

  //Display Movements
  displayMovements(acc);

  // Display Balance 
  calcDisplayBalance(acc);

  // Display Summary 
  calcDisplaySummary(acc);


}

const startLogOutTimer = function () {
  // set time
  const tick = function () {

    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // Each call print the time to UI
    labelTimer.textContent = `${min}: ${sec}`;

    // When time hits 0
    if (time === 0) {
      clearInterval(timer);
      // Display UI and message
      labelWelcome.textContent = `Login To Get Started`;

      //change the opacity 
      containerApp.style.opacity = 0;
    }

    // Decrease the time
    time--;

    // When 0 seconds, stop the timer and log out. 
  }
  let time = 120;

  //Call the timer
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
}

let currentAccount, timer;

// Fake login for easier development. 

// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
// const now = new Date();
// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hours = `${now.getHours()}`.padStart(2, 0);
// const minutes = `${now.getMinutes()}`.padStart(2, 0);
// const ampm = hours >= 12 ? 'PM' : 'AM';

// const formattedDate = `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;
// console.log(formattedDate);
// labelDate.textContent = formattedDate;
// startLogOutTimer();

// Event Handlers

btnLogin.addEventListener('click', function (e) {
  //prevent from from submitting.
  e.preventDefault();

  // Using the find method to locate the right account
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (currentAccount) {
    //console.log(currentAccount);
    if (currentAccount?.pin === Number(inputLoginPin.value)) {

      console.log(`Login Successful for ${currentAccount.owner}`);


      // Display UI and message
      labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`;

      //change the opacity
      containerApp.style.opacity = 100;

      // get logged-in current Date 
      // const now = new Date();
      // const day = `${now.getDate()}`.padStart(2, 0);
      // const month = `${now.getMonth() + 1}`.padStart(2, 0);
      // const year = now.getFullYear();
      // const hours = now.getHours().padStart(2, 0);
      // const minutes = now.getMinutes().padStart(2, 0);
      // const ampm = hours >= 12 ? 'PM' : 'AM';

      // const formattedDate = `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;
      // console.log(formattedDate);
      // labelDate.textContent = formattedDate;

      //Another way for current date - 

      const now = new Date();
      const options = {
        hour: "numeric",
        minute: "numeric",
        day: "numeric",
        month: "numeric",
        year: "numeric",
        // weekday: 'long',
      };
      labelDate.textContent = new Intl.DateTimeFormat(
        currentAccount.locale,
        options
      ).format(now);


      // Clear the input fields 
      inputLoginUsername.value = inputLoginPin.value = '';

      // To remove focus from the field of pin automatically. 
      inputLoginPin.blur();
      if (timer) clearInterval(timer);
      timer = startLogOutTimer();

      //startLogOutTimer();

      updateUI(currentAccount);

    } else {
      alert('Invalid username or password');
    }
  } else {
    alert('Invalid username or password');
  }
})

btnTransfer.addEventListener('click', function (e) {
  // common when working with forms.
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)
  console.log(amount, receiverAcc);

  // Refresh the input fields. 
  inputTransferAmount.value = inputTransferTo.value = '';
  if (amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc?.username != currentAccount.username) {
    // Valid transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date. 
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    //Reset the timer 
    clearInterval(timer);
    timer = startLogOutTimer();
  }
})

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(move => move >= amount * 0.1)) {

    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());
      // currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  } else {
    inputLoanAmount.value = "";
    alert('requested a lot of funds');

  }
})

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (inputCloseUsername?.value === currentAccount.username &&
    //(inputClosePin?.value) === currentAccount.pin) {
    +inputClosePin.value === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)
    console.log(index);
    // Delete account 
    accounts.splice(index, 1);

    // Hide  UI    
    containerApp.style.opacity = 0;

  }

  // Clear the fields
  inputCloseUsername.value = inputClosePin.value = '';
})

// Sorting 
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;


})

// const bankDepositSum = accounts
//   .flatMapmap(acc => acc.movements)
//   .filter(move => move > 0)
//   .reduce((sum, cur) => sum + cur, 0);
// console.log(bankDepositSum);


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//-- FOR EACH for array
// movements.forEach(function (movement, index, array) {
//   if (movement > 0) {
//     console.log(`Movement ${index + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// })

// -- FOR EACH for maps and sets

// Challenge 1;
//1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
//2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// function checkDogs(dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = [...dogsJulia];
//   console.log(dogsJuliaCorrected);
//   //debugger;
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);
//   const dogs = [...dogsJuliaCorrected, ...dogsKate];
//   console.log(dogs);
//   dogs.forEach(function (dog, number) {
//     if (dog >= 3) {
//       console.log(`Dog number ${number + 1} is an adult, and is ${dog} years old`);
//     } else {
//       console.log(`Dog number ${number + 1} is still a puppy 🐶`);
//     }

//   })
// }

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

//--------------
// const rupeeToUsd = 0.012;
// //const movmementsUSD = movements.map(move => move * rupeeToUsd);
// const movmementsUSD = movements.map(function (move) {
//   return move * rupeeToUsd;
// })

//console.log(movmementsUSD);

// const movementsDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );
// console.log(movementsDescriptions);

// const withdrawal = [];
// for (const move of movements) {
//   if (move < 0) {
//     withdrawal.push(move);
//   }
// }
// console.log(withdrawal);

// Can also be written as -> 
// const withdrawal = movements.filter(movement => movement < 0);
// //console.log(withdrawal);


// // Reduce method 
// //reduce (revious value, current value, index, array) 
// const balance = movements.reduce((acc, cur) => acc + cur, 0);   // 0 is the default value. 
// //console.log(balance);

// Challenge 2 

// function calcAverageHumanAge(ages) {
//   console.log("ages", ages);
//   const humanAge = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4));
//   console.log("human age", humanAge);
//   const filteredAge = humanAge.filter(age => age >= 18);
//   console.log("filtered age", filteredAge);
//   const averageAge = filteredAge.reduce((acc, cur, index, arr) => (acc + cur), 0) / filteredAge.length;

//   console.log("average age", averageAge);
// }

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);


//--------------- Challenge #3 


// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// const calcAverageHumanAge = (ages) =>
//   ages
//     .map(age => age <= 2 ? age * 2 : 16 + age * 4)
//     .filter(age => age >= 18)
//     .reduce((acc, curr, index, arr) => acc + curr / arr.length, 0)
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])); 

//------------
// every() and some() 

// ------------
// flat
// const overalBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

// // flatMap
// const overalBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance2);

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
// movements.sort((a, b) => a - b);
// console.log(movements);

// // Descending
// // movements.sort((a, b) => {
// //   if (a > b) return -1;
// //   if (a < b) return 1;
// // });
// movements.sort((a, b) => b - a);
// console.log(movements);

//-  - - - - - - - - -- - - - - - - - 

// Array.from
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);


// this is a nice title -> This Is a Nice Title
// const convertTitleCase = function (title) {
//   const capitzalize = str => str[0].toUpperCase() + str.slice(1);

//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => (exceptions.includes(word) ? word : capitzalize(word)))
//     .join(' ');

//   return capitzalize(titleCase);
// };

// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));



//--- - - - - - - - - - --- ---- - - - - - - - - - --- -

// Challenge 4 

// TEST DATA:
// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] }
// ];

// dogs.forEach(dog => dog.recFood = Math.trunc(dog.weight ** 0.75 * 28));
// //console.log(dogs);

// const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log(dogSarah);
// console.log(`Sarah's Dog is eating too ${dogSarah.curFood > dogSarah.recFood ? `much` : `little`}`);

// const ownersEatTooMuch = dogs
//   .filter(dog => dog.curFood > dog.recFood)
//   .flatMap(dog => dog.owners);
// console.log(ownersEatTooMuch);

// const ownersEatTooLittle = dogs
//   .filter(dog => dog.curFood < dog.recFood)
//   .flatMap(dog => dog.owners);
// console.log(ownersEatTooLittle);

// console.log(`${ownersEatTooMuch.join(' and ')}'s dog eat too much`);
// console.log(`${ownersEatTooLittle.join(' and ')}'s dog eat too little`);
// console.log(dogs);

// console.log(dogs.some(dog => dog.curFood === dog.recFood));
// const dogsEatingOkay = dog =>
//   dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.rec * 1.1;
// console.log(dogs.some(dogsEatingOkay));

// console.log(dogs.filter(dogsEatingOkay));

// const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
// console.log(dogsSorted);