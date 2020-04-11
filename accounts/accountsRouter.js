const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

// All GET async

router.get("/", async (req, res) => {
  const getAllAccounts = await db("accounts");
  try {
    res.status(200).json(getAllAccounts);
  } catch (next) {
    res.status(500).json("Opps major error!", next);
  }
});

router.get("/:id", async (req, res) => {
  const getAccountByID = await db("accounts")
    .where({ id: req.params.id })
    .first();

  try {
    if (getAccountByID) {
      res.status(200).json(getAccountByID);
    } else {
      res.status(404).json("that specific account is not valid");
    }
  } catch (error) {
    res.status(500).json("Oops Major Error", error);
  }
});

// POST

router.post("/", async (req, res) => {
  const postAccount = await db("accounts").insert(req.body);
  try {
    res.status(201).json(postAccount);
  } catch (error) {
    res.status(500).json("Oops Major Error", error);
  }
});

// UPDATE

router.put("/:id", async (req, res) => {
  const updateAccount = await db("accounts")
    .where({ id: req.params.id })
    .update(req.body);

  try {
    if (updateAccount) {
      res.status(200).json(updateAccount);
    } else {
      res.status(404).json("that specific account is not valid to update");
    }
  } catch (error) {
    res.status(500).json("Oops Major Error", error);
  }
});

//  DELETE

router.delete("/:id", async (req, res) => {
  const deletedAccount = await db("accounts")
    .where({ id: req.params.id })
    .del();

  try {
    if (deletedAccount) {
      res.status(200).json(deletedAccount);
    } else {
      res.status(404).json("that specific account is not valid to delete");
    }
  } catch (error) {
    res.status(500).json("Oops Major Error", error);
  }
});

module.exports = router;
