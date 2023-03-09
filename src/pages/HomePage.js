import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import InputSearch from "../components/InputSearch";
import NoteItem from "../components/NoteItem";
import SelectStatus from "../components/SelectStatus";
import {
  getActiveNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
  getArchivedNotes,
} from "../utils/network-data";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = React.useState(
    searchParams.get("keyword") ?? ""
  );

  const [notes, setNotes] = React.useState([]);
  const [status, setStatus] = React.useState("active");

  useEffect(() => {
    getActiveNotes().then((response) => {
      if (response.error) return;
      setNotes(response.data);
    });
  }, []);

  useEffect(() => {
    if (status === "active") {
      getActiveNotes().then((response) => {
        if (response.error) return;
        setNotes(response.data);
      });
    }
    if (status === "archive") {
      getArchivedNotes().then((response) => {
        if (response.error) return;
        setNotes(response.data);
      });
    }
    return () => {};
  }, [status]);

  function onKeywordChangeHandler(keyword) {
    setSearchParams({ keyword });
    setKeyword(keyword);
  }

  function onStatusChangeHandler(status) {
    setStatus(status);
  }

  async function onDeleteHandler(id) {
    await deleteNote(id);

    setNotes((prevNotes) => [...prevNotes.filter((note) => note.id !== id)]);
  }

  async function onArchiveHandler(id, archived) {
    if (archived) {
      await unarchiveNote(id);
      setNotes((prevNotes) => [
        ...prevNotes.map((note) =>
          note.id === id ? { ...note, archived: false } : note
        ),
      ]);
    } else {
      await archiveNote(id);
      setNotes((prevNotes) => [
        ...prevNotes.map((note) =>
          note.id === id ? { ...note, archived: true } : note
        ),
      ]);
    }
  }

  const items = notes.filter((note) => {
    let isMatch =
      keyword === ""
        ? true
        : note.title.toLocaleLowerCase().includes(keyword) ||
          note.body.toLocaleLowerCase().includes(keyword);

    if (status === "archive") return note.archived && isMatch;
    if (status === "active") return !note.archived && isMatch;
    return true;
  });

  return (
    <div className="flex flex-col gap-5 py-5 mx-auto 2xl:max-w-4xl ">
      <InputSearch keyword={keyword} onSearchHandler={onKeywordChangeHandler} />
      <SelectStatus onStatusChangeHandler={onStatusChangeHandler} />
      {items.length === 0 && <Card className={`p-5`}>Note Not Found</Card>}
      {items.length > 0 && (
        <div className="grid grid-cols-2 gap-5">
          {items.map((note) => {
            return (
              <NoteItem
                key={note.id}
                note={note}
                onDeleteHandler={onDeleteHandler}
                onArchiveHandler={onArchiveHandler}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
