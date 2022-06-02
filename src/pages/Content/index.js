chrome.runtime.onMessage.addListener(function(msg, sender){
    if(msg === "toggle"){
        console.log("message received");
        toggle();
    }
})

var iframe = document.createElement('iframe'); 
iframe.style.background = "white";
iframe.style.height = "100%";
iframe.style.width = "0px";
iframe.style.position = "fixed";
iframe.style.top = "0px";
iframe.style.right = "0px";
iframe.style.zIndex = "9000000000000000000";
iframe.style.border = "0px"; 
iframe.style.transition = "width 0.1s ease 0s"
iframe.src = chrome.runtime.getURL("popup.html")

document.body.appendChild(iframe);

function toggle(){
    if(iframe.style.width === "0px"){
        iframe.style.width="350px";
    }
    else{
        iframe.style.width="0px";
    }
}
