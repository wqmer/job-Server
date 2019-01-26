
const initialState = {
    currencyList: [],
    pageNum: 1,
    total:0
};

export const actionTypes = {
    'GET_ALL_CURRENCIES':'GET_ALL_CURRENCIES',
	'RESPONSE_GET_ALL_CURRENCIES': 'RESPONSE_GET_ALL_CURRENCIES',
	'EDIT_CURRENCY': 'EDIT_CURRENCY',
	'DELETE_CURRENCY':'DELETE_CURRENCY'
};

export const actions = {
    get_currencies: function (pageNum=1) {
        return {
            type: actionTypes.GET_ALL_CURRENCIES,
            pageNum:pageNum
        }
    },
	edit_currency: function (id) {
        return {
            type: actionTypes.EDIT_CURRENCY,
            id
        }
    },
	delete_currency: function (id) {
        return {
            type: actionTypes.DELETE_CURRENCY,
            id
        }
    }
};

export function currencies(state = initialState, action) {
    switch (action.type) {
        case actionTypes.RESPONSE_GET_ALL_CURRENCIES:
            return {
                ...state, 
				currencyList: [...action.data.list], 
				total: action.data.total,
				pageNum:action.data.pageNum
            };
        default:
            return state;
    }
}
