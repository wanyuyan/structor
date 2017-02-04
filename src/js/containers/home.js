import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div>
        <article className='app-article'>
          不管我们日常用计算机或者手机，阅读的最多就是文字，而字体在这些设备 different domain offers 上对于我们来说就像是空气和水般的存在，但制作字体的过程并不轻松，尤其是中文字体，几万个字形不是几十个拉丁字形所能相比的，往往需要字形设计师和工程师配合耗时几年的时间来做，成本可想而知，所以商业公司字体的售价一般都比较贵，不过很多字体公司都提供个人非商用的免费版本的字体。
          如果指定的某个粗细不存在任何字体，则会使用相近粗细的字体。通常，加粗粗细映射到粗细较粗的字体，而较细粗细会映射到粗细较细的字体。
        </article>
        <article className="app-article">
          Easily compare different domain offers with in-depth statistics and detailed information about sellers. Once you find a domain that meets your needs, you can buy it - quickly and securely!
        </article>
        <article className="app-article">
          <i className="icon-city" />
          <i className="icon-chair" />
          <i className="icon-pen" />
        </article>
      </div>
    )
  }
}
