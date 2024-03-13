import UserModel from "../models/userModel.js";
import PermissionModel from "../models/permitionModel.js";

class UsuarioController {
  async getAllUsers(req, resp) {
    let userModel = new UserModel();
    let permissionModel = new PermissionModel();
    let users = await userModel.getAllUsers();

    let usersUpdated = await Promise.all(
      users.map(async (user) => {
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
          permissionName,
        };
      })
    );
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

  async cadastroView(req, resp) {
    let permissionModel = new PermissionModel();
    let permissions = await permissionModel.getAllPermissions();
    resp.render("usuarios/cadastro", { permissions });
  }

  async alterarView(req, resp) {
    let permissionModel = new PermissionModel();
    let permissions = await permissionModel.getAllPermissions();
    resp.render("usuarios/alterar", { permissions });
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

    if (name && email && password && permission != "0") {
      const query = await newUser.register();
      if (query) {
        resp.send({
          ok: true,
          msg: "Usuário criado com sucesso!",
        });
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

  async editar(req, resp) {
    const id = req.params.id;
    const { name, email, password, active, permission } = req.body;
    const newUser = new UserModel(
      parseInt(id, 10),
      name,
      email,
      password,
      active,
      permission
    );

    if (name && email && password && permission != "0") {
      const query = await newUser.update();
      if (query) {
        resp.send({
          ok: true,
          msg: "Usuário editado com sucesso!",
        });
        return;
      }
      resp.send({
        ok: false,
        msg: "Erro ao editar usuário",
      });
      return;
    }
    resp.send({
      ok: false,
      msg: "Um ou mais campos estão inválidos",
    });
  }

  async deletar(req, resp) {
    const id = req.params.id;
    const newUser = new UserModel(
      parseInt(id, 10),
      null,
      null,
      null,
      null,
      null
    );

    const query = await newUser.delete();
    if (query) {
      resp.send({
        ok: true,
        msg: "Usuário deletado com sucesso!",
      });
      return;
    }
    resp.send({
      ok: false,
      msg: "Erro ao deletar usuário",
    });
  }
}

export default UsuarioController;
