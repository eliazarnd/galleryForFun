export default class customModal {

    constructor(modal, image, gallery){
        //Get elements for modal
        this.modal = document.querySelector(modal);
        this.fade = document.querySelector(".fade-modal");
        this.image = image;
        this.gallery = gallery;
        this.currentIndex = 0;
    }

    activateModal() {
        this.modal.classList.add("active-modal");
        this.fade.style.display = "block";
    }

    setImageOnModal(modal, image) {
        this.modal.firstElementChild.setAttribute("src", this.image.getAttribute("src"));
    }

    getIndexPositionGallery(gallery) {
        console.log(gallery);
        const gallery_length = gallery.length;

        for (let i = 0; i <= gallery_length; i++) {

            if (this.image === gallery[i])
                return i;
        }
    }

    nextAction(){
        this.currentIndex  = (this.currentIndex < this.gallery.length -1 )? ++this.currentIndex : 0; 
        const nextImage = this.gallery[this.currentIndex]; 
        this.modal.firstElementChild.setAttribute("src", nextImage.getAttribute("src"));    
    }

    previousAction(){
        this.currentIndex  = (this.currentIndex > 0 )? --this.currentIndex : this.gallery.length - 1; 
        const previousImage = this.gallery[this.currentIndex];
        this.modal.firstElementChild.setAttribute("src", previousImage.getAttribute("src"));
    }

}
