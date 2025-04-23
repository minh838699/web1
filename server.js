// server.js
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

// === CẤU HÌNH ===
const USERS = [
  { email: "admin@example.com", password: "123456" }
];

const HASS_URL = "https://ebqvnmfukgx05lv0x0pu6egvqaaerpwc.ui.nabu.casa";
const HASS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxNDI1MThhMTQxYjM0N2UzYTU2YWQ4YTYxYTBkN2I1MiIsImlhdCI6MTc0NTM5MzIwOCwiZXhwIjoyMDYwNzUzMjA4fQ.y4sw2nzjpsgdldiWpE-gMBl2Oxv_N8sjHoqNJ6A7-Zo";

// === CÀI ĐẶT ===
app.use(cors());
app.use(bodyParser.json());

// === ĐĂNG NHẬP ===
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = USERS.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Sai thông tin đăng nhập" });
  }
});

// === LẤY TRẠNG THÁI TỪ HOME ASSISTANT ===
app.get("/api/states", async (req, res) => {
  try {
    const response = await axios.get(`${HASS_URL}/api/states`, {
      headers: {
        Authorization: `Bearer ${HASS_TOKEN}`,
        "Content-Type": "application/json"
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Không thể lấy trạng thái từ Home Assistant" });
  }
});

// === CHẠY SERVER ===
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
