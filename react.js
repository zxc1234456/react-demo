


// react 项目接口的 路由模块 

var express = require("express");

var router = express.Router();

var {conn}  =  require("./utils/db");
var {setError,aesEncrypt,aesDecrypt ,keys} = require("./utils");
var {getConn} = require("./utils/mongoose");
var {ObjectID}  = require("mongodb");
var {series,waterfall}= require("async");
var util = require('./config/index.js');
router.get("/index",(req,res)=>{
    res.json({
        msg:"这是 react 项目的 后台接口 路径"
    })
})

// 获取所有评论
router.get("/getComments",(req,res)=>{
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("comments").find({},{}).sort({_id:-1}).toArray((err,result)=>{
            setError(err,res,db);
            res.json({
                code:200,
                msg:"评论查询成功",
                result
            })
            db.close();
        })
    })
})
// 添加评论

// 先插入 在查询 
router.post("/addComment",(req,res)=>{
    var body = req.body;
    console.log(body);
    conn((err,db)=>{
        setError(err,res,db);
        var comments =  db.collection("comments");
        series([
            (callback)=>{
                comments.insert(body,(err,result)=>{
                    callback(err,result);
                })
            },
            (callback)=>{
                comments.find({},{}).sort({_id:1}).toArray((err,result)=>{
                    callback(err,result);
                })
            }
        ],(err,result)=>{
            setError(err,res,db);
            res.json({
                code:200,
                msg:"评论添加成功",
                result:result[1]
            })
            db.close();
        })
    })
})
// 删除评论
router.get("/delComment",(req,res)=>{
    var _id =  req.query._id || ""
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("comments").remove({_id:ObjectID(_id)},(err,result)=>{
            setError(err,res,db);
            res.json({
                code:200,
                msg:"评论删除成功",
                result
            })
            db.close();
        })
    })
})


// 短信验证码接口 


// 生成验证码的函数 

function getCode(){
    return 1000 + Math.floor(Math.random() * 9000);
}

// 获取短信验证码  
router.post('/sendCode', function(req, res, next) {
    console.log(req.body);
    const mobile = req.body.mobile; //需要发送的号码
    var param = getCode()  //变量内容  需要发送手机的验证码
    console.log(param);



    if (mobile == '') {
        res.json({
            msg:"手机号不能为空",
            code:200
        })
    }else{
        // 云之讯发送验证码到手机 
        util.getResult(param, mobile).then(function(response) {
            console.log(response.data);
            console.log(response.data.code);
            if (response.data.code == '000000') {  // 发送成功 
                conn((err,db)=>{
                    setError(err,res,db);
                    var codes = db.collection("codes");
                    // 数据库 判断验证码是否存在 
                    // 验证码不存在 直接插入
                    // 发送的验证码相同  改变插入时间 
                    waterfall([
                        (callback)=>{
                            codes.findOne({mobile,code:param},(err,result)=>{
                                callback(err,result);
                            })
                        },
                        (args,callback)=>{
                            if(args){
                                // 修改数据 时间
                                var time =  new Date().getTime();
                                codes.update({
                                    mobile,
                                    code:param
                                },{
                                    $set:{
                                        time
                                    }
                                },(err,result)=>{
                                    callback(err,result);
                                })
                            }else{
                                // 直接插入 
                                codes.insert({
                                    mobile,
                                    code:param,
                                    time: new Date().getTime()
                                },(err,result)=>{
                                    callback(err,result);
                                })
                            }
                        }
                    ],(err,result)=>{
                        setError(err,res,db);
                        res.json({
                            msg:"验证码发送成功",
                            result:param,
                            code:200
                        })
                    })
                })
            } else {
               res.json({
                   msg:"发送验证码失败",
                   code:200
               })
            }
    
        }, function(err) {
            res.json({
                msg:"云之讯数据库错误",
                code:200
            })
        })
    }
});

// 接收验证码  判断验证码 正确 

router.post("/testCode",(req,res)=>{
    var mobile = req.body.mobile;
    var code = req.body.code * 1;

    conn((err,db)=>{
        setError(err,res,db);
        var codes = db.collection("codes");

        codes.findOne({mobile,code},(err,result)=>{
            setError(err,res,db);
            if(result){
                var time = new Date().getTime();
                var alias = mobile + "wh1901" + code ;
                var token = aesEncrypt(alias,keys);
                req.session.token = token;ss
                if(time-result.time<60*1000){
                    res.json({
                        code:200,
                        msg:"验证码通过",
                        type:1,
                        token
                    })
                }else{
                    res.json({
                        code:200,
                        msg:"验证码失效",
                        type:0,
                    })
                }
            }else{
                res.json({
                    msg:"验证码不匹配",
                    code:200,
                    type:0
                })
            }
        })

    })

})



module.exports = router;