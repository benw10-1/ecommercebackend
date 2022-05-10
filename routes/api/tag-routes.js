const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    let ret = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag
        }
      ]
    })
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
    let ret = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Product,
          through: ProductTag
        }
      ]
    })
    res.json(ret)
  }
  catch (err) {
    err = String(err)
    res.status(404).json({
      status: "error",
      result: err
    })
  }
});

router.post('/', async (req, res) => {
  try {
    let ret = await Tag.create(req.body)
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

router.put('/:id', async (req, res) => {
  try {
    let ret = await Tag.update(req.body, {where: {id: req.params.id}})
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

router.delete('/:id', async (req, res) => {
  try {
    let ret = await Tag.destroy({
      where: {
        id: req.params.id
      },
    })
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
