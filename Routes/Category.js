const Category = require("../Models/Category");

module.exports = function(app){
    app.get("/category", function(req, res){
        res.render("admin_master", {content: "./category/category.ejs"});
    });

    app.post("/category/AddNew", function(req, res){
        var newCategory = Category({
            Name: req.body.Name,
            Image: req.body.Image
        });
        newCategory.save(function(err){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1});
            }
        });
    });

    app.post("/category", function(req, res){
        Category.find(function(err, data){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1, CateList:data});
            }
        });
    });

    app.post("/category/update", function(req, res){
        Category.findByIdAndUpdate(req.body.idCate, {
            Name: req.body.CateName,
            Image: req.body.ImageCate
        }, function(err){
            console.log(req.body.idCate);
            console.log(req.body.CateName);
            console.log(req.body.ImageCate);
           
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1});
            }
        });
    });

    app.post("/category/delete", function(req, res){
        Category.findOneAndDelete({_id:req.body.idCate}, function(err){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1});
            }
        });
    });
}