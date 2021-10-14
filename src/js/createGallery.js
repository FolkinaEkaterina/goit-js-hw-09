export const createGallery = ({ original, preview, description }) => {
  return `<li class="galley__item">
  <a 
  class="gallery__link"
  href=${original}
  >
  <img 
  class="gallery__image"
  src=${preview}
  data-source=${original}
  alt=${description}
  />
  </a>
  </li>
  `;
};
