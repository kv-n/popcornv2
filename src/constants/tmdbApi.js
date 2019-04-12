import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../config'

export const apiSearch = search =>
  fetch(`${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`).json()
