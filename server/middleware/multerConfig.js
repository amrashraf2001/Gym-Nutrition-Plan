const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();


const storage =  multer.memoryStorage();


const uploadImage = multer({ storage: storage });
const uploadVideo = multer({ storage: storage });

module.exports = { router, uploadImage, uploadVideo };