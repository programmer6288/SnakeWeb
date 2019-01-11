document.getElementById('startButton').style.display = "block";
document.getElementById('scoreInfo').style.display = "none";
var squareSize = 15;
var xBound = 54;
var yBound = 30;
var s = new Snake(0,0);
var f = new Food();
var lastMoved = [0,0];
var isStarted = false;
var canvas;
var currentScore = 1;
var bestScore = 1;
f.genFood();
function doClick(){
	var up = document.getElementById('up').value;
	var down = document.getElementById('down').value;
	var left = document.getElementById('left').value;
	var right = document.getElementById('right').value;
	if(up==down || up==left || up==right || down==left || down==right || left==right){
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
	if(isStarted){
		canvas.style.display = "block";
		document.getElementById('scoreInfo').style.display = "inline-block";
		clear();
		currentScore = s.chain.length;
		if(currentScore>bestScore){
			bestScore = currentScore;
		}
		loaded();
		background(255, 204, 0);
		fill(0);
		for(var i=0; i<s.chain.length; i++){
			rect(s.chain[i][0]*squareSize+1,s.chain[i][1]*squareSize+1,squareSize-2,squareSize-2);
		}
		if(s.isCollsion() || s.isOutOfBounds()){
			alert("GAME OVER: Press \"Play Game\" if you want to play again.");
			reset();
			draw();
			isStarted = false;
		}
		fill(111);
		rect(f.pos[0]*squareSize+1, f.pos[1]*squareSize+1, squareSize-2, squareSize-2);
		if(JSON.stringify(s.chain[s.chain.length-1]) == JSON.stringify(f.pos)){
			s.moveFood();
			f.genFood();
		}else{
			s.move();
		}
		lastMoved = s.dir;
		frameRate(15);
	}else{
		canvas.style.display = "none";
	}
}
function keyPressed(){
	if(isStarted){
		if(keyCode === document.getElementById('up').value.toUpperCase().charCodeAt(0)){
			if(JSON.stringify(lastMoved) != JSON.stringify([0,1]) || s.chain.length==1){
				s.dir = [0,-1];
			}
		}else if(keyCode === document.getElementById('down').value.toUpperCase().charCodeAt(0)){
			if(JSON.stringify(lastMoved) != JSON.stringify([0,-1]) || s.chain.length==1){
				s.dir = [0,1];
			}
		}else if(keyCode === document.getElementById('left').value.toUpperCase().charCodeAt(0)){
			if(JSON.stringify(lastMoved) != JSON.stringify([1,0]) || s.chain.length==1){
				s.dir = [-1,0];
			}
		}else if(keyCode === document.getElementById('right').value.toUpperCase().charCodeAt(0)){
			if(JSON.stringify(lastMoved) != JSON.stringify([-1,0]) || s.chain.length==1){
				s.dir = [1,0];
			}
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
		for(var i=0; i<s.chain.length; i++){
			if(JSON.stringify(s.chain[i]) == JSON.stringify(this.pos)){
				this.pos[0] = Math.floor(Math.random()*xBound);
				this.pos[1] = Math.floor(Math.random()*yBound);
				i=0;
			}
		}
	}
}
function loaded(){
	document.getElementById("bestScore").innerHTML = "Best Score: "+bestScore;
	document.getElementById("currentScore").innerHTML = "Current Score: "+currentScore;
}
function reset(){
	s = new Snake(0,0);
  f = new Food();
	currentScore = 1;
	f.genFood();
}
