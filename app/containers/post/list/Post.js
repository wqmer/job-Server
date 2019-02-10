import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {actions} from '../../../reducers/post'
import {Table, Pagination} from 'antd';
import {Divider, Tag} from 'antd';
import {Row, Col} from 'antd';
import {Button} from 'antd'

import {PostCell} from './component/postCell';
import style from './style.css'

const {get_posts, edit_post, delete_post} = actions;

class Post extends Component {

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
		const columns = [{
			title:'标题',
			dataIndex:'title',
			key:'title',
			width: 100
		}, 
		{
			title:'作者',
			dataIndex:'author',
			key:'author',
			width: 100
		}, 
		{
			title:'添加时间',
			dataIndex:'date_added',
			key:'date_added',
			width: 100
		}, 
		{
			title:'阅读量',
			dataIndex:'view_count',
			key:'view_count',
			width: 100
		},  
		{
			title: '操作',
			key: 'action',
			width: 150,
			render: (text, record) => (	
				<PostCell
					editPost={(id)=>this.props.editPost(record._id)}
					history={this.props.history}
					getPostDetail={(id)=>this.props.getPostDetail(record.id)}
					data={record} />
			)
		}];

        return (	
            <div>
			  <Row className={style.titleRow}>
			    <Col span={12}><h2>发布管理</h2></Col>
			    <Col span={12}><Button type="primary" icon="plus" className={style.btnAdd} onClick={()=>{this.props.history.push('/admin/post_add')}}/></Col>
			  </Row>
			  <Table columns={columns} dataSource={this.props.postList} />
            </div>
        )
    }

    componentDidMount() {
        if(this.props.postList.length === 0)
            this.props.getPosts();
    }
}

Post.propsTypes = {
    pageNUm: PropTypes.number.isRequired,
    postList: PropTypes.arrayOf(PropTypes.object),
    total:PropTypes.number.isRequired
};

Post.defaultProps = {
    pageNum: 1,
    postList: [],
    total: 0
};

function mapStateToProps(state) {
    let {pageNum, postList, total} = state.admin.posts;
	
    return {
        pageNum,
        postList,
        total
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPosts: bindActionCreators(get_posts, dispatch),
		editPost:bindActionCreators(edit_post,dispatch),
		deletePost:bindActionCreators(delete_post,dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)

