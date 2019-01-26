import Express from 'express'
const router = Express.Router();
import UserGroup from '../../models/usergroup'
import {MD5_SUFFIX,responseClient,md5} from '../util'

router.post('/updateUserGroup',(req,res)=>{
    const {
        name,
        description,
        id
    } = req.body;
	
    UserGroup.update({_id:id},{name,description})
        .then(result=>{
            console.log(result);
            responseClient(res,200,0,'更新成功',result)
        }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});

module.exports = router;