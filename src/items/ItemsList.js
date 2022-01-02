import React from "react";
import {useAppContext} from "../context/useAppContext";

export default function ItemsList(props){
    const {isLoading, errorCode, items, deleteItem} = useAppContext();

    function handleDelete(item) {
        deleteItem(item, () => console.log("Success removing item " + item.task), () => console.log("Failed to remove item " + item.task));
    }
    return (
        <div>
            isLoading:{isLoading?"LOADING..." : "DONE!"} errorCode:{errorCode}
        <ul>
            {
                items.map(item => {return (<li key={item.id} onClick={() => handleDelete(item)}>{item.task}</li>)})
            }
        </ul>
        </div>
    )
}
