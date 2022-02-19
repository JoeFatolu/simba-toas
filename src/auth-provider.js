const localStorageKey = "__auth_provider_token__";

async function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

function handleUserResponse({ data }) {
  window.localStorage.setItem(localStorageKey, data.user.token);
  return data.user;
}

async function login(body) {
  return client("user/login", body).then(handleUserResponse);
}

async function register(body) {
  const result = await client("user/register", body);
  return handleUserResponse(result);
}

async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

const authURL = process.env.REACT_APP_AUTH_URL;

async function client(endpoint, data) {
  const config = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };

  return window.fetch(`${authURL}/${endpoint}`, config).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { getToken, login, register, logout, localStorageKey, client };
