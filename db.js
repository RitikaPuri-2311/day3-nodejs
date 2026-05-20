const fs = require("fs").promises;

const DB_FILE = "users.json";

// Read all users
async function getAllUsers() {

  const data = await fs.readFile(
    DB_FILE,
    "utf-8"
  );

  return JSON.parse(data);
}

// Save users
async function saveUsers(users) {

  await fs.writeFile(
    DB_FILE,
    JSON.stringify(users, null, 2)
  );
}

module.exports = {
  getAllUsers,
  saveUsers,
};