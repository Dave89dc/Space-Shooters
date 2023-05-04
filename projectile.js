class Projectile extends GameObject{

    constructor(x, y, width, height){
        super(x, y, width, height);
        this.speed = 20;
    };

    move(){
        this.y -= this.speed;
    };

};