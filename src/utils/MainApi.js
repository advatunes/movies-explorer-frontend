const urlMovies = 'https://api.nomoreparties.co';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getUserData() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    });
  }

  saveMovie(data) {
    const movieData = {
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: `${urlMovies}${data.image.url}`,
      trailerLink: data.trailerLink,
      thumbnail: `${urlMovies}${data.image.formats.thumbnail.url}`,
      movieId: data.id,

      nameRU: data.nameRU,
      nameEN: data.nameEN,
    };

    return this._request(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(movieData),
      credentials: 'include',
    });
  }

  getMovies(data) {
    return this._request(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._headers,
      body: JSON.stringify(data),
      credentials: 'include',
    });
  }

  deleteMovie(movieId) {
    return this._request(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    });
  }
}

export const api = new Api({
  baseUrl: 'https://api.advatunes.movies.nomoredomains.rocks',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
  },
});

