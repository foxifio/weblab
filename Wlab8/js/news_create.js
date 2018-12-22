window.isOnline = () => this.navigator.onLine;

let news_storage = [];

document.getElementById('submit-btn').onclick = function() {  
  
    let title = document.getElementById('news_title');
    let content = document.getElementById('news_content');
    let image = document.getElementById('news_image');

    let news = {
        title : title.value,
        content : content.value,
        image : image.value,
        time : Math.floor(Date.now() / 1000)
    }

    function valid() {
      if (title.value === '') {
          alert('Введіть заголовок')
      }
      else if (content.value === '') {
          alert('Введіть текст')
      }
      else if (image.files.length === 0) {
          alert('Виберіть зображення')
      }
      else if (!isOnline()) {
        news_storage.push(news);
        localStorage.setItem('news_storage', JSON.stringify(news_storage))
      } else {
        console.log('Try to connect')
      }
      
  }
    valid();
    saveNews();
}

const onOnline = () => {
  alert('Server working');

}

const onOffline = () => {
  alert('Server not working');
  
}

function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function(e) {
        $('#image_container').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  };
  
  
  $("#news_image").change(function() {
    readURL(this);
  });
  


function saveNews() {
    localStorage.setItem('news_storage', JSON.stringify(news_storage));
}


window.addEventListener('online', onOnline);
window.addEventListener('offline', onOffline);