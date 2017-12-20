import React, { Component } from 'react'
import { Transition } from 'react-transition-group'
import { connect } from 'react-redux'
import Axios from 'axios'

import { themeChange, updateUser } from './../../actions'
import { BlogTheme } from './../../Hero.service'

import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

import { defaultStyle, transitionStyles } from './TransitionConfig'
import './SignIn.css'

const SignInHeader = ({history, onClickConfirmNotice}) => (
  <React.Fragment>
    <div className="signin-header">With You Friends</div>
    <NavBack history={history} />
    <Notice onClickConfirmNotice={onClickConfirmNotice} />
  </React.Fragment>
)

const NavBack = ({ history }) => {
  return (
    <a className="signin-navback" onClick={history.goBack}>
      <i className="iconfont">&#xe608;</i>
      Back To Review
    </a>
  )
}

const Notice = ({ onClickConfirmNotice }) => (
  <React.Fragment>
    <a className="signin-notice-btn" onClick={onClickConfirmNotice}>
      为什么我到了这里？
    </a>
    <div className="signin-notice"></div>
  </React.Fragment>
)

const NoticeBoard = ({ onClickConfirmNotice, noticeBoardIn }) => (
  noticeBoardIn ? (
    <div className="signin-noticeboard">
      <p>因为刚刚的才做需要留一个名字才能继续</p>
      <p>因为Withyoufriends想要认识你</p>
      <a onClick={onClickConfirmNotice}>知道啦</a>
    </div>
  ) : null
)

const Greet = ({ greetIn, user, history }) => {
  return (
    greetIn
    ? (
      <Transition in={greetIn} appear={true} timeout={500}>
      {(state) => (
        <div
        className="signin-greet-container"
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
          <div className="signin-greet">😌好久不见，{user.nick_name}</div>
          <a onClick={history.goBack}>点这里可以返回上一个页面</a>
        </div>
      )}
      </Transition>
    ) : null
  )
}

class SignIn extends Component {
  constructor () {
    super()
    this.state = {
      formType: 'signIn',
      noticeBoardIn: false
    }
  }
  componentDidMount () {
    this.props.themeChange(BlogTheme)
  }
  onFormSubmited (type, user) {
    console.log('onFormSubmit---', user)
    // type:0 未注册，1：已登录
    this.setState({ formType: type })
    this.props.updateUser(user)
  }
  onClickConfirmNotice () {
    this.setState(prev => ({ noticeBoardIn: !prev.noticeBoardIn }))
  }
  render() {
    const { formType, noticeBoardIn } = this.state
    const { history, user } = this.props
    console.log(noticeBoardIn)
    return (
      <React.Fragment>
        <div className="signin-container" className={noticeBoardIn ? 'unfocus' : ''}>
          <SignInHeader history={history} onClickConfirmNotice={this.onClickConfirmNotice.bind(this)} />
          <div className="signin-form-container">
            <SignInForm signInFormIn={formType === 'signIn'} onFormSubmited={this.onFormSubmited.bind(this)} />
            <SignUpForm signUpFormIn={formType === 'signUp'} user={user} onFormSubmited={this.onFormSubmited.bind(this)} />
            <Greet greetIn={formType === 'greet'} user={user} history={history} />
          </div>
        </div>
        <NoticeBoard noticeBoardIn={noticeBoardIn} onClickConfirmNotice={this.onClickConfirmNotice.bind(this)} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.theme,
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    themeChange: theme => {
      dispatch(themeChange(theme))
    },
    updateUser: user => {
      dispatch(updateUser(user))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)
