import {useContext} from "react";
import {AppContext} from "./AppContext";
import {addItem, deleteItem} from "./AppReducer";

export function useAppContext(){
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    const [state, dispatch] = context;
    return {
        addItem: (item, onSuccess, onError) => addItem(item, onSuccess, onError, dispatch),
        deleteItem: (item, onSuccess, onError) => deleteItem(item, onSuccess, onError, dispatch),
        items:state.items,
        message:state.message,
        isLoading: state.loading,
        errorCode: state.errorCode
    };
}
