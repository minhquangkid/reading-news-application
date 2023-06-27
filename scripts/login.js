'use strict';
const getUsername = document.querySelector('#input-username');
const getPassword = document.querySelector('#input-password');
const btnLogin = document.querySelector('#btn-submit');

btnLogin.addEventListener('click', function () {
  let login = new userLogin(getUsername.value, getPassword.value);

  //   console.log(login);
  let test = false;

  const kt = function (data) {
    for (let i = 0; i < userArr.length; i++) {
      if (
        userArr[i].username == data.username &&
        userArr[i].password == data.password
      ) {
        test = true;
        console.log('match');
      }
    }
  };

  kt(login);
  console.log(test);
  if (test == true) {
    arrLogin.push(login);
    saveToStorage(US, JSON.stringify(arrLogin));
    console.log('lưu thành công người đăng nhập');
    window.location.href = '../index.html';
  } else {
    console.log('Bạn nhập sai username hoặc password');
  }
});
