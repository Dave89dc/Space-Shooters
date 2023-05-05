class Projectile extends GameObject{

    constructor(x, y, width, height, color = 'blue'){
        super(x, y, width, height, color);
        this.speed = 20;
    };

    move(){
        this.y -= this.speed;
    };

    collision(){
        this.isAlive = false;
    };

};