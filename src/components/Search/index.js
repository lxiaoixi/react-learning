import React, { Component } from 'react';
import { Select, Form, Input } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

class Search extends Component {

    constructor(props) {
        super(props);
        this.input = null;
    }

    componentDidMount() {
        if(this.input){
            this.input.focus();
        }
    }

    sortSelect(){
        const { sortOptions, onSort } = this.props;

        const  options = sortOptions.map( option => {
            return <Option value={option.value}>{option.label}</Option>
        })

        return (
            <Select defaultValue="NONE" style={{ width: 120 }} onChange={onSort}>
                <Option value="NONE">默认</Option>
                { options }
            </Select>
        )
    }

    render() {
        const { onChange, value, children} = this.props;
        
        return (
            <div>
                <Form layout="inline">
                    <FormItem label={children}>
                        <Input  onChange={onChange} value={value} ref={(node)=>this.input = node}/> 
                    </FormItem>
                    <FormItem label='Sort'>
                        {this.sortSelect()}
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Search;