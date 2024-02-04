import ReactDomServer from "react-dom/server";
import { fetchContest, fetchContestList } from "../api-client";
import App from "../components/app";

//This function fetch data, return the initial markup for the server endpoint to use.
const serverRender = async (req) => {
  const { contestId } = req.params;

  const initialData = contestId
    ? { currentContest: await fetchContest(contestId) }
    : { contests: await fetchContestList() };

  const initialMarkup = ReactDomServer.renderToString(
    <App initialData={initialData} />,
  );
  return { initialMarkup, initialData };
};

//export serverRender so the server endpoint can use it
export default serverRender;
