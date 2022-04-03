let canvas = document.getElementById("myCanvas");
            let c = canvas.getContext("2d");

            let leftKeyPresed = false;
            let rightKeyPressed = false;
            let upKeyPressed = false;
            let downKeyPressed = false;
            let lastK = "left"
            let cameraPOS = {x:0,y:0}

            let sus = setInterval(keyInter,1);
            function keyInter(){
                document.addEventListener('keydown',keyPressed);
                document.addEventListener('keyup',keyReleased);
                playerMove();
                if(lastK = "right" && checkAllCol()){
                    cameraPOS.x ++;
                }
                if(lastK = "left" &&checkAllCol()){
                    cameraPOS.x -=2;
                }
                if(lastK = "up" && checkAllCol()){
                    cameraPOS.y +=1;
                    cameraPOS.x+=1;
                }
                if(lastK = "down" && checkAllCol()){
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
                    leftKeyPresed = true;
                }
                if(evt.keyCode == 39){
                    rightKeyPressed = true;
                }
                if(evt.keyCode == 38){
                    upKeyPressed = true;
                }
                if(evt.keyCode == 40){
                    downKeyPressed = true;
                }

            }
            function keyReleased(evt){
                if(evt.keyCode == 37){
                    leftKeyPresed = false;
                }
                if(evt.keyCode == 39){
                    rightKeyPressed = false;
                }
                if(evt.keyCode == 38){
                    upKeyPressed = false;
                }
                if(evt.keyCode == 40){
                    downKeyPressed = false;
                }

            }
            function checkAllCol(){
                //Boxes
                if(checkCollisions(100-cameraPOS.x,100-cameraPOS.y,70,50,720/2-25,480/2-50,50,50)||checkCollisions(720/2-25,480/2-50,50,50,150-cameraPOS.x,200-cameraPOS.y,70,75)){
                    return true;
                }
                //Walls
                if(checkCollisions(720/2-25,480/2-50,50,50,-20-cameraPOS.x,-20-cameraPOS.y,20,520)||checkCollisions(720/2-25,480/2-50,50,50,-20-cameraPOS.x,-20-cameraPOS.y,760,20)||checkCollisions(720/2-25,480/2-50,50,50,-20-cameraPOS.x,480-cameraPOS.y,760,20)|| checkCollisions(720/2-25,480/2-50,50,50,720-cameraPOS.x,0-cameraPOS.y,-20,480)){
                    return true;
                }
            }
            function playerMove(){
                checkAllCol();
                if(leftKeyPresed){
                    lastK = "left"
                    cameraPOS.x --;
                }   
                else if(rightKeyPressed){
                    lastK = "right"
                    cameraPOS.x ++;
                }
                else if(upKeyPressed){
                    lastK = "up"
                    cameraPOS.y --;
                }
                else if(downKeyPressed){
                    lastK = "down"
                    cameraPOS.y ++;
                }
            }
            function redraw(){
                c.fillStyle = "#ccffcc"
                c.fillRect(0,0,720,480);
                c.fillStyle = "#003399"
                c.fillRect(720/2-25,480/2-50,50,50)
                c.fillStyle = "#0033cc";
                c.fillRect(100-cameraPOS.x,100-cameraPOS.y,70,50)
                c.fillRect(150-cameraPOS.x,200-cameraPOS.y,70,75)
                c.fillStyle = "#33cc33";
                c.fillRect(-20-cameraPOS.x,-20-cameraPOS.y,20,520);
                c.fillRect(-20-cameraPOS.x,-20-cameraPOS.y,760,20)
                c.fillRect(-20-cameraPOS.x,480-cameraPOS.y,760,20)
                c.fillRect(740-cameraPOS.x,0-cameraPOS.y,-20,480)
            }
            redraw();
            window.main = function(){
                window.requestAnimationFrame( main );
                redraw();
            }
            main();