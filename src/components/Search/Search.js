import React from 'react'
import { Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select

const Search = (props) => {
  console.log(props)
  return (
    <Select
        showSearch
        allowClear
        placeholder={props.placeHolder}
        style={props.styles}
        value={props.selectedValue}
        suffixIcon = { <SearchOutlined style={{fontSize: '15px'}} twoToneColor="#141414"/>}
        onChange={(choice) => props.onChangeOpt(choice)}
      >
         { props.options.map((item, key) => (
          <Option key={key} value={item.cuidad}>
            {item.cuidad}
          </Option>
        ))}
    </Select>
  )
}

export default Search
