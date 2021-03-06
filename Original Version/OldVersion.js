let canvas = document.getElementById("myCanvas");
let c = canvas.getContext("2d");

let key = {leftKeyPresed:false,rightKeyPressed:false,upKeyPressed:false,downKeyPressed:false,spaceKeyPressed:false}
let cameraPOS = {x:0,y:0}
let images = {leaf:document.getElementById("leaf"),mud:document.getElementById("mud"),tree:document.getElementById("tree"),
              bg:document.getElementById("bg"),grass:document.getElementById("grass"),npc1:document.getElementById("npc1"),
              title:document.getElementById("title")}
let project = {rotate:1,rotateAddition:0,ang:0,lastK:"left",scene:0, titleOPC:1}

let sus = setInterval(keyInter,1);
function keyInter(){
    document.addEventListener('keydown',keyPressed);
    document.addEventListener('keyup',keyReleased);
    playerMove();
    if(project.lastK = "right" && checkAllCol()){
        cameraPOS.x ++;
    }
    if(project.lastK = "left" &&checkAllCol()){
        cameraPOS.x -=2;
    }
    if(project.lastK = "up" && checkAllCol()){
        cameraPOS.y +=1;
        cameraPOS.x+=1;
    }
    if(project.lastK = "down" && checkAllCol()){
        cameraPOS.y -=2;
    }
}
function checkCollisions(x,y,width,height,xx,yy,ww,hh){
    if(x < xx + ww &&
    x + width > xx &&
    y < yy + hh &&
    y + height > yy){
        return true;
    }  
    else{
        return false;
    }
} 
function keyPressed(evt){
    if(evt.keyCode == 37){
        key.leftKeyPresed = true;
    }
    if(evt.keyCode == 39){
        key.rightKeyPressed = true;
    }
    if(evt.keyCode == 38){
        key.upKeyPressed = true;
    }
    if(evt.keyCode == 40){
        key.downKeyPressed = true;
    }
    if(evt.keyCode == 32){
        key.spaceKeyPressed = true;
    }
}
function keyReleased(evt){
    if(evt.keyCode == 37){
        key.leftKeyPresed = false;
    }
    if(evt.keyCode == 39){
        key.rightKeyPressed = false;
    }
    if(evt.keyCode == 38){
        key.upKeyPressed = false;
    }
    if(evt.keyCode == 40){
        key.downKeyPressed = false;
    }
    if(evt.keyCode == 32){
        key.spaceKeyPressed = false;
    }
}
function checkAllCol(){
    //Boxes
   // if(checkCollisions(720/2-25,480/2-25,50,50,150-cameraPOS.x,200-cameraPOS.y,70,75)){
   //     return true;
   // }
    //Walls
    if(checkCollisions(720/2-25,480/2-25,50,50,-20-cameraPOS.x,-20-cameraPOS.y,20,520)||checkCollisions(720/2-25,480/2-25,50,50,-20-cameraPOS.x,-20-cameraPOS.y,760,20)||checkCollisions(720/2-25,480/2-25,50,50,-20-cameraPOS.x,480-cameraPOS.y,760,20)|| checkCollisions(720/2-25,480/2-25,50,50,720-cameraPOS.x,0-cameraPOS.y,-20,480)){
        return true;
    }
}
//Draw a leaf with rotation
function drawLeaf(){
    c.translate(canvas.width/2, canvas.height/2); //let's translate
    c.rotate(Math.PI / 180 * (project.ang += project.rotate)); //increment the angle and rotate the image 
    c.translate(-(canvas.width/2), -(canvas.height/2)); //let's translate
    c.drawImage(images.leaf,720/2-50,480/2-40,120,100)//draw the image ;)
    c.restore();
}
function text(text,x,y,color,opacity=1){
    c.globalAlpha = opacity;
    c.fillStyle = color;
    // c.font = '50px Rubik Moonrocks';
    c.font = '50px Sans-Serif'
    c.fillText(text,x,y);
    c.globalAlpha = 1;
}
function move(keyLast,rotate,camX,camY){
    project.lastK = keyLast
    project.rotateAddition += 0.001;
    project.rotate = rotate +project.rotateAddition;
    cameraPOS.x += camX;
    cameraPOS.y += camY; 
}
function playerMove(){
    checkAllCol();
    if(key.spaceKeyPressed){
        if(project.scene == 0){
            project.scene = 1;
            cameraPOS.x = 0;
            cameraPOS.y = 0;
            redraw();
        }
        if(project.scene == 1){

        }
    }
    if(key.leftKeyPresed){
        move("left",-1.5,-1,0)
    }   
    else if(key.rightKeyPressed){
        move("right",1,1,0)
    }
    else if(key.upKeyPressed){
        move("up",1,0,-1)
    }
    else if(key.downKeyPressed){
        move("down",-1,0,1)
    }
    else{
        project.rotate = 0;
        project.rotateAddition = 0;
    }
}
class Npc{
    constructor(x,y){
        //c.fillStyle = "#ffffff";
        //c.fillRect(x-cameraPOS.x+60,y-cameraPOS.y+25,45,100);
        c.drawImage(images.npc1,x-cameraPOS.x,y-cameraPOS.y,180,150);
    }
}
function drawTitle(opacity=1){
    c.globalAlpha = opacity;
    c.drawImage(images.title,190,70,360,300);
    c.globalAlpha = 1;
}
function redraw(){
    c.save()
    //BG
    //TODO: add better fade animations
    c.fillStyle = "#996633";
    c.fillRect(0,0,720,480);
    if(project.scene == 0){
        //bg
        c.globalAlpha = 0.15;
        c.drawImage(images.bg,0,0,720,480)
        c.globalAlpha = 1;
        //main
        c.globalAlpha = 0.3;
        c.drawImage(images.tree,150-40,100,150,150)
        c.drawImage(images.tree,150-10,100-50,150,150)
        c.drawImage(images.mud,400,300,300,200)
        c.globalAlpha = 1;
        //text("The last leaf",720/2-175,480/2,"#000000")
        //c.drawImage(images.leaf,445,150,100,70)
        drawTitle();
    }
    if(project.scene == 1){
        //bg
        c.globalAlpha = 0.15;
        c.drawImage(images.bg,0-cameraPOS.x,0-cameraPOS.y,720,480)
        c.drawImage(images.grass,0-cameraPOS.x,0-cameraPOS.y,720,480)
        c.globalAlpha = 1;
        //main
        c.fillStyle = "#0033cc";
        c.drawImage(images.mud,300-cameraPOS.x,300-cameraPOS.y,300,200)
        c.drawImage(images.tree,150-cameraPOS.x-40,100-cameraPOS.y,150,150)
        c.fillStyle = "#33cc33";
        //Walls
            //c.fillRect(-20-cameraPOS.x,-20-cameraPOS.y,20,520);
            //c.fillRect(-20-cameraPOS.x,-20-cameraPOS.y,760,20)
            //c.fillRect(-20-cameraPOS.x,480-cameraPOS.y,760,20)
            //c.fillRect(740-cameraPOS.x,0-cameraPOS.y,-20,480)
        //Player
            //c.fillRect(720/2-25,480/2-25,50,50)
        new Npc(200,300)
        drawLeaf(); 
        drawTitle(project.titleOPC);
    }   
}
redraw();
window.main = function(){
    window.requestAnimationFrame( main );
    redraw();
    //Check For opacity
    if(project.scene == 1 && project.titleOPC >= 0.01){
        project.titleOPC -=0.01;
    }
    else if(project.scene == 1){
        project.titleOPC = 0;
    }
    if(checkCollisions(720/2-25,480/2-25,50,50,200-cameraPOS.x+60,300-cameraPOS.y+25,45,100)){
        alert("Checking");
    }
}
main();
