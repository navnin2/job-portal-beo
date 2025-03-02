const express = require('express')
const router = express.Router();
const jobControler = require("../controller/jobControler")
const authMiddleware = require("../middleware/authMiddleware")
const upload = require("../middleware/fileUpload")

router.use(authMiddleware)
router.post('/', jobControler.createPortal);
router.post('/:id/documents/:portalId', upload.single("document"), jobControler.documentUplaod);
router.get('/add-summary/:timeframe', jobControler.addSummary);
router.get('/', jobControler.getPortals);
router.get('/:id', jobControler.getPortalById);
router.put('/:id', jobControler.updatePortal);
router.delete('/:id', jobControler.deletePortal);

module.exports = router