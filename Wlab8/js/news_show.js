window.isOnline = () => this.navigator.onLine;

if(isOnline()) {
  loadNews();
    showNews();
}


function loadNews() {
  if (localStorage.getItem('news_storage')) news_storage = JSON.parse(localStorage.getItem('news_storage'));
  showNews();
}

function showNews() {
  let newsField = document.getElementById('aa');
  let out = '';
  news_storage.forEach(function(item){
      out += `<div class="container">
      <div class="row news">
          <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="news-block">
                  <img src="${item.image}" alt="news image" class="news-img">
                  <div class="news-content">
                      <h3>${item.title}</h3>
                      <p>${item.content}</p>
                  </div>
              </div>
          </div>
      </div>`;
  });
  newsField.innerHTML = out;
}


window.addEventListener('online', onOnline);
window.addEventListener('offline', onOffline);