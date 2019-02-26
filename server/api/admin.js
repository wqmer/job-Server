import Express from 'express'
import mongoose from 'mongoose'

const router = Express.Router();
import User from '../../models/user'
import UserGroup from '../../models/usergroup'
import {responseClient} from '../util'

//admin请求后台验证

/* router.use( (req,res,next) =>{
    if(req.session.userInfo){
        next()
    }else{
        res.send(responseClient(res,200,1,'身份信息已过期，请重新登录'));
    }
});
 */
 
router.use('/tags',require('./tags'));

router.use('/article',require('./article'));

router.use('/post',require('./post'));

router.use('/customer',require('./customer'));

router.use('/usergroup',require('./userGroup'));

router.get('/getUsers',(req,res)=>{
    let skip =(req.query.pageNum-1)<0?0:(req.query.pageNum-1)*10;
    let responseData = {
        total:0,
        list:[]
    };
    User.count()
        .then(count=>{
            responseData.total = count;
            User.find(null,'_id username type password',{skip:skip,limit:10})
                .then((result)=>{
                responseData.list = result;
                    responseClient(res,200,0,'',responseData)
                })
                .catch(err=>{
                    responseClient(res);
                })
        });
});

router.get('/getUserGroups',(req,res)=>{
    let skip =(req.query.pageNum-1)<0?0:(req.query.pageNum-1)*10;
    let responseData = {
        total:0,
        list:[]
    };
    UserGroup.count()
        .then(count=>{
            responseData.total = count;
            UserGroup.find(null,'_id name description',{skip:skip,limit:10})
                .then((result)=>{
                responseData.list = result;
                    responseClient(res,200,0,'',responseData)
                })
                .catch(err=>{
                    responseClient(res);
                })
        });
});

router.get('/debug',(req,res)=>{
    
	const name = "admin";
    const description = "admin user group";
	
	let tempUserGroup = new UserGroup({
        name,
		description
    });
	
    tempUserGroup.save().then(data=>{
        //responseClient(res,200,0,'保存成功',data)
    }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
	
	
	responseClient(res,200,0,'',"ddd")
             
});

router.get('/getUserGroups',(req,res)=>{
    let skip =(req.query.pageNum-1)<0?0:(req.query.pageNum-1)*10;
    let responseData = {
        total:0,
        list:[]
    };
    UserGroup.count()
        .then(count=>{
            responseData.total = count;
            UserGroup.find(null,'_id name description',{skip:skip,limit:10})
                .then((result)=>{
                responseData.list = result;
                    responseClient(res,200,0,'',responseData)
                })
                .catch(err=>{
                    responseClient(res);
                })
        });
});

module.exports = router;