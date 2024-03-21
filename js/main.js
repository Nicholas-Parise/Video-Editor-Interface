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



function pauseHead(){    
    document.getElementsByClassName("playHead")[0].style.animationPlayState  = "paused";
}

function playHead(){    
    document.getElementsByClassName("playHead")[0].style.animationPlayState  = "running";
}

function stopHead(){    
    document.getElementsByClassName("playHead")[0].style.animation  = "none";
    document.getElementsByClassName("playHead")[0].offsetHeight;
    document.getElementsByClassName("playHead")[0].style.animation  = null;
    
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