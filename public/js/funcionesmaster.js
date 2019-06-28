var Perfil = function () {
		var perfil = document.getElementById("iframeeditarmaster");
		var crear = document.getElementById("iframecrearadmin");
		var admins = document.getElementById("iframeadministradores");
		var noticias = document.getElementById("iframenoticias");
		crear.style.display = "none";
		admins.style.display = "none";
		noticias.style.display = "none";
		if(perfil.style.display == "none"){
			perfil.style.display = "block";
		}else {
			perfil.style.display = "none";
		}
	}

var Crear = function () {
		var perfil = document.getElementById("iframeeditarmaster");
		var crear = document.getElementById("iframecrearadmin");
		var admins = document.getElementById("iframeadministradores");
		var noticias = document.getElementById("iframenoticias");
		perfil.style.display = "none";
		admins.style.display = "none";
		noticias.style.display = "none";
		if(crear.style.display == "none"){
			crear.style.display = "block";
		}else {
			crear.style.display = "none";
		}
	}

	var Admins = function () {
		var perfil = document.getElementById("iframeeditarmaster");
		var crear = document.getElementById("iframecrearadmin");
		var admins = document.getElementById("iframeadministradores");
		var noticias = document.getElementById("iframenoticias");
		perfil.style.display = "none";
		crear.style.display = "none";
		noticias.style.display = "none";
		if(admins.style.display == "none"){
			admins.style.display = "block";
		}else {
			admins.style.display = "none";
		}
	}