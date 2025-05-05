class Cloud{
  
  constructor(){
    this.x = width+20;
  }
  
  show(){
    image(c_img,this.x,50,100,50);
    }
  
  move(){
    this.x -= speed/2;
    if(this.x<=-120)
      this.x = width+20;
  }
}