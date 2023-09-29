import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";

const Note = ({ id, text, date, handleDeleteNote }) => {
  const [initialPos, setInitialPos] = useState([null, null]);
  const [initialSize, setInitialSize] = useState([null, null]);

  const initial = (e, id) => {
    let resizable = document.getElementById(id);
    console.log("event", e);
    console.log("id", id);
    setInitialPos([e.clientX, e.clientY]);
  };

  const resize = (e, id) => {
    let resizable = document.querySelector(`#${id}`);
    console.log(resizable);

    resizable.style.width = `${
      parseInt(resizable.offsetWidth) + parseInt(e.clientX - initialPos[0])
    }px`;
    resizable.style.height = `${
      parseInt(resizable.offsetHeight) + parseInt(e.clientY - initialPos[1])
    }px`;
  };
  // position

  const resizePos = (e, id) => {
    let resizable = document.querySelector(`#${id}`);
    console.log(resizable);

    resizable.style.left = `${
      parseInt(resizable.offsetLeft) + parseInt(e.clientX - initialPos[0])
    }px`;
    resizable.style.top = `${
      parseInt(resizable.offsetTop) + parseInt(e.clientY - initialPos[1])
    }px`;
  };

  return (
    <div className="note card-note" id={id}>
      <div
        className="header"
        draggable="true"
        onDragStart={(e) => initial(e, id)}
        onDragEnd={(e) => resizePos(e, id)}
      >
        Click here to move the note {id}
      </div>
      <div
        className="main-body"
        draggable="true"
        onDragStart={(e) => initial(e, id)}
        onDragEnd={(e) => resize(e, id)}
      >
        <span>{text}</span>
        <div className="note-footer">
          <small>{date}</small>
          <MdDeleteForever
            onClick={() => handleDeleteNote(id)}
            className="delete-icon"
            size="1.3em"
          />
        </div>
      </div>
    </div>
  );
};

export default Note;
