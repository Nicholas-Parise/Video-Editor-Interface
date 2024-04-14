var activePanel = ""; // media, text, effects, transition
var activeProperty = "" // Text, effect
var time = 0;
var head = false;
var settingsOpen = false;

setInterval(updateTime, 700);

function deselectComponentPanels(){
    const components = document.querySelectorAll(".component");
    console.log(components.length)
    for(var component of components){
        component.style.borderRight = "";
    }
    document.getElementById("componentMenu").style.minWidth = "79px";
}

function hideAllComponentPanels(){
    const panels = document.querySelectorAll(".componentPanel");
    console.log(panels.length)
    for(var panel of panels){
        panel.style.display = "none";
    }
}



function hideAllPropertyPanels(){
    const panels = document.querySelectorAll(".propertyPanels");
    console.log(panels.length)
    for(var panel of panels){
        panel.style.display = "none";
    }
}


function deselectAllTimeLine(){
    const panels = document.querySelectorAll(".timelineElement");
    console.log(panels.length)
    for(var panel of panels){
        panel.style.outline = "none";
    }
}



function settingsMenu(){
    if (settingsOpen){
        removeSettingsMenu()
    }
    else{
        settingsOpen = true;
        document.getElementById("settingsMenu").style.display = "block";
    }
}

function removeSettingsMenu(){
    settingsOpen = false;
    document.getElementById("settingsMenu").style.display = "none";
}




function timelineSelect(id){
    deselectAllTimeLine();
    document.getElementById(id).style.outline = "3px solid red";
}


function toggleHead(){
    let playHeadState = document.getElementsByClassName("playHead")[0]
    if (playHeadState.style.animationPlayState==="running"){
        playHeadState.style.cssText = "margin-left: -0.5%;";
        playHeadState.style.animationPlayState = "paused";
        document.getElementById("togglePlaybackButton").className = "glyphicon glyphicon-play";
        head = false;
    }
    else{
        playHeadState.style.cssText = "margin-left: -0.5%;";
        playHeadState.style.animationPlayState = "running";
        document.getElementById("togglePlaybackButton").className = "glyphicon glyphicon-pause";
        head = true;
    }
}

function stopHead(){
    document.getElementsByClassName("playHead")[0].style.cssText = "margin-left: -0.5%;";  
    document.getElementsByClassName("playHead")[0].style.animation  = "none";
    document.getElementsByClassName("playHead")[0].offsetHeight;
    document.getElementsByClassName("playHead")[0].style.animation  = null;
    document.getElementsByClassName("playHead")[0].style.animationPlayState = "paused";
    document.getElementById("togglePlaybackButton").className = "glyphicon glyphicon-play";

    head = false;
    time = 0;
    setTime();
}


function skipBackward(){
    document.getElementsByClassName("playHead")[0].style.cssText = "margin-left: -0.5%;";
    document.getElementsByClassName("playHead")[0].style.animation  = "none";
    document.getElementsByClassName("playHead")[0].offsetHeight;
    document.getElementsByClassName("playHead")[0].style.animation  = null;
    if (head){
        document.getElementsByClassName("playHead")[0].style.animationPlayState = "running";
    }
    time = 0;
    setTime();
}

function skipForward(){
    document.getElementsByClassName("playHead")[0].style.cssText = "margin-left: 95% !important"; // Hacky way of stopping head animation at the end
    document.getElementsByClassName("playHead")[0].style.animation = "none";
    document.getElementsByClassName("playHead")[0].offsetHeight;
    document.getElementsByClassName("playHead")[0].style.animation  = null;
    document.getElementsByClassName("playHead")[0].style.animationPlayState = "paused";
    document.getElementById("togglePlaybackButton").className = "glyphicon glyphicon-play";

    head = false;
    time = 97;
    setTime();
}



function togglePropertyPanel(panel){

    hideAllPropertyPanels();

    switch(panel){
        case "text":
            document.getElementById("textProperties").style.display = "block"; // show panel
            break;

        case "video":
            document.getElementById("videoProperties").style.display = "block"; // show panel
            break;

        case "audio":
            document.getElementById("audioProperties").style.display = "block"; // show panel
            break;

        case "transition":
            document.getElementById("transitionProperties").style.display = "block"; // show panel
            break;
    }
}







function toggleComponentPanel(panel){
    if(activePanel === panel){
        deselectComponentPanels();
        activePanel = "";
        document.getElementById("expandingComponentPanel").style.display = "none"; // hide expandable menu
    }
    else{
        hideAllComponentPanels();
        deselectComponentPanels();
        document.getElementById("componentMenu").style.minWidth = "330px";
        document.getElementById("expandingComponentPanel").style.display = "block"; // show expandable menu
        if(panel === "media"){
            document.getElementById("mediaPanel").style.display = "block"; // show panel
            document.getElementById("mediaComponent").style.borderRight = "thick solid white"; // show selection with div
            activePanel = "media";
        }
        else if(panel === "text"){
            document.getElementById("textPanel").style.display = "block"; // show panel
            document.getElementById("textComponent").style.borderRight = "thick solid white"; // show selection with div
            activePanel = "text";
        }
        else if(panel === "effects"){
            document.getElementById("effectsPanel").style.display = "block"; // show panel
            document.getElementById("effectsComponent").style.borderRight = "thick solid white"; // show selection with div
            activePanel = "effects";
        }
        else if(panel === "transition"){
            document.getElementById("transitionsPanel").style.display = "block"; // show panel
            document.getElementById("transitionsComponent").style.borderRight = "thick solid white"; // show selection with div
            activePanel = "transition";
        }
    }
}

function helpToggle(){
    helpbtn = document.getElementById("helpbtn");
    if (helpbtn.className === "helpbtn"){
        helpbtn.className = "helpbtn active";
        tooltips = [...document.getElementsByClassName("tooltip")]; //spread operator (...)! It turns this classlist into an array :p
        tooltips.forEach(element => {
            element.style.visibility = "visible";
            element.style.opacity = "1";
        });
    }
    else{
        helpbtn.className = "helpbtn";
        tooltips = [...document.getElementsByClassName("tooltip")]; //spread operator (...)! It turns this classlist into an array :p
        tooltips.forEach(element => {
            element.style.visibility = "hidden";
            element.style.opacity = "0";
        });
    }
}

function load(){
    // Add shortcuts to this listener
    document.addEventListener('keydown', function(event) {
    
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            alert("Saved");
        }
        if (event.shiftKey && event.ctrlKey && event.key === 'Z'){
            alert("redo last action");
        }
        if (event.ctrlKey && event.key === 'z') {
            alert("undo last action");
        }

    });
    
    setProjectTitleFromURLParams();
}

function setProjectTitleFromURLParams(){
    const urlParams = new URLSearchParams(window.location.search);
    var title = urlParams.get("title");
    if(title === null){
        title = "My Project";
    }
    document.getElementById("titleContainer").value = title;
}

function setAspectRatioFromURLParams(){
    const urlParams = new URLSearchParams(window.location.search);
    var ratioX = urlParams.get("ratioX");
    var ratioY = urlParams.get("ratioY");
    if(ratioX === null || ratioY === null){
        resizeCanvasByRatio(16,9);
    }
    else{
        resizeCanvasByRatio(ratioX,ratioY);
    }
}

function resizeCanvasByRatio(widthRatio, heightRatio){
    var canvas = document.getElementById("previewCanvas");
    var ctx = canvas.getContext("2d");
    //var width = canvas.getBoundingClientRect().width;
    //var height = canvas.getBoundingClientRect().height;
    const scalarLimitWidth = 800;
    const scalarLimitHeight = 600;
    const ratio = Math.max(widthRatio, heightRatio);
    var scalar;
    if(Number(widthRatio) > Number(heightRatio)){
        scalar = scalarLimitWidth/ratio;
    }
    else{
        scalar = scalarLimitHeight/ratio;
    }
    var width = scalar*widthRatio;
    var height = scalar*heightRatio;
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
}


/**
 * simple helper method to easily set the time of the view time 
 */
function setTime(){
    
    var minute = Math.floor(time / 60);
    var second = time % 60;
    var text = "";

    if(minute<10){
        text += "0"
    }

    text = text + minute + ":";

    if(second<10){
        text += "0"
    }
    text = text + second + " / 01:37";
    document.getElementById("viewTime").textContent = text;
}



function updateTime(){
if(head)
    time++;

    setTime(time);
}


// creating input on-the-fly
function selectFile(){
    var input = $(document.createElement("input"));
    input.attr("type", "file");
    // add onchange handler if you wish to get the file
    input.on("change", function () {
        alert("Media Added: " + this.files[0].name);
    }).click(); // opening dialog
    return false; // avoiding navigation
}
