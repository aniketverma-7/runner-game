 class Stone{
  constructor(x_){
    this.x = x_;
    this.h = 60;
    this.y = height-level-this.h+24;
    this.w = 70;
  }
  
  show(){
    image(s_img,this.x,this.y,this.w,this.h);
  }

  move(){
    this.x-=speed;
    if(this.x<=-this.w)
      this.x = width+this.w+random(-20,20);
  }
  
}
