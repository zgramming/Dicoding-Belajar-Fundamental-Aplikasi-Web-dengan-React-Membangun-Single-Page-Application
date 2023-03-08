import Card from "../components/Card";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col gap-5 py-5 mx-auto 2xl:max-w-4xl">
      <Card className={`text-center text-xl p-5`}>404 - Not Found</Card>
    </div>
  );
};

export default NotFoundPage;