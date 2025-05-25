const token = grecaptcha.getResponse();
if (!token) {
  resultDiv.textContent = "❌ Please complete the reCAPTCHA.";
  getBtn.disabled = false;
  return;
}

const response = await fetch("https://crunchycrew.onrender.com/get-account", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ token })
});

const data = await response.json();

if (data.account) {
  resultDiv.textContent = "📧 " + data.account;
} else {
  resultDiv.textContent = "❌ " + (data.error || "Error");
}
