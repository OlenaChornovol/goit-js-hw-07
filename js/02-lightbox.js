import { galleryItems } from "./gallery-items.js";
import { addGalleryItems } from "./addGallery-items.js";
// Change code below this line
const newGalleryItems = [...galleryItems, ...addGalleryItems];

const refs = {
  imageContainer: document.querySelector(".gallery"),
  body: document.body,
};

const cardGalleryMarkup = makeGalleryItems(newGalleryItems);

refs.imageContainer.insertAdjacentHTML("beforeend", cardGalleryMarkup);

function makeGalleryItems(items) {
  return items
    .map(({ preview, description, original }) => {
      return `<li class="gallery__item"><a class="gallery__link" href="${original}">
  <img loading="lazy" width="354" height="240" class="gallery__image" src="${preview}" alt="${description}" />
</a></li>`;
    })
    .join("");
}

const lightBox = simpleLightBox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
  scrollZoom: false,
});

lightBox.on("shown.simpleLightBox", function () {
  refs.body.classList.add("disable-scroll");
});
lightBox.on("closed.simpleLightBox", function () {
  refs.body.classList.remove("disable-scroll");
});

const lazyImg = refs.imageContainer.querySelectorAll(".gallery__image");

lazyImg.forEach((image) =>
  image.addEventListener("load", onImageLoaded, { once: true })
);

function onImageLoaded(event) {
  event.target.classList.add("appear");
}

lazyImg.forEach((image) => image.addEventListener("mouseenter", onMouseEnter));

function onMouseEnter(event) {
  event.target.style.transitionDelay = "100ms";
  event.target.style.transitionDuration = "500ms";
}
