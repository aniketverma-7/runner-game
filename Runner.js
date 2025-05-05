class Runner{
  
  constructor(){
    this.x = 100;
    this.h = 150;
    this.level = height-level-this.h+30;
    this.y = this.level;
    this.w = 90;
    this.f = 0;
    this.lastHit = 0;
    this.health = 5;
    this.score = 0;
    this.gravity = 0.7;
    this.y_vel = 0;
  }
  
  show(){
    image(r_img,this.x,this.y,this.w,this.h,this.f-5,0,47,90);
    if(this.y==this.level){
      if(frameCount%10==0)
        this.f += 48;
      if(this.f>=48*6)
          this.f=0;
    }else{
      this.f=0;
    }
  }
  
  move(){
    this.y_vel += this.gravity;
    this.y += this.y_vel;
    if(this.y>=this.level){
      this.y=this.level;
      this.y_vel=0;
    }
  }
  
  jump(){
    if(this.y==this.level)
    this.y_vel = -15;
  }
  
  hit(stone){
    if(dist(this.x+this.w/2,this.y+this.h,stone.x+stone.w/2,stone.y+stone.h/2)<stone.w){
      if(this.y>=this.level&&frameCount-this.lastHit>50){
        this.health--;
        this.lastHit = frameCount;
      }
    }
  }
  
  hitcoin(coin){
    if(dist(this.x+this.w/2,this.y+this.h/2,coin.x,coin.y)<this.w){
        coin.x = width+20;
        this.score++;
    }
  }
  
}