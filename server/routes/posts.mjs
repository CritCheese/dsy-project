import express, { request } from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import axios from 'axios'
import xml2js from 'xml-js'

const router = express.Router();

const blobUrl = 'https://storage0acc.blob.core.windows.net/container1'

const sas = '?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-12-29T23:51:23Z&st=2023-11-29T15:51:23Z&spr=https,http&sig=dq6NTWGPGOm7kBHE9XaADxqVrhxPCqHPkC4V99MmaD8%3D'

const getData = async (body) => {
  const time = new Date().toUTCString()
  const options = {
    'method': 'GET',
    'url': blobUrl + '/' + sas + '&restype=container&comp=list',
    'headers': {
      'x-ms-date': time
    }
  }
  try {
    const result = await axios(options);
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

const getObject = async (body) => {
  const time = new Date().toUTCString()
  const options = {
    'method': 'GET',
    'url': blobUrl + '/' + body.source + sas,
    'headers': {
      'x-ms-date': time
    }
  }
  try {
    const result = await axios(options);
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

const copyObject = async (body) => {
  const time = new Date().toUTCString()
  const options = {
    'method': 'PUT',
    'url': blobUrl + '/' + body.destination + sas ,
    'headers': {
      'x-ms-date': time,
      'x-ms-version': '2022-11-02',
      'x-ms-requires-sync': 'true',
      'x-ms-copy-source': blobUrl + body.source,
      'x-ms-type': 'file'
    }
  }
  try {
    const result = await axios(options);
    return result.status;
  } catch (e) {
    console.log(e);
  }
}

const deleteObject = async (body) => {
  const time = new Date().toUTCString()
  const options = {
    'method': 'DELETE',
    'url': blobUrl + '/' + body.source + sas ,
    'headers': {
      'x-ms-date': time,
      'x-ms-version': '2022-11-02',
      'x-ms-delete-snapshots': 'include',
    }
  }
  try {
    const result = await axios(options);
    return result.status;
  } catch (e) {
    console.log(e);
  }
}

router.delete('/delete', async (req, res) => {
  var status = await deleteObject().then(function(res){
    return res.status
  })
  res.send(status).status(result)
})

router.put('/copy', async (req, res) => {
  var status = await copyObject().then(function(res){
    return res.status
  })
  res.send(status).status(result)
})

router.get('/object', async (req, res) => {
  var data = await getObject().then(function(res){
    return res
  })
  res.send(data).status(200)
})

router.get("/storages", async (req, res) => {
  var result = await getData().then(function (res) {
    const x = xml2js.xml2json(res, { compact: true, spaces: 2 })
    return x
  })
  res.send(result).status(200)
});

router.get("/users", async (req, res) => {
  let collection = await db.collection("users");
  let results = await collection.find({})
    .toArray();

  res.send(results).status(200);
});

router.get("/user/", async (req, res) => {
  let collection = await db.collection("users");
  let result = await collection.findOne(req.query);

  res.send(result.status)
});

router.post("/user/register/", async (req, res) => {
  let collection = await db.collection("users")
  let result = collection.insertOne(req.body)
  res.send(result)
});

export default router;