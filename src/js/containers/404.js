import React, { Component } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <div className="error-page">
        <header>500 - 服务器内部出错了</header>
        <section>
          <img src={require('image/500.png')} />
          <div className="error-page-error">ERROR!</div>
          <div>服务器内部出错了</div>
        </section>
        <footer>
          <button className="go-home-btn">去首页</button>
        </footer>
      </div>
    )
  }
}

// <img src={require('image/500.png')} />
// <div className="error-page-number" />
