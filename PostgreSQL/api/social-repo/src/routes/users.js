const express = require("express");
const userRepo = require("../repos/user-repo");
const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await userRepo.find();
  res.send(users);
});

router.get("/users/:id", async (req, res) => {});

router.post("/users", async (req, res) => {});

router.put("/users/:id", async (req, res) => {});

router.delete("/users/:id", async (req, res) => {});

module.exports = router;
