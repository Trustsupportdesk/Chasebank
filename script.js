let currentUser = '';

function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorDiv = document.getElementById('error');

  if ((username === 'Beautiful404' && password === 'Beautifulsoul$') ||
      (username === 'Admin404' && password === 'AdminPower$')) {
    currentUser = username;
    document.getElementById('userDisplay').textContent = username;
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
  } else {
    errorDiv.textContent = 'Invalid username or password';
  }
}

function simulateBiometricLogin() {
  const useAdmin = confirm("Simulate Admin Biometric Access? (Cancel = Normal User)");
  currentUser = useAdmin ? 'Admin404' : 'Beautiful404';
  document.getElementById('userDisplay').textContent = currentUser;
  document.getElementById('loginContainer').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
}

function showTransferPage() {
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('transferPage').style.display = 'block';
}

function goBack() {
  document.getElementById('transferPage').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
}

function submitTransfer() {
  const accNum = document.getElementById('accNum').value;
  const accType = document.getElementById('accType').value;
  const transType = document.getElementById('transType').value;
  const recName = document.getElementById('recName').value;
  const amount = document.getElementById('amount').value;

  if (!accNum || !accType || !transType || !recName || !amount) {
    showPopup("Please fill in all transfer details.");
    return;
  }

  if (currentUser === 'Admin404') {
    const history = document.getElementById('history');
    const entry = document.createElement('div');
    entry.className = 'history-entry';
    entry.innerHTML = `
      <p><strong>Recipient:</strong> ${recName}</p>
      <p><strong>Account:</strong> ${accNum} (${accType})</p>
      <p><strong>Type:</strong> ${transType}</p>
      <p><strong>Amount:</strong> $${amount}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
    `;
    history.appendChild(entry);
    goBack();
    showPopup("Transfer Successful!");
  } else {
    showPopup("Account is Temporarily Unauthorized to do this Transfer.<br>Kindly pay your outstanding balance. Thank you.");
  }
}

function showPopup(message) {
  document.getElementById('popupMessage').innerHTML = message;
  document.getElementById('popup').style.display = 'block';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

function logout() {
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('loginContainer').style.display = 'block';
  document.getElementById('transferPage').style.display = 'none';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  currentUser = '';
}
