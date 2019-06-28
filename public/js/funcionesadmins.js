var Alerta = function () {
	var confirmar;
	if (confirm("Esta seguro de eliminar a este Administrador")) {
		confirmar = 1;
	} else {
		confirmar = 0;
	}

	if (confirmar==1) {
		alert("Administrador eliminado");
	} else {
		alert("Acción cancelada")
	}
	confirmar = document.getElementById("eliminar");
}