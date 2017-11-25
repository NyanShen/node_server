"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var express = require("express");
var _ = require("lodash");
var app = express();
var bodyParser = require('body-parser');
// url 统一资源调配符 encoded 编码
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
var server = app.listen(8088, "localhost", function () {
    console.log("服务器已启动，地址是：http://localhost:8088");
});
// user
var User = (function () {
    function User(id, userName, fullName, password, group, desc) {
        this.id = id;
        this.userName = userName;
        this.fullName = fullName;
        this.password = password;
        this.group = group;
        this.desc = desc;
    }

    return User;
}());
exports.User = User;
var users = [
    new User('001', 'user_name_001', 'full_name_001', 'pass', '0', 'desc_001'),
    new User('002', 'user_name_002', 'full_name_002', 'pass', '0', 'desc_002'),
    new User('003', 'user_name_003', 'full_name_003', 'pass', '0', 'desc_003'),
    new User('004', 'user_name_010', 'full_name_010', 'pass', '1', 'desc_010'),
    new User('005', 'user_name_011', 'full_name_011', 'pass', '1', 'desc_011')
];
app.get('/users/:id', function (req, res) {
    res.status(200);
    res.json(users.find(function (user) {return user.id === req.params.id;}));
});
app.get('/users', function (req, res) {
    if (_.isEmpty(req.query.userName) && _.isEmpty(req.query.fullName)) {
        res.json({users: users});
    }
    else {
        res.json({
            users: users.filter(function (user) {
                return ((user.userName).indexOf(req.query.userName)) > 0 ||
                    ((user.fullName).indexOf(req.query.fullName)) > 0;
            })
        });
    }
});
app.post('/users', jsonParser, urlencodedParser, function (req, res) {
    var user = req.body.user;
    users.push(user);
    res.send('save success');
});
app.delete('/users/:id', function (req, res) {
    const deleteUser = users.findIndex(function (user) {
        return user.id === req.params.id;
    });
    users.splice(deleteUser, 1);
    res.send('delete success');
});

//menu
var menus = [
    {
        "id": "0010",
        "fatherId": "0000",
        "name": "sell",
        "path": "/auction/sell",
        "childItems": [
            {
                "id": "0011",
                "fatherId": "0010",
                "name": "竞拍商品",
                "path": "/auction/sell/product-list",
                "childItems": []
            },
            {
                "id": "0012",
                "fatherId": "0010",
                "name": "成交商品",
                "path": "/auction/sell/product-success",
                "childItems": []
            },
            {
                "id": "0013",
                "fatherId": "0010",
                "name": "新增商品",
                "path": "/auction/sell/product-add",
                "childItems": []
            },
            {
                "id": "0014",
                "fatherId": "0010",
                "name": "最新商品",
                "path": "/auction/sell/product-latest",
                "childItems": []
            }
        ]
    },
    {
        "id": "0020",
        "fatherId": "0000",
        "name": "backstage",
        "path": "/auction/backstage",
        "childItems": [
            {
                "id": "0021",
                "fatherId": "0020",
                "name": "用户管理",
                "path": "/auction/backstage/user-manage",
                "childItems": []
            },
            {
                "id": "0022",
                "fatherId": "0020",
                "name": "用户新增",
                "path": "/auction/backstage/user-add",
                "childItems": []
            },
            {
                "id": "0023",
                "fatherId": "0020",
                "name": "角色管理",
                "path": "/auction/backstage/role-manage",
                "childItems": []
            },
            {
                "id": "0024",
                "fatherId": "0010",
                "name": "用户角色",
                "path": "/auction/backstage/user-role",
                "childItems": []
            },
            {
                "id": "0025",
                "fatherId": "0010",
                "name": "模块管理",
                "path": "/auction/backstage/module-manage",
                "childItems": []
            }
        ]
    }
];
app.get('/menus', function (req, res) {
    res.json({menus: menus});
});
// product
var Product = (function () {
    function Product(id, title, price, rating, desc, categories) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }

    return Product;
}());
exports.Product = Product;
var products = [
    new Product(1, '第一个商品', 1.99, 3.5, '这是第一个商品', ['电子产品']),
    new Product(2, '第二个商品', 2.99, 2.5, '这是第二个商品', ['电子产品', '硬件设备']),
    new Product(3, '第三个商品', 3.99, 4.5, '这是第三个商品', ['电子产品']),
    new Product(4, '第四个商品', 4.99, 1.5, '这是第四个商品', ['电子产品']),
    new Product(5, '第五个商品', 5.99, 3.5, '这是第五个商品', ['电子产品']),
    new Product(6, '第五个商品', 6.99, 2.5, '这是第六个商', ['电子产品'])
];
app.get('/products', function (req, res) {
    res.status(200);
    res.json({products: products});
});
app.get('/products/:id', function (req, res) {
    res.status(200);
    res.json({
        product: products.find(function (product) {
            return product.id === req.params.id;
        })
    });
});
app.get('/', function (req, res) {
    res.send("Hello Express");
});
