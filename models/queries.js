import {pool} from "../config/db.js";

// crear queries de put delete get e insert

export const getSkatersQuery = async () => {
    try {
      const sql = {
        text: "SELECT * FROM skaters",
      };
  
      const response = await pool.query(sql);
      if (response.rowCount > 0) {
        
        return response.rows;
      } else {
        return new Error("Error getting skaters");
      }
    } catch (error) {
      console.log("Error code: ", error.code + " Error message: ", error.message);
    }
  };

export const addSkaterQuery = async (email, nombre,password, anos_experiencia, especialidad, foto) =>{
    try {
        const sql = {
            text: "INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, true) RETURNING *",
            values: [email, nombre, password, anos_experiencia, especialidad, foto]
        };

        const response = await pool.query(sql);
        if(response.rowCount > 0){
            console.log("Skater añadido correctamente")
        }
    } catch (error) {
        console.log(error)
    }
};

export const verifyUserQuery = async (email) => {
    try {
      const sql = {
        text: "SELECT * FROM skaters WHERE email = $1",
        values: [email],
      };
      const response = await pool.query(sql);
      if (response.rowCount > 0) {
        console.log(response.rows[0])
        return response.rows[0];
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error code: ", error.code, "Error message: ", error.message);
    }
  };


  export const updateSkaterQuery = async (email, nombre, anos_experiencia, especialidad) => {
    try {
        const sql = {
            text: "UPDATE skaters SET nombre = $2, anos_experiencia = $3, especialidad = $4 WHERE email = $1 RETURNING *;",
            values: [email, nombre, anos_experiencia, especialidad]
        };
        const response = await pool.query(sql);
        if (response.rowCount > 0) {
            return response.rows[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        throw error; 
    }
};

export const deleteSkaterQuery = async (id) => {
  const sql = {
    text: "DELETE FROM skaters WHERE id = $1",
    values: [id]
  };
  try {
    const response = await pool.query(sql);
    if (response.rowCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

 