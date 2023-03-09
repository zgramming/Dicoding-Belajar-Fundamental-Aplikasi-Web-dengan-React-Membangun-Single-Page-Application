import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import NoteItem from "../components/NoteItem";
import Container from "../components/Container";
import { getNote } from "../utils/network-data";
import { MoonLoader } from "react-spinners";

const DetailPage = () => {
  const { id } = useParams();

  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getNote(id)
      .then((response) => {
        if (response.error) return;
        setNote(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {};
  }, [id]);

  if (isLoading) {
    return (
      <Container>
        <Card className={`flex flex-row items-center justify-center`}>
          <MoonLoader size={20} />
        </Card>
      </Container>
    );
  }

  return (
    <div className="flex flex-col py-5 gap-5 mx-auto 2xl:max-w-4xl">
      {!note && <Card>Not Found</Card>}
      {note && <NoteItem note={note} isDetail={true} />}
    </div>
  );
};

export default DetailPage;
