import Express from 'express'

const router = Express.Router();
import Category from '../../models/category'
import {responseClient} from '../util'


//获取所有分类
router.get('/getCategorys', function (req, res) {
	let searchCondition = {};
    let skip = (req.query.pageNum - 1) < 0 ? 0 : (req.query.pageNum - 1) * 5;
    let responseData = {
        total: 10,
        list: []
    };
	
    Category.count(searchCondition)
        .then(count => {
            responseData.total = count;
            Category.find(searchCondition, '_id Name', {
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

//获取单个分类
router.get('/getCategory', (req, res) => {
    let _id = req.query.id;	
	Category.findOne({_id}).then(data=>{
		responseClient(res,200,0,'success',data);
	}); 
});


//删除分类
router.get('/delCategory', function (req, res) {
    let {_id} = req.query;
    Category.remove({_id})
        .then(result => {
            if(result.result.n === 1){
                responseClient(res,200,0,'删除成功!')
            }else{
                responseClient(res,200,1,'分类不存在');
            }
        }).catch(err => {
        responseClient(res);
    });
});


//添加标签
router.post('/addCategory', function (req, res) {
    const {Name} = req.body;
    Category.findOne({
        Name
    }).then(result => {
        if (!result) {
            let category = new Category({
                Name
            });
            category.save()
                .then(data => {
                    responseClient(res, 200, 0, '添加成功', data);
                }).catch(err => {
                throw err
            })
        } else {
            responseClient(res, 200, 1, '分类已存在');
        }
    }).catch(err => {
        responseClient(res);
    });
});

//修改分类
router.post('/updateCategory',(req,res)=>{
    const {
        id ,
        name
    } = req.body;
	
    Category.update({_id:id},{name})
        .then(result=>{
            console.log(result);
            responseClient(res,200,0,'更新成功',result)
        }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});


module.exports = router;