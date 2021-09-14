const {response} = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');



const crearusuario = async(req,res = response)=>{

   
    const{email,name,password} = req.body;

    try{

    //verificar el email

    const usuario = await Usuario.findOne({ email });

    console.log('datoas user',usuario)
    if(usuario){
        return res.status(400).json({
            ok:false,
            msg:'El usuario ya ecxiste con ese email'
        });
    }

 
    //crear Modelo
    const dbUser = new Usuario( req.body );

    //encriptar pass
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password,salt);
    
     //generar token 

     const token = await generarJWT(dbUser.id,name);
    
    
    //Crear usuario de base de datos

    await dbUser.save();
   

    //generar respuesta ok 

    return res.status(201).json({
        ok:true,
        uid: dbUser.id,
        name,
        email,
        token

    });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Crear Usuario /new'
        })
    }
 
}

const loginusuario = async(req, res = response)=>{
    

    
    const {email,password} = req.body;
    console.log(email,password);

    try{
        const dbUser = await Usuario.findOne({ email });

        if(!dbUser){
            return  res.status(400).json({
                ok:false,
                msg:'el correo no existe'
            });
        }

        // confirmar pass
        const validpassword = bcrypt.compareSync(password,dbUser.password);

        if(!validpassword){
            return  res.status(400).json({
                ok:false,
                msg:'el pass no es valido'
            });
        }
            // generar token 
            const token = await generarJWT(dbUser.id,dbUser.name);

            //respuesta del servicio
            return res.json({
                ok:true,
                uid: dbUser.id,
                name:dbUser.name,
                email:dbUser.email,
                token

            });
      

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }
    

}

const revalidarToken = async (req,res = response)=>{

    const {uid} = req;

    //leer la base de datos optener 

    const dbUser = await Usuario.findById(uid);


    const token = await generarJWT(uid,dbUser.name);
 
    return res.json({
        ok:true,
        uid,
        name:dbUser.name,
        email:dbUser.email,
        token
    });

    }

module.exports = {
    crearusuario,
    loginusuario,
    revalidarToken,
}