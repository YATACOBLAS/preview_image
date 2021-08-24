const apiImagenes={};
const fs= require('fs');
const path=require('path');
     // // // // // // // // // // // // // // //
     // // // // // IMAGENES  // // // // // // // 
     // // // // // // // // // // // // // // //

    apiImagenes.listarEspecialidad=(req,res)=>{
       
        req.getConnection((err, conn) => {
            conn.query('select * from especialidad', (err, result) => {
                if (err) { res.status(400).json(err) };
                res.json(result);
                return;
            });
        });
     };

    apiImagenes.listarTipoMuestraImagen=(req,res)=>{

        req.getConnection((err, conn) => {
            conn.query('select * from tipoMuestraImagen', (err, result) => {
                if (err) { res.status(400).json(err) };
                res.json(result);
                return;
            });
        });
     };

    apiImagenes.listarMuestraImagen=(req,res)=>{
        var idTipoMuestraImagen=req.body.idTipoMuestraImagen;
        req.getConnection((err, conn) => {
            conn.query('select * from muestraImagen where idTipoMuestraImagen=?',[idTipoMuestraImagen], (err, result) => {
                if (err) { res.status(400).json(err) };
                res.json(result);
                return;
            });
        });
     };

    apiImagenes.listarTipoPlaca=(req,res)=>{
        req.getConnection((err, conn) => {
            conn.query('select * from tipoPlaca ', (err, result) => {
                if (err) { res.status(400).json(err) };
                res.json(result);
                return;
            });
        });
     };


    apiImagenes.listarTipoAtencion=(req,res)=>{
        req.getConnection((err, conn) => {
            conn.query('select * from tipoAtencion', (err, result) => {
                if (err) { res.status(400).json(err) };
                res.json(result);
                return;
            });
        });
     };


    apiImagenes.listarRolMedico=(req,res)=>{
        req.getConnection((err, conn) => {
            conn.query('select * from rolMedico ', (err, result) => {
                if (err) { res.status(400).json(err) };
                res.json(result);
                return;
            });
        });
     };

     apiImagenes.listarMedico=(req,res)=>{
        req.getConnection((err, conn) => {
            conn.query('select * from medico', (err, result) => {
                if (err) { res.status(400).json(err) };
                res.json(result);
                return;
            });
        });
     };

     apiImagenes.guardarExamImagenes=(req,res)=>{
               
         req.body.examenes=JSON.parse(req.body.examenes);         
         var iteracion= req.body.examenes.length;
         for(let i=0; i<iteracion; i++){
            req.body.examenes[i].archivo=req.files[0].filename;
         }
        
        var dni=req.body.dni;
        var nombres=req.body.nombres;
        var apellidos=req.body.apellidos
        var fechaNacimiento=req.body.fechaNacimiento;
        var telefono=req.body.telefono;
        var empresa=req.body.empresa;
        req.getConnection((err,conn)=>{
            conn.query('CALL INSERTAR_PACIENTE(?,?,?,?,?,?)',[dni,nombres,apellidos,fechaNacimiento,telefono,empresa],(err,result,field)=>{
                if(err){
                    res.status(400).json(err);
                    console.log(err)
                    return;
                }
                console.log()
                req.body.idPaciente=result[0][0].COMMIT;
                if(req.body.idPaciente){              
                    guardarImagenes(req.body,iteracion,req,res,conn);          
                }
            })
        })
  
   }

    guardarImagenes=(body,iteracion,req,res,conexion)=>{

        var idPaciente= body.idPaciente;
        var fechaRegistroExamen=body.examenes[iteracion-1].fechaRegistroExamen; 
        var fechaAtencion=body.examenes[iteracion-1].fechaAtencion; 
        var fechaEntregaResultado=body.examenes[iteracion-1].fechaResultado; 
        var nroVoucher= body.examenes[iteracion-1].nroVoucher; 
        var importe=body.examenes[iteracion-1].importe;
        var archivo=body.examenes[iteracion-1].archivo;
        var idTipoAtencion=body.examenes[iteracion-1].idTipoAtencion;
        var idMuestraImagen=body.examenes[iteracion-1].idMuestraImagen;
        var idEspecialidad=body.examenes[iteracion-1].idEspecialidad;
        var idTipoPlaca=body.examenes[iteracion-1].idTipoPlaca;
        var nroFallas=body.examenes[iteracion-1].nroFallas;
        var detalleRolMedico=body.examenes[iteracion-1].detalleRolMedico;
        var idUsuario=req.usuario.idUsuario;  

       
            conexion.query('CALL INSERTAR_EXAMEN_IMAGENES(?,?,?,?,?,?,?,?,?,?,?,?,?)',
                        [ idPaciente,fechaRegistroExamen,fechaAtencion,fechaEntregaResultado,
                          nroVoucher, importe, archivo, 
                         idTipoAtencion,idMuestraImagen,idEspecialidad,idTipoPlaca,nroFallas,idUsuario], (err, result, fields) => {

                if (err) {
                    console.log(err)
                    res.status(400).json(err)
                    return;
                } else {
                    // Registramos el detalleRolMedico
                    var idImagen=result[0][0]._IdImagen;
                    var iterarDetalle=2;
                             
                        do {
                            guardarDetalleRolMedico(detalleRolMedico,res,conexion,idImagen,iterarDetalle)
                            iterarDetalle--;
                        } while (iterarDetalle!==0);

                    iteracion--;
                    if(iteracion<1){
                            res.json({ mensaje: 'Registro Exitoso' });
                            return;
                    }else{
                        guardarImagenes(body,iteracion,req,res,conexion);
                    }
                
                }
            });
   }


   
   guardarDetalleRolMedico=(detalleRolMedico,res,conexion,idImagen,iterarDetalle)=>{
    var idMedico=detalleRolMedico[iterarDetalle-1].idMedico;
    var idRolMedico=detalleRolMedico[iterarDetalle-1].idRolMedico;

        conexion.query('call CRUD_DETALLE_ROLMEDICO(?,?,?,?,?)',[idImagen,idRolMedico,idMedico,0,null],(err,result)=>{
            if(err){
                res.status(400).json(err)
                console.log(err)
                return;
            }
                return;
         })
    };


    apiImagenes.modificarExamImagenes=(req,res)=>{

    var iteracion= req.body.examenes.length;
    var dni=req.body.dni;
    var nombres=req.body.nombres;
    var apellidos=req.body.apellidos
    var fechaNacimiento=req.body.fechaNacimiento;
    var telefono=req.body.telefono;
    var empresa=req.body.empresa;
    var idPaciente=req.body.idPaciente;
        
    req.getConnection((err, conn) => {
        conn.query('CALL MODIFICAR_PACIENTE_PAMS(?,?,?,?,?,?,?)',
                    [dni,nombres, apellidos,fechaNacimiento,telefono,empresa,idPaciente], 
                    (err, result, fields) => {

                    if (err) {
                        res.status(400).json(err)
                        return;
                    } else {
                       
                        modificarImagenes(req.body.examenes,req,res,iteracion,conn, result[0][0]._idPaciente);
                    
                    }
        }); });
}

    modificarImagenes=(examenes,req,res,iteracion,conn,idPaciente)=>{
        var opcion=examenes[iteracion-1].opcion;
        var opcionExamen= (opcion=='Modificar')? 1:(opcion=='Nuevo'? 0 : -1 ); 
        var idExamen=examenes[iteracion-1].idExamen; 
        var fechaRegistroExamen=examenes[iteracion-1].fechaRegistroExamen; 
        var fechaAtencion=examenes[iteracion-1].fechaAtencion; 
        var fechaEntregaResultado=examenes[iteracion-1].fechaResultado; 
        var nroVoucher=examenes[iteracion-1].nroVoucher; 
        var importe=examenes[iteracion-1].importe; 
        var archivo=examenes[iteracion-1].archivo;         
        var idTipoAtencion=examenes[iteracion-1].idTipoAtencion; 
        var idMuestraImagen=examenes[iteracion-1].idMuestraImagen;
        var idTipoPlaca=examenes[iteracion-1].idTipoPlaca;
        var nroFallas=examenes[iteracion-1].nroFallas;
        var iteracionDetalleRol=examenes[iteracion-1].detalleRolMedico.length;
        var idUsuario=req.usuario.idUsuario;  
        conn.query('call MODIFICAR_EXAMEN_IMAGENES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[
            opcionExamen,idExamen,fechaRegistroExamen,fechaAtencion,fechaEntregaResultado,nroVoucher,importe,
            archivo,idTipoAtencion,idMuestraImagen,idTipoPlaca,nroFallas,idPaciente,idUsuario
        ],(err,result)=>{
            if(err){
                res.status(400).json(err)
                return;
            }
                    do {
                       modificarDetalleRolMedico(examenes[iteracion-1].detalleRolMedico[iteracionDetalleRol-1],
                        res,conn,opcionExamen,result[0][0]._idImagen,result[0][0]._idExamen);
                       iteracionDetalleRol--;
                    } while (iteracionDetalleRol!==0)
                  
                    
                     iteracion--;
                     if(iteracion<1){
                             res.json({mensaje:'Modificación Exitosa'});
                            return;
                      }else{
                            modificarImagenes(examenes,req,res,iteracion,conn,idPaciente);
                            return;
                      }               
        })
   
    }

    modificarDetalleRolMedico=(detalleRolMedico,res,conn,opcion,idImagen,idExamen)=>{
        var idRolMedico=detalleRolMedico.idRolMedico;
        var idMedico=detalleRolMedico.idMedico;
       
        conn.query('call CRUD_DETALLE_ROLMEDICO(?,?,?,?,?)',[idImagen,idRolMedico,idMedico,opcion,idExamen],(err,result)=>{
            if(err){
                res.status(400).json(err);
                return;
            }
            return;
        })

    }

apiImagenes.listarExamenesImagenes=(req,res)=>{
    console.log(req.body)   
    let desde=req.body.desde;
        let hasta=req.body.hasta;

    req.getConnection((err,conn)=>{
        if(err){
           res.status(400).json(err);
           return}
        else{
        conn.query(`CALL LISTAR_EXAMENES_IMAGENES(?,?)`,[desde,hasta],(err,result)=>{
            if(err){
                res.status(400).json(err);
                return}
            else{
                // var arrayBuffer='';
                //  for( let i=0; result.length>i; i=i+2){
                //         arrayBuffer=fs.readFileSync(path.join(__dirname,`../imagenes/${result[i].archivo}`)); 
                //         result[i].arrayBuffer=arrayBuffer;
                // }
                res.json(result[0]);
                  return
                }
         })
       
    }
 })
}


apiImagenes.insertarMedico=(req,res)=>{

    let descripcion=req.body.descripcion;
    let idMedico=req.body.idMedico;

    req.getConnection((err,conn)=>{
        if(err){
           res.status(400).json(err);
           return}
        else{
        conn.query(`CALL INSERTAR_MEDICO(?,?)`,[descripcion,idMedico],(err,result)=>{
            if(err)
                res.status(400).json(err)
            else
               res.json(result)
            return
        
        })
       
    }
 })

}

module.exports = apiImagenes;
