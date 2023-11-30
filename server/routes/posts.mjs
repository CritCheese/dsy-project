import express, { request } from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import axios from 'axios'
import xml2js from 'xml-js'

const router = express.Router();

const blobUrl = 'https://storage0acc.blob.core.windows.net/container1/'

const sas = '?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-12-29T23:51:23Z&st=2023-11-29T15:51:23Z&spr=https,http&sig=dq6NTWGPGOm7kBHE9XaADxqVrhxPCqHPkC4V99MmaD8%3D'

const getData = async (body) => {
  const time = new Date().toUTCString()
  const options = {
    'method': 'GET',
    'url': blobUrl + sas + '&restype=container&comp=list',
    'headers': {
      'x-ms-date': time
    }
  };

  try {
    const result = await axios(options);
    //     console.log(result);
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

// Get a list of 50 posts
router.get("/storages", async (req, res) => {
  //   let collection = await db.collection("storages");
  // var g;

  var result = await getData().then(function (res) {
    const x = xml2js.xml2json(res, { compact: true, spaces: 2 })
    return x
  })
  res.send(result).status(200)
  // console.log(result)
  // let json = JSON.parse(result)
  // let blob = json.EnumerationResults.Blobs.Blob
  // const names = []
  // for (var i in blob) {
  //   names.push(blob[i].Name._text)
  // }
  // res.send(names).status(200)
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
// router.get("/storage/:name", async (req, res) => {
//   console.log(req.params.name)
//   let collection = await db.collection("storages");
//   let query = {name: ObjectId(req.params.name)};
//   let result = await collection.findOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// Get a storage items
router.get("/storagex", async (req, res) => {
  request('')
  console.log(req.params.name)
  let collection = await db.collection("storages");
  let query = { name: ObjectId(req.params.name) };
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

export function encrypt() {

}
