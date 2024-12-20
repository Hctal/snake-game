const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let gameInterval;

function startGame() {
    document.getElementById('score').innerText = score;
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    generateFood();
    
    if (gameInterval) clearInterval(gameInterval);
    
    gameInterval = setInterval(updateGame, 100);
}

function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;

    // Ensure food does not spawn on the snake
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            break;
        }
    }
}

function updateGame() {
    // Move the snake
    const head = { x: snake[0].x + direction.x * 10, y: snake[0].y + direction.y * 10 };
    
    // Check for collisions with walls or self
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collision(head)) {
        clearInterval(gameInterval);
        alert(`Game Over bro 😈 ! \nYour score was ${score}`);
        return;
    }

    snake.unshift(head);

    // Check if snake has eaten the food
    if (head.x === food.x && head.y === food.y) {
        score += 1;
        document.getElementById('score').innerText = score;
        generateFood();
    } else {
        snake.pop();
    }

    draw();
}

function collision(head) {
    for (let segment of snake.slice(1)) {
        if (segment.x === head.x && segment.y === head.y) return true;
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);

    // Draw snake
    ctx.fillStyle = 'green';
    
    for (let segment of snake) {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    }
}

// Control the snake with arrow keys
document.addEventListener('keydown', event => {
   // Prevent default scrolling behavior
   event.preventDefault();
   
   switch(event.key) {
       case 'ArrowUp':
           if (direction.y === 0) direction = { x: 0, y: -1 };
           break;
       case 'ArrowDown':
           if (direction.y === 0) direction = { x: 0, y: 1 };
           break;
       case 'ArrowLeft':
           if (direction.x === 0) direction = { x: -1, y: 0 };
           break;
       case 'ArrowRight':
           if (direction.x === 0) direction = { x: 1, y: 0 };
           break;
   }
});

// Start button functionality
document.getElementById('startBtn').addEventListener('click', startGame);