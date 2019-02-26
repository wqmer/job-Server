import Express from 'express'
import Customer from '../../models/customer'
import {MD5_SUFFIX,responseClient,md5} from '../util'

const router = Express.Router();

router.get('/get_customers', function (req, res) {
	let searchCondition = {};
	
    let skip = (req.query.pageNum - 1) < 0 ? 0 : (req.query.pageNum - 1) * 5;
    let responseData = {
        total: 10,
        list: []
    };
	
    Customer.count(searchCondition)
        .then(count => {
            responseData.total = count;
            Customer.find(searchCondition, '_id name description', {
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

router.get('/get_customer', (req, res) => {
    let _id = req.query.id;
	
	Customer.findOne({_id}).then(data=>{
		responseClient(res,200,0,'success',data);
	}); 
});

router.post('/add_customer', function (req, res) {
    const {
        name,
        description
    } = req.body;
	
    let tempCustomer = new Customer({
		name,
        description
    });
	
    tempCustomer.save().then(data=>{
        responseClient(res,200,0,'保存成功',data)
    }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});

router.post('/update_customer',(req,res)=>{
    const {
		id,
        name,
        description
    } = req.body;
	
    Customer.update({_id:id},{name, description})
        .then(result=>{
            console.log(result);
            responseClient(res,200,0,'更新成功',result)
        }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});

router.get('/delete_customer',(req, res)=>{
    let id = req.query.id;
    Customer.remove({_id: id})
        .then(result=>{
            if(result.result.n === 1){
                responseClient(res,200,0,'删除成功!')
            }else{
                responseClient(res,200,1,'发布不存在');
            }
        }).cancel(err=>{
            responseClient(res);
    })
});

module.exports = router;
