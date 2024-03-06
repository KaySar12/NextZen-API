const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
  res.send({ message: 'Hello world' });
});

// eslint-disable-next-line consistent-return
router.get('/cloud', (req, res) => {
  const queryParams = req.query;
  let redirectUrl = queryParams.state || '';
  // Check if code or scope is present and append accordingly
  if (queryParams.code) {
    redirectUrl += `${redirectUrl.includes('?') ? '&' : '?'}code=${queryParams.code}`;
    if (queryParams.scope) {
      redirectUrl += `&scope=${queryParams.scope}`;
    }
  } else if (queryParams.scope) {
    redirectUrl += `${redirectUrl.includes('?') ? '&' : '?'}scope=${queryParams.scope}`;
  }

  if (redirectUrl) {
    // Perform the redirection
    res.redirect(redirectUrl);

  } else {
    res.send({ message: 'Missing required parameters: state' });
  }
});

router.get('/feed', (req, res) => {
  return res.status(200).json({ url: 'https://rss.app/feeds/fWwl4VP5zVwKY9c3.xml' })
})
router.get('/v1/sys/version', async (req, res) => {
  try {
    const version = {
      code: 200,
      mssage: "ok",                              
      data: {
        id: 54,
        change_log: "v1.1.0\n\n Fix tips icon display errors.  https://github.com/IceWhaleTech/CasaOS/issues/1623\n Fix the problem that the text in the app store list is not aligned. https://github.com/IceWhaleTech/CasaOS/issues/1635\n Fix merge did not work after reboot\n Fix the three-way store source was missing after update\n Add Greek and Russian languages.  https://github.com/IceWhaleTech/CasaOS/issues/1617  https://github.com/IceWhaleTech/CasaOS/issues/1616\n Displays the user's avatar on the login screen.  https://github.com/IceWhaleTech/CasaOS/issues/1637\n* Add more file type support for text editor  https://github.com/IceWhaleTech/CasaOS/issues/1575",
        version: "1.1.0",
        type: 0,
        created_at: "2024-01-22T00:00:00Z",
        updated_at: "0001-01-01T00:00:00Z"
      }
    }


    return res.json(version);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch changelog' });
  }
});
module.exports = router;
