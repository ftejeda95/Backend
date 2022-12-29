import FirebaseAdmin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { readFile } from "fs/promises";

const cert = JSON.parse(
  await readFile(new URL(process.env.FIREBASE_CERT_PATH, import.meta.url))
);

FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(cert),
});

console.log("Conectados a Firebase!");

class ContenedorFirebase {
    constructor(collection){
        this.collection = collection
    }
    
  static async createUsers(elemt) {
    try {
      const db = FirebaseAdmin.firestore();
      const query = db.collection(this.collection);
      let id = uuidv4();

      elemt.map((e) => {
        let doc = query.doc(id);
        doc.create(e);
      });
      console.log("[createUsers] Usuarios creados con éxito!");
    } catch (error) {
      console.error("[createUsers] Ocurrio un error ->", error.message);
    }
  }

  static async readAll() {
    try {
      const db = FirebaseAdmin.firestore();
      const query = db.collection(this.collection);
      const querySnapshot = await query.get();
      let docs = querySnapshot.docs;
      const response = docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("[readAll] Usuarios obtenidos con éxito! ->", response);
    } catch (error) {
      console.error(
        "[readAll] Ocurrio un error al intentar obtener usuarios  ->",
        error.message
      );
    }
  }

  static async readById(id) {
    try {
      const db = FirebaseAdmin.firestore();
      const query = db.collection(this.collection);
      const doc = query.doc(id);
      const item = await doc.get();
      const response = item.data();
      if (response) {
        console.log(
          `[readById] Usuario ${id} obtenido con éxito! ->`,
          response
        );
      } else {
        console.log(`[readById] Usuario ${id} no encontrado`);
      }
    } catch (error) {
      console.error(
        `[readById] Ocurrio un error al intenter obtener usuario ${id} ->`,
        error.message
      );
    }
  }

  static async updateById(id, data) {
    try {
      const db = FirebaseAdmin.firestore();
      const query = db.collection(this.collection);
      const doc = query.doc(id);
      await doc.update(data);
      console.log(`[updateById] Usuario ${id} actualizado con éxito!`);
    } catch (error) {
      console.error(
        `[updateById] Ocurrio un error al intentar actualizar usuario ${id} ->`,
        error.message
      );
    }
  }

  static async deleteById(id) {
    try {
      const db = FirebaseAdmin.firestore();
      const query = db.collection(this.collection);
      const doc = query.doc(id);
      await doc.delete();
      console.log(`[deleteById] Usuario ${id} eliminado con éxito!`);
    } catch (error) {
      console.error(
        `[deleteById] Ocurrio un error al intentar eliminado usuario ${id} ->`,
        error.message
      );
    }
  }
}
export default ContenedorFirebase;
