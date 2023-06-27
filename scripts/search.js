'use strict';
const btnSearch = document.querySelector('#btn-submit');
const inputText = document.querySelector('#input-query');
const btnNext = document.querySelector('#btn-next');
const btnPrevious = document.querySelector('#btn-prev');
const curNumber = document.querySelector('#page-num');
const baibao = document.querySelector('#news-container');

///////////
const set = JSON.parse(getFromStorage('setting')); // lấy dự liệu setting từ local
let pagenum = Number(set.numpage);

const newspapper = async function (key, pageSize, page) {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${key}&pageSize=${pageSize}&page=${page}&apiKey=9da319ad06494c11a0e283bfefdfaf77`
    );

    const data = await response.json();
    //saveToStorage('save', JSON.stringify(data)); // lưu lại vô local để sài hoài mà ko bị hạn chế
    console.log(data);

    //////////// phải đặt điều kiện này ở đây vì lệnh try được thực hiện khi ko có lỗi và lệnh catch thực hiện khi xảy ra lỗi và bỏ qua lệnh try, ngay tại đây chưa có lỗi
    if (pageSize * page < data.totalResults) {
      btnNext.style.display = 'block';
      console.log('chưa xóa');
    } else {
      btnNext.style.display = 'none';
      console.log('đã xóa');
    }
    console.log(pageSize * page, data.totalResults);

    ////////////////// từ đây trở đi sẽ có lỗi xảy ra nếu dữ liệu lấy về là undefined và gán vào html, nên web sẽ đọc code đến đây sau đó bỏ nhảy sang catch
    baibao.innerHTML = '';

    const render = function (img, title, des, link) {
      const html = `<div id="khung">
                  <div class="row">
                    <div class="col-sm-3">
                      <img src=${img} width="100%" height="auto">
                    </div>
                    <div class="col-sm-9">
                 <h5>${title}</h5>
                 <p>${des}</p>
                 <button class='btn btn-primary'>
                 <a href=${link} target="_blank" style="color : white">View</a>
                 </button>
                    </div>
                    </div>
                  </div>`;

      return html;
    };

    const print = function (test) {
      for (let i = 0; i < pageSize; i++) {
        const row = render(
          test.articles[i].urlToImage,
          test.articles[i].title,
          test.articles[i].description,
          test.articles[i].url
        );
        const hang = document.createElement('div');
        hang.innerHTML = row;

        baibao.appendChild(hang);
      }
    };
    print(data);
  } catch (err) {
    console.log(err);
  }
};

let find = inputText.value;

let stt = Number(curNumber.textContent);

btnSearch.addEventListener('click', function () {
  find = inputText.value;

  if (find == '') {
    alert('Please enter Keywords ! ');
    return;
  }

  btnPrevious.style.display = 'none';
  curNumber.textContent = 1;
  stt = Number(curNumber.textContent);
  newspapper(find, pagenum, 1);
});

btnNext.addEventListener('click', function () {
  find = inputText.value;
  if (find == '') {
    alert('Please enter Keywords ! ');
    return;
  }
  stt++;
  curNumber.textContent = stt;
  if (stt != 1) {
    btnPrevious.style.display = 'block';
  }

  newspapper(find, pagenum, stt);
});

btnPrevious.addEventListener('click', function () {
  find = inputText.value;
  if (find == '') {
    alert('Please enter Keywords ! ');
    return;
  }
  stt--;
  curNumber.textContent = stt;
  if (stt === 1) {
    btnPrevious.style.display = 'none';
  }

  newspapper(find, pagenum, stt);
});
