import { FiCalendar, FiDelete } from "react-icons/fi";
import { FaArchive, FaUndo } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "./Card";
import PropTypes from "prop-types";

const NoteItem = ({
  note,
  isDetail = false,
  onDeleteHandler = undefined,
  onArchiveHandler = undefined,
}) => {
  const { title, body, createdAt, archived, id } = note;

  return (
    <Card className={`p-5`}>
      <div className="flex flex-row justify-between items-center">
        <Link to={`/detail/${id}`}>
          <div className="font-bold text-xl">{title}</div>
        </Link>
        {archived && (
          <Card className={`bg-blue-500 p-1 text-white`}>Archived</Card>
        )}
      </div>
      <div className="text-gray-500">{body}</div>
      <div className="flex flex-row flex-wrap items-center gap-3">
        <FiCalendar />
        <div className="text-sm text-gray-500">
          {new Date(createdAt).toLocaleDateString("id-ID", {
            dateStyle: "full",
          })}
        </div>
      </div>
      {!isDetail && (
        <div className="flex flex-row justify-end">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => onArchiveHandler(id)}
          >
            {archived ? <FaUndo /> : <FaArchive />}
          </button>
          <button
            type="button"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => onDeleteHandler(id)}
          >
            <FiDelete />
          </button>
        </div>
      )}
    </Card>
  );
};

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
  isDetail: PropTypes.bool,
  onDeleteHandler: PropTypes.func,
  onArchiveHandler: PropTypes.func,
};

export default NoteItem;
