'use strict';

// vì storage.js được gọi chạy trước trong các file html nên ta khai báo các biến chung ở file này

function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
// tạo hàm lấy giá trị lưu  trong local
function getFromStorage(key) {
  return localStorage.getItem(key); // phải có return
}

////////////

// localStorage.removeItem("key");
// localStorage.removeItem("breed");

//Để quản lý người dùng, tạo một mảng gọi là userArr, mảng này sẽ chứa các Instance được tạo từ Class User.

// let userArr;
// userArr = JSON.parse(getFromStorage(KEY)) || [];
// // Khi mới truy cập vào màn hình, phải lấy dữ liệu mảng userArr từ localStorage.
// // nếu chưa có dữ liệu thì userArr được gán là rỗng

const KEY = 'USER_ARRAY';
let userArr = JSON.parse(getFromStorage(KEY)) || [];
// Khi mới truy cập vào màn hình, phải lấy dữ liệu mảng userArr từ localStorage.
// nếu chưa có dữ liệu thì userArr được gán là rỗng
class User {
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
}

class userLogin {
  // đây là tạo 1 class khác, ko liên quan đến class user, tự hỏi có cách nào tạo ra class con mà ko có vài thuộc tính của class cha ko?
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

const US = 'currentUser'; //lưu thông tin người dùng hiện tại xuống dưới LocalStorage bằng biến currentUser với Key là US

let arrLogin = []; //làm mới mỗi khi load trang

//let arrLogin = JSON.parse(getFromStorage(US)) || []; // ko ghi như vầy vì mình ko lưu chồng chất thông tin người đã đăng nhập, trong 1 thời điểm chỉ có 1 người login thôi

// localStorage.removeItem(KEY);
// saveToStorage(KEY, "kk");
// const quang = new userLogin('quang', 111);
// console.log(quang);

// const ad = document.getElementById('login-modal');
// //ad.style.display = 'none';

///////////////////////////////
class taskUser {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner; // nhớ đổi lại thành owner
    this.isDone = isDone;
  }
}
