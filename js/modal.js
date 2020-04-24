 import {credentials} from './credentials.js';


//Get elements from dom
const gallery_image = document.querySelector(".gallery-container");
let gallery_images;
const modal = document.querySelector(".modal");
const fade = document.querySelector(".fade-modal");
let index = 0;

//Elements from components
const nextAction = document.querySelector("#next-action");
const previousAction = document.querySelector("#previous-action");

const loader = document.querySelector("#loader");



//Observer for implementing lazy loading
let page = 2;

const callback = (entries) =>{
    entries.forEach(entry => {
        console.log(entry);
        if(entry.isIntersecting){
            console.log("lazy")
            if(gallery_images.length < 100){
                
                getImagesFromAPI(page++);
            }else{
                console.log("Has superado el limite");
            }
            
        }
    });
} 

const createObserver = () =>{
    const options = {
        threshold: 0.5 
    }

    const observer = new IntersectionObserver(callback, options);

    observer.observe(gallery_image.lastElementChild);
}



async function getImagesFromAPI(page = 1){

    const images = await fetch(`https://pixabay.com/api/?key=${credentials.API_KEY}&q=cats&per_page=5&page=${page}`);
    const imagesJson = await images.json();
    console.log(imagesJson);

    for (const images in imagesJson.hits) {
            
            let divFade = document.createElement("div");
            divFade.classList.add("fade");
            let image = document.createElement("img");
            image.setAttribute("src", imagesJson.hits[images].largeImageURL);
            divFade.appendChild(image);
            gallery_image.appendChild(divFade);
    }
    gallery_images = document.querySelectorAll(".fade > img");
    createObserver();
    loader.style.display = "none";
}
   
getImagesFromAPI();

nextAction.addEventListener("click", function(e){
    
    index  = (index < gallery_images.length -1 )? ++index : 0; 
    
    const nextImage = gallery_images[index];
  
    modal.firstElementChild.setAttribute("src", nextImage.getAttribute("src"));
    

})


previousAction.addEventListener("click", function(e){
    
    index  = (index > 0 )? --index : gallery_images.length - 1; 
    
    const previousImage = gallery_images[index];

    modal.firstElementChild.setAttribute("src", previousImage.getAttribute("src"));
    
})

//Handle events

window.addEventListener("load", function(){
    
});

function getIndexPositionGallery(image, gallery){

    const gallery_length = gallery.length;

    for(let i = 0; i <= gallery_length; i++){

        if(image === gallery[i])
            return i;
    }

}

gallery_image.addEventListener("click", function(e){
    
    const current_image = e.target;
    gallery_images = document.querySelectorAll(".fade > img");
    activateModal(modal);   
    setImageOnModal(modal, current_image); 
    index = getIndexPositionGallery(current_image, gallery_images);
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


