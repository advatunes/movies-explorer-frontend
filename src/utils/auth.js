export const BASE_URL = 'https://api.advatunes.movies.nomoredomains.rocks';

export function register(email, password, name) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ email, password, name }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      }
    })
    .catch((err) => console.log(err));
}

export function login(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      return response.json();
    })

    .catch((err) => console.log(err));
}
export function checkToken(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => data);
}
