import style from './style.css'
import React from 'react'
import {Button} from 'antd'

export const PostCell = (props)=>(	
    <div>
      <Button type='primary' icon='edit' className={style.btnEdit} onClick={()=>{props.edit_post(props.data._id);props.history.push('/admin/editPost')}}>编辑</Button>
      <Button type='primary' icon='delete' className={style.btnDel} onClick={()=>{props.delete_post(props.data._id);}}>删除</Button>
	</div>
);