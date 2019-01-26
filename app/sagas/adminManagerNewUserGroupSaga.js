import {take, call, put,select} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as NewUserGroupActionTypes} from '../reducers/adminManagerNewUserGroup'

export function* saveUserGroup(data) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        let id = yield select(state=>state.admin.newUserGroup.id);
        if(id){
            data.id = id;
            return yield call(post, '/admin/usergroup/updateUserGroup', data);
        }else{
            return yield call(post, '/admin/usergroup/addUserGroup', data);
        }

    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* saveUserGroupFlow() {
    while (true) {
        let request = yield take(NewUserGroupActionTypes.SAVE_USER_GROUP);
        
        if (request.data.name && request.data.description) {
            let res = yield call(saveUserGroup, request.data);
            if (res) {
                if (res.code === 0) {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
                    setTimeout(function () {
                        location.replace('/admin/managerUserGroup');
                    }, 1000);
                } else if (res.message === '身份信息已过期，请重新登录') {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
                    setTimeout(function () {
                        location.replace('/');
                    }, 1000);
                } else {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
                }
            }
        }
    }
}