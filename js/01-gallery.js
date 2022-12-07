import { galleryItems } from "./gallery-items.js";
// Change code below this line

const refs = {
  imageContainer: document.querySelector(".gallery"),
  body: document.body,
};

function makeGalleryItems(items) {
  return items
    .map(({ preview, description, original }) => {
      return `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
      <img loading="lazy" width="354" height="240"
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>`;
    })
    .join("");
}

const cardsGalleryMarkup = makeGalleryItems(galleryItems);
refs.imageContainer.insertAdjacentHTML("beforeend", cardsGalleryMarkup);

const createModalWindow = (imageAdress) => {
  window.instance = basicLightbox.create(
    `
      <img src="${imageAdress}">
  `,
    {
      onShow: () => window.addEventListener("keydown", closeModalWindowByEsc),
      onClose: () => {
        window.removeEventListener("keydown", closeModalWindowByEsc);
        refs.body.classList.remove("disable-scroll");
      },
    }
  );
  return instance;
};

refs.imageContainer.addEventListener("click", onClickOpenModal);

function onClickOpenModal(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  const imgOriginalRef = event.target.dataset.source;
  createModalWindow(imgOriginalRef).show();
  refs.body.classList.add("disable-scroll");
}

function closeModalWindowByEsc(event) {
  const ESC_KEY_CODE = "Escape";
  if (event.code === ESC_KEY_CODE && instance.visible()) {
    instance.close();
    refs.body.classList.remove("disable-scroll");
  }
}

const lazyImg = refs.imageContainer.querySelectorAll(".gallery__image");

lazyImg.forEach((image) =>
  image.addEventListener("load", onImageLoaded, { once: true })
);

function onImgLoaded(event) {
  event.target.classList.add("appear");
}

lazyImg.forEach((image) => image.addEventListener("mouseenter", onMouseEnter));

function onMouseEnter(event) {
  event.target.style.transitionDelay = "100ms";
  event.target.style.transitionDuration = "500ms";
}
