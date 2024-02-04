import express from "express";
import cors from "cors";
import { connectClient } from "./db";

const router = express.Router();
router.use(cors());
router.use(express.json());

router.get("/contests", async (req, res) => {
  //get the data from MongoDB
  const client = await connectClient();
  const contests = await client
    .collection("contests")
    .find()
    .project({ id: 1, categoryName: 1, contestName: 1, _id: 0 })
    .toArray();
  //res.send({ contests: testData });
  res.send({ contests });
});

router.get("/contests/:contestId", async (req, res) => {
  //get the data from MongoDB
  const client = await connectClient();
  const contest = await client
    .collection("contests")
    .findOne({ id: req.params.contestId });
  //res.send({ contests: testData });
  res.send({ contest });
});

router.post("/contests/:contestId", async (req, res) => {
  const client = await connectClient();
  const { newNameValue } = req.body;

  const doc = await client
    .collection("contests")
    .findOneAndUpdate(
      { id: req.params.contestId },
      {
        $push: {
          names: {
            id: newNameValue.toLowerCase().replace(/\s/g, "-"),
            name: newNameValue,
            timestamp: new Date(),
          },
        },
      },
      { returnDocument: "after" },
    );
  res.send({ updatedContest: doc });
});

router.post("/contests", async (req, res) => {
  const client = await connectClient();
  const { categoryName, contestName, description } =
    req.body.newContest;

  const doc = await client.collection("contests").insertOne({
    id: contestName.toLowerCase().replace(/\s/g, "-"),
    categoryName: categoryName,
    contestName: contestName,
    description: description,
    names: [],
  });
  const contest = await client.collection("contests").findOne({
    _id: doc.insertedId,
  });
  res.send({ contest });
});
export default router;
