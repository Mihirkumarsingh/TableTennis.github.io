var canvas; 
    //it is going to be sort of its underlying graphical information that draw rect or images to inside of a window or function.
    var canvasContext; 
    var ballX = 50;	
	var ballSpeedX=8;

    var ballY= 50;	
	var ballSpeedY=5;
    var player1Score = 0;
    var player2Score = 0;
    const WINNING_SCORE=5;
    var showingwinScreen= false;
	var paddle1Y=250;
	var paddle2Y=250;
	var PADDLE_HEIGHT1 =200;
	var PADDLE_HEIGHT2 =200;
	const PADDLE_THICKNESS =10;

    function calculateMousePos(evt)
    {// position of the canvas obtained from the getBoundingClientRect() method of the window object.
     var rect =canvas.getBoundingClientRect();
     //Return the documentElement of the document,i.e html page
     var root =document.documentElement;
     //
     var mouseX = evt.clientX-rect.left -root.scrollLeft;
      var mouseY = evt.clientY-rect.top -root.scrollTop;
      return{
       //return object
      	x:mouseX,
      	y:mouseY
      };
    }
function handleMouseClick(evt){

	if(showingwinScreen)
	{
		player1Score=0;
		player2Score=0;
		showingwinScreen=false;
	}
}
    //untill all code is loaded game will not run
   window.onload =function()
    { //Find the Canvas Element  
      //This is done by using the HTML DOM method getElementById()      
	  canvas = document.getElementById('gameCanvas');   
	  //you need a drawing object for the canvas.
      //The getContext() is a built-in HTML object, with properties and methods for drawing:
      canvasContext = canvas.getContext('2d');
	  //slowing down the transition of red block 
	  //setting timer ie after particular interval in  millisecond that function will be called 
	  var framePerSecond = 30 ;
	 // setInterval(drawEverything, 1000/framePerSecond);
	 //inline function
	 setInterval(function()
	{ moveEverything();
	  drawEverything();
	}, 1000/framePerSecond);

     canvas.addEventListener('mousedown',handleMouseClick);
     //The canvas.addEventListener() method attaches an event handler to the canvas.
	canvas.addEventListener('mousemove', function(evt){

		var mousePos = calculateMousePos(evt);
		paddle1Y =mousePos.y-(PADDLE_HEIGHT1/2);
	});
	}
	 function ballReset(){
      if (player1Score>=WINNING_SCORE || player2Score>= WINNING_SCORE)
      {
      	showingwinScreen= true;
      }
       ballSpeedX = -ballSpeedX;
       ballX=400;
       ballY=300;
	 }
     function computerMovement()
     {  var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT2/2);
     	//cahsing a ball and shaking of abll is due this chase only
     	if(paddle2YCenter<ballY+20)
     	{
     		paddle2Y +=6;
     	}
        else if(paddle2YCenter>ballY + 20)
        {
        	paddle2Y -=6;
        }

     }



	//incraesing update rate for smoother movement
	function moveEverything()
	{     
		   computerMovement();
		   ballX = ballX + ballSpeedX;
		   ballY = ballY + ballSpeedY;
		   if(ballX>800)
		   {
		   	if(ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT2){
		   	    //negative of negative is positive
                ballSpeedX =-ballSpeedX;
                  var deltaY =ballY -(paddle2Y+PADDLE_HEIGHT2/2);
                ballSpeedY = deltaY*0.3;
		   }
            else{//should be before ball positio reset
            	 player1Score += 1;
                PADDLE_HEIGHT2=PADDLE_HEIGHT2/2;
                 ballReset();
                 //ballX=Math.random()*600;
                
            }
		   }
		   if(ballX<0)
		   { if(ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT1){
		   	    //negative of negative is positive
                ballSpeedX =-ballSpeedX;
                //setting ball speed y will set the control in direction of ball where it will move aq to the region where it hit the paddle
                var deltaY =ballY -(paddle1Y+PADDLE_HEIGHT1/2);
                ballSpeedY = deltaY*0.3;
		   }
            else{player2Score += 1;
                 PADDLE_HEIGHT1=PADDLE_HEIGHT1/2;
                 ballX=Math.random()*600;
                 ballReset();
            }  
		   }

		   if(ballY>600)
		   {
		   	ballSpeedY=-ballSpeedY;
		   }
		   if(ballY<0)
		   {    //negative of negative is positive
		   		ballSpeedY=-ballSpeedY;
		   }

	}
    function drawNet()
    { for(var i=0;i<600;i+=20 )
    	{
    		colorRect(398,i,2,10,'yellow');

    	}

    }

	//Create a function to group all Draw Code
	 
    function drawEverything()
	{ //black screen
	  colorRect(0,0,canvas.width,canvas.height,'black');
	     if(showingwinScreen)
		{    canvasContext.fillStyle ='white';
             PADDLE_HEIGHT1=200;
             PADDLE_HEIGHT2=200;
             if(player1Score>=WINNING_SCORE)
             { 
             	canvasContext.fillText("MIHIR WON!",400,100);
             	 
             }
             else if(player2Score>=WINNING_SCORE)
             { 
             canvasContext.fillText("MIHIR LOST!",400,100);
              
             }
		
			canvasContext.fillText("Click to continue",400,500);
          return;

		}
		drawNet();
	  //left paddle
	  colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT1,'yellow');
	  //right paddle
	  colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT2,'yellow');
	  colorCircle(ballX,ballY,10,'yellow');
      canvasContext.fillText("MIHIR",100,50);
	  canvasContext.fillText(player1Score,100,100);
	  canvasContext.fillText("CPU",700,50);
	  canvasContext.fillText(player2Score,700,100);
    }








	 function colorCircle(centerX,centerY,radius,drawColor)
	 {
	 	 //circular red ball
	  canvasContext.fillStyle =drawColor;
	  //begins a path
	  canvasContext.beginPath();
	  //arc(x,y,r,startangle,endangle) - creates an arc/curve. To create a circle with arc(): Set start angle to 0 and end angle to 2*Math.PI. The x and y parameters define the x- and y-coordinates of the center of the circle. The r parameter defines the radius of the circle.
	  canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
	  canvasContext.fill();
	 }
function colorRect(leftX,topY,width,height,drawColor)
	 {
      canvasContext.fillStyle=drawColor;
	  canvasContext.fillRect(leftX,topY,width,height);

	 }
	 //show motion Over Time