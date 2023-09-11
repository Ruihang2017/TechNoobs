// Sign up handler

const signUpForm = document.getElementById("signUpForm");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Test response

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  //   const password = document.getElementById("password").value.trim();
  const confirm_password = document
    .getElementById("confirm_password")
    .value.trim();

  if (!(firstName && lastName && username && password && confirm_password)) {
    return;
  }
  if (password !== confirm_password) {
    return;
  }

  const response = await fetch("/signup", {
    method: "POST",
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      username,
      password,
      confirm_password,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to sign up");
  }
});
