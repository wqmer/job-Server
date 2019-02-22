
const initialState={
	id:'',
	title:'',
    author:'',
	dateAdded:'',
    viewCount: 0
};

export const actionTypes = {
	SET_POST_ID:'SET_POST_ID',
    EDITING_TITLE:'EDITING_TITLE',
    EDITING_AUTHOR:'EDITING_AUTHOR',
    EDITING_DATE_ADDED:'EDITING_DATE_ADDED',
    EDITING_VIEW_COUNT:'EDITING_VIEW_COUNT',
	UPDATE_POST:'UPDATE_POST'
};

export const actions = {
    edit_title:function (title) {
        return{
            type:actionTypes.EDITING_TITLE,
            title
        }
    },
    edit_author:function (author) {
        return{
            type:actionTypes.EDITING_AUTHOR,
            author
        }
    },
	edit_date_added:function (dateAdded) {
        return{
            type:actionTypes.EDITING_DATE_ADDED,
            dateAdded
        }
    },
	edit_view_count:function (viewCount) {
        return{
            type:actionTypes.EDITING_VIEW_COUNT,
            viewCount
        }
    },
	update_post:function (data) {
        return{
            type:actionTypes.UPDATE_POST,
            data
        }
    }
};

export function reducer(state = initialState, action) {	
    switch (action.type) {
		case actionTypes.SET_POST_ID:
            return{
                ...state,id:action.id
            };	
        case actionTypes.EDITING_TITLE:
            return{
                ...state,title:action.title
            };
        case actionTypes.EDITING_AUTHOR:
            return{
                ...state,author:action.author
            };
		case actionTypes.EDITING_DATE_ADDED:
            return{
                ...state,dateAdded:action.dateAdded
            };
		case actionTypes.EDITING_VIEW_COUNT:
            return{
                ...state,viewCount:action.viewCount
            };	
		
        default:
            return state;
    }
}
