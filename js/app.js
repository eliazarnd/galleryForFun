//Import modules dor application

import customModal from './modal.js';
import Gallery from './gallery.js';


//Creating a modal from modal module
const modal = new customModal(".modal");
//Get elements from dom
const fade = document.querySelector(".fade-modal");

//Elements from components
const nextAction = document.querySelector("#next-action");
const previousAction = document.querySelector("#previous-action");

const loader = document.querySelector("#loader");

const gallery = new Gallery(".gallery-container", modal);
console.log(gallery);

nextAction.addEventListener("click", function(e){    
    modal.nextAction();
})

previousAction.addEventListener("click", function(e){
    
   modal.previousAction();
})

//Handle events

gallery.gallery_image.addEventListener("click", function(e){
    const current_image = e.target;
    modal.image = current_image;
    modal.activateModal();
    modal.setImageOnModal();   
});


fade.addEventListener("click", function(){
    modal.modal.classList.remove("active-modal");
    fade.style.display = "none";
})

