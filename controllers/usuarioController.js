import UserModel from "../models/userModel.js";
import PermissionModel from "../models/permitionModel.js";

class UsuarioController {
  async getAllUsers(req, resp) {
    let userModel = new UserModel();
    let permissionModel = new PermissionModel();
    let users = await userModel.getAllUsers();

    let usersUpdated = await Promise.all(users.map(async (user) => {
      const { userName, userEmail, userActive, permissionId, userId } = user;
      const permissionName = await permissionModel.getPermissionNameById(
        permissionId
      );
      return {
        userId,
        userName,
        userEmail,
        userActive,
        permissionId,
        permissionName
      };
    }));
    resp.send(usersUpdated);
  }

  async getUserById(req, resp) {
    let userModel = new UserModel();
    let user = await userModel.getUserById(req.params.id);
    resp.send(user);
  }

  async listagemView(req, resp) {
    resp.render("usuarios/listagem");
  }

  cadastroView(req, resp) {
    resp.render("usuarios/cadastro");
  }

  alterarView(req, resp) {
    resp.render("usuarios/alterar");
  }

  async cadastrar(req, resp) {
    const { name, email, password, active, permission } = req.body;
    const newUser = new UserModel(
      null,
      name,
      email,
      password,
      active,
      permission
    );

    const query = await newUser.register();

    if (nome && email && senha && ativo && perfil != "0") {
      if (query) {
        resp.render("usuarios/cadastro", { msg: "usuario criado" });
        return;
      }
      resp.send({
        ok: false,
        msg: "Erro ao cadastrar usuário",
      });
      return;
    }
    resp.send({
      ok: false,
      msg: "Um ou mais campos estão inválidos",
    });
  }
}

export default UsuarioController;
