import {take, call, put,select} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as NewCurrencyActionTypes} from '../reducers/NewCurrency'

export function* saveCurrency(data) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(post, '/admin/currency/add_currency', data);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* saveCurrencyFlow() {
    while (true) {		
        let request = yield take(NewCurrencyActionTypes.SAVE_CURRENCY);
		
        if (request.data.code === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入货币类型', msgType: 0});
        } else if (request.data.value === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入货币值', msgType: 0});
        }
		
        if (request.data.code && request.data.value) {
            let res = yield call(saveCurrency, request.data);
            if (res) {
                if (res.code === 0) {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
                    setTimeout(function () {
                        location.replace('/admin/currency');
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

