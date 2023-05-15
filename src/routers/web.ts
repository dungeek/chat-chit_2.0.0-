import { Router } from 'express';
const {renderHomePage , renderChatBox} = require('../controllers/homeController')

const router = Router();

router.get("/", renderHomePage) ;
router.get("/gossip", renderChatBox);

export default router;