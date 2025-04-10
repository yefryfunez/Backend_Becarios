const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes/routes');


const PORT = process.env.PORT || 3001;
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// routes
app.use(routes);




app.listen(PORT, ()=>{
    console.log(`SERVIDOR CORRIENDO EN EL PUERTO : ${PORT}`);
})


























































// const nombres = ['Juan','Carlos','Luis','Antonio','Jesús','Miguel','Edgar','Ricardo','Eduardo','Héctor','Fernando','Andrés','Pedro','Raúl','Sergio','Erick','Ramón','Jaime','Julio','Enrique','Arturo','Gerardo','Irving','Ernesto','Alfonso','Gustavo','Rodolfo','Adan','Cruz','Gilberto']
// const apellidos = ['Aguilar','Cruz','Mejia','Chinchilla','Hernandez','Reyes','Pineda','Hyde','Suazo','Rivera','Rodriguez','Zelaya','Valle','Lopez','Coleman','Cooper','Madrid','Moncada','Romero','Garcia','Milla','Castillo','Pinto','Bustillo','Martinez','Wood','Flores','Portillo','Pearce','Figueroa','Tabora','Castellanos','Castro','Padilla','Ortiz','Gomez','Alvarado','Lagos','Medina','Perez','Ponce','Salgado','Diaz','Livingston','Morgan','Rosa','Warren','Maldonado','Molina','Paz','Santos','Lara','Orellana','Calvo','Chinchilla','Pinto','Aguilar','Sagastume','Sanchez','Bardales','Erazo','Torres','Villeda','Montenegro','Oliva','Ortega','Urbina','Vasquez','Barrientos','Ferrera','Leiva','Barahona','Carias','Carrasco','Cerrato','Enamorado','Montoya','Pastor ','Guerrero','Castillo ','Castro','Escoto','Estrada','Fajardo','Fuentes','Galeano','Herrera','Maradiaga','Mendoza','Villafranca','Bonilla','Connor','Espinoza','Funes','Morales','Navarro','Paredes','Paz','Hernandez','Viada','Cordova','Fernandez','Vallecillo']
// const estadocivil = ['casado','soltero','divorciado','viudo','unión libre'];
// const etnia = ['Llenca','garifuna','tawahkas','tolupan','mestizo','negro de habla inglesa','chorti','nauhuat','Miskito','pech','mestizo','mestizo','mestizo','mestizo','mestizo','mestizo','mestizo','mestizo','mestizo','mestizo','mestizo','mestizo','mestizo','mestizo','mestizo','mestizo','mestizo','mestizo','mestizo','mestizo','mestizo','mestizo','mestizo','mestizo']
// const departamentos = ['Atlántida', 'Choluteca', 'Colón', 'Comayagua', 'Copán', 'Cortés', 'El Paraíso', 'Francisco Morazán', 'Gracias a Dios', 'Intibucá', 'Isla de la Bahía', 'La Paz', 'Lempira', 'Ocotepeque', 'Olancho', 'Santa Bárbara', 'Valle', 'Yoro']
// const municipios = ['Alubarén','Cantarranas','Cedros','Curarén','Distrito Central','El Porvenir','Guaimaca','La Libertad']
// const colonias = ['Colonia Canaán','Colonia Los Pinos','Colonia Modesto Rodas Alvarado','Colonia Nueva Suyapa','Colonia Roberto Suazo Córdova','Colonia Palmira','Ciudad Kennedy','Colonia Loarque','Las Casitas','Los Hidalgos','Los Robles','El Sauce','Toncontín','Las Hadas','Las Uvas']

// let fecha = null;
// for (let i = 1; i<10; i++){
//     fecha = new Date(`${1995+Math.floor(Math.random()*12)}`)
    
//     console.log(`select insertsolicitante ('080${Math.floor(Math.random()*10)}${fecha.getFullYear()}${10000+Math.floor(Math.random()*90000)}','${2015+Math.floor(Math.random()*10)}10${Math.floor(Math.random()*4)}${1000+Math.floor(Math.random()*9000)}', '${8+Math.floor(Math.random()*2)}${Math.floor(Math.random()*10000000)}','correo.institucional@ejemplo.unah.hn','${nombres[Math.floor(Math.random()*nombres.length)]}','${nombres[Math.floor(Math.random()*nombres.length)]}','${apellidos[Math.floor(Math.random()*apellidos.length)]}','${apellidos[Math.floor(Math.random()*apellidos.length)]}','${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDay()+1}','masculino','${estadocivil[Math.floor(Math.random()*estadocivil.length)]}',${Math.floor(Math.random()*4)},'${departamentos[Math.floor(Math.random()*departamentos.length)]}','${municipios[Math.floor(Math.random()*municipios.length)]}','${colonias[Math.floor(Math.random()*colonias.length)]}','${etnia[Math.floor(Math.random()*etnia.length)]}','ninguna','trabajo',${Math.floor(Math.random()*150+800)/10},${Math.floor(Math.random()*150+800)/10},'https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/sign/pdf-files/requisitos_becas/2025_3_0801199711111_requisitos_beca.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwZGYtZmlsZXMvcmVxdWlzaXRvc19iZWNhcy8yMDI1XzNfMDgwMTE5OTcxMTExMV9yZXF1aXNpdG9zX2JlY2EucGRmIiwiaWF0IjoxNzQ0MjU5NjU3LCJleHAiOjE3NzU3OTU2NTd9.5p8tBs3_sQKTnLW6fpUml2isOZlOc3ObQNCgNiQ1uKk');`)
// }

