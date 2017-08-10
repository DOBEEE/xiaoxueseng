
export function actionHome(data) {

  return { type: 'FETCH_HOME_SUCCESS', payload: data };
  
}

export function actionLikeHome(data) {

  return { type: 'CLICK_HOME_LIKE', payload: data };
  
}
export function actionStarHome(data) {

  return { type: 'CLICK_HOME_STAR', payload: data };
  
}