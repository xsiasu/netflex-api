const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

//Create
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const createdList = await newList.save();
      res.status(200).json(createdList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("관리자개정에서 추가할수 있습니다.");
  }
});

//Delete
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json("삭제성공");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("권한이 없는 사용자입니다");
  }
});

//Get random
router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];

  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
