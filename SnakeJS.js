//Declaring some Variables 
var HighScore = localStorage.getItem("highScore");
xVelocity=yVelocity=0;
xPlayer=yPlayer=10;
Gridsize=Tilecount=20;
xApple=yApple=Math.floor(Math.random() * Tilecount);
Path = [];
Tail = 5;
input = false;    
shakeDone = false;

window.onload = function() {
    canv = document.getElementById("screen");
    document.body.style.backgroundColor = "black";
    ctx = canv.getContext("2d");
    canv.style = "position:absolute; left: 50%; width: 400px; margin-left: -200px; top: 25%; border: 8px solid #636E6E;";
    document.getElementById("Score").innerHTML = HighScore;
    document.addEventListener("keydown", KeyPressed);
    
}    


//Main Function that repeats itself 15 times a minute (1000/15)

function Play() {
    
    //Collision detection for walls
    
    if(xPlayer < 0 || xPlayer > Tilecount-1 || yPlayer < 0 || yPlayer > Tilecount-1) {
        
        canv.style.animation="deathShake 3s ease-in 1";
        setTimeout(function(){shakeDone = true;}, 3000);
        
        if (shakeDone == true){
            alert("Game Over: You died! Tail length of: " + Path.length);
            alert(Path.length-5 + " is your score");
            document.location.reload();
            clearInterval(interval);
        }
    }   
    
    //Sets the velocity
    
    xPlayer += xVelocity;
    yPlayer += yVelocity;
    
    
    //Sets the color and fill for snake, canvas, and apple. 
    
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canv.width, canv.height);

    
    ctx.fillStyle = "red";
    ctx.fillRect(xApple*Gridsize, yApple*Gridsize, Gridsize-2, Gridsize-2)
    
    
    ctx.fillStyle = "lime"
    for (var i=0; i < Path.length; i++){
        
        //Fills the snake. Sets the x and y, and fills a smaller square within a square to give it its square space
        ctx.fillRect(Path[i].x*Gridsize, Path[i].y*Gridsize, Gridsize-2, Gridsize-2);
        
        
        //Collision detection of head and tail
        if(Path[i].x == xPlayer && Path[i].y == yPlayer && input == true){
            
            canv.style.animation="deathShake 3s ease-in 1";
            setTimeout(function(){shakeDone = true;}, 3000);
            
            if (shakeDone == true){
                alert("Game Over: You died! Tail length of: " + Path.length);
                alert(Path.length-5 + " is your score");
                document.location.reload();
                clearInterval(interval);
             }
    }
        
        //If apple spawns on its tail, it will respawn the apple elsewere. 
        if(Path[i].x == xApple && Path[i].y == yApple){
            xApple = Math.floor(Math.random() * Tilecount);
            yApple = Math.floor(Math.random() * Tilecount);
           }
        
    }
   
    
    //Moves the path
    Path.push({x:xPlayer, y:yPlayer});
    while(Path.length > Tail){
        Path.shift();
    }
    
    //Detects if head hits apple. If so, the apple will respawn
    if(xPlayer == xApple && yPlayer == yApple){
        Tail++;
        
        xApple = Math.floor(Math.random() * Tilecount);
        yApple = Math.floor(Math.random() * Tilecount);
        
    
        
        //If the apple spawns on head, it will respawn elsewere, and remove a tail as it was a mistake.
        if(xPlayer == xApple && yPlayer == yApple){
            xApple = Math.floor(Math.random() * Tilecount);
            yApple = Math.floor(Math.random() * Tilecount);
            Tail -= 1;
        }
        
    }
 
}

    
//Switch case for the key input
function KeyPressed(event){
    switch(event.keyCode){    
            
        //Left arrow key
        case 37:
            xVelocity=-1;
            yVelocity=0;
            input = true;
            break;
        
        //Right Top Key
        case 38:
            xVelocity=0;
            yVelocity=-1;
            input = true;
            break;
         
        //Right Arrow Key    
        case 39:
            xVelocity=1;
            yVelocity=0;
            input = true;
            break;
         
        //Down Arrow Key
        case 40:
            xVelocity=0;
            yVelocity=1;
            input = true;
            break;
            
    }

//sets high score if one is achieved.
if (HighScore < Path.length-5){
        localStorage.setItem("highScore", Path.length-5);
        }

  

}

//Resets the highscore
function resetHighscore(){

    localStorage.setItem("highScore", 0);
    document.location.reload();


}

var interval = setInterval(Play,1000/15);

