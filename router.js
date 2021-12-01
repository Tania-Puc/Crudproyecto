const express=require('express');

const router= express.Router();

const conexion=require('./database/db');



//RUTA PARA MOSTRAR TODOS LOS REGISTROS
router.get('/', (req,res)=>{

    //'SELECT * FROM `empleados` WHERE `fecha_ingreso`>= CURDATE()'
    conexion.query('SELECT id_empleado, nombre, correo, date_format(fecha_ingreso, "%d %M %Y") as fecha_ingreso from empleados', (error,results)=>{
                
        if(error){
            throw error;

        }else
        {
             res.render('index', {results:results});
        }
    })
    
})
const crud=require('./controllers/crud');
const { Router } = require('express');

/*router.post('/save', crud.save);
router.post('/update', crud.update);

router.post('/getpdfempleado', crud.getpdf);
*/
module.exports=router;