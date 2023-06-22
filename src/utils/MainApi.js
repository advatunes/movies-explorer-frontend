const url = 'https://api.nomoreparties.co/';

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

    saveMovie(data) {
        const movieData = {
          country: data.country || "",
          director: data.director || "",
          duration: data.duration || 0,
          year: data.year || "",
          description: data.description || "",
          image:`${url}${data.image.url}`|| "",
          trailerLink: data.trailerLink || "",
          thumbnail: `${url}${data.image.url}` || "",
          movieId: data.movieId || 0,
          nameRU: data.nameRU || "",
          nameEN: data.nameEN || ""
        };

        return this._request(`${this._baseUrl}/movies`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify(movieData),
        });
      }

  }

  export const api = new Api({
    baseUrl: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
  });
