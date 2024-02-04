import axios from "axios";
import { API_SERVER_URL } from "./public-config";

export const fetchContestList = async () => {
  const resp = await axios.get(`${API_SERVER_URL}/contests`);
  return resp.data.contests;
};

export const fetchContest = async (contestId) => {
  const resp = await axios.get(
    `${API_SERVER_URL}/contests/${contestId}`,
  );
  return resp.data.contest;
};

export const addNewNameToContest = async ({
  contestId,
  newNameValue,
}) => {
  const resp = await axios.post(
    `${API_SERVER_URL}/contests/${contestId}`,
    { newNameValue },
  );
  return resp.data.updatedContest;
};

export const addNewContest = async ({ newContest }) => {
  const resp = await axios.post(`${API_SERVER_URL}/contests`, {
    newContest,
  });
  return resp.data.contest;
};
