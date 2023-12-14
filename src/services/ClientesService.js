import firebase from "../firebase";

const db = firebase.ref("/clientes");

class ClienteService {
  getAll() {
    return db;
  }

  create(cliente) {
    return db.push(cliente);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new ClienteService();
