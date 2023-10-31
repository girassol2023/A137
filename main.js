video = "";
objects = [];
status = "";

function preload() {
    video = createVideo('video.mp4');
    
}


function setup() {
    canvas = createCanvas(480,380);
    canvas.center();
    video.hide();
}



function Start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detectando Objetos";
}

function modelLoaded() {
    console.log("Model Carregado")
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
    console.log("oi");
    if (error) {
        console.log(error);
  
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0, 0, 480, 480);
    if (status != "") {
        console.log("bom dia");
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: objetos detectados";
            document.getElementById("numberObjects").innerHTML = "Quantidade de Objetos Detectados:" + objects.length;
        
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " "+ percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height );
        }
    }
}