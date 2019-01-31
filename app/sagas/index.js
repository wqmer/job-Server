import {fork} from 'redux-saga/effects'
import {loginFlow, registerFlow, user_auth} from './homeSaga'
import {get_all_users_flow} from './adminManagerUsersSaga'
import {get_all_user_groups_flow, editUserGroupFlow} from './adminManagerUserGroupSaga'
import {saveUserGroupFlow} from './adminManagerNewUserGroupSaga'

export default function* rootSaga() {
    yield fork(loginFlow);
    yield fork(registerFlow);
    yield fork(user_auth);
    yield fork(get_all_users_flow);
	yield fork(get_all_user_groups_flow);
	yield fork(saveUserGroupFlow);
	yield fork(editUserGroupFlow);
}
