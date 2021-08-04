import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';
import { configure, mount, render, shallow } from 'enzyme';
import Result from './Result.js';
configure({ adapter: new Adapter() });
import ReactDOM from 'react-dom';
const matchSnapshot = (event) => { };

//moke data for testing
const data = { items: [{ login: "ali", type: "user", avatar_url: "dsdd" }], incomplete_results: true, total_count: 1000 }


describe('MyComponent', () => {
    it('In my test case should render correctly in "debug" mode', () => {
        const component = shallow(
            <Result error={null} result={[]} SearchAgian={() => { }} />
        );
        expect(component).toMatchSnapshot();
    });
});
it('In my test case should run result component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Result error={null} result={[]} SearchAgian={() => { }} />
        ,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
it('In my test case should run result componeent with error props without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Result error={"data not found"} result={[]} SearchAgian={() => { }} />
        ,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
it('In my test case should run result componeent with result props without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Result error={null} result={data} SearchAgian={() => { }} />
        ,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
it('In my test case to be defind of table', () => {
    const wrapper = shallow(<Result searchResult={() => { }} error={null} />);
    expect(wrapper.find('.table')).toBeDefined();
});

it('in my test case table header are defined with length of three with name mentioned', () => {
    const wrapper = mount(
        <Result searchResult={() => { }} result={data} error={null} />
    );
    const rows = wrapper.find('table')
    expect(rows.length).toEqual(1)

    const firstRowColumns = rows.first().find('th').map(column => column.text())
    expect(firstRowColumns.length).toEqual(3)// since you have 4 td
    expect(firstRowColumns[0]).toEqual('Image')
    expect(firstRowColumns[1]).toEqual('User Name')
    expect(firstRowColumns[2]).toEqual('Type')
    expect(rows.find('th')).toHaveLength(3);
    //expect(rows.find('td')).toBeDefined(true);
});
it('In my test case my form should exist label field', () => {
    const wrapper = mount(
        <Result searchResult={() => { }} error={null} />
    );
    expect(wrapper.text()).toContain('Image');
    expect(wrapper.text()).toContain('User Name');
    expect(wrapper.text()).toContain('Type');
    expect(wrapper.text()).toContain('No Record Found');
});

