import express from 'express';
import APICotroller from '../controller/APIController'
let router = express.Router();

const initAPIRouter = (app) => {
    router.get('/users',APICotroller.getAllUsers); //method get
    router.post('/users/creat-user',APICotroller.creatUser); 
    router.put('/users/update-user',APICotroller.updateUser); 
    router.delete('/users/delete-user/:userId',APICotroller.deleteUser); 
    return app.use('/api/v1',router)
}

export default initAPIRouter;