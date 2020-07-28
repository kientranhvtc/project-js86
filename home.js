var mainForm = document.getElementById('main-form');
mainForm.addEventListener('submit', function(e){
    e.preventDefault();
    var name = mainForm.username.value;
    localStorage.setItem('name',name);
    window.location.href = "ran.html";
})