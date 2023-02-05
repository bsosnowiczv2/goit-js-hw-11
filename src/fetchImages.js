const searchBox = document.querySelector('input');
const axios = require('axios').default;

export async function fetchImages(name, pageNumber) {
  const response = await axios.get(
    `https://pixabay.com/api/?key=33284780-c89390efdc4f502db65b92b61&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`
  );
  const data = response.data;
  return data;
}
