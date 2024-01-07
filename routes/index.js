var express = require('express');
const streamService = require('../services/stream-service')();
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/create-stream-content", async (req, res, next) => {
  try {
    const title = req.body?.title?.trim() ?? "";
    const description = req.body?.description?.trim() ?? "";

    if (!title) {
      return res.status(404).json({
        success: false,
        message: "Invalid title."
      });
    }

    const content = await streamService.createStreamContent({
      title,
      description
    });

    return res.status(200).json({
      success: true,
      streamContent: content
    });
  } catch (err) {
    next(err);
  }
});

router.get("/get-stream-contents", async (req, res, next) => {
  try {
    const contents = await streamService.getStreamContentList();

    return res.status(200).json({
      success: true,
      streamContents: {
        data: contents
      }
    });
  } catch (err) {
    next(err);
  }
});

router.get('/get-streams', async (req, res, next) => {
  try {
    const livestreams = await streamService.getStreamList();

    return res.status(200).json({
      success: true,
      livestreams: {
        data: livestreams
      }
    });
  } catch (err) {
    next(err);
  }
});

router.post("/start-stream", async (req, res, next) => {
  try {
    if (!req.body?.contentId) {
      return res.status(404).json({
        success: false,
        message: "Invalid contentId!"
      });
    }

    const contentId = req.body?.contentId;
    
    const livestream = await streamService.startStream(contentId);

    return res.status(200).json({
      success: true,
      livestream
    });
  } catch (err) {
    next(err);
  }
});

router.post("/stop-stream", async (req, res, next) => {
  try {
    if (!req.body?.livestreamId) {
      return res.status(404).json({
        success: false,
        message: "Invalid livestreamId!"
      });
    }
  
    const livestreamId = req.body?.livestreamId;
  
    await streamService.stopStream(livestreamId);
  
    return res.status(200).json({
      success: true,
      message: "Live stream stopped."
    });
  } catch (err) {
    next(err);
  }
});

router.get("/stream-details/:livestreamId", async (req, res, next) => {
  try {
    if (!req.params.livestreamId) {
      return res.status(400).json({
        success: false,
        message: "Invalid livestreamId!"
      });
    }

    const streamDetails = await streamService.streamDetails(req.params.livestreamId);

    return res.status(200).json({
      success: true,
      streamDetails
    });
  } catch (err) {
    next(err);
  }
})

module.exports = router;
