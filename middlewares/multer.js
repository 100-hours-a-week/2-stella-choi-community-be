const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ensureDirectoryExistence = dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Multer 스토리지 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { category } = req.body;
        console.log(`${category} uploaded`);
        const basePath = 'uploads/';
        let folder;

        switch (category) {
            case 'profile':
                folder = `${basePath}profiles/`;
                break;
            case 'posts':
                folder = `${basePath}posts/`;
                break;
            default:
                folder = `${basePath}others/`;
                break;
        }

        // 폴더 생성
        ensureDirectoryExistence(folder);
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}`;
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext);
        cb(null, `${baseName}-${uniqueSuffix}${ext}`);
    },
});

// Multer 미들웨어 생성
const upload = multer({ storage });

module.exports = upload;
