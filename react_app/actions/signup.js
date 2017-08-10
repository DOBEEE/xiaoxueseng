// import fetch from 'isomorphic-fetch';

export function actionSignup(data) {
  // let json = {
  //   name: data.name,
  //   id: data.id
  // }
  return { type: 'FETCH_HEADER_SUCCESS', payload: data };
}