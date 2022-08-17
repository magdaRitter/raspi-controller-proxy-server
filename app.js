const mod = require('./modules').module;
const app = mod.express();

app.use(mod.logger('dev'));
app.use(mod.express.json());
app.use(mod.express.urlencoded({ extended: false }));
app.use(mod.cookieParser());
app.use(mod.express.static(mod.path.join(__dirname, 'public')));
app.use(mod.cors({
  origin: ['http://localhost:4200'],
  methods: ['GET', 'PUT', 'POST', 'DELETE']
}))
app.use(mod.cookieSession({
  name: 'sess',
  secret: 'asdfgh',
  httpOnly: true
}))

const authRouter = require('./routes/auth/auth');
const doorsRoute = require("./routes/raspi/doors")
const alarmRoute = require("./routes/raspi/doors")
const systemRoute = require("./routes/raspi/doors")

app.use('/raspi/auth', authRouter);
app.use('/raspi/alarm', alarmRoute);
app.use('/raspi/doors', doorsRoute);
app.use('/raspi/system', systemRoute);

app.use(function (err, req, res, next) {
  res.status(err.status).send();
});

app.listen(mod.config.APP_PORT, function () {
  console.log("Server listening on port " + mod.config.APP_PORT);
})

module.exports = app;
