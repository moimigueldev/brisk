const express = require('express'),
    router = express.Router();

router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
})


module.exports = router;

