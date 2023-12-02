
const canva = document.querySelector(".mycanvas");
const user = canva.getContext("2d");

// Take a look at the returned object on your console 
console.log(user);

// To be able to control the movement of our snake in a controlled way, we are going to create a grid like system on our canvas. The snake then will follow the square grid on our canvas 

// Lets divide our canvas into 30 by 30 small squares  
const scale = 20;
const rows = canva.height / scale;
const columns = canva.width / scale;

// Now we need an array to save the bodies of our snake 
let score = 0; 
let snake = [];

// Just to give us a start we can initiate the initial head of the snake at (0,0) coordinate 

// Notice that the first element of our snake contains an object identifying the x and y coordinate of the initial piece of the snake 
snake[0]= {
  x : (Math.floor(Math.random() *
  columns)) * scale,
  y : (Math.floor(Math.random() *
  rows)) * scale
};
console.log(snake);

let food = {
  x : (Math.floor(Math.random() *
  columns)) * scale, 
  y : (Math.floor(Math.random() *
  rows)) * scale
}

// call our draw function every 100 ms
let playGame = setInterval(draw,100);

//control the snake direction
// Let's initially make the snake move right  
let direction = "right";

// Use the keyboard keys to control the direction of the snake 
document.onkeydown = direction1;

function direction1(event){
  let key = event.keyCode;
  if( key == 37 && direction != "right"){
    direction = "left";
  }else if(key == 38 && direction!= "down"){
    direction = "up";
  }else if(key == 39 && direction != "left"){
    direction = "right";
  }else if(key == 40 && direction != "up"){
    direction = "down";
  }
}
// Function to draw our snake and the food 
function draw() {
  user.clearRect(0, 0, canva.width, canva.height);
	// Draw snake 
	for (let i=0; i<snake.length; i++) {
    user.fillStyle = "#fff";
		user.strokeStyle = "red";
	  user.fillRect(snake[i].x,
	    snake[i].y, scale, scale);
      user.strokeRect(snake[i].x,snake[i].y,scale,scale);  
    }
    console.log(snake);
    // Draw food 
    user.fillStyle = "green";
    user.strokeStyle = "yellow";
    user.fillRect(food.x, food.y, scale, scale);
    user.strokeRect(food.x, food.y,scale,scale);
    // old head position
    let newX = snake[0].x;
    let newY = snake[0].y;
    console.log(newX);
    // which direction
    if( direction == "left") newX -= scale;
    if( direction == "up") newY -= scale;
    if( direction == "right") newX += scale;
    if( direction == "down") newY += scale;
    
    if (newX > canva.width) {
      newX= 0;
    }
    if (newY > canva.height) {
      newY = 0;
    }
    if (newX < 0) {
      newX = canva.width;
    }
    if (newY < 0) {
      newY = canva.height;
    }
    // if the snake eats the food, it grows 
    if(newX == food.x && newY == food.y){
      score++;
      food = {
        x : (Math.floor(Math.random() * columns)) * scale,
        y : (Math.floor(Math.random() * rows)) * scale
      }
      // we don't remove the tail
    }else{
      // remove the tail
      snake.pop();
    }
    console.log(snake);
    // New head position 
    let newHead = {
      x : newX,
      y : newY
    }
    console.log(snake);
    
    if(eatSelf(newHead,snake)){
      
      user.fillStyle = "red";
      user.font = "20px Arial";
       
      user.fillText("gameover"+"score:"+score,200,200);
      
      clearInterval(playGame);
    }
    snake.unshift(newHead);
  }
  
  // check if snake is eating itself 
  function eatSelf(head,array){
    for(let i = 0; i < array.length; i++){
      if(head.x == array[i].x && head.y == array[i].y){
        return true;
      }
    }
    return false;
  }
  
  