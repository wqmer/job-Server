const initialState={
	id:'',
    code:'',
    value:''
};
export const actionTypes = {
    UPDATING_CODE:'UPDATING_CODE',
    UPDATING_VALUE:'UPDATING_VALUE',
    UPDATE_CURRENCY:'UPDATE_CURRENCY',
	SET_CURRENCY_ID:"SET_CURRENCY_ID"
};
export const actions = {
    update_code:function (code) {
        return{
            type:actionTypes.UPDATING_CODE,
            code
        }
    },
    update_value:function (value) {
        return{
            type:actionTypes.UPDATING_VALUE,
            value
        }
    },
	update_currency:function (data) {
        return{
            type:actionTypes.UPDATE_CURRENCY,
            data
        }
    }
};

export function reducer(state=initialState,action) {
    switch (action.type){
        case actionTypes.UPDATING_CODE:
            return{
                ...state,code:action.code
            };
        case actionTypes.UPDATING_VALUE:
            return{
                ...state,value:action.value
            };
		case actionTypes.SET_CURRENCY_ID:
            return{
                ...state,id:action.id
            };
        default:
            return state;
    }
}