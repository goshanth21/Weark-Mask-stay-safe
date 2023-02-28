prediction_1 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:', ml5.version);

//create your model and store it in var classifier 
var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/U83c8xijR/model.json",modelloaded);

//define function modelLoaded
function modelloaded(){
    console.log("model has been initialized")
}
//define function check() 
function check(){
    img=document.getElementById("captured_image");
classifier.classify(img,gotResult);
}

//define function gotResult(error, results)
function gotResult(error,results){
    if(error){
        console.error(error);

    }
    else{
        console.log(results);
        if(results[0].label=="Proper Mask"){
            document.getElementById("status").innerHTML="entry accepted";
            document.getElementById("update_emoji").innerHTML="&#x1F637;";
        }
        else
        {(results[0].label=="improper mask")
            document.getElementById("status").innerHTML="entry denied";
            document.getElementById("update_emoji").innerHTML="&#x26d4;";
        }
        
    }
}
