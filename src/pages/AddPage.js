import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import useInput from "../hooks/useInput";
import { addNote } from "../utils/network-data";
import { MoonLoader } from "react-spinners";
import AuthContext from "../contexts/AuthContext";

const AddPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, onTitleHandler] = useInput("");
  const [body, onBodyHandler] = useInput("");
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  async function onSubmitHandler(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      await addNote({ body, title });
      navigate("/");
    } catch (error) {
      console.log({ error });
      let message = error?.message ?? "Unknown Error";
      if (axios.isAxiosError(error)) {
        const { response } = error;
        const { message: msg } = response;
        message = msg;
      }

      alert(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="py-5 mx-auto 2xl:max-w-4xl">
      <Card className={`p-5`}>
        <form onSubmit={onSubmitHandler}>
          <div className="flex flex-col gap-5">
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
              placeholder="Title"
              value={title}
              onChange={onTitleHandler}
            />
            <textarea
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2"
              placeholder="Body"
              value={body}
              onChange={onBodyHandler}
            />

            {isLoading ? (
              <div className="flex flex-row items-center justify-center">
                <MoonLoader color="#36d7b7" />
              </div>
            ) : (
              <button
                type="submit"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
              >
                Simpan
              </button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};
export default AddPage;
