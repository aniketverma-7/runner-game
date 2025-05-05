class Coin{
  constructor(x_){
    this.x = x_;
    this.h = 25;
    this.y = height - height/3;
    this.w = 25;
  }

  show(){
    image(coin_img,this.x,this.y,this.w,this.h);
  }

  move(){
    this.x-=speed;
    if(this.x<=-this.w)
      this.x = width+this.w+random(-20,20);
  }

}
