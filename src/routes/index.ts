import { Router } from 'express';
import { CatsController } from '../controllers/cats.controller';
import { ImagesController } from '../controllers/images.controller';
import { UsersController } from '../controllers/users.controller';

const router = Router();

router.get('/breeds', CatsController.getBreeds);
router.get('/breeds/:breed_id', CatsController.getBreedById);
router.get('/breeds/search/:q', CatsController.searchBreeds);
router.get('/imagesbybreedid', ImagesController.getImagesByBreedId);
router.get('/login', UsersController.login);
router.post('/register', UsersController.register);

export default router;
