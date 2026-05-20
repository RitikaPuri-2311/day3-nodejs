function validateUser(body) {

  const errors = [];

  // Name validation
  if (
    !body.name ||
    body.name.length < 2
  ) {
    errors.push(
      "Name must be at least 2 characters"
    );
  }

  // Email validation
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !body.email ||
    !emailRegex.test(body.email)
  ) {
    errors.push(
      "Invalid email format"
    );
  }

  // Role validation
  const validRoles = [
    "admin",
    "user",
    "manager",
  ];

  if (
    !body.role ||
    !validRoles.includes(body.role)
  ) {
    errors.push(
      "Invalid role"
    );
  }

  return {
    valid:
      errors.length === 0,
    errors,
  };
}

module.exports = {
  validateUser,
};