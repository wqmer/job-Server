const initialState={
    code:'',
    value:'',
	id:''
};
export const actionTypes = {
    UPDATING_CODE:'UPDATING_CODE',
    UPDATING_VALUE:'UPDATING_VALUE',
    SAVE_CURRENCY:'SAVE_CURRENCY',
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
    save_currency:function (data) {
        return{
            type:actionTypes.SAVE_CURRENCY,
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