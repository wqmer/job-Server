import Express from 'express'
import Currency from '../../models/currency'
import {MD5_SUFFIX,responseClient,md5} from '../util'

const router = Express.Router();

router.get('/get_currencies', function (req, res) {
	let searchCondition = {};
	
    let skip = (req.query.pageNum - 1) < 0 ? 0 : (req.query.pageNum - 1) * 5;
    let responseData = {
        total: 10,
        list: []
    };
	
    Currency.count(searchCondition)
        .then(count => {
            responseData.total = count;
            Currency.find(searchCondition, '_id code value', {
                skip: skip,
                limit: 5
            })
                .then(result => {
                    responseData.list = result;
                    responseClient(res, 200, 0, 'success', responseData);
                }).cancel(err => {
                throw err
            })
        }).cancel(err => {
        responseClient(res);
    });
});

router.post('/add_currency', function (req, res) {
    const {
        code,
        value
    } = req.body;
	
    let tempCurrency = new Currency({
        code,
        value
    });
	
    tempCurrency.save().then(data=>{
        responseClient(res,200,0,'保存成功',data)
    }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});

router.post('/update_currency',(req,res)=>{
    const {
		id,
        code,
        value
    } = req.body;
	
    Currency.update({_id:id},{code, value})
        .then(result=>{
            console.log(result);
            responseClient(res,200,0,'更新成功',result)
        }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});

router.get('/delete_currency',(req,res)=>{
    let id = req.query.id;
    Currency.remove({_id:id})
        .then(result=>{
            if(result.result.n === 1){
                responseClient(res,200,0,'删除成功!')
            }else{
                responseClient(res,200,1,'文章不存在');
            }
        }).cancel(err=>{
            responseClient(res);
    })
});

module.exports = router;
