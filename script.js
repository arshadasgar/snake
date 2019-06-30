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
    var keyPressed = 40;
    var snake = [{
            x: 10,
            y: 40,
            oldX: 0,
            oldY: 0
        }, {
            x: 10,
            y: 30,
            oldX: 0,
            oldY: 0
        }, {
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
    var food = {};
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

    var counter = 0;

    function fillSnake() {
        fillFood();
        counter++;
        if (counter % 2 == 0) {
            // addToSnake();
        }
        console.log('Loop running')
        clearCanvas();
        ctx.fillStyle = 'yellow';
        $.each(snake, function (index, value) {
            // debugger
            ctx.fillRect(value.x, value.y, snakeWidth, snakeHeight);
            snake[index].oldX = value.x;
            snake[index].oldY = value.y;
            if (index == 0) {
                if (collided(value.x, value.y)) {
                    stopGame();
                }
                changeDirection(keyPressed);
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

    function fillFood() {
        ctx.fillStyle = 'red';
        xy = getPositionForFood();
        x = xy.x;
        y = xy.y;
        debugger
        ctx.fillRect(x, y, snakeWidth, snakeHeight);
    }

    function getPositionForFood() {
        let xArray = yArray = [];
        let xy = {};
        $.each(snake, function (index, value) {
            if ($.inArray(value.x, xArray) == -1) {
                xArray.push(value.x);
            }
            if ($.inArray(value.y, yArray) == -1) {
                yArray.push(value.y);
            }
        });
        xy = getEmptyPosition(xArray, yArray);
        return xy;
    }

    function getEmptyPosition(xArray, yArray) {
        let newXY = {};
        newX = getRandomNumber(cWidth, 10);
        newY = getRandomNumber(cHeight, 10);
        if ($.inArray(newX, xArray) == -1 && $.inArray(newY, yArray) == -1) {
            newXY.x = newX;
            newXY.y = newY;
            return newXY;
        } else {
            return getEmptyPosition(xArray, yArray);
        }
    }

    function getRandomNumber(max, multipleOf) {
        let result = Math.floor(Math.random() * max);
        result = (result % 10 == 0) ? result : result + (multipleOf - result % 10);
        return result;
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, cWidth, cHeight);
    }

    $(document).keydown(function (e) {
        keyReleased = false;
        keyPressed = e.which;
        changeDirection(keyPressed);
        keyReleased = true;
    });

    function changeDirection(keyPressed) {
        if (keyPressed == 40) {
            if (direction != 'up') {
                direction = 'down';
                snake[0].x = snake[0].oldX;
                snake[0].y = snake[0].oldY + disp;
            }
        } else if (keyPressed == 38) {
            if (direction != 'down') {
                direction = 'up';
                snake[0].x = snake[0].oldX;
                snake[0].y = snake[0].oldY - disp;
            }
        } else if (keyPressed == 37) {
            if (direction != 'right') {
                direction = 'left';
                snake[0].x = snake[0].oldX - disp;
                snake[0].y = snake[0].oldY;
            }
        } else if (keyPressed == 39) {
            if (direction != 'left') {
                direction = 'right';
                snake[0].x = snake[0].oldX + disp;
                snake[0].y = snake[0].oldY;
            }
        }
    }

    $(document).click(function () {
        stopGame();
    });

});