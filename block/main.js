var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;

var dx = 0;
var dy = 0;

var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var spacePressed = false;

var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;

var shootFlag = true;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1};
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//document.addEventListener("mousemove", mouseMoveHandler, false);

$("#keyLeft").on("click",function(){
  leftPressed=true;
  rightPressed=false;

  window.setTimeout(function(){leftPressed=false},100);
});

$("#keyRight").on("click",function(){
  rightPressed=true;
  leftPressed=false;

window.setTimeout(function(){rightPressed=false},100);
});

$("#BtnA").on("click",function(){
  spacePressed=true;
});


function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  } else if(e.keyCode == 37) {
    leftPressed = true;
  } else if(e.keyCode == 32) {
    spacePressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  } else if(e.keyCode == 37) {
    leftPressed = false;
  } else if(e.keyCode == 32) {
    spacePressed = false;
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}

var count = 0;

function acceleration() {
  if(dx > 0) {
    dx += 1;
  } else {
    dx -= 1;
  }
  if(dy > 0) {
    dy += 1;
  } else {
    dy -= 1;
  }
}

function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          count++;
          if(count % 2 == 0) {
              acceleration();
          }

          if(score == brickRowCount * brickColumnCount) {
            $("#gamen").css("display","none");
            $("#gamen-win").css("display","block");
  //          alert("You Win!!");
            window.setTimeout(function(){document.location.reload()},2000);
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "black";//"#ff2222";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "black";//"#c945ff";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding)) + brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "black";//"#d69a00";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";//"#00cf21";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";//"#fb34ff";
  ctx.fillText("Lives: " + lives, canvas.width-65, 20)
}

function decide_direction() {
  dx = -Math.floor((paddleX - x + 38) / 4);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if(shootFlag && spacePressed) {
    shootFlag = false;
    dx = 2;
    dy = -2;
  }

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  } else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      decide_direction();
      dy = -dy;
    } else {
      lives--;
      if(!lives) {
        $("#gamen").css("display","none");
        $("#gamen-lose").css("display","block");
        window.setTimeout(function(){document.location.reload()},2000);
      } else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 0;
        dy = 0;
        paddleX = (canvas.width-paddleWidth)/2;
        shootFlag = true;
      }
    }
  }
  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  } else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();
