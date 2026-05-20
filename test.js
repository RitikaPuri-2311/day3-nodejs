const assert = require("assert");


// TEST 1 — EMAIL VALIDATION

function isValidEmail(email) {

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

assert.strictEqual(
  isValidEmail("test@gmail.com"),
  true
);

assert.strictEqual(
  isValidEmail("wrong-email"),
  false
);

console.log(
  "Email validation tests passed"
);


// TEST 2 — FILTERING


const users = [
  {
    name: "Ritika",
    role: "admin",
  },
  {
    name: "Aman",
    role: "user",
  },
];

const admins = users.filter(
  (user) =>
    user.role === "admin"
);

assert.strictEqual(
  admins.length,
  1
);

console.log(
  "Filtering test passed"
);


// TEST 3 — SEARCH


const searchResult =
  users.filter((user) =>

    user.name
      .toLowerCase()
      .includes("rit")
  );

assert.strictEqual(
  searchResult.length,
  1
);

console.log(
  "Search test passed"
);


// TEST 4 — PAGINATION


const numbers = [
  1,2,3,4,5,6,7,8,9,10
];

const page = 2;

const limit = 3;

const startIndex =
  (page - 1) * limit;

const endIndex =
  startIndex + limit;

const paginated =
  numbers.slice(
    startIndex,
    endIndex
  );

assert.deepStrictEqual(
  paginated,
  [4,5,6]
);

console.log(
  "Pagination test passed"
);

// TEST 5 — SORTING


const sortedUsers =
  [...users].sort((a, b) =>

    a.name > b.name
      ? 1
      : -1
  );

assert.strictEqual(
  sortedUsers[0].name,
  "Aman"
);

console.log(
  "Sorting test passed"
);


console.log(
  "\n All tests passed successfully"
);