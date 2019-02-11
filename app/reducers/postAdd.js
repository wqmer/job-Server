
const initialState={
    title:'',
    author:'',
	date_added:'',
    view_count: 0,
	id:''
};

export const actionTypes = {
    UPDATING_TITLE:'UPDATING_TITLE',
    UPDATING_AUTHOR:'UPDATING_AUTHOR',
    UPDATING_DATE_ADDED:'UPDATING_DATE_ADDED',
    UPDATING_VIEW_COUNT:'UPDATING_VIEW_COUNT',
	ADD_POST:'ADD_POST'
};

export const actions = {
    update_title:function (title) {
        return{
            type:actionTypes.UPDATING_TITLE,
            title
        }
    },
    update_author:function (author) {
        return{
            type:actionTypes.UPDATING_AUTHOR,
            author
        }
    },
	update_date_added:function (date_added) {
        return{
            type:actionTypes.UPDATING_DATE_ADDED,
            date_added
        }
    },
	update_view_count:function (view_count) {
        return{
            type:actionTypes.UPDATING_VIEW_COUNT,
            view_count
        }
    },
	add_post:function (data) {
        return{
            type:actionTypes.ADD_POST,
            data
        }
    }
};

export function reducer(state = initialState, action) {
    switch (action.type){
        case actionTypes.UPDATING_TITLE:
            return{
                ...state,code:action.title
            };
        case actionTypes.UPDATING_AUTHOR:
            return{
                ...state,value:action.author
            };
		case actionTypes.UPDATING_DATE_ADDED:
            return{
                ...state,value:action.date_added
            };
		case actionTypes.UPDATING_VIEW_COUNT:
            return{
                ...state,value:action.view_count
            };	
		
        default:
            return state;
    }
}