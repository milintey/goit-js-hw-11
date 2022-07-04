import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const key = 'key=16216746-96549e9ee51193495a2060631';
const axiosParam = 'image_type=photo&orientation=horizontal&safesearch=true';

export async function axiosGet(query, page) {
    const url = `?${key}&q=${query}&${axiosParam}&page=${page}&per_page=40`
    const response = await axios.get(url);
    return response.data;
}