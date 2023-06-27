'use strict';
const npp = document.querySelector('#input-page-size');
const category = document.querySelector('#input-category');
const btnSet = document.querySelector('#btn-submit');

let data = {};

if (getFromStorage('setting') == null) {
  // nếu ban đầu chưa có setting cũ thì gán cho data các thông số mặc định
  data.numpage = '5';
  data.cate = 'General';
  saveToStorage('setting', JSON.stringify(data)); // lưu thông số mặc định vào local
} else {
  data = JSON.parse(getFromStorage('setting')); //nếu đã có dữ liệu từ trước thì lấy nó gắn vào data
}
npp.value = data.numpage; // cài đặt hiển thị theo data trong cả 2 trường hợp là có hoặc ko có setting từ trước
category.value = data.cate;

btnSet.addEventListener('click', function () {
  data = {
    numpage: npp.value,
    cate: category.value,
  };
  console.log(data);
  saveToStorage('setting', JSON.stringify(data)); // cập nhật setting mới và lưu vào local
});
