import {combineReducers} from 'redux'
import {users} from './adminManagerUser'
import {user_groups} from './adminManagerUserGroup'
import {reducer as tags} from './adminManagerTags'
import {reducer as newArticle} from "./adminManagerNewArticle";
import {reducer as newCurrency} from "./newCurrency";
import {reducer as editCurrency} from "./editCurrency";
import {reducer as newUserGroup} from "./adminManagerNewUserGroup";
import {articles} from './adminManagerArticle'
import {currencies} from './currency'
import {posts} from './post';
import {reducer as postAdd} from "./postAdd";
import {reducer as postEdit} from "./postEdit";

export const actionTypes = {
    ADMIN_URI_LOCATION:"ADMIN_URI_LOCATION"
};

const initialState = {
    url:"/"
};

export const actions = {
    change_location_admin:function (url) {
        return{
            type:actionTypes.ADMIN_URI_LOCATION,
            data:url
        }
    }
};

export function reducer(state=initialState,action) {
    switch (action.type){
        case actionTypes.ADMIN_URI_LOCATION:
            return {
                ...state,url:action.data
            };
        default:
            return state
    }
}

const admin = combineReducers({
    adminGlobalState:reducer,
    users,
	user_groups,
    tags,
    newArticle,
	newCurrency,
	editCurrency,
	newUserGroup,
    articles,
	currencies,
	posts,
	postAdd,
	postEdit
});

export default admin

