// import fetch from 'isomorphic-fetch';

export function actionQuan(data) {
  // let json = {
  //   name: data.name,
  //   id: data.id
  // }
  return { type: 'FETCH_QUAN_SUCCESS', payload: data };
}