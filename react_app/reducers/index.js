import homeReducer from './home';
import tiedetailReducer from './tiedetail';
import userReducer from './user';
import sessionReducer from './session';
import userlistReducer from './userlist';
import quanReducer from './quan';
import quandetailReducer from './quandetail';

export default function rootReducer(state = {}, action) {
  return {
    session: sessionReducer(state.session, action),
    home: homeReducer(state.home, action),
    quan: quanReducer(state.quan, action),
    userlist: userlistReducer(state.userlist, action),
    tiedetail: tiedetailReducer(state.tiedetail, action),
    quandetail: quandetailReducer(state.quandetail, action),
    user: userReducer(state.user, action)
  };
}