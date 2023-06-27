'use strict';
const input = document.querySelector('#input-task');
const btnAdd = document.querySelector('#btn-add');
const list = document.getElementById('todo-list');

//////////// khai báo các biến ban đầu
const curUser = JSON.parse(getFromStorage(US)); //lấy dữ liệu từ người dùng đang đăng nhập
let onl; // biến lưu tên người đang đăng nhập (username)
if (curUser != null) onl = curUser[0].username; // nếu có ng đăng nhập thì mới lưu, ko có kèm theo if mà khai báo thì nó báo lỗi
let daluu; // mảng chứa dữ liệu đã lưu trước đó

/// hàm tạo html
const render = function (task) {
  const html = `${task}<span id='btn-close' class="close">×</span>`; // có tạo id cho tag span ttrong này
  // đây là ruột của tag <li></li>
  return html;
};

// hàm đưa html vào web
const print = function (obj) {
  const hang = document.createElement('li');
  hang.id = 'job'; // tạo id cho <li></li>
  if (obj.isDone == true) hang.classList.add('checked'); // nếu đã check là true thì add class checked vào
  hang.innerHTML = render(obj.task);

  list.appendChild(hang);
};

///// hàm cập nhật lại mỗi khi có sự thay đổi (lấy dữ liệu từ giao diện và đưa vào bộ nhớ local)
const update = function () {
  daluu = []; // đặt lại biến lưu là rỗng lấy dữ liệu từ giao diện

  const sel = document.querySelectorAll('#job'); // phải tạo 1 biến sel khác với biến select có sẵn ở dưới vì khi add thêm đối tượng mới , đối tượng đó sẽ ko được khai báo trong select do code chỉ đọc 1 lần

  sel.forEach(e => {
    // chạy từng phần tử trong mảng
    const news = new taskUser(
      e.textContent.slice(0, e.textContent.length - 1), // vì phần nội dung của <li></li> có chứa <span>x</span> nên ta loại bỏ x ra khỏi chuỗi nội dung task
      onl,
      e.classList.contains('checked') ? true : false // nếu tag <li></li> có class checked thì isDone là true
    );

    daluu.push(news);
  });
  console.log(daluu);
  saveToStorage(onl, JSON.stringify(daluu)); //lưu vô bộ nhớ local, với KEY cũng chính là username của người đang đăng nhập
};

///// khi ban đầu mới vào web
if (curUser != null) {
  // nếu ng dùng đã login
  daluu = JSON.parse(getFromStorage(onl)); //  lấy dữ liệu của ng dùng đang login
  console.log(daluu);
  if (daluu != null) {
    // nếu có dữ liệu trc đó thì in nó ra
    daluu.forEach(e => print(e));
  } else daluu = []; // nếu chưa có thì đặt là rỗng
}
/////////////// khi nhấn nút
btnAdd.addEventListener('click', function () {
  if (curUser == null) {
    alert('Please login');
    return;
  }
  const Todo = new taskUser(input.value, onl, false);

  const kt = {
    ok: true,
  };

  if (Todo.task == '') {
    kt.ok = false;
    kt.message = 'Please input tasks';
  }
  console.log(kt.ok);

  if (kt.ok == false) {
    console.log(kt.message);
    return;
  }
  console.log(Todo);
  daluu.push(Todo);
  saveToStorage(onl, JSON.stringify(daluu));
  print(daluu);
  location.reload(true); // tự động reload lại trang vì trình duyệt chỉ đọc code 1 lần từ trên xuốn dưới nên khi in cái mới vào thì cái mới sẽ ko có được sự kiện checked
});

const select = document.querySelectorAll('#job'); // chọn tất cả các id là job, nó sẽ trả về 1 mảng kết quả
console.log(select);
// sự kiện nhấn chọn checked cho đối tượng
select.forEach(e =>
  e.addEventListener('click', function () {
    e.classList.toggle('checked');
    console.log(e.target);
    update();
  })
);
// xóa đối tượng
list.addEventListener('click', function (e) {
  if (e.target.id != 'btn-close') return; // nếu ko phải là nút xóa đang được nhấn mà là nút khác thì thoát khỏi sự kiện
  console.log(e.target.parentElement);
  e.target.parentElement.remove(); // xóa tag cha của đối tượng đang được nhấn
  update();
  if (getFromStorage(onl) == '[]') localStorage.removeItem(onl); // khi ng dùng đã xóa hết các danh sách của họ thì xóa luôn mảng rỗng đã lưu trong local, dùng '[]' mà ko phải là [] là do nó vẫn còn đang ở dạng chuỗi (chưa dùng JSON)
});
