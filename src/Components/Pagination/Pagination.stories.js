import React from 'react';
import Pagination from './Pagination.js'
export default {
  component: Pagination,
  title: 'Components/Pagination',
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Pagination {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});

Primary.args = {
  currentPage: 1,
  pageLimit: 10,
  totalRecords: 100, onPageChanged: (pageNumber) => { console.log(pageNumber) }
};