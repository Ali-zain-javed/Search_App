import React from 'react';
import Result from './Result.js';
export default {
  component: Result,
  title: 'Components/Result',
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Result {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});

Primary.args = {
 result:{ items: [{ login: "ali", type: "user", avatar_url: "dsdd" },{ login: "ali", type: "user", avatar_url: "dsdd" }],
  incomplete_results: true,
  total_count: 1000},
  searchResult:(arg1,arg2)=>{console.log(arg1,arg2)}

};