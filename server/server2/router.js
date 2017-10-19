const router = express.Router() 
const controller = require ('./controller.js')

router.get('/messages', controller.getMessages)