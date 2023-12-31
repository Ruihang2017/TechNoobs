// Login handler

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // Test response

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username && password) {
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to login");
    }
  }
});
