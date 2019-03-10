import React from 'react'
import {Button} from 'antd'
import style from './style.css'

export const PostCell = (props)=>(	
    <div>
      <Button disabled = {true} type='primary' icon='edit' className={style.btnEdit} 
      // onClick={()=>{props.getPost(props.data._id);props.history.push('/admin/post_edit')}}
      >
      编辑
      </Button>
      <Button type='primary' icon='delete' className={style.btnDel} onClick={()=>{props.delete();}}>删除</Button>
	</div>
);