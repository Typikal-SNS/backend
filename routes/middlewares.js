const multer = require('multer')
const path = require('path')
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({
      code: 401,
      message: '로그인이 필요합니다.'
    });
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({
      code: 401,
      message: '로그인하지 않은 사용자만 접근 가능합니다.'
    });
  }
};
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) { // 혁진.png
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // 혁진
      done(null, basename + '_' + new Date().getTime() + ext); // 혁진_15184712891.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});
exports.upload =  upload