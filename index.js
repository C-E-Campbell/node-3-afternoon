require("dotenv").config();
const express = require("express");
const massive = require("massive");
const controller = require("./controller/node_controller");

const app = express();
app.use(express.json());

const port = process.env.PORT || 8293;

massive(process.env.CONNECTION_STRING)
	.then(dbInstance => {
		app.set("db", dbInstance);
	})
	.catch(err => console.log(err));

app.get("/api/products", controller.getAll);

app.get("/api/product/:id", controller.getOne);

app.put("/api/products:id", controller.update);

app.post("/api/products", controller.create);

app.delete("/api/products/:id", controller.delete);

app.listen(port, () => {
	console.log(`server listening on ${port}`);
});
