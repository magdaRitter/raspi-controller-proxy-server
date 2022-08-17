const mod = require('../../modules').module;
const router = mod.express.Router();

router.get('/authPage', function (req, res) {
  let state = mod.crypto.randomBytes(16).toString('hex');
  res.cookie('XSRF-TOKEN', state);
  res.send({ authUrl: "https://github.com/login/oauth/authorize?client_id=" + mod.config.CLIENT_ID + '&redirect_uri=' + mod.config.REDIRECT_URI + '&scope=read:user&allow_signup=' + false + '&state=' + state });
})

router.post('/accessToken', function (req, res) {
  let state = req.headers["x-xsrf-token"];
  mod.axios({
    url: 'https://github.com/login/oauth/access_token?client_id=' + mod.config.CLIENT_ID + '&client_secret=' + mod.config.CLIENT_SECRET + '&code=' + req.body.code + '&redirect_uri=' + mod.config.REDIRECT_URI + '&state=' + state,
    method: 'POST',
    headers: { 'Accept': 'application/json' }
  })
    .then(function (resp) {
      if (resp.data.access_token) {
        req.session.token = resp.data.access_token;
      }
      res.send(resp.data);
    })
    .catch(function (err) {
      res.send(err);
    })
})

router.get('/userDetails', function (req, res) {
  if (req.session.token) {
    mod.axios({
      url: 'https://api.github.com/user',
      method: 'GET',
      headers: { 'Authorization': "token" + " " + req.session.token }
    })
      .then(function (resp) {
        res.cookie('name', resp.data.name, { httpOnly: true });
        res.send(resp.data);
      })
      .catch(function (err) {
        res.send(err);
      })
  }
  else {
    res.status(401).send();
  }
})

router.get('/logout', function (req, res) {
  console.log("Request for logout received");
  req.session = null;
  res.clearCookie('sess');
  res.clearCookie('name');
  res.status(200).send();
})

module.exports = router;
