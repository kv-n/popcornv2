import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config';
import HeroImage from '../Hero/HeroImage';
import SearchBar from '../Search/SearchBar';
import Grid from '../../Components/Grid/Grid';
import MovieThumb from '../MovieThumb/MovieThumb';
import LoadMoreBtn from '../LoadMore/LoadMore';
import Spinner from '../Spinner/Spinner';

import './Home.css';

class Home extends Component {



  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ''
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementsByClassName('rmdb-home')[0];
    if (this.isBottom(wrappedElement)) {
      this.loadMoreItems()
      // document.removeEventListener('scroll', this.trackScrolling);
    }
  };

  componentDidMount() {
    if (sessionStorage.getItem('HomeState')) {
      let state = JSON.parse(sessionStorage.getItem('HomeState'))
      this.setState({ ...state })
    } else {
      this.setState({ loading: true })
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      this.fetchItems(endpoint);
    }
    document.addEventListener('scroll', this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }



  searchItems = (searchTerm) => {
    let endpoint = '';
    this.setState({
      movies: [],
      loading: true,
      searchTerm
    })

    if (searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
  }

  loadMoreItems = () => {
    // ES6 Destructuring the state
    const { searchTerm, currentPage } = this.state;

    let endpoint = '';
    this.setState({ loading: true })

    if (searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage + 1}`;
    }
    this.fetchItems(endpoint);
  }


  fetchItems = async endpoint => {
    const { movies, heroImage, searchTerm } = this.state;
    //await to get end point and then await to convert to json
    const result = await (await fetch(endpoint)).json()
    try {
      this.setState({
        movies: [...movies, ...result.results],
        heroImage: heroImage || result.results[0],
        loading: false,
        currentPage: result.page,
        totalPages: result.total_pages
      }, () => {
        if (searchTerm === "") {
          sessionStorage.setItem('Home', JSON.stringify(this.state))
        }
      })
    } catch (err) {
      console.log(err)
    }
  }


  render() {
    // ES6 Destructuring the state
    const { movies, heroImage, loading, currentPage, totalPages, searchTerm } = this.state;

    return (
      <div className="rmdb-home">
        {/* if it exists it will render heroimage and if not it will return null */}
        {heroImage ?
          <div>
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
              title={heroImage.original_title}
              text={heroImage.overview}
            />
            <SearchBar callback={this.searchItems} />
          </div> : null}
        <div className="rmdb-home-grid">
          <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'} loading={loading}>
            {movies.map((element, i) => (
              <MovieThumb
                key={i}
                clickable={true}
                image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './images/no_image.jpg'}
                movieId={element.id}
                movieName={element.original_title}
              />
            ))}
          </Grid>
          {loading ? <Spinner /> : null}
          {(currentPage <= totalPages && !loading) ? <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} /> : null}
        </div>
      </div>
    )
  }
}

export default Home;