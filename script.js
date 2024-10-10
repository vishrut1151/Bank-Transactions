'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
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

const accounts = [account1, account2, account3, account4];

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


const displayMovements = function (movements) {
  // Similar to text content 
  containerMovements.innerHTML = ''
  movements.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    // pick the single row isntacne of DOM element and make changes to it and then use insertAdjacentHTML functionality to attach it back. 
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${index + 1
      } ${type}</div>
          <div class="movements__value">${movement}</div>
        </div>`

    // Used afterbegin instead of afterend. so new child will come first. 
    containerMovements.insertAdjacentHTML('afterbegin', html);
  })

};

displayMovements(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, move) => acc + move, 0);
  labelBalance.textContent = `Rs ${balance} `
}
calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (movements) {

  // IN 
  const income = movements
    .filter(move => move >= 0)
    .reduce((move, curr) => move + curr, 0);
  labelSumIn.textContent = `Rs ${income}`;

  // Out 
  const out = movements
    .filter(move => move < 0)
    .reduce((move, curr) => Math.abs(move) + Math.abs(curr), 0);
  labelSumOut.textContent = `Rs ${out}`;

  // Interest 
  const interest = movements.filter(move => move > 0)
    .map(deposit => deposit * 1.2 / 100)
    //Only get interest if Rs>= 1
    .filter((int, i, arr) => {
      //console.log(arr);
      return int >= 1;
    })
    .reduce((acc, curr) => acc + curr, 0);

  labelSumInterest.textContent = `Rs ${interest}`;

}
calcDisplaySummary(account1.movements);

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

const calcAverageHumanAge = (ages) =>
  ages
    .map(age => age <= 2 ? age * 2 : 16 + age * 4)
    .filter(age => age >= 18)
    .reduce((acc, curr, index, arr) => acc + curr / arr.length, 0)
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])); 
