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

  // Frontend validation
  if (!data.name || !data.phone) {
    msg.innerText = "Name and Phone are required!";
    msg.style.color = "red";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/enquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      msg.innerText = "Enquiry submitted successfully!";
      msg.style.color = "green";
      document.getElementById("contactForm").reset();
    } else {
      msg.innerText = result.message;
      msg.style.color = "red";
    }
  } catch (error) {
    msg.innerText = "Server not reachable!";
    msg.style.color = "red";
  }
});
