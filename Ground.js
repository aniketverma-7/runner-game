class Ground{
  
  constructor(){
    this.x = 0;
  }
  
  show(){
    image(g_img,this.x,height-level,width,level);
    image(g_img,this.x+width-1,height-level,width,level);
  }
  
  move(){
    this.x -= speed;
    if(this.x<=-width)
      this.x = 0;
  }
}