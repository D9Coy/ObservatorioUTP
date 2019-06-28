var http = require ("http");
var fs = require ("fs");
var express = require("express");
var path = require("path");
var url=require('url');
const { Pool, Client } = require('pg')
const bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static("public"));// Hacer que el servidor acepte todo lo que contiene la carpeta public
app.set("view engine", "html");
app.get("/", function(req, res){
	res.sendfile("public/vistas/indexejemplo.html");
	//res.sendfile("public/vistas/navbar.html");
});


var mime = {
 'html' : 'text/html',
 'css'  : 'text/css',
 'jpg'  : 'image/jpg',
 'ico'  : 'image/x-icon',
 'mp3'  : 'audio/mpeg3',
 'mp4'  : 'video/mp4'
}; 

var connectionData = {
	user: 'postgres',
	host: 'localhost',
	database: 'Egresados',
	password: 'davidcoy9',
	port: 5432,
}

const pool = new Pool(connectionData)//piscina de conexiones

const cliente = new Client(connectionData)

pool.connect()

function inicarSesionDB (correo,contra){
	return pool.query("SELECT contra,correo  FROM superadmin WHERE contra = " +
		contra.toString() + "AND correo=" + correo.toString()
		)
	.then(response => {
		console.log("Base de Datos conectada")
		//console.log(response.rows)
		return response.rows
})
	.catch(err => {
		console.log(err)
		//pool.end()
	})
}
function varBus(variable){
	varB = "'" + variable + "'"
	return varB
}

function registro (codigo,nombre,correo,telefono,carrera,ciudad,direccion){
	pool.query("INSERT INTO egresado (id,nombre,correo,telefono,carrera,ciudad,direccion) VALUES "
		+ `(${codigo},${nombre},${correo},${telefono},${carrera},${ciudad},${direccion})`)
	.then(response => {
		console.log("Base de Datos conectada")
		console.log(response)
		return response
})
	.catch(err => {
		console.log(err)
		//pool.end()
	})
}
app.post("/entrar2" , async (req,res) => {
	res.redirect("vistas/index2.html")
})
app.post("/entrar" , async (req,res) => {
	var usuario = req.body.usuSesion
	var contra = req.body.contraSesion
	usuBus = "'" + usuario + "'"
	contraBus = "'" + contra + "'"
	console.log(usuBus);
	console.log(contraBus);

	var resBD = await inicarSesionDB(usuBus,contraBus)
	console.log(resBD[0])

	if (resBD[0] == undefined) {
		backURL=req.header('Referer') || '/';
		res.redirect(backURL);
	}else{
	console.log("aqui entre a direccionar")
	pool.end()
	res.sendfile("vistas/index2.html")	
	}
})

app.post("/registro", async	(req,res) => {
	var codigo = varBus(req.body.codigo)
	var nombre = varBus(req.body.nombre)
	var correo = varBus(req.body.correo)
	var telefono = varBus(req.body.telefono)
	var carrera = varBus(req.body.carrera)
	var ciudad = varBus(req.body.ciudad)
	var direccion = varBus(req.body.direccion)

	var reg = await registro(codigo,nombre,correo,telefono,carrera,ciudad,direccion)
	console.log(reg)
	backURL=req.header('Referer') || '/';
	res.redirect("vistas/registroExitoso.html");

})

//PARTE PARA SUBIR ARCHIVOS AL SERVIDOR

app.post("/upload", (req, res) => {

	var form = new formidable.IncomingForm();

	form = Object.assign(form, {
		multiples: true,
		keepExtensions: true,
		uploadDir: path.join(__dirname, "public/uploads/"), // Set standard upload dir
		encoding: 'utf-8',
		type: 'multipart', // or urlencoded
		maxFieldsSize: 20 * 1024 * 1024, // default = 20 * 1024 * 1024 = 20mb
		maxFields: 1000, // Max files & fields - default = 1000
		hash: false, // sha1, md5 or false
		// @note - Disable field & file event listeners and let you handle upload yourself
		onPart (part) {
			// Handle part / file only if .mov is not included in filename
			if (part.filename && part.filename.indexOf('.mov') === -1) {
				form.handlePart(part)
			// Or if filename is not set
		} else if (!part.filename) {
			form.handlePart(part)
		}
	}
})

	/**
	 * Events
	 */
	 form.on('fileBegin', (name, file) => {
		file.path = path.join(__dirname, "public/uploads/" + file.name)
	});
	form.parse(req)

 })


// A PARTIR DE ESTO ES MANEJO DE ERRORES
app.use(function (req, res, next) {
	var err = new Error('Not Found')
	err.status = 404
	next(err)
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get("env") === "development" ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render("error")
})


module.exports = pool;
app.listen(8000);

console.log("Servidor corriendo en 8000");

