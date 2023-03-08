import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { addNote } from "../utils/local-data";

const AddPageWrapper = () => {
  const navigate = useNavigate();
  function onSubmitHandler(title, body) {
    addNote({ body, title });
    navigate("/");
  }

  return <AddPage onSubmitHandler={onSubmitHandler} />;
};

class AddPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
    };

    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onTitleChangeHandler(event) {
    this.setState({ title: event.target.value });
  }

  onBodyChangeHandler(event) {
    this.setState({ body: event.target.value });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.props.onSubmitHandler(this.state.title, this.state.body);
    this.setState({ title: "", body: "" });
  }

  render() {
    return (
      <div className="py-5 mx-auto 2xl:max-w-4xl">
        <Card className={`p-5`}>
          <form onSubmit={this.onSubmitHandler}>
            <div className="flex flex-col gap-5">
              <input
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                placeholder="Title"
                value={this.state.title}
                onChange={this.onTitleChangeHandler}
              />
              <textarea
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
                placeholder="Body"
                value={this.state.body}
                onChange={this.onBodyChangeHandler}
              />

              <button
                type="submit"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
              >
                Simpan
              </button>
            </div>
          </form>
        </Card>
      </div>
    );
  }
}

export default AddPageWrapper;
