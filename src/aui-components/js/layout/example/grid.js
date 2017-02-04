import React, { Component } from 'react';
import ReactDom from 'react-dom';
import 'uiStyle/grid.scss';

export default class LayoutTest extends Component {
  render() {
    return (
      <div>
        <div className="grid-test">
          <section className="row">
            <div className="col-1">col-1</div>
          </section>

          <section className="row">
            <div className="col-3">.col-3</div>
            <div className="col-3">.col-3</div>
            <div className="col-3">.col-3</div>
            <div className="col-3">.col-3</div>
            <div className="col-3">.col-3</div>
            <div className="col-3">.col-3</div>
          </section>

          <section className="row">
            <div className="col-4">.col-4</div>
            <div className="col-4">.col-4</div>
            <div className="col-4">.col-4</div>
          </section>

          <section className="row">
            <div className="col-6">.col-6</div>
            <div className="col-6">.col-6</div>
          </section>

          <section className="row">
            <div className="col-12">.col-12</div>
          </section>
        </div>

        <div className="layout-test">
          <section className="hcenter">
            <span>justify-center</span>
          </section>

          <section className="vcenter">
            <span>align-center</span>
          </section>

          <section className="center">
            <span>center</span>
          </section>
        </div>
      </div>

    )
  }
}
