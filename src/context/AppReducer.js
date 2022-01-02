const RENDERMODEL_LOADED = 'RENDERMODEL_LOADED';
const RENDERMODEL_FAILED = 'RENDERMODEL_FAILED';
const ITEM_ADDED = 'ITEM_ADDED';
const ITEM_DELETED = 'ITEM_DELETED';

const renderModelLoaded = (data) => ({type:RENDERMODEL_LOADED, payload:data });
const renderModelFailed = (data) => ({type:RENDERMODEL_FAILED, payload:data });
const itemAdded = (data) => ({type:ITEM_ADDED, payload:data });
const itemDeleted = (data) => ({type:ITEM_DELETED, payload:data });

const reducer = (state, action) => {
    console.log("reducer", action, state);
    switch (action.type) {
        case RENDERMODEL_LOADED: {
            const data = action.payload;
                return {...state, ...data, loading:false, errorCode:""};
        }
        case RENDERMODEL_FAILED: {
            const data = action.payload;
                return {...state, loading:false, errorCode:data};
        }
        case ITEM_ADDED: {
            const item = action.payload;
            const existingItem = findById(item.id, state.items);
            if (existingItem) {
                return {...state, items: replaceById(item, state.items), errorCode:""};
            } else {
                return {...state, items: [...state.items, item], errorCode:""};
            }
        }
        case ITEM_DELETED: {
            const item = action.payload;
            const reducedItems = state.items.filter(i => i.id !== item.id);
            return {...state, items: [...reducedItems], errorCode:""};
        }
        default:
            throw new  Error();
    }
};

function loadInitialItems(dispatch) {
    // Make XHR request to fetch all items and
    // dispatch renderModelLoaded or renderModelFailed depending on the outcome
    // in appropiate callback
    dispatch(renderModelLoaded({items:[
        {id:1, task:"Make dinner"},
        {id:2, task:"Take out the trash"},
    ]}));
}

function deleteItem(item, onSuccess, onError, dispatch) {
    // Make XHR request to delete the item and
    // dispatch itemDeleted and call onSuccess (or call onError, depending on the outcome)
    // in appropiate callback
    dispatch(itemDeleted(item));
    onSuccess()
}

function addItem(item, onSuccess, onError, dispatch) {
    // Make XHR request to add the item
    // dispatch itemAdded and call onSuccess (or call onError, depending on the outcome)
    // in appropiate callback
    dispatch(itemAdded(item));
}

function findById(id, objectsWithId) {
    for (let i = 0; i < objectsWithId.length; i++) {
        if ((typeof objectsWithId[i].id === 'number' && objectsWithId[i].id === Number(id)) || objectsWithId[i].id === id){
            return objectsWithId[i];
        }
    }
    return null;
}
function replaceById(objectWithId, objectsWithId) {
    let nextObjectsWithId = [...objectsWithId];
    for (let i = 0; i < nextObjectsWithId.length; i++) {
        if (nextObjectsWithId[i].id === objectWithId.id) {
            nextObjectsWithId[i] = objectWithId;
        }
    }
    return nextObjectsWithId;
}

export {
    reducer,
    loadInitialItems,
    deleteItem,
    addItem
}
