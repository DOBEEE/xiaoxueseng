
export function actionQuandetail(data) {

  return { type: 'QUANDETAIL_SUCCESS', payload: data };
  
}

export function actionLikeQuandetail(data) {

  return { type: 'QUANDETAIL_LIKE', payload: data };
  
}
export function actionStarQuandetail(data) {

  return { type: 'QUANDETAIL_STAR', payload: data };
  
}