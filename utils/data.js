// array of usernames
const usernames = [
  "SlurpSlurp",
  "NumNums",
  "BoDiddly",
  "Jamiroquai",
  "ElonIsADemon",
];
// array of emails
const emails = [
  "abc@abc.com",
  "def@def.com",
  "ghi@ghi.com",
  "jkl@jkl.com",
  "mno@mno.com",
];
// array of thoughts
const thoughtsArray = [
  "the earth is roundish",
  "scotch is divine",
  "shirts are weird",
  "cars are scary",
  "birds are sky rats",
  "trees are bird airports",
  "baking is relaxing",
  "butter is bread lotion"
];
// array of reactions
const reactionsArray = [
    'super',
    'goodness gracious',
    '?????',
    'fun!',
    'eh',
    'meh',
    'elegant',
]

// function to get a random item from an array; mod18 act 28
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// function to get random username
const getRandomUser = () => `${randomItem(usernames)}`;

// function to get random email
const getRandomEmail = () => `${randomItem(emails)}`;

// function to get random thoughts
const getRandomThought = (num) => {
  // create an empty array to store the results
  const results = [];
  // loop through the thoughts array and push into the results array
  for (let i = 0; i < num; i++) {
    results.push({ thoughts: randomItem(thoughtsArray) });
  }
  return results;
}

// function to get random reactions
const getRandomReaction = (num) => {
  // create an empty array to store the results
  const results = [];
  // loop through the reactions array and push into the results array
  for (let i = 0; i < num; i++) {
    results.push({ reactions: randomItem(reactionsArray) });
  }
  return results;
}

// export the functions for use in seed.js
module.exports = {
  getRandomUser,
  getRandomEmail,
  getRandomThought,
  getRandomReaction,
};