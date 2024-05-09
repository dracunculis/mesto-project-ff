const path = "https://nomoreparties.co/v1/wff-cohort-12";
const headers = {
    authorization: "e072955e-4ca1-47b4-add8-5a725e806251",
  'Content-Type': "application/json",
};

const apiMethod = (apiRequest) => {
  return fetch(`${path}/${apiRequest.url}`, {
    method: `${apiRequest.method}`,
    headers: headers,
    body: JSON.stringify(apiRequest.body),
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
};

const getUserProfile = () => apiMethod({ url: "users/me", method: "GET" });
function getInitialCards() {
    return fetch(`${path}/cards`, {
        headers: headers
    }).then(r => {return r.json()})
}
const updateProfile = (name, description) =>
  apiMethod({
    url: "users/me",
    method: "PATCH",
    body: { name: name, about: description }
  });

const uploadCard = (card) =>
  apiMethod({ url: "cards", method: "POST", body: card });
const addLike = (id) => apiMethod({ url: `cards/likes/${id}`, method: "PUT" });

const deleteLike = (id) =>
  apiMethod({ url: `cards/likes/${id}`, method: "DELETE" });

const deleteCard = (id) => apiMethod({ url: `cards/${id}`, method: "DELETE" });

const updateAvatar = (avatar) =>
  apiMethod({
    url: "users/me/avatar",
    method: "PATCH",
    body: { avatar: avatar },
  });

export {
  apiMethod,
  getInitialCards,
  getUserProfile,
  updateProfile,
  updateAvatar,
  uploadCard,
  deleteLike,
  addLike,
  deleteCard,
};
