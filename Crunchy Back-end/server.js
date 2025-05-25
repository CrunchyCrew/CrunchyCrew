const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const RECAPTCHA_SECRET_KEY = "6LcmVEgrAAAAACZdGlIQhkqfOyTrgzcGz0hl6MYg";

const accounts = [
  "user1@crunchy.com : pass123",
  "user2@crunchy.com : pass456",
  "user3@crunchy.com : pass789"
];

app.post("/get-account", async (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(400).json({ error: "Missing recaptcha token" });
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
    );

    if (response.data.success) {
      const account = accounts[Math.floor(Math.random() * accounts.length)];
      res.json({ account });
    } else {
      res.status(400).json({ error: "reCAPTCHA verification failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
