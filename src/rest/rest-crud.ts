/// <reference path="../../typings/express/express.d.ts" />
/// <reference path="../../typings/body-parser/body-parser.d.ts" />
/// <reference path="in-memory-dao.ts" />

import * as express from 'express';
const app = express();
import * as bodyParser from 'body-parser';

import DAO = require('./in-memory-dao');

// configure our app to use bodyParser(it let us get the json data from a POST)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port:number = process.env.PORT || 8888;
const router = express.Router();
const userDAO:DAO.InMemoryUserDAO = new DAO.InMemoryUserDAO();

router.get('/', function (req, res) {
    res.json(userDAO.read(req.query.id));
});
router.post('/', function (req, res) {
    res.json(userDAO.create(req.body));
});
router.put('/', function (req, res) {
    res.json({result : userDAO.update(req.body)});
});
router.delete('/', function (req, res) {
    res.json({result : userDAO.delete(req.query.id)});
});

// prefixed all routes with /api
app.use('/api', router);

app.listen(port);
console.log('http://127.0.0.1:' + port + '/api');