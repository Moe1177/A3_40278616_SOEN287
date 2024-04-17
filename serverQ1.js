const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

/* Start of Function Section */

function findSummation(N) {
  // Check if N is a positive integer
  let sum = 0;

  for (let i = 1; i <= N; i++) {
    sum += i;
  }

  return sum;
}

function uppercaseFirstandLast(str) {
  const words = str.split(' ');

  // Map over each word and capitalize the first and last letters
  const modifiedWords = words.map(word => {
    if (word.length < 2) {
      return word.toUpperCase(); // Handle single-letter words
    }
    const first = word[0].toUpperCase();
    const last = word[word.length - 1].toUpperCase();
    return first + word.slice(1, -1) + last;
  });

  // Join the modified words back into a single string
  const result = modifiedWords.join(' ');
  return result;
}

function findAverageAndMedian(numbers) {
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  const avg = sum / numbers.length;

  const sortNums = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sortNums.length / 2);

  let median;

  if (sortNums.length % 2 === 0) {
    median = (sortNums[middle - 1] + sortNums[middle]) / 2;
  } else {
    median = sortNums[middle];
  }

  return `The average is: ${avg} and the median is: ${median}`;
}

function find4Digits(numbers) {
  const arr = numbers.split(' ').map(Number);
  
  for(let num of arr) {
    if (num >= 1000 && num <= 9999) {
      return num;
    }
  }
  return false;
}

/* ------------------------ End of Function Section---------------------- */

app.post('/findSummation', (req, res) => {
  const N = req.body.N;
  const result = findSummation(Number(N));

  if (N === undefined || isNaN(N) || N <= 0) {
    res.send('Invalid input. Please enter a valid number');
  } else {
    res.send(`Summation of all positive integers from 1 to ${N} is: ${result}`);
  }
});

app.post('/uppercaseFirstandLast', (req, res) => {
  const str = req.body.str;
  const result = uppercaseFirstandLast(str);

  if (result === '') {
    res.send('The string is empty. Please enter a string.');
  }

  res.send(`The modified string is: ${result}`);
});

app.post('/findAverageAndMedian', (req, res) => {
  const array = req.body.nums;
  if (array === undefined) {
    res.send('Undefined');
  }
  const formatArr = array.split(',').map(Number);
  const result = findAverageAndMedian(formatArr);

  res.send(result);
});

app.post('/find4Digits', (req, res) => {
  const numStr = req.body.digits;
  const result = find4Digits(numStr);

  if (result === false) {
    res.send('There is no 4 digit number.')
  }

  res.send(`The 4 digit number is: ${result}`);
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Q1.html');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
