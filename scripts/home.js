function canvas_Scroll_To_Video(){
let canvasTutorialElement = document.getElementById("canvas-tutorial")
canvasTutorialElement.addEventListener("click",
    function(){
        let element = document.getElementById("video-container")
        element.scrollIntoView({ behavior: "smooth"});
    }
)
}


canvas_Scroll_To_Video()