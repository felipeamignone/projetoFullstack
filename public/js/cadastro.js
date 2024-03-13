document.addEventListener("DOMContentLoaded", function () {
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
        .then((r) => {
          alert(r.msg);
          if (r.ok) {
            window.location.href = "/usuarios";
          }
        });
    }
  });

  function validateForm() {
    return true;
  }
});
