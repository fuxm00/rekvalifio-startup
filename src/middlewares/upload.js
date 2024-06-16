import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/upload')
    },
    filename: async function (req, file, cb) {
        const extension = path.extname(file.originalname)
        const name = file.fieldname
        cb(null, name + extension)
    }
})

export const upload = multer({storage: storage})