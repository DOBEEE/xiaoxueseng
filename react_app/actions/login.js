// import fetch from 'isomorphic-fetch';

export function actionLogin(data) {
  // data = {
  //   name: data.name,
  //   id: data.id,
  //   level: data.id
  // }
  return { type: 'FETCH_HEADER_SUCCESS', payload: data };
  // return (dispatch) => {
    // return fetch('/api/signup',{
    //         method: "POST",
    //         body: JSON.stringify(data),
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         credentials: "same-origin"
    //     })
    //     .then(res => res.json())
    //     .then(function (json) {

    //       return { type: 'FETCH_SIGNUP_SUCCESS', payload: json };
    //     },function(error) {
    //       error.message //=> String
    //     });
  // }
}