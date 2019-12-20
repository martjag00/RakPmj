// const USER_SUCCESS = "USER_SUCCESS";
// const USER_REQUEST = "USER_REQUEST";
// const USER_FAILURE = "USER_FAILURE";
import * as services from "../services";
import * as selectors from "./selectors";
export const ITEMS_SUCCESS = "ITEMS_SUCCESS";
export const ITEMS_REQUEST = "ITEMS_REQUEST";
export const ITEMS_FAILURE = "ITEMS_FAILURE";
export const ITEM_ADDED = "ITEM_ADDED";
export const ITEM_REMOVED = "ITEM_REMOVED";
export const USER_UPDATE = "USER_UPDATE";
export const TOKEN_UPDATE = "TOKEN_UPDATE";

export const getItems = () => (dispatch, getState) => {
    const store = getState();
    if(selectors.getItems(store).length > 0) return null;
    dispatch(itemsRequest());
    return services.getItems()
        .then(items => {
            dispatch(itemsSuccess(items));
        })
        .catch(err => {
            console.error(err);
            dispatch(itemsFailure());
        });
};

export const itemsSuccess = (items) => ({
    type: ITEMS_SUCCESS,
    payload: items,
});

export const itemsRequest = (items) => ({
    type: ITEMS_REQUEST,
    payload: items,
});

export const itemsFailure = (items) => ({
    type: ITEMS_FAILURE,
    payload: items,
});

export const addItem = (item) => ({
    type: ITEM_ADDED,
    payload: item,
});

export const removeItem = (_id) => ({
    type: ITEM_REMOVED,
    payload: _id,
});

export const userUpdate = (user) => ({
    type: USER_UPDATE,
    payload: user,
});

export const tokenUpdate = token => ({
    type: TOKEN_UPDATE,
    payload: token,
});