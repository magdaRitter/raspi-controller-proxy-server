const mod = require('../../modules').module;
const router = mod.express.Router();

base_url = mod.config.GARAGE_REMOTE_BASE_URL

garage_signal_url = base_url + '/garage'
gate_signal_url = base_url + '/gate'
both_signal_url = base_url + '/both'

router.get('/garage', function (req, res) {
    mod.axios({
        url: garage_signal_url,
        method: 'GET',
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        }
    })
        .then(function (resp) {
            res.status(200).send();
        })
        .catch(function (err) {
            res.status(err.status || 500).json({code: err.code, message: err.message})
        })
})

router.get('/gate', function (req, res) {
    mod.axios({
        url: gate_signal_url,
        method: 'GET',
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        }
    })
        .then(function (resp) {
            res.status(200).send();
        })
        .catch(function (err) {
            res.status(err.status || 500).json({code: err.code, message: err.message})
        })
})

router.get('/both', function (req, res) {
    mod.axios({
        url: both_signal_url,
        method: 'GET',
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        }
    })
        .then(function (resp) {
            res.status(200).send();
        })
        .catch(function (err) {
            res.status(err.status || 500).json({code: err.code, message: err.message})
        })
})

module.exports = router;
