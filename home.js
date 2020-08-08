// Player name
var mainForm = document.getElementById('main-form');
mainForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = mainForm.username.value;
    localStorage.setItem('name', name);
    window.location.href = "ran.html";
})

// Setting Game
function show_selected() {
    // Game dificulty
    var selector = document.getElementById('game-difficulty');
    var value = selector[selector.selectedIndex].value;
    document.getElementById('display').innerHTML = value;
    localStorage.setItem('value', value);

    // Map
    var selector1 = document.getElementById('map');
    var value1 = selector1[selector.selectedIndex].value;
    document.getElementById('display1').innerHTML = value1;
    localStorage.setItem('value1', value1);
}
var el = document.getElementById('btn')
if (el) {
    el.addEventListener('click', show_selected);
}


// Highest Socre
var diemcao = document.getElementById('diemcao');
diemcao.innerHTML = localStorage.getItem('max-score');

// zoom trang
function zoom() {
    document.body.style.zoom = "58%"
}

//video playback speed
var vid = document.getElementById("myVideo");
vid.playbackRate = 0.2;

// // audio
// var audio = document.getElementById("myAudio");
// var btn = document.getElementById("btn-audio");

// function audio() {
//   if (audio.paused) {
//     audio.play();
//     btn.innerHTML = "Pause";
//   } else {
//     audio.pause();
//     btn.innerHTML = "Play";
//   }
// }
