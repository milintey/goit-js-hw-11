import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { axiosGet } from '../src/axios.js';

let page = 1;
let input = '';
let imagesArray = '';


const searchForm = document.querySelector('.search-form');
const loadBtn = document.querySelector('.load-more');
const divGallery = document.querySelector('.gallery');
const submitBtn = document.querySelector('.submit__btn');
const divScroll = document.querySelector('.scroll');

searchForm.addEventListener('submit', onSubmitForm);
loadBtn.addEventListener('click', onMore);

loadBtn.hidden = true;
loadBtn.classList.remove('load-more');

function onMore() {
    onPage();
    payse();
}


async function onSubmitForm(event) {
    event.preventDefault();
    divGallery.innerHTML = "";
    page = 1;
    const form = event.currentTarget;
    input = form.elements.searchQuery.value.trim();
  
    loadBtn.hidden = true;
    loadBtn.classList.remove('load-more');

    await payse();

    if (input === "") {
      divGallery.innerHTML = "";
      loadBtn.hidden = true;
      loadBtn.classList.remove('load-more');
    }
    
    searchForm.reset();
}

async function payse() {
    await axiosGet(input, page).then(images => {
      imagesArray = images.hits;
      const totalHits = images.totalHits;

      if (imagesArray.length === 0) {
        loadBtn.hidden = true;
        loadBtn.classList.remove('load-more');
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      } else if (page === 13) {
        divGallery.insertAdjacentHTML('beforeend', onCardsMarkup(imagesArray));
        loadBtn.hidden = true;
        loadBtn.classList.remove('load-more');
        return Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
      }

      loadBtn.hidden = false;
      loadBtn.classList.add('load-more');
      divGallery.insertAdjacentHTML('beforeend', onCardsMarkup(imagesArray));

      if (page === 1 && input !== "") {
        return Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      }
    });
  
    
    
    const lightbox = new SimpleLightbox('.photo-card .gallery__link', { captionsData: 'alt', captionDelay: '250' });
    lightbox.refresh();
}


function onCardsMarkup(card) {
    return card.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
  <a class="gallery__link" href=${largeImageURL}>
      <img class="gallery__image" src='${webformatURL}' alt='${tags}' loading="lazy" width="300" height="200"/>
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`}).join('');
}

function onPage() {
    page += 1;
}







// const options = {
//   rootMargin: '200px',
//   threshold: 1.0,
// };


// const observer = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//     if (input === '') {
//       return;
//     }

//     if (entry.isIntersecting) {
//       onPage();
//       payse();
//     }
//   });
// }, options);

// observer.observe(divScroll);