const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/AgregarProveedor', async (req,res) =>{

    const proveedor = await pool.query("SELECT * From proveedor");
    const regiones = await pool.query('SELECT *FROM region');
    console.log(proveedor,regiones);
    res.render('proveedor/AgregarProveedor', {proveedor,regiones});
 });
 router.get('/regiones/:id', async (req,res) =>{
    const comunas =  await pool.query('Select * from comunas where Id_Region = ?',req.params.id);
    res.json(comunas);
});

 router.post('/AgregarProveedor', async (req,res) =>{
    try {
        const {rut,comuna,nombre,telefono,direc,numero,correo} = req.body;
         await pool.query('CALL Agregar_Proveedor(?,?,?,?,?,?,?)',[rut,comuna,nombre,telefono,direc,numero,correo]);
        res.redirect('/');
        
    } catch (e) {
        console.log(e)
    }
});
 module.exports = router;