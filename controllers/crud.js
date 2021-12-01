const conexion=require('../database/db');


exports.save=(req,res)=>{
    const nombre=req.body.nombre;
    const correo=req.body.correo;
    const fecha_ingreso=new Date()


    conexion.query('INSERT INTO empleados SET?',{nombre:nombre, correo:correo, fecha_ingreso:fecha_ingreso}, (error,result)=>{

        if(error){
            console.log(error);
        }else{
            res.redirect('/');
        }
    })
    //console.log(correo+nombre+fecha_ingreso);
}