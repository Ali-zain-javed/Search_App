import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';
import { configure, mount, render, shallow } from 'enzyme';
import Search from './Search.js';
configure({ adapter: new Adapter() });

const matchSnapshot = (event) => { };
describe('MyComponent', () => {
    it('In my test case should render correctly in "debug" mode', () => {
        const component = shallow(
            <Search searchResult={() => { }} error={null} />
        );
        expect(component).toMatchSnapshot();
    });
});

it('In my test case to be defind of form control `.form-control`s', () => {
    const wrapper = shallow(<Search searchResult={() => { }} error={null} />);
    expect(wrapper.find('.form')).toBeDefined();
});
it('in my test case 1 form control `form`s exist in other meaning should exist input fields', () => {
    const wrapper = shallow(
        <Search searchResult={() => { }} error={null} />
    );
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find('form')).toBeDefined();
});
it('In my test case my form should exist label field', () => {
    const wrapper = render(
        <div>
            <Search searchResult={() => { }} error={null} />
        </div>
    );
    expect(wrapper.text()).toContain('Username');
});

it('In my test case submit form should exist ', () => {
    const wrapper = mount(
        <div>
            <Search searchResult={() => { }} error={null} />
        </div>
    );
    wrapper.find('form').simulate('submit');
});
it('In my test case submit form should call ', () => {
    const wrapper = mount(
        <Search searchResult={() => { }} error={null} />
    );
    wrapper.find('form').simulate('submit', {
        preventDefault: (props) => {
            console.log('propssss', props);
        },
    });
});
