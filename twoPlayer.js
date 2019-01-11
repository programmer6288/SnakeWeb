document.getElementById('startButton').style.display = "block";
document.getElementById('scoreInfo').style.display = "none";
var squareSize = 15;
var xBound = 54;
var yBound = 30;
var s = new Snake(0,0);
var t = new Snake(xBound-1,yBound-1);
s.dir = [1,0];
t.dir = [-1,0];
var f = new Food();
var lastMove_S = [0,0];
var lastMove_T = [0,0];
var collisionNum;
var canvas;
var isStarted = false;
var player1Score = 0;
var player2Score = 0;
f.genFood();
function doClick(){
	var up1 = document.getElementById('up1').value;
	var down1 = document.getElementById('down1').value;
	var left1 = document.getElementById('left1').value;
	var right1 = document.getElementById('right1').value;
	var up2 = document.getElementById('up2').value;
	var down2 = document.getElementById('down2').value;
	var left2 = document.getElementById('left2').value;
	var right2 = document.getElementById('right2').value;
	if(up1==down1 || up1==left1 || up1==right1 || up1==up2 || up1==down2 || up1==left2 || up1==right2
		|| down1==left1 || down1==right1 || down1==up2 || down1==down2 || down1==left2 || down1==right2
		|| left1==right1 || left1==up2 || left1==down2 || left1==left2 || left1==right2
		|| right1==up2 || right1==down2 || right1==left2 || right1==right2
		|| up2==down2 || up2==left2 || up2==right2
		|| down2==left2 || down2==right2
		|| left2==right2){
		alert("Change your controls: You need to have a different character for each direction!");
	}else{
		isStarted = true;
		scrollTo("myCanvas");
	}
}
function scrollTo(hash){
	location.hash = "#"+hash;
}
function setup() {
	canvas = createCanvas(squareSize*xBound, squareSize*yBound);
	canvas.background(255, 204, 0);
	canvas.id('myCanvas');
	canvas.parent('sketch-holder');
	canvas.style = "";
	canvas.style.display = "none";
}
function draw() {
	loaded();
	if(isStarted){
		document.getElementById('scoreInfo').style.display = "inline-block";
		clear();
		background(255, 204, 0);
		fill(0);
		//Drawing S
		for(var i=0; i<s.chain.length; i++){
			rect(s.chain[i][0]*squareSize+1,s.chain[i][1]*squareSize+1,squareSize-2,squareSize-2);
		}
		fill(255);
		//Drawing T
		for(var i=0; i<t.chain.length; i++){
			rect(t.chain[i][0]*squareSize+1,t.chain[i][1]*squareSize+1,squareSize-2,squareSize-2);
		}
		loaded();
		//Testing collision for S and T
		if((s.isCollsion() || s.isOutOfBounds()) && (t.isCollsion() || t.isOutOfBounds())){
			alert("GAME OVER - Both players lose. Press \"Play Game\" if you want to play another round.");
			reset();
		}
		else if(s.isCollsion() || s.isOutOfBounds()){
			alert("GAME OVER - Player 1 loses. Press \"Play Game\" if you want to play another round.");
			player2Score++;
			reset();
		}else if(t.isCollsion() || t.isOutOfBounds()){
			alert("GAME OVER - Player 2 loses. Press \"Play Game\" if you want to play another round.");
			player1Score++;
			reset();
		}
		//Testing collision between the snakes
		collisionNum = snakeCollision(s,t);
		if(collisionNum == 1){
			alert("GAME OVER - Player 2 loses. Press \"Play Game\" if you want to play another round.");
			player1Score++;
			reset();
		}else if(collisionNum == 2){
			alert("GAME OVER - Player 1 loses. Press \"Play Game\" if you want to play another round.");
			player2Score++;
			reset();
		}else if(collisionNum == 0){
			alert("GAME OVER - Both players lose. Press \"Play Game\" if you want to play another round.");
			reset();
		}
		fill(111);
		rect(f.pos[0]*squareSize+1, f.pos[1]*squareSize+1, squareSize-2, squareSize-2);
		//Testing if S has touched food
		if(JSON.stringify(s.chain[s.chain.length-1]) == JSON.stringify(f.pos)){
			s.moveFood();
			f.genFood();
		}else{
			s.move();
		}
		//Testing if T has touched food
		if(JSON.stringify(t.chain[t.chain.length-1]) == JSON.stringify(f.pos)){
			t.moveFood();
			f.genFood();
		}else{
			t.move();
		}
		lastMove_S = s.dir;
		lastMove_T = t.dir;
		frameRate(7);
	}
}
function keyPressed(){
	if(keyCode === 	document.getElementById('up1').value.toUpperCase().charCodeAt(0)){
		if(JSON.stringify(lastMove_S) != JSON.stringify([0,1]) || s.chain.length==1){
			s.dir = [0,-1];
		}
	}else if(keyCode === document.getElementById('down1').value.toUpperCase().charCodeAt(0)){
		if(JSON.stringify(lastMove_S) != JSON.stringify([0,-1]) || s.chain.length==1){
			s.dir = [0,1];
		}
	}else if(keyCode === document.getElementById('left1').value.toUpperCase().charCodeAt(0)){
		if(JSON.stringify(lastMove_S) != JSON.stringify([1,0]) || s.chain.length==1){
			s.dir = [-1,0];
		}
	}else if(keyCode === document.getElementById('right1').value.toUpperCase().charCodeAt(0)){
		if(JSON.stringify(lastMove_S) != JSON.stringify([-1,0]) || s.chain.length==1){
			s.dir = [1,0];
		}
	}else if(keyCode === document.getElementById('up2').value.toUpperCase().charCodeAt(0)){
		if(JSON.stringify(lastMove_T) != JSON.stringify([0,1]) || t.chain.length==1){
			t.dir = [0,-1];
		}
	}else if(keyCode === document.getElementById('down2').value.toUpperCase().charCodeAt(0)){
		if(JSON.stringify(lastMove_T) != JSON.stringify([0,-1]) || t.chain.length==1){
			t.dir = [0,1];
		}
	}else if(keyCode === document.getElementById('left2').value.toUpperCase().charCodeAt(0)){
		if(JSON.stringify(lastMove_T) != JSON.stringify([1,0]) || t.chain.length==1){
			t.dir = [-1,0];
		}
	}else if(keyCode === document.getElementById('right2').value.toUpperCase().charCodeAt(0)){
		if(JSON.stringify(lastMove_T) != JSON.stringify([-1,0]) || t.chain.length==1){
			t.dir = [1,0];
		}
	}
}
function Snake(x,y){
	this.dir = [0,0];
	this.chain = [[x,y]];
	this.move = function(){
		this.chain.push([this.chain[this.chain.length-1][0]+this.dir[0], this.chain[this.chain.length-1][1]+this.dir[1]]);
		this.chain.shift(this.chain[0]);
	}
	this.moveFood = function(){
		this.chain.push([this.chain[this.chain.length-1][0]+this.dir[0], this.chain[this.chain.length-1][1]+this.dir[1]]);
	}
	this.isCollsion = function(){
		for(var i=0; i<this.chain.length-1; i++){
			if(JSON.stringify(this.chain[this.chain.length-1]) == JSON.stringify(this.chain[i])){
				return true;
			}
		}
		return false;
	}
	this.isOutOfBounds = function(){
		return this.chain[this.chain.length-1][0]<0 || this.chain[this.chain.length-1][0]>=xBound || this.chain[this.chain.length-1][1]<0 || this.chain[this.chain.length-1][1]>=yBound;
	}
}
function Food(){
	this.pos = [0,0];
	this.genFood = function(){
		this.pos[0] = Math.floor(Math.random()*xBound);
		this.pos[1] = Math.floor(Math.random()*yBound);
		for(var i=0; i<Math.max(s.chain.length, t.chain.length); i++){
			if(i>=s.chain.length){
				if(JSON.stringify(t.chain[i]) == JSON.stringify(this.pos)){
					this.pos[0] = Math.floor(Math.random()*xBound);
					this.pos[1] = Math.floor(Math.random()*yBound);
					i=0;
				}
			}else if(i>=t.chain.length){
				if(JSON.stringify(s.chain[i]) == JSON.stringify(this.pos)){
					this.pos[0] = Math.floor(Math.random()*xBound);
					this.pos[1] = Math.floor(Math.random()*yBound);
					i=0;
				}
			}else {
				if(JSON.stringify(s.chain[i]) == JSON.stringify(this.pos) || JSON.stringify(t.chain[i]) == JSON.stringify(this.pos)){
					this.pos[0] = Math.floor(Math.random()*xBound);
					this.pos[1] = Math.floor(Math.random()*yBound);
					i=0;
				}
			}
		}
	}
}
function reset(){
	s = new Snake(0,0);
  f = new Food();
  t = new Snake(xBound-1,yBound-1);
	s.dir = [1,0];
	t.dir = [-1,0];
	lastMove_S = [0,0];
	lastMove_T = [0,0];
	f.genFood();
	isStarted = false;
}
function loaded(){
	document.getElementById("player1Score").innerHTML = "Player 1 Score: "+player1Score;
	document.getElementById("player2Score").innerHTML = "Player 2 Score: "+player2Score;
}
function snakeCollision(s,t){
	for(var i=0; i<s.chain.length-1; i++){
		if(JSON.stringify(t.chain[t.chain.length-1]) == JSON.stringify(s.chain[i])){
			return 1;
		}
	}
	for(var i=0; i<t.chain.length-1; i++){
		if(JSON.stringify(s.chain[s.chain.length-1]) == JSON.stringify(t.chain[i])){
			return 2;
		}
	}
	if(JSON.stringify(s.chain[s.chain.length-1]) == JSON.stringify(t.chain[t.chain.length-1])){
		return 0;
	}
	return -1;
}
