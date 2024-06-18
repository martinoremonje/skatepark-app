import { addSkaterQuery, deleteSkaterQuery, getSkatersQuery, updateSkaterQuery, verifyUserQuery } from "../models/queries.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { v4 as uuidv4 } from "uuid";

const secretkey = process.env.JWT_SECRET_KEY;

export const home = async(req, res) => {
    res.render("home", {
      title: "Home Page",
      skaters: await getSkatersQuery()
    });
  };

  export const loginForm = (req, res) => {
    res.render("login", {
      title: "Login Page",
    });
  };
  
  export const registerForm = (req, res) => {
    res.render("register", {
      title: "Register Page",
    });
  };
  
  export const adminPage = (req, res) => {
    res.render("admin", {
      title: "Admin Page",
    });
  };

  export const dataPage = (req, res) => {
    res.render("data", {
      title: "Data Page",
    });
  };


  // controladores de put post y delete

  export const addSkater = async (req, res) => {
    const { email, nombre, password, anos_experiencia, especialidad, repeatpassword} = req.body;
    const { foto } = req.files;
  
    const fotoName = uuidv4().slice(0, 8);
    const fotoUrl = `/uploads/${fotoName}.jpg`;

    foto.mv(`./public/uploads/${fotoName}.jpg`);
  
    if (!email || !nombre || !password || !anos_experiencia || !especialidad || !foto) {
      return res.status(400).send("Faltan datos");  
    }
    if (password !== repeatpassword) {
      return res.send("Las contraseñas deben coincidir");
    }
    try {
      const passwordHash = await bcrypt.hash(password, 10);
  

      await addSkaterQuery(email, nombre, passwordHash, anos_experiencia, especialidad, fotoUrl);
  
     
      res.status(200).redirect("/login");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error del servidor");  
    }
  };

  export const login = async (req, res) =>{
    const {email, password} = req.body;
    try {
      const result = await verifyUserQuery(email);
      const passwordMatch = await bcrypt.compare(password, result.password)
      if(!passwordMatch){
        return res.status(401).send("Contraseña incorrecta")
      }
      const token = jwt.sign({user: result.nombre, email: result.email}, secretkey, {expiresIn: '10s'});
      res.cookie('token', token);
      res.status(200).render("data",{
        title: "Data page",
        user: result.nombre,
        email: result.email,
        anos_experiencia: result.anos_experiencia,
        especialidad: result.especialidad,
        id: result.id
      })
    } catch (error) {
      console.log(error)
    }
 };

 export const updateSkater = async (req, res) => {
  const { email, nombre, anos_experiencia, especialidad } = req.body;

  // Validación básica de campos
  if (!email || !nombre || !anos_experiencia || !especialidad) {
    return res.status(400).send("Faltan datos");
  }

  try {
   

    const response = await updateSkaterQuery(email, nombre, anos_experiencia, especialidad);
    if (response) {
      return res.status(200).redirect("/");
    } else {
      return res.status(404).send("No se encontró el skater con el email proporcionado");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error interno del servidor");
  }
};

export const deleteSkater = async (req, res) => {
  try {
    const { id } = req.body;
    
    // Validación básica del id
    if (!id) {
      return res.status(400).send("Falta el ID");
    }
    
    const response = await deleteSkaterQuery(id);
    if (response) {
      return res.status(200).redirect("/");
    } else {
      return res.status(404).send("No se encontró el skater con el ID proporcionado");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error interno del servidor");
  }
};
