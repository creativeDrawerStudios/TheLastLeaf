const es = new Es(720,480);
//tester
//.endTester
let images = {leaf:document.getElementById("leaf"),mud:document.getElementById("mud"),tree:document.getElementById("tree"),
    bg:document.getElementById("bg"),grass:document.getElementById("grass"),npc1:document.getElementById("npc1"),
    title:document.getElementById("title"),textbox:document.getElementById("textbox")}

let key = {leftKeyPresed:false,rightKeyPressed:false,upKeyPressed:false,downKeyPressed:false,spaceKeyPressed:false}  
let project = {scene:0,tOPC:1,textBlink:0,lastK:"left",ang:0,rotate:1,rotateAddition:0,tbs:0}
let cameraPOS = {x:0,y:0}

let keyUpdate = setInterval(keyInter,1);
let slowAnim = setInterval(blink,500);
//tester
let snow = setInterval(draw, 33);
var angle = 0;
var W = canvas.width;
var H = canvas.height;  
var mp = 50;//max particles
var particles = [];
for(var i = 0; i < mp; i++){
    particles.push({
        x: Math.random()*W,
        y: Math.random()*H,
        r: Math.random()*4+1,
        d: Math.random()*mp
    });
}

function keyInter(){
    document.addEventListener('keydown',keyPressed);
    document.addEventListener('keyup',keyReleased); 
    playerMove();
    if(project.lastK = "right" && checkAllCol()){cameraPOS.x ++;}
    if(project.lastK = "left" &&checkAllCol()){cameraPOS.x -=2;}
    if(project.lastK = "up" && checkAllCol()){cameraPOS.y +=1;cameraPOS.x+=1;}
    if(project.lastK = "down" && checkAllCol()){cameraPOS.y -=2;}
}
class Npc{constructor(x,y){es.image(images.npc1,x-cameraPOS.x,y-cameraPOS.y,180,150);}}
function drawLeaf(){
    c.translate(canvas.width/2, canvas.height/2);
    c.rotate(Math.PI / 180 * (project.ang += project.rotate));
    c.translate(-(canvas.width/2), -(canvas.height/2));
    c.drawImage(images.leaf,720/2-50,480/2-40,120,100);
    c.restore();
}
function playerMove(){
    if(key.spaceKeyPressed&&project.scene == 0){project.scene = 1;clearInterval(slowAnim);es.clear()}
    else if(key.rightKeyPressed){move("right",.5,1,0);}
    else if(key.leftKeyPresed){move("left",-0.75,-1,0);}
    else if(key.upKeyPressed){move("up",.5,0,-1)}
    else if(key.downKeyPressed){move("down",-.5,0,1)}
    else{project.rotate = 0;project.rotateAddition = 0;}
}
function move(keyLast,rotate,camX,camY){
    project.lastK = keyLast;
    project.rotateAddition += 0.001;
    project.rotate = rotate +project.rotateAddition;
    cameraPOS.x += camX;
    cameraPOS.y += camY; 
}
function blink(){
    if(project.textBlink ==0){project.textBlink = 1;}
    else{project.textBlink = 0;}
} 
function keyPressed(evt){
    if(evt.keyCode == 37){key.leftKeyPresed = true;}
    if(evt.keyCode == 39){key.rightKeyPressed = true;}
    if(evt.keyCode == 38){key.upKeyPressed = true;}
    if(evt.keyCode == 40){key.downKeyPressed = true;}
    if(evt.keyCode == 32){key.spaceKeyPressed = true;}
}
function keyReleased(evt){
    if(evt.keyCode == 37){key.leftKeyPresed = false;}
    if(evt.keyCode == 39){key.rightKeyPressed = false;}
    if(evt.keyCode == 38){key.upKeyPressed = false;}
    if(evt.keyCode == 40){key.downKeyPressed = false;}
    if(evt.keyCode == 32){key.spaceKeyPressed = false;}
}
function drawBg(){
    //Center
    es.image(images.bg,0-cameraPOS.x,0-cameraPOS.y,720,480,0.15);
    //The Rest
    es.image(images.bg,-720-cameraPOS.x,0-cameraPOS.y,720,480,0.15);es.image(images.bg,0-cameraPOS.x,0-cameraPOS.y,720,-480,0.15);es.image(images.bg,0-cameraPOS.x,0-cameraPOS.y,720,960,0.15);
}
function checkAllCol(){if(es.checkCollisions(720/2-25,480/2-25,50,50,200-cameraPOS.x+60,300-cameraPOS.y+25,45,100)){return true;};if(es.checkCollisions(720/2-25,480/2-25,50,50,-20-cameraPOS.x,-20-cameraPOS.y,20,520)||es.checkCollisions(720/2-25,480/2-25,50,50,-20-cameraPOS.x,-20-cameraPOS.y,760,20)||es.checkCollisions(720/2-25,480/2-25,50,50,-20-cameraPOS.x,480-cameraPOS.y,760,20)||es.checkCollisions(720/2-25,480/2-25,50,50,720-cameraPOS.x,0-cameraPOS.y,-20,480||es.checkCollisions(720/2-25,480/2-25,50,50,-20-cameraPOS.x,-20-cameraPOS.y,20,520))){return true;}}
function redraw(){
    c.save()
    if(project.scene == 0){     
        es.background("#996633");
        es.image(images.bg,0,0,720,480,0.15);
        es.image(images.tree,150-40,100,150,150,0.3);
        es.image(images.tree,150-10,100-50,150,150,0.3);
        es.image(images.mud,400,300,300,200,0.5);
        es.image(images.title,190,50,360,300,project.tOPC);
        if(project.textBlink==0){es.text("Space to start",265,400,"#000000",0.3);}
    }
    else{
        es.background("#996633");
        drawBg()
        es.image(images.grass,0-cameraPOS.x,0-cameraPOS.y,720,480,0.1);
        es.image(images.mud,300-cameraPOS.x,300-cameraPOS.y,300,200);
        //The long row of hitboxes [P,WL,WU,WD,WR,NPC1,NPC1TALK]
        //es.drawHitbox(720/2-25,480/2-25,50,50);es.drawHitbox(-20-cameraPOS.x,-20-cameraPOS.y,20,520);es.drawHitbox(-20-cameraPOS.x,-20-cameraPOS.y,760,20);es.drawHitbox(-20-cameraPOS.x,480-cameraPOS.y,760,20);es.drawHitbox(740-cameraPOS.x,0-cameraPOS.y,-20,480);es.drawHitbox(200-cameraPOS.x+60,300-cameraPOS.y+25,45,100);es.drawHitbox(200-cameraPOS.x+55,300-cameraPOS.y+20,55,110);
        new Npc(200,300);
        drawLeaf();
        es.image(images.tree,150-cameraPOS.x-40,100-cameraPOS.y,150,150,0.7);
        es.image(images.tree,-20-cameraPOS.x-40,200-cameraPOS.y,150,150,0.7);
        if(es.checkCollisions(720/2-25,480/2-25,50,50,200-cameraPOS.x+55,300-cameraPOS.y+20,55,110)&&project.tbs == 1){es.image(images.textbox,10,290,350,200);es.text("Where am I",70,390,"#4d2600");es.text("???:",70,370,"#4d2600");}
        else if(es.checkCollisions(720/2-25,480/2-25,50,50,200-cameraPOS.x+55,300-cameraPOS.y+20,55,110)&&project.tbs == 2){es.image(images.textbox,10,290,350,200);es.text("I've lost my village",70,390,"#4d2600");es.text("???:",70,370,"#4d2600");}
        else{project.tbs = 0}
        es.image(images.title,190,50,360,300,project.tOPC);
    }
}
document.addEventListener('keydown',function (evt){
    if(event.keyCode == 32){
        if(es.checkCollisions(720/2-25,480/2-25,50,50,200-cameraPOS.x+55,300-cameraPOS.y+20,55,110)){
            if(project.tbs == 0){project.tbs = 1;}
            else if(project.tbs == 1){project.tbs = 2;}
            else{project.tbs = 0;}
        }
    }
});
//Move the Snow Particles
function update()
	{
		angle += 0.01;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
			p.x += Math.sin(angle) * 2;
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if(p.x > W+5 || p.x < -5 || p.y > H)
			{
				if(i%3 > 0) //66.67% of the flakes
				{
					particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
				}
				else
				{
					//If the flake is exitting from the right
					if(Math.sin(angle) > 0)
					{
						//Enter from the left
						particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
					}
					else
					{
						//Enter from the right
						particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
					}
				}
			}
		}
	}
function draw(){for(var i = 0; i < mp; i++){var p = particles[i];es.eclipse(p.x,p.y,p.r,"#ffffff",0.5);}update();}
function draw2(){for(var i = 0; i < mp; i++){var p = particles[i];es.eclipse(p.x,p.y,p.r,"#ffffff",0.2);}update();}

window.main = function(){
    window.requestAnimationFrame( main );
    redraw();
    if(project.scene == 1 && project.tOPC >= 0.01){project.tOPC -=0.01;}
    else if(project.scene == 1){project.tOPC = 0;}
    if(project.scene == 1){draw();}
    else{draw2();}
};main();