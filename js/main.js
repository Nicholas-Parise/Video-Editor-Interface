var activePanel = ""; // media, text, effects, transition
var activeProperty = "" // Text, effect

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
    document.getElementById("settingsMenu").style.display = "block";
}

function removeSettingsMenu(){
    document.getElementById("settingsMenu").style.display = "none";
}




function timelineSelect(id){
    deselectAllTimeLine();
    document.getElementById(id).style.outline = "2px solid white";
}


function toggleHead(){
    let playHeadState = document.getElementsByClassName("playHead")[0]
    if (playHeadState.style.animationPlayState==="running"){
        playHeadState.style.animationPlayState = "paused";
        document.getElementById("togglePlaybackButton").className = "glyphicon glyphicon-play";
    }
    else{
        playHeadState.style.animationPlayState = "running";
        document.getElementById("togglePlaybackButton").className = "glyphicon glyphicon-pause";
    }
}

function stopHead(){    
    document.getElementsByClassName("playHead")[0].style.animation  = "none";
    document.getElementsByClassName("playHead")[0].offsetHeight;
    document.getElementsByClassName("playHead")[0].style.animation  = null;
    document.getElementsByClassName("playHead")[0].style.animationPlayState = "paused";
    document.getElementById("togglePlaybackButton").className = "glyphicon glyphicon-play";
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