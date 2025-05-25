import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER USER
export const createUser = async (req, res) => {
  try {
    const { name, email, gender, password } = req.body;

    if (!name || !email || !gender || !password) {
      return res.status(400).json({ message: "Semua field wajib diisi!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      gender,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Registrasi berhasil",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        gender: newUser.gender,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// LOGIN USER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Email tidak ditemukan" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Password salah" });

    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign(userPayload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });

    await User.update({ refresh_token: refreshToken }, { where: { id: user.id } });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: false, // set to true jika HTTPS
      sameSite: "strict"
    });

    return res.status(200).json({ message: "Login berhasil", accessToken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// LOGOUT USER
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(204).json(); // no content

    const user = await User.findOne({ where: { refresh_token: refreshToken } });
    if (!user) return res.status(204).json();

    await User.update({ refresh_token: null }, { where: { id: user.id } });
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "Logout berhasil" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
