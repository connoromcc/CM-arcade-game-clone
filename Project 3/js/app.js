var Enemy = function() {
    this.sprite = 'images/enemy-bug.png'
    this.speed = Math.floor(Math.random()*300) + 100;
    this.x = 0;

    if (this.x == 0) {
        this.y = Math.floor(Math.random()*2.9)*83 + 41.5;
    };

}

Enemy.prototype.update = function(dt) {

    this.x += this.speed*dt;

    if (this.x > 505) {
        this.x = 0;
        
        this.y = Math.floor(Math.random()*3)*83 + 41.5;
        this.speed = Math.floor(Math.random()*400) + 100;
    };

    var closeness = Math.abs(player.x - this.x);
    if (closeness < 50.5  && this.y == player.y) {
        player.x = 202;
        player.y = 373.5;
        player.score -=1;
        console.log("YOU LOSE! SCORE: " + player.score);
    };
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Player = function() {
    this.sprite = 'images/char-boy.png'
    this.x = 202;
    this.y = 373.5;
    this.score = 0;
}

Player.prototype.update = function(dt) {

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyPress) {
    switch(keyPress) {

        case "left": if (this.x > 0) {
            this.x -= 101;
        }
        break;

        case "right": if (this.x < 404) {
            this.x += 101;
        }
        break;

        case "up":
            if (this.y > 124) {
                this.y -= 83;
            }

            else if (this.y < 42) {
                this.score +=1;
                console.log("YOU WIN! SCORE: " + this.score);
                this.x = 202;
                this.y = 373.5;
            }
        break;

        case "down": if (this.y < 373) {
            this.y += 83;
        }
        break;
    }
}

allEnemies = [];

var setDifficulty = function(num) {
    levelDifficulty = num;
    for (i=0; i<levelDifficulty; i++) {
        allEnemies.push(new Enemy);
    };
}(3);

player = new Player;

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});