'use strict';

const inf = document.getElementById('news-container');
const pre = document.getElementById('btn-prev');
const next = document.getElementById('btn-next');
const num = document.getElementById('page-num');

const set = JSON.parse(getFromStorage('setting')); // lấy dự liệu setting từ local
let pagenum = Number(set.numpage);

const newspapper = async function (country, category, pageSize, page) {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=9da319ad06494c11a0e283bfefdfaf77`
    );

    const data = await response.json();
    //saveToStorage('save', JSON.stringify(data)); // lưu lại vô local để sài hoài mà ko bị hạn chế
    console.log(data);

    //////////// phải đặt điều kiện này ở đây vì lệnh try được thực hiện khi ko có lỗi và lệnh catch thực hiện khi xảy ra lỗi và bỏ qua lệnh try, ngay tại đây chưa có lỗi
    if (pageSize * page < data.totalResults) {
      next.style.display = 'block';
      console.log('chưa xóa');
    } else {
      next.style.display = 'none';
      console.log('đã xóa');
    }
    console.log(pageSize * page, data.totalResults);

    ////////////////// từ đây trở đi sẽ có lỗi xảy ra nếu dữ liệu lấy về là undefined và gán vào html, nên web sẽ đọc code đến đây sau đó bỏ nhảy sang catch
    inf.innerHTML = '';

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
        // chỉ cho hiển thị 10 bài trong 1 lần
        const row = render(
          test.articles[i].urlToImage,
          test.articles[i].title,
          test.articles[i].description,
          test.articles[i].url
        );
        const hang = document.createElement('div');
        hang.innerHTML = row;

        inf.appendChild(hang);
      }
    };
    print(data);

    // if (pageSize * page < data.totalResults) {
    //   next.style.display = 'block';
    //   console.log('chưa xóa');
    // } else {
    //   next.style.display = 'none';
    //   console.log('đã xóa');
    // }
    // console.log(pageSize * page, data.totalResults);
  } catch (err) {
    console.log(err.message);
  }
};

///////// hàm dùng khi đã lưu sẵn 1 API vào trong local để sài hoài
// const tam = JSON.parse(getFromStorage('save'));

// function renderData(data, pageSize, page) {
//   inf.innerHTML = '';

//   const render = function (img, title, des, link) {
//     const html = `<div id="khung">
//                 <div class="row">
//                   <div class="col-sm-3">
//                     <img src=${img} width="100%" height="auto">
//                   </div>
//                   <div class="col-sm-9">
//                <h5>${title}</h5>
//                <p>${des}</p>
//                <button class='btn btn-primary'>
//                <a href=${link} target="_blank" style="color : white">View</a>
//                </button>
//                   </div>
//                   </div>
//                 </div>`;

//     return html;
//   };

//   const print = function (test) {
//     for (let i = 0; i < pageSize; i++) {
//       // chỉ cho hiển thị 10 bài trong 1 lần
//       const row = render(
//         test.articles[i].urlToImage,
//         test.articles[i].title,
//         test.articles[i].description,
//         test.articles[i].url
//       );
//       const hang = document.createElement('div');
//       hang.innerHTML = row;

//       inf.appendChild(hang);
//     }
//   };
//   print(data);
//   if (pageSize * page < data.totalResults) {
//     next.style.display = 'block';
//   } else {
//     next.style.display = 'none';
//   }
//   console.log(pageSize * page, data.totalResults);
// }

//newspapper('us', 'entertainment', 20, 2);

// thông số 1 và 2 là phải lấy từ các từ khóa người ta đã cho sẵn, ko được lấy tùy ý bên ngoài
// thông số 3 là 'The number of results to return per page (request). 20 is the default, 100 is the maximum.'

////////////
//const test = JSON.parse(getFromStorage('save'));
//console.log(test);

// const anh = document.images.namedItem('anh');
// const tieude = document.getElementById('tieude');

// tieude.textContent = test.articles[0].description;
let stt = Number(num.textContent);
if (stt === 1) {
  pre.style.display = 'none';
  newspapper('us', set.cate, pagenum, 1);
  // renderData(tam, 10, 1);
}

next.addEventListener('click', function () {
  stt++;
  num.textContent = stt;
  if (stt != 1) {
    pre.style.display = 'block';
  }

  newspapper('us', set.cate, pagenum, stt);
  // renderData(tam, 10, stt);
});

pre.addEventListener('click', function () {
  if (stt < 1) return;
  stt--;
  num.textContent = stt;
  if (stt === 1) {
    pre.style.display = 'none';
  }

  newspapper('us', set.cate, pagenum, stt);
  // renderData(tam, 10, stt);
});
