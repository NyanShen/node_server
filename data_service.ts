import * as express from 'express';

const app = express();

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

const server = app.listen(8088, "localhost", () => {
    console.log("服务器已启动，地址是：http://localhost:8088");
});

// user
export class User {
    constructor(public id: string,
                public userName: string,
                public fullName: string,
                public password: string,
                public group: string,
                public desc: string) {
    }
}
const users: User[] = [
    new User('001', 'user_name_001', 'full_name_001', 'pass', '0', 'desc_001'),
    new User('002', 'user_name_002', 'full_name_002', 'pass', '0', 'desc_002'),
    new User('003', 'user_name_003', 'full_name_003', 'pass', '0', 'desc_003'),
    new User('004', 'user_name_004', 'full_name_004', 'pass', '1', 'desc_004'),
    new User('005', 'user_name_005', 'full_name_005', 'pass', '1', 'desc_005')
];

app.get('/users', (req, res) => {
    res.json({users: users});
});


// product
export class Product {
    constructor(public id: number,
                public title: string,
                public  price: number,
                public rating: number,
                public desc: string,
                public categories: Array<string>) {
    }
}

const products: Product[] = [
    new Product(1, '第一个商品', 1.99, 3.5, '这是第一个商品', ['电子产品']),
    new Product(2, '第二个商品', 2.99, 2.5, '这是第二个商品', ['电子产品', '硬件设备']),
    new Product(3, '第三个商品', 3.99, 4.5, '这是第三个商品', ['电子产品']),
    new Product(4, '第四个商品', 4.99, 1.5, '这是第四个商品', ['电子产品']),
    new Product(5, '第五个商品', 5.99, 3.5, '这是第五个商品', ['电子产品']),
    new Product(6, '第五个商品', 6.99, 2.5, '这是第六个商', ['电子产品'])
];

app.get('/products', (req, res) => {
    res.status(200);
    res.json({products: products});
});

app.get('/products/:id', (req, res) => {
    res.status(200);
    res.json({product: products.find((product) => product.id == req.params.id)});
});


app.get('/', (req, res) => {
    res.send("Hello Express");
});