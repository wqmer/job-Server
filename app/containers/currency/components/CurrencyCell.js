import style from './style.css'
import React from 'react'
import {Button} from 'antd'

export const CurrencyCell = (props)=>(	
    <div>
      <Button type='primary' icon='edit' className={style.btnEdit} onClick={()=>{props.edit_currency(props.data._id);props.history.push('/admin/editCurrency')}}>编辑</Button>
      <Button type='primary' icon='delete' className={style.btnDel} onClick={()=>{props.delete_currency(props.data._id);}}>删除</Button>
	</div>
);