//Get elements from dom

const gallery_image = document.querySelector(".gallery-container");
const modal = document.querySelector(".modal");
const fade = document.querySelector(".fade-modal");

//Handle events

gallery_image.addEventListener("click", function(e){
    
    const current_image = e.target;
    activateModal(modal);   
    setImageOnModal(modal, current_image); 
});

fade.addEventListener("click", function(){
    modal.classList.remove("active-modal");
    fade.style.display = "none";
})


function activateModal(modal){
    modal.classList.add("active-modal");
    fade.style.display = "block";
}

function setImageOnModal(modal, image){
    modal.firstElementChild.setAttribute("src", image.getAttribute("src"));
}


