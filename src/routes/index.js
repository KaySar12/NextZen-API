const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
  res.send({ message: 'Hello world' });
});

router.get('/cloud', (req, res) => {
  const queryParams = req.query;
  if (Object.hasOwn(queryParams, 'state')) {
    res.redirect(queryParams.state);
  } else {
    res.send({ message: 'no State parameter' });
  }
})



router.get('/v1/sys/version', async (req, res) => {
  try {


    const version = {
      Id: 1,
      ChangeLog: "Test Log",
      Version: "1.1.0",
      CreatedAt: Date.now(),
      UpdatedAt: Date.now(),
    };

    return res.json(version);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch changelog' });
  }
});
module.exports = router;
