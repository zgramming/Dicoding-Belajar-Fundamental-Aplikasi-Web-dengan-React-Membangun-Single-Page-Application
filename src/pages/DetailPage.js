import { useParams } from "react-router-dom";
import Card from "../components/Card";
import NoteItem from "../components/NoteItem";
import { getNote } from "../utils/local-data";

const DetailPage = () => {
  const { id } = useParams();
  const note = getNote(id);

  return (
    <div className="flex flex-col py-5 gap-5 mx-auto 2xl:max-w-4xl">
      {!note && <Card>Not Found</Card>}
      {note && <NoteItem note={note} isDetail={true} />}
    </div>
  );
};

export default DetailPage;
