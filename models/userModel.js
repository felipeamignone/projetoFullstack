import Database from "../utils/database.js";
let db = new Database();

class UserModel {
  #UserId;
  #UserName;
  #UserEmail;
  #UserPassword;
  #UserActive;
  #PermissionId;

  //GETTERS
  get userId() {
    return this.#UserId;
  }
  get userName() {
    return this.#UserName;
  }
  get userEmail() {
    return this.#UserEmail;
  }
  get userPassword() {
    return this.#UserPassword;
  }
  get userActive() {
    return this.#UserActive;
  }
  get permissionId() {
    return this.#PermissionId;
  }

  //SETTERS
  set userId(value) {
    this.#UserId = value;
  }
  set userName(value) {
    this.#UserName = value;
  }
  set userEmail(value) {
    this.#UserEmail = value;
  }
  set userPassword(value) {
    this.#UserPassword = value;
  }
  set userActive(value) {
    this.#UserActive = value;
  }
  set permissionId(value) {
    this.#PermissionId = value;
  }

  constructor(
    userId,
    userName,
    userEmail,
    userPassword,
    userActive,
    permissionId
  ) {
    this.#UserId = userId || null;
    this.#UserName = userName || null;
    this.#UserEmail = userEmail || null;
    this.#UserPassword = userPassword || null;
    this.#UserActive = userActive || null;
    this.#PermissionId = permissionId || null;
  }

  //METHODS
  async getAllUsers() {
    try {
      let sql = "select * from tb_users";
      let rows = await db.ExecutaComando(sql);

      let users = rows.map(
        (row) =>
          new UserModel(
            row.UserId,
            row.UserName,
            row.UserEmail,
            row.UserPassword,
            Boolean(row.UserActive),
            row.PermissionId
          )
      );

      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      let sql = "select * from tb_users where (UserId = ?)";
      let values = [userId];
      let rows = await db.ExecutaComando(sql, values);

      let users = rows.map(
        (row) =>
          new UserModel(
            row.UserId,
            row.UserName,
            row.UserEmail,
            row.UserPassword,
            row.UserActive,
            row.PermissionId
          )
      );

      return users[0];
    } catch (error) {
      throw error;
    }
  }

  async register() {
    try {
      let sql =
        "insert into tb_users (UserName, UserEmail, UserPassword, UserActive, PermissionId) values (?,?,?,?,?)";
      let values = [
        this.#UserName,
        this.#UserEmail,
        this.#UserPassword,
        this.#UserActive,
        this.#PermissionId,
      ];

      let result = await db.ExecutaComandoNonQuery(sql, values);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async update() {
    try {
      let sql =
        "update tb_users set UserName = ?, UserEmail = ?, UserPassword = ?, UserActive = ?, PermissionId = ? where UserId = ?";
      let values = [
        this.#UserName,
        this.#UserEmail,
        this.#UserPassword,
        this.#UserActive,
        this.#PermissionId,
        this.#UserId
      ];

      let result = await db.ExecutaComandoNonQuery(sql, values);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    try {
      let sql =
        "delete from tb_users where UserId = ?";
      let values = [
        this.#UserId
      ];

      let result = await db.ExecutaComandoNonQuery(sql, values);

      return result;
    } catch (error) {
      throw error;
    }
  }

  toJSON() {
    return {
      userId: this.#UserId,
      userName: this.#UserName,
      userEmail: this.#UserEmail,
      userPassword: this.#UserPassword,
      userActive: this.#UserActive,
      permissionId: this.#PermissionId,
    };
  }
}

export default UserModel;
