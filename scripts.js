'use strict'

class Slider {
    constructor({ wrapper, elements, speed, activeSlides, startSlides, endSlides }) {
        this.wrapper = document.querySelector(wrapper);
        this.elements = this.wrapper.querySelectorAll(elements);
        this.speed = speed ?? 1000;
        this.activeSlides = activeSlides ?? 'fadeIn';
        this.startSlides = startSlides ?? 'fadeOut';
        this.endSlides = endSlides ?? 'fadeOut2';
        this.currentSlide = 0;
    }

    autoplaySlide() {
        this.prevSlide(this.currentSlide);

        this.currentSlide++;

        if (this.currentSlide >= this.elements.length) {
            this.currentSlide = 0;
        }

        this.nextSlide(this.currentSlide);
    }

    prevSlide(index) {
        this.elements[index].classList.remove(this.activeSlides);
        this.elements[index].classList.add(this.endSlides);

        setTimeout(() => {
            this.elements[index].classList.remove(this.endSlides);
            this.elements[index].classList.add(this.startSlides);
        }, 500);
    }

    nextSlide(index) {
        this.elements[index].classList.remove(this.startSlides);
        this.elements[index].classList.add(this.activeSlides);
    }

    startSlide() {
        setInterval(this.autoplaySlide.bind(this), this.speed);
    }

    defaultSettings() {
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', 'slider.css');

        document.head.append(style);

        this.elements.forEach(item => item.classList.add(this.startSlides));
        this.elements[0].classList.remove(this.startSlides);
        this.elements[0].classList.add(this.activeSlides);
    }

    init() {
        this.defaultSettings();
        this.startSlide();
    }
}
const slider = new Slider({
    wrapper: '.slider__items',
    elements: '.slider__item',
    speed: 2000,
    activeSlides: 'moveActive',
    startSlides: 'moveUp',
    endSlides: 'moveDown'
    // activeSlides: 'moveIn',
    // startSlides: 'moveOut',
    // endSlides: 'moveOut2'
});
slider.init();