const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let animate;

let newPlayer = new Player(canvasWidth/2 -25, canvasHeight/2 -25, 60, 60, null, './Assets/original.png');

let enemySpawnCoolDown = 120;
let allEnemies = [];

function animator(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    animate = requestAnimationFrame(animator);
    
    if(newPlayer){
        newPlayer.draw(ctx);
        newPlayer.controls(canvasWidth, canvasHeight);
    };

    enemySpawnCoolDown--;
    if(enemySpawnCoolDown <= 0){
        enemySpawn();
        enemySpawnCoolDown = 80;
    };

    allEnemies.forEach(enemy => {
        enemy.draw(ctx);
        enemy.move();
    });

    if(newPlayer){
        checkCollision();
    };
    
};

function enemySpawn(){
    const randomX = Math.random()*(canvasWidth-50);
    let enemy = new BaseEnemy(randomX, -60, 50, 50, null, './Assets/ufo.avif');
    allEnemies.push(enemy);
};

function checkCollision(){
    console.log('check')
    let playerAssets = [newPlayer, ...newPlayer.projectiles];
    for (let i = 0; i < playerAssets.length; i++) {
        const pA = playerAssets[i];
        for (let j = 0; j < allEnemies.length; j++) {
            const enemy = allEnemies[j];
            if(pA.isColliding(enemy)){
                pA.collision();
                enemy.collision();
            };
        };
    };
    allEnemies = allEnemies.filter(enemy => enemy.isAlive);
    newPlayer.projectiles = newPlayer.projectiles.filter(projectiles => projectiles.isAlive);
    if(!newPlayer.isAlive){
        newPlayer = null;
    };
};

animator();