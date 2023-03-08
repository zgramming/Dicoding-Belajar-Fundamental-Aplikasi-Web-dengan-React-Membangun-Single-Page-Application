import React from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import InputSearch from "../components/InputSearch";
import NoteItem from "../components/NoteItem";
import SelectStatus from "../components/SelectStatus";
import {
  archiveNote,
  deleteNote,
  getAllNotes,
  getNote,
  unarchiveNote,
} from "../utils/local-data";

const HomePageWrapper = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getAllNotes(),
      status: "all",
      keyword: props.defaultKeyword || "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onStatusChangeHandler = this.onStatusChangeHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this); 
  }

  onSearchHandler(keyword) {
    this.setState({ keyword });
    this.props.keywordChange(keyword);
  }

  onDeleteHandler(id) {
    deleteNote(id);
    this.setState({ notes: getAllNotes() });
  }

  onArchiveHandler(id) {
    const note = getNote(id);
    if (note.archived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }

    this.setState({ notes: getAllNotes() });
  }

  onStatusChangeHandler = (value) => {
    this.setState({
      status: value,
    });
  };

  render() {
    const items = this.state.notes.filter((note) => {
      let isMatch =
        this.state.keyword === ""
          ? true
          : note.title.toLocaleLowerCase().includes(this.state.keyword) ||
            note.body.toLocaleLowerCase().includes(this.state.keyword);

      if (this.state.status === "all") return true && isMatch;
      if (this.state.status === "archive") return note.archived && isMatch;
      if (this.state.status === "not_archive") return !note.archived && isMatch;
      return true;
    });

    return (
      <div className="flex flex-col gap-5 py-5 mx-auto 2xl:max-w-4xl">
        <InputSearch
          keyword={this.state.keyword}
          onSearchHandler={this.onSearchHandler}
        />
        <SelectStatus onStatusChangeHandler={this.onStatusChangeHandler} />
        {items.length === 0 && <Card className={`p-5`}>Note Not Found</Card>}
        {items.length > 0 && (
          <div className="grid grid-cols-2 gap-5">
            {items.map((note) => {
              return (
                <NoteItem
                  key={note.id}
                  note={note}
                  onDeleteHandler={this.onDeleteHandler}
                  onArchiveHandler={this.onArchiveHandler}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default HomePageWrapper;
