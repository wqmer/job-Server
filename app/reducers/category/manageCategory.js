const initialState = []


export const actionTypes = {
    SET_CATEGORYS:"RESPONSE_GET_ALL_CATEGORYS",
    GET_CATEGORYS: 'GET_CATEGORYS',
    EDIT_CATEGORY: "EDIT_CATEGORY",
    DELETE_CATEGORY: "DELETE_CATEGORY",
    ADD_CATEGORY :'ADD_CATEGORY',
    UPLOAD_CATEGORY_IMAGE:'UPLOAD_CATEGORY_IMAGE'
};

export const actions = {
    get_categorys: function (pageNum = 1) {
        return {
            type: actionTypes.GET_CATEGORYS,
            pageNum
        }
    },
    delete_category: function (name) {
        return {
            type: actionTypes.DELETE_CATEGORY,
            name
        }
    },
    edit_category: function (name) {
        return {
            type: actionTypes.EDIT_CATEGORY,
            name
        }
    },

    add_category:function (name , url) {		
        return{
            type: actionTypes.ADD_CATEGORY,
            name,
            url
        }
    },
    upload_category_image:function (name ,file) {		
        return{
            type: actionTypes.UPLOAD_CATEGORY_IMAGE,
            name,
            file
        }
    }
};

export function reducer(state=initialState,action) {
    switch (action.type){
        case actionTypes.SET_CATEGORYS:
            return [...action.data];
        default:
            return state;
    }
}