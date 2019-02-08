import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import style from './style.css'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {Input, Select, Button, Modal} from 'antd';
import {actions} from '../../reducers/post';
import dateFormat from 'dateformat'

const {update_code, update_value, save_post} = actions;

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    codeOnChange(e) {
        this.props.update_code(e.target.value)
    };
	
	valueOnChange(e) {
        this.props.update_value(e.target.value)
    };

    savePost() {
        let postData = {};
        postData.code = this.props.code;
        postData.value = this.props.value;
        this.props.save_post(postData);
    };

    render() {
        return (
            <div>
                <h2>增加帖子</h2>
                <div className={style.container}>
                    <span className={style.subTitle}>代码</span>
                    <Input
                        className={style.titleInput}
                        placeholder={'请输入代码'}
                        type='text'
                        value={this.props.code}
                        onChange={this.codeOnChange.bind(this)}/>
					<span className={style.subTitle}>值</span>
                    <Input
                        className={style.titleInput}
                        placeholder={'请输入值'}
                        type='text'
                        value={this.props.value}
                        onChange={this.valueOnChange.bind(this)}/>
                    <div className={style.bottomContainer}>
                        <Button type='primary' onClick={this.savePost.bind(this)}className={style.buttonStyle}>保存</Button>
                    </div>
                </div>
            </div>
        ) 
    }

    componentDidMount() {}
}

NewPost.propsTypes = {
    code: PropTypes.string,
    value: PropTypes.string
};

NewPost.defaultProps = {
    code: '',
    value: ''
};

function mapStateToProps(state) {
    const {code, value} = state.admin.newPost;
    
    return {
        code,
        value
    }
}

function mapDispatchToProps(dispatch) {
    return {
        update_code: bindActionCreators(update_code, dispatch),
        update_value: bindActionCreators(update_value, dispatch),
        save_post: bindActionCreators(save_post, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewPost)
