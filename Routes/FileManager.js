var multer = require("multer");

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        // thư mục lưu file đã upload thành công
        cb(null, "public/upload");
    },
    filename: function(req, file, cb){
        // đặt tên file + giây hiện tại
        cb(null, Date.now() + "-" + file.originalname);  
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function(reg, file, cb){
        if( file.mimetype=="image/bmp" || 
            file.mimetype=="image/png" ||
            file.mimetype=="image/jpeg"||
            file.mimetype=="image/jpg")
        {
            cb(null, true);
        }else{
            //console.log(file);
            return cb(new Error("Your file is not image."));
        }
    }
    // single: chỉ 1 file
}).single("hinhdaidien");

module.exports = function(app){

    app.get("/testUpload", function(req, res){
        res.render("testUpload");
    });

    app.post("/uploadFile", function(req, res){
        upload(req, res, function(err){
            if(err instanceof multer.MulterError){
                setTimeout(()=>{
                    res.json({kq:0, errMsg:err});
                }, 1500);
            }else if(err){
                setTimeout(()=>{
                    res.json({kq:0, errMsg:err});
                }, 1500);
            }else{
                setTimeout(()=>{
                    res.json({kq:1, urlFile: req.file});
                }, 1500);
            }
        });
    });
}