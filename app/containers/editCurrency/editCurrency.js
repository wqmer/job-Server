import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import style from './style.css'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {Input, Select, Button, Modal} from 'antd';
import {actions} from "../../reducers/editCurrency";
import dateFormat from 'dateformat'

const {update_code, update_value, update_currency} = actions;

class EditCurrency extends Component {
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

    updateCurrency() {
        let currencyData = {};
        currencyData.code = this.props.code;
        currencyData.value = this.props.value;
        this.props.update_currency(currencyData);
    };

    render() {
        return (
            <div>
                <h2>编辑货币</h2>
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
                        <Button type="primary" onClick={this.updateCurrency.bind(this)} className={style.buttonStyle}>保存</Button>
                    </div>
                </div>
            </div>
        ) 
    }

    componentDidMount() {}
}

EditCurrency.propsTypes = {
    code: PropTypes.string,
    value: PropTypes.string
};

EditCurrency.defaultProps = {
	id: '',
    code: '',
    value: ''
};

function mapStateToProps(state) {
    const {id, code, value} = state.admin.editCurrency;
    
    return {
		id,
        code,
        value
    }
}

function mapDispatchToProps(dispatch) {
    return {
        update_code: bindActionCreators(update_code, dispatch),
        update_value: bindActionCreators(update_value, dispatch),
        update_currency: bindActionCreators(update_currency, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCurrency)
