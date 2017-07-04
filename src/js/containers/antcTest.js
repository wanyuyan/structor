import React, { Component } from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';

const TabPane = Tabs.TabPane;

class AreaPicker extends Component {
  constructor(props) {
    super(props);
    this.keyArray = ["province", "city", "dist"];
    this.state = {
      layerVisible: false,
      pickedData: []
    }
  }

  componentWillMount() {
    const initPick = this.keyArray.map(key => {
      return {
        key,
        code: null,
        name: "请选择",
        list: [],
        visible: key === "province",
        active: key === "province"
      }
    });

    // SalesUtil._ajax("GET", API.supportedAreas, res => {
    //   initPick[0].list = res.data;
    //   this.setState({pickedData: initPick});
    // });

    const fetchResult = {"status":0,"msg":"","data":[{"code":320000,"city":[{"code":320100,"name":"南京市","dist":[{"code":999999,"name":"市辖区"}]}],"name":"江苏省"},{"code":330000,"city":[{"code":330100,"name":"杭州市","dist":[{"code":999999,"name":"市辖区"}]},{"code":330200,"name":"宁波市","dist":[{"code":999999,"name":"市辖区"}]},{"code":330300,"name":"温州市","dist":[{"code":999999,"name":"市辖区"}]},{"code":330700,"name":"金华市","dist":[{"code":999999,"name":"市辖区"}]}],"name":"浙江省"},{"code":370000,"city":[{"code":370100,"name":"济南市","dist":[{"code":999999,"name":"市辖区"}]}],"name":"山东省"},{"code":430000,"city":[{"code":430100,"name":"长沙市","dist":[{"code":999999,"name":"市辖区"}]}],"name":"湖南省"}]}
    initPick[0].list = fetchResult.data;
    this.setState({pickedData: initPick});
  }

  componentWillReceiveProps({ visible }) {
    this.setState({layerVisible: visible});
  }

  resetPick(pickedIndex) {
    const pickedData = this.state.pickedData.map((item, index) => {
      item.code = index <= pickedIndex ? item.code : null;
      item.name = index <= pickedIndex ? item.name : "请选择";
      item.list = index <= pickedIndex ? item.list : [];
      item.visible =  index <= pickedIndex + 1;
      item.active = index === pickedIndex + 1;
      return item;
    });
    return pickedData;
  }

  // areaKey: province/city/dist
  onPicked(areaKey, item, pickedIndex) {
    const nextList = item[this.keyArray[pickedIndex + 1]];
    const notLast = nextList && nextList.length;
    const pickedData = notLast ? this.resetPick(pickedIndex) : this.state.pickedData
    
    pickedData[pickedIndex].name = item.name;
    pickedData[pickedIndex].code = item.code;

    if (notLast) {
      pickedData[pickedIndex + 1].list = nextList;
      this.setState({pickedData});
    } else {
      const pickedCodes = {};
      let pickedValue = "";
      pickedData.forEach(resultItem => {
        pickedValue += `${resultItem.name} `;
        pickedCodes[item.key] = resultItem.code;
      })
      pickedValue = pickedValue.substring(0, pickedValue.length - 1);

      this.setState({ pickedData });
      this.props.getPickedCodes({pickedValue, pickedCodes});
      this.props.onClose();
    }
  }

  renderArea(pickedDataItem, pickedDataIndex) {
    const { key, code, list } = pickedDataItem;
    return (
      <ul>
        {list.map(item => {
          return (
            <li key={item.code}>
              <label htmlFor={item.code}>{item.name}</label>
              <input type="checkbox"
                checked={item.code === code}
                onClick={item.code !== code && this.onPicked.bind(this, key, item, pickedDataIndex)}/>
            </li>
          );
        })}
      </ul>
    );
  }

  handleTabChange(key) {
    const { pickedData } = this.state;
    const newPickedData = pickedData.map(item => {
      item.active = item.key === key;
      return item;
    });
    this.setState({pickedData: newPickedData});
  }

  render() {
    const { pickedData } = this.state;
    const tabItems = pickedData.filter(item => item.visible === true);
    const activeKey = pickedData.find(item => item.active === true).key;

    return tabItems.length ? 
      <Tabs
        defaultActiveKey={this.keyArray[0]}
        activeKey={activeKey}
        onChange={this.handleTabChange.bind(this)}>
        {tabItems.map((item, index) => {
          return (
            <TabPane tab={item.name} key={item.key}>
              {this.renderArea(item, index)}
            </TabPane>
          );
        })}
      </Tabs>
    : null
  }
}

class AreaPickerDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      pickedValue: "",
      pickedCodes: {}
    }
  }

  getPickedValues({ pickedValue, pickedCodes}) {
    this.setState({
      pickedValue,
      pickedCodes
    });
  }

  openAreaPicker() {
    this.setState({visible: true});
  }

  closeAreaPicker() {
    this.setState({visible: false});
  }

  render() {
    return (
      <div className="page">
        <input type="text"
          value={this.state.pickedValue}
          onFocus={this.openAreaPicker.bind(this)} />
        <AreaPicker
          visible={this.state.visible}
          onClose={this.closeAreaPicker.bind(this)}
          getPickedCodes={this.getPickedValues.bind(this)}
        />
      </div>
    );
  }
}

export default AreaPickerDemo;