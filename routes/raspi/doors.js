const mod = require('../../modules').module;
const router = mod.express.Router();

router.get('/garage', function (req, res) {
    console.log("Request for garage received");
    res.status(200).send();
})

router.get('/gate', function (req, res) {
    console.log("Request for gate received");
    res.status(200).send();
})

router.get('/both', function (req, res) {
    console.log("Request for both received");
    res.status(200).send();
})

module.exports = router;
