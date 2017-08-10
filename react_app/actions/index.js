import fetch from 'isomorphic-fetch';

export function fetchLogin(data) {
  // return (dispatch) => {
    return fetch('/api/login',{
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "same-origin"
        })
        .then(res => res.json())
        .then(function (json) {
          return { type: 'FETCH_LOGIN_SUCCESS', payload: json };
        },function(error) {
          error.message //=> String
        });
  // }
}

// export function fetchItem(id) {
//   return (dispatch) => {
//     if (!id) return Promise.resolve();
//     return fetch(`/api/item/${id}`)
//         .then(res => res.json())
//         .then(json => { type: 'FETCH_LOGIN_SUCCESS', payload: json });
//   }
// }