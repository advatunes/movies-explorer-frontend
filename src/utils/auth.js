export const BASE_URL = 'https://api.advatunes.movies.nomoredomains.rocks';

function Auth(email, password, name) {
  function register() {
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

  function login() {
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

  function checkToken(jwt) {
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

  return {
    register,
    login,
    checkToken,
  };
}

export default Auth;
