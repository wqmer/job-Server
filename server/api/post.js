import Express from 'express'
import Post from '../../models/post'
import {MD5_SUFFIX,responseClient,md5} from '../util'

const router = Express.Router();

router.get('/get_posts', function (req, res) {
	let searchCondition = {};
	
    let skip = (req.query.pageNum - 1) < 0 ? 0 : (req.query.pageNum - 1) * 5;
    let responseData = {
        total: 10,
        list: []
    };
	
    Post.count(searchCondition)
        .then(count => {
            responseData.total = count;
            Post.find(searchCondition, '_id title author description dateAdded viewCount', {
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

router.get('/get_post', (req, res) => {
    let _id = req.query.id;
	
	Post.findOne({_id}).then(data=>{
		responseClient(res,200,0,'success',data);
	}); 
});

router.post('/add_post', function (req, res) {
    const {
        title,
        author,
		description,
		dateAdded,
        viewCount
    } = req.body;
	
    let tempPost = new Post({
        title,
        author,
		description,
		dateAdded,
        viewCount
    });
	
    tempPost.save().then(data=>{
        responseClient(res,200,0,'保存成功',data)
    }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});

router.post('/update_post',(req,res)=>{
    const {
		id,
        title,
        author,
		description,
		dateAdded,
        viewCount
    } = req.body;
	
    Post.update({_id:id},{title, author, description, dateAdded, viewCount})
        .then(result=>{
            console.log(result);
            responseClient(res,200,0,'更新成功',result)
        }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});

router.get('/delete_post',(req, res)=>{
    let id = req.query.id;
    Post.remove({_id: id})
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
