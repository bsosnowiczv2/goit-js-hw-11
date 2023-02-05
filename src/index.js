import { fetchImages } from './fetchImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const searchBox = document.querySelector('input');
const searchButton = document.querySelector('button');
const loadMoreButton = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
let pageNumber = 1;
searchButton.addEventListener('click', e => {
  gallery.innerHTML = '';
  pageNumber = 1;
  e.preventDefault();
  renderImages();
  loadMoreButton.style.opacity = '1';
});

function renderImages() {
  fetchImages(searchBox.value, pageNumber).then(response => {
    if (response.hits.length > 0) {
      const singleImage = response.hits.map(image => {
        const divItem = document.createElement('div');
        divItem.classList.add('photo-card');
        gallery.append(divItem);
        divItem.innerHTML = ` <a href="${image.largeImageURL}">
    <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes:</b> ${image.likes}
      </p>
      <p class="info-item">
        <b>Views:</b> ${image.views}
      </p>
      <p class="info-item">
        <b>Comments:</b> ${image.comments}
      </p>
      <p class="info-item">
        <b>Downloads:</b> ${image.downloads}
      </p>
    </div>`;
      });
      var lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
      });
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreButton.style.opacity = '0';
    }
  });
}

loadMoreButton.addEventListener('click', () => {
  pageNumber++;
  renderImages();
});
