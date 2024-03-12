document.addEventListener("DOMContentLoaded", function () {
  let id = window.location.pathname.split("/")[3];
  fetch(`/usuarios/users/${id}`, {
    method: "GET",
  })
    .then((r) => r.json())
    .then((r) => {
        $("#usuarioNome").val(r.userName);
        $("#usuarioEmail").val(r.userEmail);
        $("#usuarioSenha").val(r.userPassword);
        $("#usuarioTipo").val(r.permissionId);
        $("#usuarioAtivo").attr("checked", Boolean(r.userActive));
    });

  $("#register-form").on("submit", function (e) {
    e.preventDefault();

    let name = $("#usuarioNome").val();
    let email = $("#usuarioEmail").val();
    let password = $("#usuarioSenha").val();
    let permission = $("#usuarioTipo").val();
    let active = $("#usuarioAtivo").is(":checked");

    if (validateForm()) {
      let obj = {
        name,
        email,
        password,
        active,
        permission,
      };

      console.log({ obj });
      fetch("/usuarios/cadastrar", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((r) => console.log(r));
    }
  });

  function validateForm() {
    return true;
  }
});
