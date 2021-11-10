import React, { Component } from 'react';

class Filter extends Component {
    render() {
        const { studentsData, converting } = this.props
        return (
            <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
               <div className='filterOrder'>
                 <select value={this.props.sorted} onChange={this.props.sorting}>
                   <option>Sort</option>
                   <option value="name">Name</option>
                   <option value="class">Class</option>
                   <option value="section">section</option>
                   <option value="registration_number">Reg Number</option>
                   <option value="roll_number">Roll Number</option>
               </select>
               </div> 
               <div className='filterInput'><select value={this.props.filterClass} onChange={this.props.filters}>
                   <option value="">Filter by class</option>
                   {studentsData?.length && [...new Set(studentsData?.map((x) =>(
                    <option value={x?.student_class}>{x?.student_class}</option>
                   )))]}
               </select></div> 
            </div>
        )
    }
}
export default Filter;