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

//Redirige al formulario de crear nuevo registro
router.get('/create', (req,res)=>{

    res.render('create');
});

//Redirige al formulario de editar

router.get('/edit/:id_empleado', (req,res)=>{
    const id_empleado=req.params.id_empleado;

        
      conexion.query("SELECT * FROM empleados WHERE id_empleado= ?",[id_empleado],(error,results)=>{

        if(error){
            throw error;

        }else
        {
             res.render('edit', {empleados:results[0]});
       

        }
    })

 
});


//Funcion de eliminar empleado
router.get('/delete/:id_empleado', (req,res)=> {
    const id_empleado=req.params.id_empleado;
    conexion.query("DELETE FROM empleados WHERE id_empleado=?",[id_empleado],(error,results)=>{

        if(error){
         
            throw error;

        }else
        {
             res.redirect('/');       
        }                
    })
})

//Obtine los datos para generar el pdf

router.get('/getpdfempleado/:id_empleado', (req, res) => {
    const id_empleado = req.params.id_empleado;
    conexion.query('SELECT id_empleado, nombre, correo, date_format(fecha_ingreso, "%d %M %Y") as fecha_ingreso from empleados WHERE id_empleado= ?', [id_empleado], (error, results) => {
        if (error) {
            throw error;

        } else {
            if (error) {
                throw error;
    
            } else {
                res.render('getpdfempleado', { empleados: results[0] });
    
    
            }

        }
    })


})

const crud=require('./controllers/crud');
const { Router } = require('express');

router.post('/save', crud.save);
router.post('/update', crud.update);

router.post('/getpdfempleado', crud.getpdf);

module.exports=router;