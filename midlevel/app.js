// function findUnique(input) {
//     // Initialize an empty object to keep track of seen characters
//     let seenCharacters = {};

//     // Split the input string into an array of characters and use reduce to process each character
//     return input.split('').reduce((result, char) => {
//       // Check if the character has not been seen before
//       if (!seenCharacters[char]) {
//         // Mark the character as seen by adding it to the seenCharacters object
//         seenCharacters[char] = true;
//         // Append the character to the result string
//         result += char;
//       }
//       // Return the result string for the next iteration
//       return result;
//     }, ''); // Initialize the result string as an empty string
//   }

//   // Example usage:
//   let inputString = "apple bubbie kitty";
//   let uniqueChars = findUnique(inputString);
//   console.log(uniqueChars); // "helo wrd"

// // const words = ['apple', 'banana', 'cherry'];
// // const uniqueChars = extractUniqueCharacters(words);
// // console.log(uniqueChars); // Output: ['a', 'p', 'l', 'e', 'b', 'n', 'c', 'h', 'r', 'y']

function sortByProperty(objects, propertyName) {
    return objects.sort((a, b) => {
      if (a[propertyName] < b[propertyName]) {
        return -1;
      }
      if (a[propertyName] > b[propertyName]) {
        return 1;
      }
      return 0;
    });
  }
const people = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 },
  { name: "David", age: 28 },
];

const sortedByAge = sortByProperty(people, "age");
console.log(sortedByAge);

// const sortedByName = sortByProperty(people, "name");
// console.log(sortedByName);
