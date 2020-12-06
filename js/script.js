import gallery from "/js/gallery-items.js";

const galleryListRef = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".js-lightbox");
const lightboxImgRef = document.querySelector(".lightbox__image");
const closeModalBtn = document.querySelector('button[data-action="close-lightbox"]');
const overlayRef = document.querySelector(".lightbox__overlay");
let activeIndex = 0;

/*Создает разметку*/
const createGalleryList = gallery.map((element) => {
  const itemRef = document.createElement("li");
  itemRef.classList.add("gallery__item");
  const linkRef = document.createElement("a");
  linkRef.classList.add("gallery__link");
  linkRef.setAttribute("href", element.original);
  const imageRef = document.createElement("img");
  imageRef.classList.add("gallery__image");
  imageRef.setAttribute("src", element.preview);
  imageRef.setAttribute("data-source", element.original);
  imageRef.setAttribute("alt", element.description);
  imageRef.setAttribute("data-index", element.dataIndex);

  linkRef.appendChild(imageRef);
  itemRef.appendChild(linkRef);

  return itemRef;
});

galleryListRef.append(...createGalleryList);
// console.log(galleryListRef);

/* делегирование на галереи ul.js-gallery*/

galleryListRef.addEventListener("click", handleOpenModal);
closeModalBtn.addEventListener("click", handleCloseModal);
overlayRef.addEventListener("click", handleOverlayClick);

function handleOpenModal(event) {
  event.preventDefault();
  window.addEventListener("keydown", handlePressEscape);
  window.addEventListener("keydown", hadlePressArrow);

  const target = event.target;
  if (target.nodeName !== "IMG") return;

  lightboxRef.classList.add("is-open");

  const currentImg = target.dataset.source;
  const currentImgAlt = target.alt;
  const currentImgIndex = target.dataset.index;

  lightboxImgRef.setAttribute("src", currentImg);
  lightboxImgRef.setAttribute("alt", currentImgAlt);
  lightboxImgRef.setAttribute("data-index", currentImgIndex);

  activeIndex = Number(currentImgIndex);
}

function handleCloseModal() {
  window.removeEventListener("keydown", handlePressEscape);
  window.removeEventListener("keydown", hadlePressArrow);

  lightboxRef.classList.remove("is-open");

  lightboxImgRef.setAttribute("src", "");
  lightboxImgRef.setAttribute("alt", "");
  lightboxImgRef.setAttribute("data-index", "");
}

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    handleCloseModal();
  }
}

function handlePressEscape(event) {
  if (event.code === "Escape") {
    handleCloseModal();
  }
}

function hadlePressArrow(event) {
  const galleryLength = document.querySelectorAll(".gallery__item").length;

  if (event.code === "ArrowRight" && activeIndex < galleryLength - 1) {
    activeIndex += 1;
    // console.log(activeIndex);
    scrollImg(activeIndex);
  } else if (event.code === "ArrowLeft" && activeIndex > 0) {
    activeIndex -= 1;
    // console.log(activeIndex);
    scrollImg(activeIndex);
  }
}

function scrollImg(activeIndex) {
  lightboxImgRef.setAttribute("src", gallery[activeIndex].original);
  lightboxImgRef.setAttribute("alt", gallery[activeIndex].description);
}
