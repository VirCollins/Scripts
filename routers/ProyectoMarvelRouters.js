const ProyectoMarvelController = require('../controllers/ProyectoMarvelControllers');
const auth = require('../auth/auth');

module.exports = (app) =>{
    app.post('/ProyectoMarvel', auth.authenticate , ProyectoMarvelController.createProyectoMarvel);
    app.get('/ProyectoMarvel',ProyectoMarvelController.getAllProyectoMarvel);
    app.put('/ProyectoMarvel/:id', auth.authenticate, ProyectoMarvelController.updateProyectoMarvel);
    app.delete('/ProyectoMarvel/:id', auth.authenticate, ProyectoMarvelController.deleteProyectoMarvel);
    app.get('/ProyectoMarvel/:id', ProyectoMarvelController.FindProyectoMarvel);
    app.get('/ProyectoMarvelD',ProyectoMarvelController.getDocumento);
    app.post('/upload',ProyectoMarvelController.getfile);
}