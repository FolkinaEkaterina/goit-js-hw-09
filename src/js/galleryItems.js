export const galleryItems = [
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const gallery = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const overlay = document.querySelector('.lightbox__overlay');
const imgLightbox = document.querySelector('.lightbox__image');
const btnLightbox = document.querySelector('button[data-action="close-lightbox"]');

const createGallery = ({ original, preview, description }) => {
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

//Создаём разметку

const markup = galleryItems.map(item => createGallery(item)).join('');
gallery.insertAdjacentHTML('beforeend', markup);

//Реализация делегирования на галерее

const openModal = event => {
  event.preventDefault();

  if (event.target === event.currentTarget) return;

  lightbox.classList.add('is-open');
  imgLightbox.src = event.target.getAttribute('data-source');
  imgLightbox.alt = event.target.alt;

  window.addEventListener('keydown', onPressEsc);
  gallery.addEventListener('keydown', onPressArrow);
};

const closeModal = () => {
  lightbox.classList.remove('is-open');
  imgLightbox.src = '';
  imgLightbox.alt = '';

  window.removeEventListener('keydown', onPressEsc);
  gallery.removeEventListener('keydown', onPressArrow);
};

const onOverlayClick = event => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

const onPressEsc = event => {
  if (event.code === 'Escape') {
    closeModal();
  }
};

const onPressArrow = event => {
  let activeIndex = galleryItems.findIndex(image => image.original === imgLightbox.src);

  if (event.code === 'ArrowRight') {
    activeIndex < galleryItems.length - 1 ? (activeIndex += 1) : 0;
  }

  if (event.code === 'ArrowLeft') {
    activeIndex > 0 ? (activeIndex -= 1) : galleryItems.length - 1;
  }

  imgLightbox.src = galleryItems[activeIndex].original;
  imgLightbox.alt = galleryItems[activeIndex].alt;
};

//Слушатели

gallery.addEventListener('click', openModal);
btnLightbox.addEventListener('click', closeModal);
overlay.addEventListener('click', onOverlayClick);
