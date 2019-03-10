import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import style from './style.css'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {Input, Select, Button, Modal} from 'antd';
import {actions} from '../../../reducers/postEdit';
import dateFormat from 'dateformat'

const {edit_title, edit_author, edit_date_added, edit_view_count, update_post} = actions;

class PostEdit extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    titleOnChange(e) {
        this.props.editTitle(e.target.value)
    };
	
	authorOnChange(e) {
        this.props.editAuthor(e.target.value)
    };
	
	dateAddedOnChange(e) {
        this.props.editDateAdded(e.target.value)
    };
	
	viewCountOnChange(e) {
        this.props.editViewCount(e.target.value)
    };

    updatePost() {
       let postData = {};
	    postData.id = this.props.id;
        postData.title = this.props.title;
        postData.author = this.props.author;
		postData.dateAdded = this.props.dateAdded;
        postData.viewCount = this.props.viewCount;
		
        this.props.updatePost(postData);
    };

    render() {
        return (
            <div>
                <h2>编辑发布</h2>
                <div className={style.container}>
                    <span className={style.subTitle}>标题</span>
                    <Input
                        className={style.titleInput}
                        placeholder={'请输入标题'}
                        type='text'
                        value={this.props.title}
                        onChange={this.titleOnChange.bind(this)} />
                    <div className={style.bottomContainer}>
                        <Button type='primary' onClick={this.updatePost.bind(this)} className={style.buttonStyle}>保存</Button>
                    </div>
                </div>
            </div>
        ) 
    }

    componentDidMount() {}
}

PostEdit.propsTypes = {
	id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
	dateAdded: PropTypes.string,
    viewCount: PropTypes.number
};

PostEdit.defaultProps = {
	id: '',
	title: '',
    author: '',
	dateAdded: '',
	viewCount: 0
};

function mapStateToProps(state) {
    const {id, title, author, dateAdded, viewCount} = state.admin.postEdit;
    
    return {
		id,
		title,
        author,
		dateAdded,
		viewCount
    }
}

function mapDispatchToProps(dispatch) {
    return {
        editTitle: bindActionCreators(edit_title, dispatch),
        editAuthor: bindActionCreators(edit_author, dispatch),
        editDateAdded: bindActionCreators(edit_date_added, dispatch),
        editViewCount: bindActionCreators(edit_view_count, dispatch),
        updatePost: bindActionCreators(update_post, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostEdit)
