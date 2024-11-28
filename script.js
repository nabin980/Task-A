
class Carousel {
    constructor(container, items, controls) {
      this.carouselContainer = container;
      this.carouselControl = controls;
      this.carouselArray = [...items];
      this.isDragging = false;
      this.startY = 0;
      this.dragThreshold = 50  
      this.startDragging = this.startDragging.bind(this);
      this.drag = this.drag.bind(this);
      this.stopDragging = this.stopDragging.bind(this);
      this.addDragListeners();
    }
  
    updateGallery() {
      this.carouselArray.forEach((el) => {
        el.classList.remove("gallery-item-1");
        el.classList.remove("gallery-item-2");
        el.classList.remove("gallery-item-3");
        el.classList.remove("gallery-item-4");
        el.classList.remove("gallery-item-5");
      });
  
      this.carouselArray.slice(0, 5).forEach((el, i) => {
        el.classList.add(`gallery-item-${i + 1}`);
      });
    }
  
    setCurrentState(direction) {
      if (direction === "previous") {
        this.carouselArray.unshift(this.carouselArray.pop());
      } else if (direction === "next") {
        this.carouselArray.push(this.carouselArray.shift());
      }
      this.updateGallery();
    }
  
    setControls() {
      this.carouselControl.forEach((control) => {
        const controlButton = document.createElement("button");
        controlButton.className = `gallery-controls-${control}`;
        controlButton.innerText = control;
        galleryControlsContainer.appendChild(controlButton);
      });
    }
  
    useControls() {
      const triggers = [...galleryControlsContainer.childNodes];
      triggers.forEach((control) => {
        control.addEventListener("click", (e) => {
          e.preventDefault();
          const direction = control.className.includes("previous")
            ? "previous"
            : "next";
          this.setCurrentState(direction);
        });
      });
    }
  
    addDragListeners() {
      this.carouselContainer.addEventListener("mousedown", this.startDragging);
      this.carouselContainer.addEventListener("mousemove", this.drag);
      this.carouselContainer.addEventListener("mouseup", this.stopDragging);
      this.carouselContainer.addEventListener("mouseleave", this.stopDragging);
    }
  
    startDragging(e) {
      this.isDragging = true;
      this.startY = e.type.includes("mouse") ? e.clientY : e.touches[0].clientY;
      e.preventDefault();
    }
  
    drag(e) {
      if (!this.isDragging) return;
      const currentY = e.type.includes("mouse")
        ? e.clientY
        : e.touches[0].clientY;
  
      const dragDistance = currentY - this.startY;
  
      if (Math.abs(dragDistance) >= this.dragThreshold) {
        const direction = dragDistance > 0 ? "previous" : "next";
        this.setCurrentState(direction);
        this.startY = currentY;
      }
    }
  
    stopDragging() {
      this.isDragging = false;
    }
  }
  
  const galleryContainer = document.querySelector(".gallery-container");
  const galleryControlsContainer = document.querySelector(".gallery-controls");
  const galleryControls = ["previous", "next"];
  const galleryItems = document.querySelectorAll(".gallery-item");
  
  const exampleCarousel = new Carousel(
    galleryContainer,
    galleryItems,
    galleryControls
  );
  
  exampleCarousel.setControls();
  exampleCarousel.useControls();

