const resultDiv = document.getElementById("result");

function onSubmit(token) {
  const btn = document.getElementById("getAccountBtn");
  btn.disabled = true;
  resultDiv.textContent = "⏳ Verifying...";

  // Simulate verification delay
  setTimeout(() => {
    // Fake account data – replace with real API call later
    const fakeAccount = "📧 user@crunchy.com : pass123";
    resultDiv.textContent = fakeAccount;

    // Reset CAPTCHA so user can try again if needed
    grecaptcha.reset();
    btn.disabled = false;
  }, 2000);
}

// Optional: Prevent form submit by enter key
document.getElementById("captchaForm").addEventListener("submit", function (e) {
  e.preventDefault();
});
