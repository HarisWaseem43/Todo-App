import React, { useEffect, useState } from "react";
import "./style.css";

const getLocalData = () => {
  const lists = localStorage.getItem("todolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState(" ");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState(" ");
  const [toggleButton, setToggleButton] = useState(false);

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(items));
  }, [items]);

  const addItems = () => {
    if (!inputData) {
      alert("Please fill the Data");
    } 
    else if(inputData && toggleButton) {
        setItems(
            items.map((curElement) => {
                if(curElement.id === isEditItem){
                    return {...curElement, name: inputData}
                }
                return curElement
            })
        )
        setInputData(" ");
        setIsEditItem(null);
        setToggleButton(false);
    }
     else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData(" ");
    }
  };

  const editItems = (index) => {
    const editedItem = items.find((curElement) => {
      return curElement.id === index;
    });
    setInputData(editedItem.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  const deleteItems = (index) => {
    const updatedItems = items.filter((curElement) => {
      return curElement.id !== index;
    });
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here!</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Items"
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i
                class="far fa-edit add-btn"
                aria-hidden="true"
                onClick={addItems}
              ></i>
            ) : (
              <i
                class="fa fa-plus add-btn"
                aria-hidden="true"
                onClick={addItems}
              ></i>
            )}
          </div>
          <div className="showItems">
            {items.map((curElement) => {
              return (
                <div className="eachItem" key={curElement.id}>
                  <h3>{curElement.name}</h3>
                  <div className="todo-btn">
                    <i
                      class="far fa-edit add-btn"
                      aria-hidden="true"
                      onClick={() => editItems(curElement.id)}
                    ></i>
                    <i
                      class="far fa-trash-alt  add-btn"
                      aria-hidden="true"
                      onClick={() => deleteItems(curElement.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
