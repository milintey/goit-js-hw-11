import axios from 'axios';
import { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { axiosGet } from '../src/axios.js';

let page = 1;
let input = '';
const searchForm = document.querySelector('.search-form');
const submitBtn = document.querySelector('.submit__btn');
const loadBtn = document.querySelector('.load-more');
const divGallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSubmitForm);

loadBtn.addEventListener('click', onMore);

loadBtn.hidden = true;

function onMore() {
    page += 1;
    payse();
}


function onSubmitForm(event) {
    event.preventDefault();
    divGallery.innerHTML = "";
    page = 1;
    const form = event.currentTarget;
    input = form.elements.searchQuery.value.trim();

    loadBtn.hidden = false;

    payse();
    
    
    searchForm.reset();
}

async function payse() {
        await axiosGet(input, page).then(images => divGallery.insertAdjacentHTML('beforeend', onCardsMarkup(images)));
    }

// .then(response => divGallery.insertAdjacentHTML('beforeend', onCardsMarkup(response.data.hits)));



// async function axiosGet(name, page) {
//     await axios.get(`https://pixabay.com/api/?key=16216746-96549e9ee51193495a2060631&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`).then(response => console.log(response.data));
// }

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
















// axios.defaults.baseURL = "https://pixabay.com/api/";
// axios.defaults.API_KEY = 'key=16216746-96549e9ee51193495a2060631';
// axios.defaults.queryString =
//   '&image_type=photo&orientation=horizontal&safesearch=false&per_page=40';

// async function fetchImages(input, page) {
//   const search = encodeURIComponent(input);
//   const url = `?${axios.defaults.API_KEY}${axios.defaults.queryString}&q=${search}&page=${page}`;
//   const response = await axios.get(url);
//   return response.data;
// }






// const baseURL = "https://pixabay.com/api/";
// const keyAPI = "16216746-96549e9ee51193495a2060631";

// const options = {
//     key: keyAPI,
//     q: "cat",
//     image_type: "photo",
//     orientation: "horizontal",
//     safesearch: true,
//     page: 1,
//     per_page: 20,
// }

// fetch(baseURL, options).then(response => response.json).catch(error => console.log(error));