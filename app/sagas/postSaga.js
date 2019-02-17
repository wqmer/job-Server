import {take,call,put,select} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as PostTypes} from '../reducers/Post'
import {actionTypes as PostAddTypes} from '../reducers/PostAdd'
import {actionTypes as EditPostTypes} from '../reducers/PostEdit'

export function* getPostList(pageNum) {
    yield put({type: IndexActionTypes.FETCH_START});
	
    try {
        return yield call(get, `/admin/post/get_posts?pageNum=${pageNum}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getPostListFlow() {
    while (true){
        let req = yield take(PostTypes.GET_POSTS);
        let res = yield call(getPostList,req.pageNum);
        if(res){
            if (res.code === 0) {
                res.data.pageNum = req.pageNum;
                yield put({type:PostTypes.RESPONSE_GET_POSTS,data:res.data})
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

export function* addPost(data) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(post, '/admin/post/add_post', data);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* addPostFlow() {
    while (true) {
        let request = yield take(PostAddTypes.ADD_POST);
        if (request.data.title === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入发布标题', msgType: 0});
        } else if (request.data.author === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入发布作者', msgType: 0});
        } else if (request.data.date_added === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入发布时间', msgType: 0});
        } else if (request.data.view_count === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入发布阅读数量', msgType: 0});
        } else {
            let res = yield call(addPost, request.data);
            if (res) {
                if (res.code === 0) {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
                    setTimeout(function () {
                        location.replace('/admin/post');
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

export function* editPost(id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/get_post_detail?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* editPostFlow() {
    while (true){
        let req = yield take(PostTypes.EDIT_POST);
        let res = yield call(editPost,req.id);
        if(res){
			let id = res.data._id;
			let code = res.data.code;
			let value = res.data.value;
			
			yield put({type:EditPostTypes.SET_POST_ID,id});
			yield put({type:EditPostTypes.UPDATING_CODE, code});
			yield put({type:EditPostTypes.UPDATING_VALUE, value});
        }
    }
}

export function* deletePost(id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/admin/post/delete_post?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* deletePostFlow() {
    while (true){
        let req = yield take(PostTypes.DELETE_POST);
        let res = yield call(deletePost,req.id);
        if(res){
			
        }
    }
}




