const resultDiv = document.getElementById("result");

function onSubmit(token) {
  const btn = document.getElementById("getAccountBtn");
  btn.disabled = true;
  resultDiv.textContent = "⏳ Verifying...";

  fetch("https://crunchycrew.onrender.com/get-account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.account) {
        resultDiv.textContent = `📧 ${data.account}`;
      } else {
        resultDiv.textContent = "❌ Verification failed. Try again.";
      }
      grecaptcha.reset();
      btn.disabled = false;
    })
    .catch((err) => {
      resultDiv.textContent = "❌ Server error. Try again.";
      grecaptcha.reset();
      btn.disabled = false;
    });
}

document.getElementById("captchaForm").addEventListener("submit", function (e) {
  e.preventDefault();
});
