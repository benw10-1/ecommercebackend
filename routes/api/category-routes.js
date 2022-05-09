const router = require('express').Router();
const { Product, Category } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  try {
    let ret = await Category.findAll({include: [Product]})
    res.json(ret)
  }
  catch (err) {
    err = String(err)
    res.status(500).json({
      status: "error",
      result: err
    })
  }
});

router.get('/:id', async (req, res) => {
  try {
    let ret = await Category.findOne({
      where: {id: req.params.id},
      include: [Product]
    })
    res.json(ret)
  }
  catch (err) {
    err = String(err)
    res.status(400).json({
      status: "error",
      result: err
    })
  }
});

router.post('/', async (req, res) => {
  try {
    let ret = Category.create(req.body)
    res.status(200).json(ret)
  }
  catch (err) {
    err = String(err)
    res.status(400).json({
      status: "error",
      result: err
    })
  }
});

router.put('/:id', async (req, res) => {
  try {
    let ret = await Category.update(req.body, {where: {id: req.params.id}})
    res.status(200).json(ret)
  }
  catch (err) {
    err = String(err)
    res.status(400).json({
      status: "error",
      result: err
    })
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let ret = await Category.destroy({where: {id: req.params.id}})
    res.status(200).json(ret)
  }
  catch (err) {
    err = String(err)
    res.status(404).json({
      status: "error",
      result: err
    })
  }
});

module.exports = router;
