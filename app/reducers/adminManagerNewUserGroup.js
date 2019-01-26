const initialState={
    name:'',
    description:'',
	id:''
};
export const actionTypes = {
    UPDATING_NAME:"UPDATING_NAME",
    UPDATING_DESCRIPTION:"UPDATING_DESCRIPTION",
	SAVE_USER_GROUP:"SAVE_USER_GROUP",
	SET_USER_GROUP_ID:"SET_USER_GROUP_ID"
};
export const actions = {
    update_name:function (name) {
        return{
            type:actionTypes.UPDATING_NAME,
            name
        }
    },
    update_description:function (description) {
        return{
            type:actionTypes.UPDATING_DESCRIPTION,
            description
        }
    },
	save_user_group:function (data) {
        return{
            type:actionTypes.SAVE_USER_GROUP,
            data
        }
    }
};

export function reducer(state=initialState,action) {
    switch (action.type){
        case actionTypes.UPDATING_NAME:
            return{
                ...state,name:action.name
            };
        case actionTypes.UPDATING_DESCRIPTION:
            return{
                ...state,description:action.description
            };
		case actionTypes.SET_USER_GROUP_ID:
            return{
                ...state,id:action.id
            };
        default:
            return state;
    }
}