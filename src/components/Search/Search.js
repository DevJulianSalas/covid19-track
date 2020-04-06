import React from 'react'
import { Select } from 'antd';


const Search = (props) => {
  return (
    <Select
        showSearch
        value={''}
        placeholder={''}
        style={props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch=''
        onChange=''
        notFoundContent={null}
      >
      { props.options }
    </Select>
  )
}

export default Search
