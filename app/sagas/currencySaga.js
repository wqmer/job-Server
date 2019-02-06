import {take,call,put,select} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as CurrencyTypes} from '../reducers/currency'
import {actionTypes as EditCurrencyTypes} from '../reducers/EditCurrency'

export function* getCurrencyList (pageNum) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/admin/currency/get_currencies?pageNum=${pageNum}&isPublish=false`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getCurrencyListFlow () {
    while (true){
        let req = yield take(CurrencyTypes.GET_ALL_CURRENCIES);
        let res = yield call(getCurrencyList,req.pageNum);
        if(res){
            if (res.code === 0) {
                res.data.pageNum = req.pageNum;
                yield put({type:CurrencyTypes.RESPONSE_GET_ALL_CURRENCIES,data:res.data})
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

export function* editCurrency (id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/getCurrencyDetail?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* editCurrencyFlow () {
    while (true){
        let req = yield take(CurrencyTypes.EDIT_CURRENCY);
        let res = yield call(editCurrency,req.id);
        if(res){
			let id = res.data._id;
			let code = res.data.code;
			let value = res.data.value;
			
			yield put({type:EditCurrencyTypes.SET_CURRENCY_ID,id});
			yield put({type:EditCurrencyTypes.UPDATING_CODE, code});
			yield put({type:EditCurrencyTypes.UPDATING_VALUE, value});
        }
    }
}

export function* deleteCurrency (id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/admin/currency/delete_currency?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* deleteCurrencyFlow () {
    while (true){
        let req = yield take(CurrencyTypes.DELETE_CURRENCY);
        let res = yield call(deleteCurrency,req.id);
        if(res){
			
        }
    }
}





