const express = require('express');
const router = express.Router();

router.get('/hi', (req, res) => { // Sửa thành /hi (route con) thay vì /api/vi/hi
    console.log("Hello World!");
    res.status(200).json({ message: "Hello World API" });
});

module.exports = router;