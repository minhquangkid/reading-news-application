'use strict';

// khai báo các đối tượng
const btnSubmit = document.getElementById('btn-submit');
const inputFirst = document.getElementById('input-firstname');
const inputLast = document.getElementById('input-lastname');
const inputUser = document.getElementById('input-username');
const inputPass = document.getElementById('input-password');
const inputConfirm = document.getElementById('input-password-confirm');

////////////////////
// let userArr;
// userArr = JSON.parse(getFromStorage(KEY)) || [];
// Khi mới truy cập vào màn hình, phải lấy dữ liệu mảng userArr từ localStorage.
// nếu chưa có dữ liệu thì userArr được gán là rỗng

console.log(userArr);
//////////////// Khi nhấn Register
btnSubmit.addEventListener('click', function () {
  // tạo ra instance từ class User ở storage.js
  let data = new User(
    inputFirst.value,
    inputLast.value,
    inputUser.value,
    inputPass.value
  );

  // console.log(data);

  const message = {
    ok: true,
  };

  const validate = function (data) {
    // ko hiểu sao thứ tự thông báo bị đảo lộn
    if (data.firstName == '') {
      message.ok = false;
      message.mess = 'Please fill your first name !';
    }
    if (data.lastName == '') {
      message.ok = false;
      message.mess = 'Please fill your last name !';
    }
    if (data.username == '') {
      message.ok = false;
      message.mess = 'Please fill your username !';
    } // bổ sung thêm trường hợp bị trùng

    if (userArr != []) {
      for (let e = 0; e < userArr.length; e++) {
        if (userArr[e].username == data.username) {
          message.ok = false;
          message.mess = 'Your username has already registered!';
        }
        // console.log("h1");
      }
    }

    if (data.password == '') {
      message.ok = false;
      message.mess = 'Please fill your password !';
    } else if (data.password.length < 9) {
      message.ok = false;
      message.mess = 'Password must be more than 8 characters!';
    }

    if (inputConfirm.value != data.password) {
      message.ok = false;
      message.mess = 'Please confirm your password again !';
    }
  };
  validate(data);
  if (message.ok == true) {
    console.log('thành công');
    // delete data.confirmPass; // xóa thuộc tính confirm khỏi object data nếu ban đầu data có thêm thuộc tính confirmPass
    console.log(data);
    console.log(userArr);

    userArr.push(data);

    saveToStorage(KEY, JSON.stringify(userArr));

    window.location.href = '../pages/login.html'; //ử dụng window.location.href để chuyển trang.
  } else {
    alert(message.mess);
    return;
  }
  console.log('next');
});
