import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of 50 posts
router.get("/storages", async (req, res) => {
  let collection = await db.collection("storages");
  let results = await collection.find({})
    .toArray();

  res.send(results).status(200);
});

// Get a list of 50 posts
router.get("/users", async (req, res) => {
  let collection = await db.collection("users");
  let results = await collection.find({})
    .toArray();

  res.send(results).status(200);
});

// Fetches the latest posts
// router.get("/latest", async (req, res) => {
//   let collection = await db.collection("dsy");
//   let results = await collection.aggregate([
//     {"$project": {"author": 1, "title": 1, "tags": 1, "date": 1}},
//     {"$sort": {"date": -1}},
//     {"$limit": 3}
//   ]).toArray();
//   res.send(results).status(200);
// });

// Get a single storage
router.get("/storage/:name", async (req, res) => {
  console.log(req.params.name)
  let collection = await db.collection("storages");
  let query = {name: ObjectId(req.params.name)};
  let result = await collection.findOne(query);
  
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Get a single user
router.get("/user/", async (req, res) => {  
  console.log(req.query)
  let collection = await db.collection("users");
  let result = await collection.findOne(req.query);

  res.send(result.status)
  // console.log(result)

  // if (!result) res.send("Not found").status(404);
  // else res.send(result).status(200);
});

// Add a new document to the collection
router.post("/user/register/", async (req, res) => {
  let collection = await db.collection("users");
  // let newDocument = `{"name":"user","email":"${req.params.email}","password":"${req.params.password}"}`
  console.log(req.body)

  let result = collection.insertOne(req.body);
  res.send(result)
});

// Update the post with a new comment
// router.patch("/comment/:id", async (req, res) => {
//   const query = { _id: ObjectId(req.params.id) };
//   const updates = {
//     $push: { comments: req.body }
//   };
//   let collection = await db.collection("posts");
//   let result = await collection.updateOne(query, updates);
//   res.send(result).status(200);
// });

// route.get("storage/storage0", async (req, res) => {
//   fetch("")
// });

export default router;

export function encrypt(){
  
}
