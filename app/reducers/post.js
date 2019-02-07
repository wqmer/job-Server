
const initialState = {
    postList: [],
    pageNum: 1,
    total:0
};

export const actionTypes = {
    'GET_POSTS':'GET_POSTS',
	'RESPONSE_GET_POSTS': 'RESPONSE_GET_POSTS',
	'EDIT_POST': 'EDIT_POST',
	'DELETE_POST':'DELETE_POST'
};

export const actions = {
    get_posts: function (pageNum=1) {
        return {
            type: actionTypes.GET_POSTS,
            pageNum:pageNum
        }
    },
	edit_post: function (id) {
        return {
            type: actionTypes.EDIT_POST,
            id
        }
    },
	delete_post: function (id) {
        return {
            type: actionTypes.DELETE_POST,
            id
        }
    }
};

export function posts(state = initialState, action) {
    switch (action.type) {
        case actionTypes.RESPONSE_GET_POSTS:
            return {
                ...state, 
				postList: [...action.data.list], 
				total: action.data.total,
				pageNum:action.data.pageNum
            };
        default:
            return state;
    }
}
