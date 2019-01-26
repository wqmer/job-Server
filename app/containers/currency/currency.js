import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {actions} from '../../reducers/currency'
import {Table, Pagination} from 'antd';
import { Divider, Tag } from 'antd';
import {Button} from 'antd'

import style from './style.css'
import {CurrencyCell} from "./components/currencyCell";

const {get_currencies, edit_currency, delete_currency} = actions;

class Currency extends Component {

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
				 <CurrencyCell
					edit_currency={(id)=>this.props.edit_currency(record._id)}
					history={this.props.history}
					getCurrencyDetail={(id)=>this.props.get_currency_detail(record.id)}
					delete_currency={(id)=>this.props.delete_currency(id)}
					data={record} />
			)
		}];

        return (	
            <div>
				<h2 className={style.title}>货币管理</h2>
				<Table columns={columns} dataSource={this.props.currencyList} />
            </div>
        )
    }

    componentDidMount() {
        //缓存
        if(this.props.currencyList.length===0)
            this.props.get_currencies();
    }
}

Currency.propsTypes = {
    pageNUm: PropTypes.number.isRequired,
    currencyList: PropTypes.arrayOf(PropTypes.object),
    total:PropTypes.number.isRequired
};

Currency.defaultProps = {
    pageNum: 1,
    currencyList: [],
    total:0
};

function mapStateToProps(state) {
    let {pageNum, currencyList, total} = state.admin.currencies;
	
    return {
        pageNum,
        currencyList,
        total
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_currencies: bindActionCreators(get_currencies, dispatch),
		edit_currency:bindActionCreators(edit_currency,dispatch),
		delete_currency:bindActionCreators(delete_currency,dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Currency)

