import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer <token>

  if (!token) {
    return res.status(401).json({
      status: "Error",
      message: "Access token tidak ditemukan",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        status: "Error",
        message: "Access token tidak valid atau sudah kadaluarsa",
      });
    }

    req.user = decoded;
    next();
  });
};
