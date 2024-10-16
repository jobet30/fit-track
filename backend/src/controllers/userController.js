const { pool } = require("../config/db");

const getUserProfile = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT id, email FROM users WHERE id = ?",
      [req.user.userId],
    );
    const user = rows[0];

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch user profile", error });
  }
};

const updateUserProfile = async (req, res) => {
  const { email } = req.body;

  try {
    await pool.execute("UPDATE users SET email = ? WHERE id = ?", [
      email,
      req.user.userId,
    ]);
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Profile update failed", error });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
