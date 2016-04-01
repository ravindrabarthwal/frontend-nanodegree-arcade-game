//Defining global variables
var blockHeight = 70;
var blockWidth = 90;


// Enemies our player must avoid
var Enemy = function() {
   // Giving enemy a sprite/image
    this.sprite = 'images/enemy-bug.png';
    //start the bug reset function
    this.reset();

};


// Enemy reset function with initilize position and speed
Enemy.prototype.reset = function() {
    this.x = -100;
    this.y = 63 + Math.floor(Math.random()*3)*81;
    this.speed = 100 +  10 * (Math.random() * 10) ;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //reset enemy if the enemy/bugs move out of the canvas width
    if(this.x > 606) {
        this.reset();
    }
    else {
        //otherwise change the position of bug
        this.x += this.speed * dt;
        //check for the collision of enemy with player
        this.checkCollision();
    }
};


//function that check collision enemy with player and
// if collide then reset player
Enemy.prototype.checkCollision = function() {
    if(this.isCollide(player)){
        player.reset();
    }
};


//A simple function that check collision b/w enemy and player
// return boolean and accept player as param
Enemy.prototype.isCollide = function(player){
    var a = false
    if( (this.x + blockWidth > player.x && this.x < player.x + blockWidth) &&
        (this.y + blockHeight > player.y && this.y < player.y + blockHeight)) {
        return true;
    }
    return a;
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player function use to create player
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.reset();
};

//player reset function
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 401;
};


//this player update function is not required currently
Player.prototype.update = function() {
};


//render player to the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handle the input keys and act accordingly
//i.e move left, right, up or down.
Player.prototype.handleInput = function(key) {
    switch(key){
        case 'up':
            this.y >= 131 ? this.y -= 82 : this.y = 401;
            break;
        case 'down':
            if(this.y < 401) this.y += 82;
            break;
        case 'right':
            if(this.x < 404) this.x += 101;
            break;
        case 'left':
            if(this.x > 0) this.x -= 101;
            break;
    }
};

// Now instantiate your objects.
var

// Place all enemy objects in an array called allEnemies
allEnemies = [new Enemy(), new Enemy(), new Enemy()] ,

// Place the player object in a variable called player
player = new Player;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
