//Ở đây ta tạo ra bộ khung chứa game
var ten = document.getElementById('ten');
ten.innerHTML = localStorage.getItem('name');
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
if (localStorage.getItem('max-score') == null){
    localStorage.setItem('max-score',0);
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
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


// game loop
function loop() {
    //hàm này giống như setTimeout, sẽ gọi lại hàm loop khi loop thực thi xong

    requestAnimationFrame(loop);


    // slow game loop to 15 fps instead of 60 - 60/15 = 4

    if (++count < 10) {

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


    // draw apple

    context.fillStyle = 'red';

    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);


    // draw snake

    context.fillStyle = 'green';

    snake.cells.forEach(function (cell, index) {

        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);


        // snake ate apple

        if (cell.x === apple.x && cell.y === apple.y) {

            snake.maxCells++;


            apple.x = getRandomInt(0, 25) * grid;

            apple.y = getRandomInt(0, 25) * grid;

            score++;

            document.getElementById('score').innerHTML = score;
        }


        // check va chạm khi rắn đụng đuôi

        for (var i = index + 1; i < snake.cells.length; i++) {



            // va chạm thì reset game

            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {

                if(score > localStorage.getItem('max-score')){
                    localStorage.setItem('max-score',score);
                }

                // snake.x = 0;

                // snake.y = 0;

                // snake.cells = [];

                // snake.maxCells = 4;

                // snake.dx = grid;

                // snake.dy = 0;


                // apple.x = getRandomInt(0, 25) * grid;

                // apple.y = getRandomInt(0, 25) * grid;

                window.location.href = "ran.html";
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

});


requestAnimationFrame(loop);