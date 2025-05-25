import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes
import NotesRoute from "./routes/notesRoute.js";
import UserRoute from "./routes/userRoute.js"; // ✅ baru

const app = express();

app.use(cors({
  origin: "http://127.0.0.1:5500", // ganti sesuai domain frontend kamu
  credentials: true,              // ✅ penting agar cookie bisa dikirim
}));
app.use(cookieParser());           // ✅ untuk baca cookie
app.use(express.json());

// Routes
app.use(UserRoute);                // ✅ route untuk auth
app.use(NotesRoute);              // route untuk catatan

app.listen(5000, () => console.log("Server berjalan di port 5000"));
