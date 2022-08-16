var bgimage 
var ground
var birdImage  
var gameover
var gameoverr = false 
var bird
var pipUp
var pipeDown
var Uppipe
var space = true 
var pipesup = []
var pipesdown = []
var intervalId 
var intervalId2
var jump = true 
var wing  
var moving = true 

function preload() {
	bgimage = loadImage("images/bg.png")
	ground = loadImage("images/ground.png")
	birdImage = loadImage("images/bird.png")
	gameover = loadImage("images/gameover.png")
	pipUp = loadImage("images/topwall.png")
	pipeDown = loadImage("images/bottomwall.png")
	wing = loadSound("audio/wing.mp3")



}



function setup() {
	createCanvas(480,640)
	bird = new Bird()
	for(var i = 0; i < pipesup.length; i++){
		pipesup[i] = new Pipeup()
	}

	for(var i = 0; i < pipesdown.length; i++){
		pipesdown[i] = new Pipedown()
	}
}






intervalId = setInterval(()=> {
	pipesup.push(new Pipeup)
},1200)

intervalId2 = setInterval(()=> {
	pipesdown.push(new Pipedown)
},1200)


function draw() {
	background(0)
	image(bgimage,0,0,480,640)
	image(ground,0,530,480)

	bird.show()
	bird.pulldown()

	// image(pipUp,400,330,50,200)
	// image(pipeDown,400,0,50,200)

	for(var i = 0; i < pipesup.length; i++){
		pipesup[i].show()
		pipesup[i].move()
	}

	for(var i = 0; i < pipesdown.length; i++){
		pipesdown[i].show()
		pipesdown[i].move()
	}

	bird.detect()



	if (gameoverr) {
		fill(255)
		textSize(20)
		text("Click to Restart",170,350)
	};

}
function mousePressed() {
	if (gameoverr) {
		location.reload()
	};
}


function keyPressed() {
	if (keyCode == 32) {
		bird.jump()
	};
	bird.stp()
	wing.play()
}

function Bird() {
		
	this.x = 100

	this.y = 100 
	this.w = 45
	this.h = 37
	this.yspeed = 3
	this.grav = 0.3
	this.lift = -9

	this.show = function () {
		image(birdImage,this.x,this.y,this.w,this.h)
	} 

	this.pulldown = function () {
		this.y += this.yspeed
		this.yspeed += this.grav 

		if (this.y + this.h >= 490 + this.h || this.y <= 0) {
			this.yspeed = 0
			space = false 
			clearInterval(intervalId)
			clearInterval(intervalId2)
			moving = false 
			wing.pause()
			image(gameover,150,280)
			gameoverr = true 
		};
	}
	this.jump = function () {
		if (space) {
			if (jump) {
				this.yspeed += this.lift
			};
		};
	}
	this.stp = function () {
		this.gravity = 0
	}
	this.detect = function () {
		for(var i = 0; i < pipesdown.length; i++){
			if ((this.x + this.w >= pipesdown[i].x && this.x + this.w < pipesdown[i].x + pipesdown[i].w) || (this.x <= pipesdown[i].x + pipesdown[i].w && this.x > pipesdown[i].x)) {
				if (this.y > pipesdown[i].y && this.y < pipesdown[i].y + pipesdown[i].h) {
					clearInterval(intervalId)
					clearInterval(intervalId2)
					moving = false 
					this.yspeed = 0
					jump = false 
					wing.pause()
					image(gameover,150,280)
					gameoverr = true


				};	
			};
		}
		for(var i = 0; i < pipesup.length; i++){
			if ((this.x + this.w >= pipesup[i].x && this.x + this.w < pipesup[i].x + pipesup[i].w) || (this.x <= pipesup[i].x + pipesup[i].w && this.x > pipesup[i].x)) {
				if (this.y + this.h > pipesup[i].y  && this.y < pipesup[i].y + pipesup[i].h) {
					clearInterval(intervalId)
					clearInterval(intervalId2)
					moving = false 
					this.yspeed = 0
					jump = false 

					wing.pause() 
					image(gameover,150,280)
					gameoverr = true

				};	
			};
		}

	}
}



function Pipeup() {
	this.ramdomh = Math.floor(Math.random() * (190 - 140 + 1 )) + 140	

	this.x = 480
	this.xspeed = 2
	 
	this.w = 50

	this.h = this.ramdomh
	this.y = 530 - this.h	

	this.show = function () {
		image(pipUp,this.x,this.y,this.w,this.h)
	}
	this.move = function () {
		if (moving) {
			this.x -= this.xspeed
		};
	}
}




function Pipedown(){
	this.ramdomh = Math.floor(Math.random() * (250 - 200 + 1 )) + 180

	this.x = 480
	this.xspeed = 2
	
	this.w = 50

	this.h = this.ramdomh
	this.y = 0	

	this.show = function () {
		image(pipeDown,this.x,this.y,this.w,this.h)
	}
	this.move = function () {
		if (moving) {
			this.x -= this.xspeed

		};
	}
}