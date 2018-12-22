window.isOnline = () => this.navigator.onLine;

let message_container = [];

if (isOnline()) {
     renderComments();
    showComments();
}

document.getElementById('add_message').onclick = function(){
    let message_nickname = document.getElementById('message_nickname');
    let message_content = document.getElementById('message_content');
    
    let message = {
        nickname : message_nickname.value,
        content : message_content.value,
        time : Math.floor(Date.now() / 1000)
    }
    
    function valid() {
        if (message_nickname.value === '') {
            alert('Введіть нік')
        }
        else if (message_content.value === '') {
            alert('Введіть текст')
        }
        else if (!isOnline()) {
            message_container.push(message)
            localStorage.setItem('message_container', JSON.stringify(message_container));

        } else (
            console.log('Try to connect')
        )
    }
    
    valid();
    showComments();
}

function saveComments(){
    localStorage.setItem('message_container', JSON.stringify(message_container));
}

function renderComments(){
    if (localStorage.getItem('message_container')) message_container = JSON.parse(localStorage.getItem('message_container'));
    showComments();
}

const onOnline = () => {
    alert('Server working');
   
}

const onOffline = () => {
    alert('Server not working')
}

function showComments (){ 
    let commentField = document.getElementById('ss');
    let out = '';
    message_container.forEach(function(item){
        out += `<div class="request">
            <p>${item.content}</p>
            <div class="req-footer">
            <div class="date"><p>${timeConverter(item.time)}</p></div>
            <div class="nickname"><p>${item.nickname}</p></div>
            </div>
        </div>`;
    });
    commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);