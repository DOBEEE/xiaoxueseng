export function actionComments(data) {
  return { type: 'ACTION_COMMENT_USER', payload: data };
}
export function actionUser(data) {
  return { type: 'ACTION_USER_SUCCESS', payload: data };
}
export function actionStars(data) {
  return { type: 'ACTION_STAR_USER', payload: data };
}
export function actionUserDel(data) {
  return { type: 'ACTION_DEL_USER', payload: data };
}