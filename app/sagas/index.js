import {fork} from 'redux-saga/effects'
import {loginFlow, registerFlow, user_auth} from './homeSaga'
import {get_all_users_flow} from './adminManagerUsersSaga'
import {get_all_user_groups_flow, editUserGroupFlow} from './adminManagerUserGroupSaga'
import {getAllTagsFlow, addTagFlow, delTagFlow} from './adminManagerTagsSaga'
import {saveArticleFlow} from './adminManagerNewArticleSaga'
import {getPostListFlow, addPostFlow, updatePostFlow, getPostFlow, deletePostFlow} from './PostSaga'
import {getCustomerListFlow, addCustomerFlow, updateCustomerFlow, getCustomerFlow, deleteCustomerFlow} from './CustomerSaga'
import {saveUserGroupFlow} from './adminManagerNewUserGroupSaga'
import {getArticleListFlow,deleteArticleFlow,editArticleFlow} from './adminManagerArticleSaga'
import {getArticlesListFlow,getArticleDetailFlow} from './frontSaga'

export default function* rootSaga() {
	yield fork(getPostListFlow);
	yield fork(addPostFlow);
	yield fork(updatePostFlow);
	yield fork(getPostFlow);
	yield fork(deletePostFlow);
	
	yield fork(getCustomerListFlow);
	yield fork(addCustomerFlow);
	yield fork(updateCustomerFlow);
	yield fork(getCustomerFlow);
	yield fork(deleteCustomerFlow);

    yield fork(loginFlow);
    yield fork(registerFlow);
    yield fork(user_auth);
    yield fork(get_all_users_flow);
	yield fork(get_all_user_groups_flow);
    yield fork(getAllTagsFlow);
    yield fork(addTagFlow);
    yield fork(delTagFlow);
	yield fork(saveArticleFlow);
	yield fork(saveUserGroupFlow);
    yield fork(getArticleListFlow);
    yield fork(deleteArticleFlow);
    yield fork(getArticlesListFlow);
    yield fork(getArticleDetailFlow);
    yield fork(editArticleFlow);
	yield fork(editUserGroupFlow);
}
