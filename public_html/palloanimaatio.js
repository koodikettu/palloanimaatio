
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
    var str = "<div id=\"" + index + "\" class=\"pallolista\">";
    str += "<span style=\"background: " + vari + ";\">Pallo " + index + " </span> ";
    str += "<button onclick=\"removeBall(" + index + ")\">Poista</button></div>";
//    console.log("<div id=\"pallo" + index + "\" class=\"pallolista\">Pallo " + index + " <button onclick=\"poistaPallo(" + index + ")\">Poista</button></div>");
    $("#pallodata").append(str);

    clearForm();
}

function removeBall(index) {
    pallot.splice(index - 1, 1);
    $("#pallo" + index).remove();
    updateBallData();
}

function updateBallData() {
    $("#pallodata").empty();
    for (var i = 0; i < pallot.length; i++) {
        var numero = i + 1;
        var tunnus = 'pallo' + numero;
        var vari = pallot[i].color;
        var str = "<div id=\"" + tunnus + "\" class=\"pallolista\">";
        str += "<span style=\"background: " + vari + ";\">Pallo " + numero + " </span> ";
        str += "<button onclick=\"removeBall(" + numero + ")\">Poista</button></div>";
        $("#pallodata").append(str);

    }
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








//ctx.fillRect(0,0,canvas.width,canvas.height);