import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {Input, Select, Button, Modal} from 'antd';
import {actions} from '../../../reducers/postAdd';
import dateFormat from 'dateformat'

const {update_title, update_author, update_date_added, update_view_count, add_post} = actions;
import style from './style.css'

class PostAdd extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    titleOnChange(e) {
        this.props.update_title(e.target.value)
    };
	
	authorOnChange(e) {
        this.props.update_author(e.target.value)
    };
	
	dateAddedOnChange(e) {
        this.props.update_date_added(e.target.value)
    };
	
	viewCountOnChange(e) {
        this.props.update_view_count(e.target.value)
    };

    addPost() {
        let postData = {};
        postData.title = this.props.title;
        postData.author = this.props.author;
		postData.dateAdded = this.props.dateAdded;
        postData.viewCount = this.props.viewCount;
		
        this.props.addPost(postData);
    };

    render() {
        return (
            <div>
                <h2>增加发布</h2>
                <div className={style.container}>
                    <span className={style.subTitle}>标题</span>
                    <Input
                        className={style.titleInput}
                        placeholder={'请输入标题'}
                        type='text'
                        value={this.props.title}
                        onChange={this.titleOnChange.bind(this)} />
					<span className={style.subTitle}>作者</span>
                    <Input
                        className={style.titleInput}
                        placeholder={'请输入作者'}
                        type='text'
                        value={this.props.author}
                        onChange={this.authorOnChange.bind(this)} />
					<span className={style.subTitle}>添加日期</span>
                    <Input
                        className={style.titleInput}
                        placeholder={'请输入添加日期'}
                        type='text'
                        value={this.props.dateAdded}
                        onChange={this.dateAddedOnChange.bind(this)} />
					<span className={style.subTitle}>阅读量</span>
                    <Input
                        className={style.titleInput}
                        placeholder={'请输入阅读量'}
                        type='text'
                        value={this.props.viewCount}
                        onChange={this.viewCountOnChange.bind(this)} />
                    <div className={style.bottomContainer}>
                        <Button type='primary' onClick={this.addPost.bind(this)}className={style.buttonStyle}>添加</Button>
                    </div>
                </div>
            </div>
        ) 
    }

    componentDidMount() {}
}

PostAdd.propsTypes = {
    title: PropTypes.string,
    author: PropTypes.string,
	dateAdded: PropTypes.string,
    viewCount: PropTypes.number
};

PostAdd.defaultProps = {
    title: '',
    author: '',
	dateAdded: '',
	viewCount: 0
};

function mapStateToProps(state) {
    const {title, author, dateAdded, viewCount} = state.admin.postAdd;
    
    return {
        title,
        author,
		dateAdded,
		viewCount
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateTitle: bindActionCreators(update_title, dispatch),
        updateAuthor: bindActionCreators(update_author, dispatch),
        updateDateAdded: bindActionCreators(update_date_added, dispatch),
        updateViewCount: bindActionCreators(update_view_count, dispatch),
        addPost: bindActionCreators(add_post, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostAdd)
