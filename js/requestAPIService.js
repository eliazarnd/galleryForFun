
export default class requestAPIService{

    constructor(url){
        this.url = url;
        this.response = this.getImagesFromAPI(2);
    }
    callback = (entries) =>{
        
        entries.forEach(entry => {
            console.log(entry);
            if(entry.isIntersecting){
                console.log("lazy")
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

    const images = await fetch(this.url);
    
    const imagesJson = await images.json();
   
    return imagesJson;

}

}