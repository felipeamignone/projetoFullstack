import Database from "../utils/database.js";
let db = new Database();

class PermissionModel {
  #PermissionId;
  #PermissionName;

  //GETTERS
  get permissionId() {
    return this.#PermissionId;
  }
  get permissionName() {
    return this.#PermissionName;
  }

  //SETTERS
  set permissionId(value) {
    this.#PermissionId = value;
  }
  set permissionName(value) {
    this.#PermissionName = value;
  }

  constructor(permissionId, permissionName) {
    this.#PermissionId = permissionId || null;
    this.#PermissionName = permissionName || null;
  }

  //METHODS
  async getAllPermissions() {
    try {
      let sql = "select * from tb_permissions";
      let rows = await db.ExecutaComando(sql);

      let permissions = rows.map(
        (row) => new PermissionModel(row.PermissionId, row.PermissionName)
      );

      return permissions;
    } catch (error) {
      throw error;
    }
  }

  async getPermissionNameById(permissionId) {
    try {
      let sql = "select * from tb_permissions where PermissionId = ?";
      let values = [permissionId];
      let rows = await db.ExecutaComando(sql, values);

      let permissions = rows.map(
        (row) => new PermissionModel(row.PermissionId, row.PermissionName)
      );

      return permissions[0].permissionName;
    } catch (error) {
      throw error;
    }
  }

  toJSON() {
    return {
      permissionId: this.#PermissionId,
      permissionName: this.#PermissionName,
    };
  }
}

export default PermissionModel;
