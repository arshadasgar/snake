$(function () {

    var debug = true;

    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext('2d');

    var cHeight = 400;
    var cWidth = 600;
    var snakeHeight = 10;
    var snakeWidth = 10;
    var disp = 10;
    var direction = 'down';
    var keyReleased = true;
    var snake = [{
            x: 10,
            y: 20,
            oldX: 0,
            oldY: 0
        },
        {
            x: 10,
            y: 10,
            oldX: 0,
            oldY: 0
        },
    ];
    var gameLoop;

    init();

    function init() {
        startGame();
    }

    function startGame() {
        // gameLoop = requestAnimationFrame(fillSnake);
        gameLoop = setInterval(fillSnake, 1000);
    }

    function stopGame() {
        // cancelAnimationFrame(gameLoop);
        clearInterval(gameLoop);
    }

    var counter = 0;

    function fillSnake() {
        counter++;
        if (counter % 2 == 0) {
            addToSnake();
        }
        console.log('Loop running')
        clearCanvas();
        ctx.fillStyle = 'red';
        $.each(snake, function (index, value) {
            // debugger
            ctx.fillRect(value.x, value.y, snakeWidth, snakeHeight);
            snake[index].oldX = value.x;
            snake[index].oldY = value.y;
            if (index == 0) {
                if (collided(value.x, value.y)) {
                    stopGame();
                }
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
        // gameLoop = requestAnimationFrame(fillSnake);
    }

    function addToSnake() {
        snake.push({
            x: snake[snake.length - 1].oldX,
            y: snake[snake.length - 1].oldY
        });
    }

    function collided(x, y) {
        return snake.filter((item, index) => {
            return index != 0 && item.x == x && item.y == y
        }).length > 0 || x < 0 || x > cWidth || y < 0 || y > cHeight;
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, cWidth, cHeight);
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