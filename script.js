// Simulated Database (for demo purposes)
const users = [];
const requests = [
  { id: 1, item: 'Groceries', location: '123 Main St', points: 50, pickup: '123 Main St', dropoff: '456 Elm St', timeframe: '2 hours' },
  { id: 2, item: 'Electronics', location: '456 Oak St', points: 100, pickup: '456 Oak St', dropoff: '789 Pine St', timeframe: '3 hours' }
];

// Show login page
function showLogin() {
  document.getElementById("signupPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
}

// Show signup page
function showSignup() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("signupPage").style.display = "block";
}

// Handle Login form submission
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = users.find(user => user.email === email && user.password === password);
  
  if (user) {
    alert("Welcome " + user.email);
    showDashboard();
  } else {
    alert("Invalid credentials. Please try again.");
  }
});

// Handle Signup form submission
document.getElementById("signupForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  if (email && password) {
    users.push({ email, password });
    alert("Account created successfully for " + email);
    showLogin();
  } else {
    alert("Please fill in all fields.");
  }
});

// Show Dashboard
function showDashboard() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("signupPage").style.display = "none";
  document.getElementById("dashboardPage").style.display = "block";
  loadRequests();
}

// Load the list of delivery requests
function loadRequests() {
  const list = document.getElementById("requestsList");
  list.innerHTML = "";
  requests.forEach((request) => {
    const div = document.createElement("div");
    div.classList.add("request-item");
    div.innerHTML = `
      <strong>${request.item}</strong><br>
      Location: ${request.location}<br>
      Reward Points: ${request.points}<br>
      <button onclick="showRequestDetails(${request.id})">View Details</button>
    `;
    list.appendChild(div);
  });
}

// Show Request Details
function showRequestDetails(requestId) {
  const request = requests.find(r => r.id === requestId);
  document.getElementById("requestDetails").innerHTML = `
    <strong>${request.item}</strong><br>
    Pickup Address: ${request.pickup}<br>
    Drop-off Address: ${request.dropoff}<br>
    Delivery Time Frame: ${request.timeframe}<br>
  `;
  document.getElementById("dashboardPage").style.display = "none";
  document.getElementById("requestDetailsPage").style.display = "block";
}

// Show Add Request Page
function showAddRequest() {
  document.getElementById("dashboardPage").style.display = "none";
  document.getElementById("addRequestPage").style.display = "block";
}

// Add a New Delivery Request
document.getElementById("addRequestForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const item = document.getElementById("item").value;
  const location = document.getElementById("location").value;
  const points = document.getElementById("points").value;

  requests.push({ id: requests.length + 1, item, location, points });
  alert("Delivery request added!");
  showDashboard();
});

// Show User Profile Page
function showProfile() {
  document.getElementById("dashboardPage").style.display = "none";
  document.getElementById("profilePage").style.display = "block";

  const user = users[0]; // Assuming first user for simplicity
  document.getElementById("profileInfo").innerHTML = `
    <strong>Name:</strong> ${user.email}<br>
    <strong>Completed Deliveries:</strong> ${requests.length}<br>
    <strong>Earned Reward Points:</strong> ${requests.reduce((sum, request) => sum + request.points, 0)}
  `;
}