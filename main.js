img = "";
var baby = [];
status = "";
function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Monitoring...";
}
function modelLoaded() {
    console.log("Model Loaded");
    status = "true";
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    baby = results;
    if(status != "") {
        if (results.length != 0) {
            for(i=0; i < results.length; i++){
                if (results[i].label == "person") {
                    document.getElementById("status").innerHTML="Baby Detected"
                }
            }
        }
    }
}
function draw() {
    console.log(baby)
    var r = random(255);
    var g = random(255);
    var b = random(255);
    image(video, 0, 0, 640, 420);
    if (status != "") {
        objectDetector.detect(video, gotResults);
        for (j=0; j<baby.length; j++){
            fill("#FF0000");
            percent = floor(baby[j].confidence * 100);
            text(baby[j].label + " " + percent + "%", baby[j].x + 15, baby[j].y + 15);
            noFill();
            stroke("#FF0000");
            rect(baby[j].x, baby[j].y, baby[j].width, baby[j].height);
        }
    }   
}