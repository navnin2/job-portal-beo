const express = require("express");
const portalControler = require('../controller/portalControler')
const authMiddleware = require("../middleware/authMiddleware")
const upload = require("../middleware/fileUpload")
const router = express.Router();

router.use(authMiddleware)
router.post('/', upload.single("logo"), portalControler.createPortal);
router.get('/portal-usage-summary', portalControler.portalUsageSummary)
router.get('/', portalControler.getPortals);
router.get('/:id', portalControler.getPortalById);
router.put('/:id', portalControler.updatePortal);
router.delete('/:id', portalControler.deletePortal);

module.exports = router;