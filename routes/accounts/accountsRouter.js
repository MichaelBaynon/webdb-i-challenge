const router = require("express").Router();
const db = require("../../data/dbConfig");

router.get("/", (req, res) => {
  db("*")
    .from("accounts")
    .then(accounts => {
      res.send(accounts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", (req, res) => {
  db.select("*")
    .from("accounts")
    .where("id", "=", req.params.id)
    .then(account => {
      res.send(account);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/", (req, res) => {
  const accountData = req.body;

  db("accounts")
    .insert(accountData, "id")
    .then(ids => {
      res.json(ids);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res) => {
  db("*")
    .from("accounts")
    .then(accounts => {
      res.delete(accounts);
    });
});

module.exports = router;
