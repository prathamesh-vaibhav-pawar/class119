timer_count = 0
timer_check = ""
drawn_image = ""
answer_holder = ""
score = 0
canvas_image = ""
function Draw_thing(){
    Things_to_draw = ["moon","sweater","pants","triangle","pizza slice","circle","clock","cloud"]
    random_no = Things_to_draw[Math.floor((Math.random()*Things_to_draw.length))]
    document.getElementById("Things").innerHTML =random_no  
    console.log(random_no)
    canvas_image = random_no
    console.log(random_no)
}
function setup(){
    canvas = createCanvas(300,300)
    canvas.center()
    canvas.mouseReleased(ClassifyItems)
    background("white")
    Syth = window.SpeechSynthesis
}
function Check_sketch(){
    timer_count = timer_count+1
    document.getElementById("timer").innerHTML = timer_count
    if(timer_count > 500){
        timer_count = 0
        timer_check = "time over"
        if(canvas_image == random_no){
            drawn_image = "set"
            Things_to_draw = ["moon","sweater","pants","triangle","pizza slice","circle","clock","cloud"]
            random_no = Things_to_draw[Math.floor((Math.random()*Things_to_draw.length))]
            document.getElementById("Things").innerHTML =random_no  
            console.log(random_no)
        }
    }
    if(timer_check == "time over"){
        Update_Canvas()
        timer_check = ""
        Things_to_draw = ["moon","sweater","pants","triangle","pizza slice","circle","clock","cloud"]
        random_no = Things_to_draw[Math.floor((Math.random()*Things_to_draw.length))]
        document.getElementById("Things").innerHTML =random_no  
        console.log(random_no)
    }
}
function Update_Canvas(){
    background("white")
}
function draw(){
    strokeWeight(3)
    stroke('black')
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY)
    }
    Check_sketch()
}
function preload(){
    classifier = ml5.imageClassifier('DoodleNet')
}
function ClassifyItems(){
    classifier.classify(canvas,gotResult)
}
function gotResult(error,result){
    if(error){
        console.error(error)
    }
    else{
        console.log(result)
        document.getElementById("label").innerHTML = "label:"+ result[0].label
        document.getElementById("confi").innerHTML = "Confidence" + (result[0].confidence*100).toFixed(2)
        utterThis = new SpeechSynthesisUtterance(result[0].label)
        Syth.speak(utterThis)
    }
}
