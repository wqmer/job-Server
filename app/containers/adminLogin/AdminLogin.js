import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import style from './style.css'
import {Switch, Route} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import Login from "../home/components/login/Login";
import {Logined} from "../home/components/logined/Logined";
import {actions as IndexActions} from '../../reducers/index'

class AdminLogin extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {login, register} = this.props;
		
        return(
		  <div>
			<div className={style.container}>
			  <div className={style.contentContainer}>
				<div className={`${style.loginContainer}`}>
				  {this.props.userInfo.userId ? <Logined history={this.props.history} userInfo={this.props.userInfo}/>:<Login login={login} register={register}/>}
			    </div>
			  </div>
			</div>
		  </div>
        )
    }

    componentDidMount() {}
}

AdminLogin.defaultProps = {
    
};

AdminLogin.propTypes = {
	
};

function mapStateToProps(state) {
    return{
        userInfo: state.globalState.userInfo
    }
}
function mapDispatchToProps(dispatch) {
    return{
        login: bindActionCreators(IndexActions.get_login, dispatch),
        register: bindActionCreators(IndexActions.get_register, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminLogin)