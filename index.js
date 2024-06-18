import express from "express";
import router from "./routes/routes.js";
import {engine} from "express-handlebars";
import cookieParser  from "cookie-parser";
import expressFileUpload from 'express-fileupload';
import methodOverride from "method-override";

const app = express();
const PORT = process.env.PORT || 3000;

//Public Folder
app.use(express.static('public'));


//config handlebars
app.set("view engine", "hbs");
app.engine(
  "hbs",
  engine({
    extname: "hbs",
  })
);
app.set("views", "./views");

// middlewares

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(expressFileUpload({
  limits: { fileSize: 900000 },
  responseOnLimit: 'El archivo es demasiado grande',
  abortOnLimit: true
}));

app.use("/", router);

app.listen(PORT, ()=>{
    console.log(`Servido corriendo en link: http://localhost:${PORT}`)
});