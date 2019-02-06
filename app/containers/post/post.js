import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {actions} from '../../reducers/post'
import {Table, Pagination} from 'antd';
import { Divider, Tag } from 'antd';
import {Button} from 'antd'

import style from './style.css'
import {PostCell} from './components/postCell';

const {get_posts, edit_post, delete_post} = actions;

class Post extends Component {

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
		const columns = [{
			title:'代码',
			dataIndex:'code',
			key:'code',
			width: 100
		}, 
		{
			title:'值',
			dataIndex:'value',
			key:'value',
			width: 100
		}, 
		{
			title: '操作',
			key: 'action',
			width: 150,
			render: (text, record) => (	
				 <PostCell
					edit_post={(id)=>this.props.edit_post(record._id)}
					history={this.props.history}
					getPostDetail={(id)=>this.props.get_post_detail(record.id)}
					delete_post={(id)=>this.props.delete_post(id)}
					data={record} />
			)
		}];

        return (	
            <div>
				<h2 className={style.title}>货币管理</h2>
				<Table columns={columns} dataSource={this.props.postList} />
            </div>
        )
    }

    componentDidMount() {
        //缓存
        if(this.props.postList.length===0)
            this.props.get_posts();
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
    total:0
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
        get_posts: bindActionCreators(get_posts, dispatch),
		edit_post:bindActionCreators(edit_post,dispatch),
		delete_post:bindActionCreators(delete_post,dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)

