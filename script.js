$(function () {

    var debug = true;

    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext('2d');

    var cHeight = 400;
    var cWidth = 400;
    var snakeHeight = 10;
    var snakeWidth = 10;
    var disp = 10;
    var direction = 'down';
    var keyReleased = true;
    var snake = [
        { x: 10, y: 20, oldX: 0, oldY: 0 },
        { x: 10, y: 10, oldX: 0, oldY: 0 },
    ];
    var gameLoop;

    init();

    function init() {
        startGame();
    }

    function startGame() {
        // gameLoop = requestAnimationFrame(fillSnake);
        gameLoop = setInterval(fillSnake, 400);
    }

    function stopGame() {
        // cancelAnimationFrame(gameLoop);
        clearInterval(gameLoop);
    }

    function fillSnake() {
        console.log('Loop running')
        clearCanvas();
        ctx.fillStyle = 'red';
        $.each(snake, function (index, objValue) {
            debugger
            let value = Object.assign({}, objValue);
            ctx.fillRect(value.x, value.y, snakeWidth, snakeHeight);
            if (index == 0) {
                if (direction == 'down') {
                    snake[index].x = value.x;
                    snake[index].y = value.y + disp;
                } else if (direction == 'up') {
                    snake[index].x = value.x;
                    snake[index].y = value.y - disp;
                } else if (direction == 'right') {
                    snake[index].x = value.x + disp;
                    snake[index].y = value.y;
                } else if (direction == 'left') {
                    snake[index].x = value.x - disp;
                    snake[index].y = value.y;
                }
            } else {
                snake[index].x = snake[index - 1].oldX;
                snake[index].y = snake[index - 1].oldY;
            }
            snake[index].oldX = value.x;
            snake[index].oldY = value.y;
        });
        // gameLoop = requestAnimationFrame(fillSnake);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, cHeight, cWidth);
    }

    $(document).keydown(function (e) {
        keyReleased = false;
        let keyPressed = e.which;
        if (keyPressed == 40) {
            if (direction != 'up') {
                direction = 'down';
            }
        } else if (keyPressed == 38) {
            if (direction != 'down') {
                direction = 'up';
            }
        } else if (keyPressed == 37) {
            if (direction != 'right') {
                direction = 'left';
            }
        } else if (keyPressed == 39) {
            if (direction != 'left') {
                direction = 'right';
            }
        }
        keyReleased = true;
    });

    $(document).click(function () {
        stopGame();
    });

});