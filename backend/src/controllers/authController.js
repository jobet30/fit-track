const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword],
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Registration failed", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed", error });
  }
};

module.exports = {
  register,
  login,
};
