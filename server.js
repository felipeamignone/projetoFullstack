import express from "express";
import expressEjsLayout from "express-ejs-layouts";
import homeRoute from "./routes/homeRoute.js";
import usuarioRoute from "./routes/usuarioRoute.js";
import loginRoute from "./routes/loginRoute.js";
import tabsRoute from "./routes/tabsRoute.js";
const app = express();

//configura o ejs como view engine da nossa aplicação

//configura a localização da pasta views
app.set("views", "./views");
app.set("view engine", "ejs");
app.set("layout", "./layout");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(expressEjsLayout);

//configura as rotas existentes no nosso sistema
app.use("/", homeRoute);
app.use("/usuarios", usuarioRoute);
app.use("/login", loginRoute);
app.use("/tabs", tabsRoute);

//inicia o nosso servidor web
app.listen(5000, function () {
  console.log("servidor web iniciado");
});
