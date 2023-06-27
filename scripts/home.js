'use strict';
const login_register = document.getElementById('login-modal');

const logout = document.getElementById('main-content');

const hello = document.getElementById('welcome-message');

const btnLogout = document.getElementById('btn-logout');

if (getFromStorage(US) != null) {
  //   console.log('đang đăng xuất');
  //   logout.style.display = 'none';
  console.log('đang đăng nhập');
  login_register.style.display = 'none';
  arrLogin = JSON.parse(getFromStorage(US));
  hello.textContent = `Welcome ${arrLogin[0].username}`;
} else {
  console.log('đang đăng xuất');
  logout.style.display = 'none';
}

btnLogout.addEventListener('click', function () {
  localStorage.removeItem(US);
  window.location.href = '../pages/login.html';
});
