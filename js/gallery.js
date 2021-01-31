import items from "./gallery-items.js"

const ulGalleryRef = document.querySelector('.js-gallery');
const openModal = document.querySelector('.lightbox');
const changeImageSrc = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector('button[data-action="close-lightbox"]');
const closeOverlayRef = document.querySelector('.lightbox__overlay');

const arrItems = items.map(item => 
    `<li class="gallery__item"><a
    class="gallery__link" href="${item.original}"><img class="gallery__image" src="${item.preview}" data-source="${item.original}" alt="${item.description}"/></a>
</li>`).join('');
ulGalleryRef.insertAdjacentHTML("afterbegin", arrItems);
ulGalleryRef.addEventListener('click', onImageClick);
closeModalBtn.addEventListener('click', closeModal);
closeOverlayRef.addEventListener('click', closeOverlay);

function onImageClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') return;
    openModal.classList.add('is-open');
    const imageUrl = event.target.dataset.source;
    const imageAlt = event.target.alt;
    changeImageSrc.setAttribute('src', imageUrl);
    changeImageSrc.setAttribute('alt', imageAlt);
    window.addEventListener('keyup', isEscape);
}

function closeModal(event) {
    event.preventDefault();
    openModal.classList.remove('is-open');
    changeImageSrc.setAttribute('src', '');
    changeImageSrc.setAttribute('alt', '');
    window.removeEventListener('keyup', isEscape);
}

function closeOverlay(event) {
    event.preventDefault();
    if (event.target === event.currentTarget) {
        openModal.classList.remove('is-open');
    }
}

function isEscape(event) {
    if (event.code === 'Escape') {
        openModal.classList.remove('is-open');;
    }
}