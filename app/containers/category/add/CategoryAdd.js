import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {Input, Select, Button, Modal} from 'antd';
import {actions} from '../../../reducers/category/manageCategory';
import dateFormat from 'dateformat'
import style from './style.css'

const {add_category} = actions;

class CategoryAdd extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            Name: '',
          };
    }

    // titleOnChange(e) {
    //     this.props.updateTitle(e.target.value)
    // };
	
	// authorOnChange(e) {
    //     this.props.updateAuthor(e.target.value)
    // };
	
	// dateAddedOnChange(e) {
    //     this.props.updateDateAdded(e.target.value)
    // };
	
	// viewCountOnChange(e) {
    //     this.props.updateViewCount(e.target.value)
    // };
    onChangeInput = (e) => {
        this.setState({ Name: e.target.value });
    }

    onAddCategory() {
        // console.log(typeof  (this.state.Name))
 	    this.props.addCategory(this.state.Name);
    };

    render() {
        return (
            <div>
                <h2>添加分类</h2>
                <div className={style.container}>
                    <span className={style.subTitle}>名称</span>
                    <Input
                        className={style.titleInput}
                        placeholder={'请输入分类名称'}
                        type='text'
                        value={this.state.Name}
                        onChange={this.onChangeInput} 
                        />
                    <div className={style.bottomContainer}>
                        <Button type='primary' onClick={this.onAddCategory.bind(this)}className={style.buttonStyle}>添加</Button>
                    </div>
                </div>
            </div>
        ) 
    }

}

// PostAdd.propsTypes = {
//     title: PropTypes.string,
// };

// PostAdd.defaultProps = {
//     title: '',
// };

function mapStateToProps(state) {
    const {title} = state.admin.postAdd;  
    return {
        title
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addCategory: bindActionCreators(add_category, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryAdd)
