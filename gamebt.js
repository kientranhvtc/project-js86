//Ở đây ta tạo ra bộ khung chứa game
var ten = document.getElementById('ten');
ten.innerHTML = localStorage.getItem('name');
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
if (localStorage.getItem('max-score') == null) {
    localStorage.setItem('max-score', 0);
}
document.getElementById('max-score').innerHTML = localStorage.getItem('max-score');
var score = Number(document.getElementById('score').innerHTML);
document.getElementById('score').style.color = "white";
var grid = 16;
// khởi tạo đối tượng rắn là 1 ô vuông
var snake = {
    x: 0, //vị trí của snake theo hướng x,y
    y: 0,
    dx: grid, //hướng di chuyển theo phương x hoặc y,ở đây khi start game 
    //snake sẽ di chuyển theo x direction với value = 16
    dy: 0,
    cells: [],
    maxCells: 4
};
var count = 0;
var apple = {
    x: 320,
    y: 320
};
var wall = {
    dx: canvas.width - 320,
    dy: canvas.height - 320
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
var isPaused = true;

// game loop
function loop() {
    //hàm này giống như setTimeout, sẽ gọi lại hàm loop khi loop thực thi xong
    if (isPaused) {
        requestAnimationFrame(loop);
    }

    var bgAudio = document.getElementById('myAudio');
    bgAudio.play();

    // slow game loop to 15 fps instead of 60 - 60/15 = 4
    var tocdo = localStorage.getItem('value');


    if (++count < tocdo) {

        return;

    }


    count = 0;

    context.clearRect(0, 0, canvas.width, canvas.height);


    snake.x += snake.dx; // mỗi loop rắn sẽ di chuyển thêm 1dx đơn vị

    snake.y += snake.dy;


    // khi snake đụng tường sẽ chạy lại từ edge đối diện

    if (snake.x < 0) {

        snake.x = canvas.width - grid;


    }

    else if (snake.x >= canvas.width) {

        snake.x = 0;

    }


    if (snake.y < 0) {

        snake.y = canvas.height - grid;

    }

    else if (snake.y >= canvas.height) {

        snake.y = 0;

    }


    // Phương thức unshift sẽ thêm một hoặc nhiều phần tử vào đầu mảng

    snake.cells.unshift({ x: snake.x, y: snake.y });


    // thêm 1 ô vuông phía trc thì phải remove 1 cái phía sau để snake move dc.

    if (snake.cells.length > snake.maxCells) {

        snake.cells.pop();

    }

    //fill wall
    context.fillStyle = 'yellow';
    context.fillRect(wall.dx, wall.dy, canvas.width, grid - 1)

    // draw apple

    context.fillStyle = 'red';

    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);


    // draw snake

    context.fillStyle = 'green';

    snake.cells.forEach(function (cell, index) {

        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        if (cell.x >= wall.dx && cell.y === wall.dy) {

            if (score > localStorage.getItem('max-score')) {
                localStorage.setItem('max-score', score);
            }

            window.location.href = "ranbt.html";

        }

        // snake ate apple

        if (cell.x === apple.x && cell.y === apple.y) {

            var eatBgm = document.getElementById('eat-bgm');
            eatBgm.play();

            snake.maxCells++;


            apple.x = getRandomInt(0, 25) * grid;

            apple.y = getRandomInt(0, 25) * grid;

            while (apple.x >= wall.dx && apple.y === wall.dy) {
                apple.x = getRandomInt(0, 25) * grid;

                apple.y = getRandomInt(0, 25) * grid;
            };
            score++;

            document.getElementById('score').innerHTML = score;
        }


        // check va chạm khi rắn đụng đuôi

        for (var i = index + 1; i < snake.cells.length; i++) {



            // va chạm thì reset game

            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {

                if (score > localStorage.getItem('max-score')) {
                    localStorage.setItem('max-score', score);
                }

                // snake.x = 0;

                // snake.y = 0;

                // snake.cells = [];

                // snake.maxCells = 4;

                // snake.dx = grid;

                // snake.dy = 0;


                // apple.x = getRandomInt(0, 25) * grid;

                // apple.y = getRandomInt(0, 25) * grid;

                window.location.href = "ranbt.html";
            }

        }

    });

}

//bắt sự kiện bàn phím ấn xuống

document.addEventListener('keydown', function (e) {

    // lọc sự kiện keydown để rắn không di ngược lại

    if (e.which === 37 && snake.dx === 0) {

        snake.dx = -grid;

        snake.dy = 0;

    }

    else if (e.which === 38 && snake.dy === 0) {

        snake.dy = -grid;

        snake.dx = 0;

    }

    else if (e.which === 39 && snake.dx === 0) {

        snake.dx = grid;

        snake.dy = 0;

    }

    else if (e.which === 40 && snake.dy === 0) {

        snake.dy = grid;

        snake.dx = 0;

    }
    else if (e.which === 32) {
        if (isPaused == true) {
            isPaused = false;
            context.fillStyle = "White";
            context.textAlign = "center";
            context.textBaseLine = "middle";
            context.font = "20px PressStart2P";
            context.fillText("Game Paused", 200, 200);
        }
        else {
            isPaused = true;
            requestAnimationFrame(loop);
        }
    }

});


requestAnimationFrame(loop);

// sound button
var sound = document.getElementById("mySound");
function bell() {
    sound.play();
}

