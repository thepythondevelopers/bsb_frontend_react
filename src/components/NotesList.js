import { useState } from "react";
import Note from "./Note";
import AddNote from "./AddNote";
import Buttons from "./Buttons";

const NotesList = ({ notes, handleAddNote, handleDeleteNote }) => {
  const [isActive, setIsActive] = useState(false);
  const toggleNoteBox = () => {
    setIsActive(!isActive);
  };
  return (
    <>
      <Buttons toggleNoteBox={toggleNoteBox} />
      <div className="notes-list">
        {notes.map((note, index) => (
          <Note
            key={index}
            id={note.id}
            text={note.text}
            date={note.date}
            handleDeleteNote={handleDeleteNote}
          />
        ))}
        <AddNote
          handleAddNote={handleAddNote}
          toggleClass={isActive ? "activeNote" : ""}
          setIsActive={setIsActive}
        />
      </div>
    </>
  );
};

export default NotesList;
