import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const getAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "Token tidak ada" });

    const user = await User.findOne({ where: { refresh_token: refreshToken } });
    if (!user) return res.status(403).json({ message: "Token tidak valid" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Token tidak valid" });

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30s",
      });

      return res.status(200).json({ accessToken });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
