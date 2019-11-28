console.log(`hello world`);
const getElmById = str => document.getElementById(str);

document.querySelector("main").addEventListener("click", ({ target }) => {
  if (!target.matches("section")) return;
  target.children[1].classList.toggle("expanded");
});

/**
 * change theme color light/dark
 */
getElmById(`theme`).addEventListener(`change`, ({ target }) => {
  document.body.className = `${target.value.toLowerCase()}-theme`;
});

/**
 * activity #1 convert kg to pounds
 */
getElmById(`calc`).addEventListener("click", () => {
  let name = getElmById(`name`).value;
  let weight = parseInt(getElmById(`weight`).value);

  getElmById(`output`).innerText = `${name}'s weight is ${weight} kg or ${(
    weight * 2.2
  ).toFixed(2)} pounds`;
});

/**
 * activity #2 check number type
 */
getElmById(`do-a2`).addEventListener("click", () => {
  let n = parseInt(getElmById(`a2-num`).value);
  let msg;
  if (n == 0) {
    msg = `${n} is neigther positive nor negative`;
  } else {
    msg = `${n} is ${n > 0 ? "positive" : "negative"}`;
  }
  getElmById(`a2-output`).innerText = msg;
});

/**
 * activity #3 odd or even number
 */
getElmById(`do-a3`).addEventListener("click", () => {
  let n = parseInt(getElmById(`a3-num`).value);
  getElmById(`a3-output`).innerText = `${n} is an ${
    n % 2 == 0 ? "even" : "odd"
    } number`;
});

/**
 * activity #4 total cost
 */
document.getElementById(`do-a4`).addEventListener(`click`, () => {
  let hours = parseFloat(document.getElementById(`a4-hours`).value);
  let parts = parseFloat(document.getElementById(`a4-parts`).value);
  let output = document.getElementById(`a4-output`);
  let cost = hours * 100 + parts;

  if (cost < 150) {
    output.innerText = `Total cost is $150`;
  } else {
    output.innerText = `Total cost is $${cost}`;
  }
});

/**
 * activity #5 grade equivalent
 */
getElmById(`do-a5`).addEventListener(`click`, () => {
  let name = getElmById(`a5-name`).value;
  let grade = parseInt(getElmById(`a5-grade`).value);
  let output = getElmById(`a5-output`);

  let letter;
  if (grade < 60) {
    letter = "F";
  } else if (grade < 70) {
    letter = "D";
  } else if (grade < 80) {
    letter = "C";
  } else if (grade < 90) {
    letter = "B";
  } else {
    letter = "A";
  }

  output.innerText = `${name} got ${letter} as the equivalent of ${grade}`;
});


/**
 * activity #6 grade average
 */
document.getElementById(`do-a6`).addEventListener(`click`, e => {
  let grade1 = parseInt(document.getElementById(`a6-grade1`).value);
  let grade2 = parseInt(document.getElementById(`a6-grade2`).value);
  let grade3 = parseInt(document.getElementById(`a6-grade3`).value);
  
  let average = (grade1 + grade2 + grade3) / 3;
  let status = 'passed';
  
  if(average < 50) {
    const makeup = parseInt(prompt('Enter make-up exam grade'));
    if(makeup < 65)
      status = 'failed';
  }
  
  document.getElementById(`a6-output`).innerText = `You ${status} the course!`;
});