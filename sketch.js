var ball;
var syncBall, database, position;

function setup(){
    createCanvas(500,500);
    syncBall = createSprite(250,250,10,10);
    syncBall.shapeColor = "red";

    database = firebase.database();

    var ballPos = database.ref('ball/position');
    ballPos.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(position !== undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
}

function writePosition(x,y){

    database.ref('ball/position').set({
        'x' : position.x + x,
        'y' : position.y + y
    });
}

function readPosition(data){
    position = data.val();
    syncBall.x = position.x;
    syncBall.y = position.y;
}

function showError() {
    console.log("error");
}