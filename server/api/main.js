import Express from 'express'
import Currency from '../../models/currency'
import UserGroup from '../../models/usergroup'
import {responseClient} from '../util'

const router = Express.Router();

router.use('/user', require('./user'));

router.get('/getUserGroupDetail', (req, res) => {
    let _id = req.query.id;
    UserGroup.findOne({_id})
       .then(data=>{
           data.viewCount = data.viewCount+1;
           UserGroup.update({_id},{viewCount:data.viewCount})
               .then(result=>{
                   responseClient(res,200,0,'success',data);
               }).cancel(err=>{
                   throw err;
           })

       }).cancel(err => {
       responseClient(res);
   });
});

module.exports = router;