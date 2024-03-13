document.addEventListener("DOMContentLoaded", function () {
  fetch("/usuarios/users")
    .then((r) => {
      return r.json();
    })
    .then((r) => {
      let html = "";
      for (let i = 0; i < r.length; i++) {
        html += `<tr>
                          <td>${r[i].userEmail}</td>
                          <td>${r[i].userName}</td>
                          <td>${r[i].permissionName}</td>
                          <td>${r[i].userActive ? "SIM" : "NÃO"}</td>
                          <td>
                            <a href="/usuarios/alterar/${
                              r[i].userId
                            }" class="btn btn-primary"><i class="fas fa-pen"></i></a>
                            <button class="btn btn-primary" onclick="deleteUser(${
                              r[i].userId
                            })"><i class="fas fa-trash"></i></button>
                          </td>
                      </tr>`;
      }
      document.querySelector("#tabelaUsuarios > tbody").innerHTML = html;
    });
});

function deleteUser(userId) {
  fetch(`/usuarios/deletar/${userId}`, {
    method: "DELETE",
  })
    .then((r) => r.json())
    .then((r) => {
      alert(r.msg);
      if (r.ok) {
        window.location.href = "/usuarios";
      }
    });
}
