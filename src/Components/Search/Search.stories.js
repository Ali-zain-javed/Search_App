import React from 'react';
import Search from './Search.js'
export default {
  component: Search,
  title: 'Components/Search',
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Search {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});

Primary.args = {
  error:"data not found",
  searchResult:(data)=>{
      console.log("submit click")
  }
};