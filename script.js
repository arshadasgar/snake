$(function () {

    var debug = true;

    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext('2d');

    var cHeight = 500;
    var cWidth = 500;
    var snakeHeight = 10;
    var snakeWidth = 10;
    var disp = 10;
    var direction = 'down';
    var keyReleased = true;
    var snake = [
        { x: 10, y: 10, oldX: 10, oldY: 10 },
        { x: 10, y: 20, oldX: 10, oldY: 20 },
    ];
    var gameLoop;

    init();

    function init() {
        startGame();
    }

    function startGame() {
        gameLoop = setInterval(function () {
            if (debug) {
                console.log('Loop running');
            }
            fillSnake();
        }, 500);
    }

    function stopGame() {
        clearInterval(gameLoop);
    }

    function fillSnake() {
        clearCanvas();
        ctx.fillStyle = 'red';
        $.each(snake, function (index, value) {
            // debugger
            ctx.fillRect(value.x, value.y, snakeWidth, snakeHeight);
            snake[index].oldX = value.x;
            snake[index].oldY = value.y;
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
        });
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