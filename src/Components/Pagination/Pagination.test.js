import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';
import { configure, mount, render, shallow } from 'enzyme';
import Pagination from './Pagination.js';
configure({ adapter: new Adapter() });
import ReactDOM from 'react-dom';
const matchSnapshot = (event) => { };

//moke data for testing
const props = {
    currentPage: 1,
    pageLimit: 10,
    totalRecords: 100, onPageChanged: () => { }
}
describe('MyComponent', () => {
    it('In my test case should render correctly and save snapshots', () => {
        const component = shallow(
            <Pagination {...props} />
        );
        expect(component).toMatchSnapshot();
    });
});
it('In my test case should run pagination component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Pagination {...props} />
        ,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
it('In my test case should run pagination component with page 2 without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Pagination {...props} currentPage={2} />
        ,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it('In my test case my form should exist label field', () => {
    const wrapper = mount(
        <Pagination {...props} currentPage={2} totalRecords={200}/>
    );
    expect(wrapper.text()).toContain('Showing');
    expect(wrapper.text()).toContain('1');
    expect(wrapper.text()).toContain('2');
    expect(wrapper.text()).toContain('items');
    expect(wrapper.text()).toContain('200');
});

