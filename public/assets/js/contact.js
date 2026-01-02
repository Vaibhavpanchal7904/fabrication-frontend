document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const msg = document.getElementById("formMsg");

  const data = {
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    interest: document.getElementById("interest").value,
    message: document.getElementById("message").value.trim()
  };

  // Validation
  if (!data.name || !data.phone) {
    msg.innerText = "Name and Phone are required!";
    msg.style.color = "red";
    return;
  }

  if (!/^[6-9]\d{9}$/.test(data.phone)) {
    msg.innerText = "Enter valid 10-digit mobile number";
    msg.style.color = "red";
    return;
  }

  msg.innerText = "Sending...";
  msg.style.color = "#555";

  try {
    const response = await fetch(
      "https://fabrication-backend.onrender.com/api/enquiries",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const result = await response.json();

    if (result.success) {
      msg.innerText = "Enquiry submitted successfully ✅";
      msg.style.color = "green";
      document.getElementById("contactForm").reset();
    } else {
      msg.innerText = result.message || "Submission failed";
      msg.style.color = "red";
    }

  } catch (error) {
    msg.innerText = "Server not reachable ❌";
    msg.style.color = "red";
  }
});
