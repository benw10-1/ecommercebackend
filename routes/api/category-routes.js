const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  try {
    let cats = await Category.findAll({include: [Product]})
    res.json(cats)
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
    let cat = await Category.findOne({
      where: {id: req.params.id},
      include: [Product]
    })
    res.json(cat)
  }
  catch (err) {
    err = String(err)
    res.status(400).json({
      status: "error",
      result: err
    })
  }
});

router.post('/', (req, res) => {
  try {
    let cat = Category.create(req.body)
    res.status(200).json(cat)
  }
  catch (err) {
    err = String(err)
    res.status(400).json({
      status: "error",
      result: err
    })
  }
});

router.put('/:id', (req, res) => {
  try {
    let cat = await Category.update(req.body, {where: {id: req.params.id}})
    res.status(200).json(cat)
  }
  catch (err) {
    err = String(err)
    res.status(400).json({
      status: "error",
      result: err
    })
  }
});

router.delete('/:id', (req, res) => {
  try {
    let cat = await Category.destroy({where: {id: req.params.id}})
    res.status(200).json(cat)
  }
  catch (err) {
    err = String(err)
    res.status(400).json({
      status: "error",
      result: err
    })
  }
});

module.exports = router;
