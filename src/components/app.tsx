import Contest from "./contest";
import ContestList from "./contest-list";
import Header from "./header";
import { useState, useEffect } from "react";
import { addNewContest } from "../api-client";

//page: contestList, contest
const App = ({ initialData }) => {
  const [page, setPage] = useState<"contestList" | "contest">(
    initialData.currentContest ? "contest" : "contestList",
  );
  const [currentContest, setCurrentContest] = useState<
    object | undefined
  >(initialData.currentContest);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    window.onpopstate = (event) => {
      const newPage = event.state?.contestId
        ? "contest"
        : "contestList";
      setPage(newPage);
      setCurrentContest({ id: event.state?.contestId });
    };
  }, []);
  const navigateToContest = (contestId) => {
    window.history.pushState(
      { contestId },
      "",
      `/contest/${contestId}`,
    );
    setPage("contest");
    setCurrentContest({ id: contestId });
  };
  const navigateToContestList = () => {
    window.history.pushState({}, "", "/");
    setPage("contestList");
    setCurrentContest(undefined);
  };
  const pageContent = () => {
    switch (page) {
      case "contestList":
        return (
          <ContestList
            initialContests={initialData.contests}
            onContestClick={navigateToContest}
          />
        );
      case "contest":
        return (
          <Contest
            initialContest={currentContest}
            onContestListClick={navigateToContestList}
          />
        );
    }
  };

  const handleAddContestSubmit = async (event) => {
    event.preventDefault();
    const { categoryName, contestName, contestDescription } =
      event.target;
    const addedContest = await addNewContest({
      newContest: {
        categoryName: categoryName.value,
        contestName: contestName.value,
        description: contestDescription.value,
      },
    });
    setDisplay(false);
    initialData.contests.push(addedContest);
  };
  const handleAddContestClick = (event) => {
    event.preventDefault();
    setDisplay(true);
  };
  return (
    <>
      <div className="container">{pageContent()}</div>
      <div className="add-new-contest">
        {display && page === "contestList" && (
          <form onSubmit={handleAddContestSubmit}>
            <input
              type="text"
              name="categoryName"
              placeholder="Category Name"
            />
            <input
              type="text"
              name="contestName"
              placeholder="Contest Name"
            />
            <textarea
              name="contestDescription"
              placeholder="Contest Description"
              rows="5"
              cols="5"
            ></textarea>
            <button type="submit">Add Contest</button>
          </form>
        )}
        {page === "contestList" && (
          <a
            href="/"
            className="link"
            onClick={handleAddContestClick}
          >
            Add New Contest
          </a>
        )}
      </div>
    </>
  );
};

export default App;
