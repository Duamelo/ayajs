if(this.y <= this.dest_y && this.line.x <= this.line.dest_x){
    if(i_src == 1){
        this.line.c1.y = this.line.y;
        this.line.c1.x = this.line.x;
    }
    else{/* i_src == 2*/
        this.line.c1.x = this.line.x;
        this.line.c1.y = this.line.y + dy;
    }
    if(i_dest == 0){
        this.line.c4.x = this.line.dest_x;
        this.line.c4.y = this.line.dest_y - dy;
    }
    else{/* i_dest == 3*/
        this.line.c4.y = this.line.dest_y;
        this.line.c4.x = this.line.dest_x - dx;
    }
    this.line.c4.y = this.line.dest_y;
    this.line.c2.x = (this.line.dest_x + this.line.x)/2;
    this.line.c2.y = this.line.c1.y;
    this.line.c3.x = this.line.c2.x;
    this.line.c3.y = this.line.c4.y;
}
if(this.line.y >= this.line.dest_y && this.line.x <= this.line.dest_x ){
    if(i_src == 0){
        this.line.c1.x = this.line.x;
        this.line.c1.y = this.line.y - dy;
    }
    else{ /*i_src == 1*/
        this.line.c1.y = this.line.y;
        this.line.c1.x = this.line.x + dx; 
    }
    if(i_dest == 2){
        this.line.c4.x = this.line.dest_x;
        this.line.c4.y = this.line.dest_y - dy;
    }
    else{/* i_dest == 3*/
        this.line.c4.y = this.line.dest_y;
        this.line.c4.x = this.line.dest_x - dx;
    }
    this.line.c4.y = this.line.dest_y;
    this.line.c2.x = (this.line.dest_x + this.line.x)/2;
    this.line.c2.y = this.line.c1.y;
    this.line.c3.x = this.line.c2.x;
    this.line.c3.y = this.line.c4.y;
}