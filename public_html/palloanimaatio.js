
var canvas = $("#myCanvas")[0];
var ctx = canvas.getContext('2d');

var number = 0;

var pallot = [];



function ball(x, y, xVel, yVel, radius, color) {
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
    this.radius = radius;
    this.color = color;
}

ball.prototype.draw = function () {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

};

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
;

ball.prototype.move = function () {
    this.x += this.xVel;
    this.y += this.yVel;
    if (this.x + this.radius > canvas.width)
        this.xVel = -Math.abs(this.xVel);
    if (this.y + this.radius > canvas.height)
        this.yVel = -Math.abs(this.yVel);
    if (this.x - this.radius < 0)
        this.xVel = Math.abs(this.xVel);
    if (this.y - this.radius < 0)
        this.yVel = Math.abs(this.yVel);

};




function drawFrame() {
    requestAnimationFrame(drawFrame);
    clearCanvas();
    for (var i = 0; i < pallot.length; i++) {
        pallot[i].move();
        pallot[i].draw();
    }
    $("#pallojenMaara").text("" + pallot.length);


}



function addBall() {
    var xCoord = parseInt($("#xCoord").val());
    var yCoord = parseInt($("#yCoord").val());
    var xV = parseInt($("#xVel").val());
    var yV = parseInt($("#yVel").val());
    var rad = parseInt($("#rad").val());
    var col = $("#color").val();
    pallot.push(new ball(xCoord, yCoord, xV, yV, rad, col));
    var index = pallot.length;
    console.log(pallot[pallot.length - 1]);
    var vari = pallot[pallot.length - 1].color;
    addBallToList(index, vari);
    clearForm();
}

function removeBall(index) {
    pallot.splice(index - 1, 1);
    $("#pallo" + index).remove();
    updateBallData();
}

function updateBallData(i, vari) {
    $("#pallodata").empty();
    for (var i = 0; i < pallot.length; i++) {
        var numero = i + 1;
        var vari = pallot[i].color;
        addBallToList(numero, vari);
    }
}

function addBallToList(index, vari) {
    var div = document.createElement('div');
    $(div).attr('id', index);
    $(div).attr('style', 'width: 100%; background-color: ' + vari + ';');
    $(div).addClass('listattuPallo');
    var nappula = document.createElement('button');
    $(nappula).attr('onClick', "removeBall(" + index + ");");
    $(nappula).append("Poista");
    var innerDiv = document.createElement("div");
    $(innerDiv).append("Pallo " + index);
    $(innerDiv).addClass('palloTeksti');
    $(div).append(innerDiv);
    $(div).append(nappula);
    $("#pallodata").append(div);

}

function clearForm() {
    $("#xCoord").val('');
    $("#yCoord").val('');
    $("#xVel").val('');
    $("#yVel").val('');
    $("#rad").val('');
    $("#color").val('');
}

function randomFillForm() {
    $("#xCoord").val(Math.floor(Math.random() * canvas.width));
    $("#yCoord").val(Math.floor(Math.random() * canvas.height));
    $("#xVel").val(Math.floor(Math.random() * 8) + 1);
    $("#yVel").val(Math.floor(Math.random() * 8) + 1);
    $("#rad").val(Math.floor(Math.random() * 45) + 5);
    var intColor = Math.floor(Math.random() * 256 * 256 * 256);
    var colorString = intColor.toString(16);
    if (colorString.length < 6)
        colorString = '0' + colorString;
    $("#color").val('#' + colorString);
}

function randomBall() {
    randomFillForm();
    addBall();
}

drawFrame();








