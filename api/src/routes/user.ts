import { Router } from 'express';
import user from '../models/user';

const router = Router();

router.get('/user', (req,res) => {
    res.json("Holis")
})

router.post('/user', async (req,res) => {
    const datos = {
        name: "matias",
        email: "ariel@hotmail.com",
        password: "sdas12sqas"
    }

    try{
        const data = await user.create(datos)
        data.save()
        res.send("el usuario se creo correctamente")
    }catch(error){
        console.log(error)
    }
})

export default router;