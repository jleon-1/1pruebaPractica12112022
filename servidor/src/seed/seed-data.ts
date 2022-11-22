import mongoose from "mongoose";
import { Usuario } from "../models/usuario.model";
import { PasswordManager } from "../services/password-manager";

export const seedData = async () => {
    const contrasenaAdmin = await PasswordManager.toHash("1234");

   let doc = await Usuario.findOneAndUpdate(
      { username: "admin" },
      { username: "admin", contrasena: contrasenaAdmin, esAdmin: true },
      {
         upsert: true, // Make this update into an upsert
      }
   );
};
