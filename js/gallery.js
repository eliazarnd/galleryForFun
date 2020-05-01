
import {credentials} from './credentials.js';
import requestAPIService from "./requestAPIService.js";
import customModal from './modal.js';

export default class Gallery{

    constructor(gallery, customModal){
        this.gallery_image = document.querySelector(gallery);
        this.customModal = customModal;
        this.credentials = credentials;
        this.getImagesFromAPI();
        this.page = 2;
    }

    callback = (entries) =>{
        
        entries.forEach(entry => {
            
            if(entry.isIntersecting){
                if(this.gallery_images.length < 100){         
                    this.getImagesFromAPI(this.page++);
                }else{
                    console.log("Has superado el limite");
                }
                
            }
        });
} 

createObserver = () =>{
    const options = {
        threshold: 0.5 
    }

    const observer = new IntersectionObserver(this.callback, options);

    observer.observe(this.gallery_image.lastElementChild);
}
    
async getImagesFromAPI(page = 1){
    debugger;
    const url = `https://pixabay.com/api/?key=${this.credentials.API_KEY}&q=dogs&per_page=5&page=${this.page}`;    
    
    const API = new requestAPIService(url);
    
    const images = await API.getImagesFromAPI(page);

    this.renderImageFromAPI(images);

    
}

async getImagesFromAPIService(page = 1){

    const url = `https://pixabay.com/api/?key=${this.credentials.API_KEY}&q=sports&per_page=5&page=${this.page}`;    
    
    const API = new requestAPIService(url);
    
    const images = await API.getImagesFromAPI(page);

    this.renderImageFromAPI(images);

}

    renderImageFromAPI(images){
        
        for (const img in images.hits) {                
            let divFade = document.createElement("div");
            divFade.classList.add("fade");
            let image = document.createElement("img");
            image.setAttribute("src", images.hits[img].largeImageURL);
            divFade.appendChild(image);
            this.gallery_image.appendChild(divFade);
        }

        this.gallery_images = document.querySelectorAll(".fade > img");
        this.customModal.gallery = this.gallery_images;
        this.createObserver();
        loader.style.display = "none";
}


}