import React, { Component } from "react";
import PropTypes from "prop-types";
import { createStudents, getStudents, autoLogin } from "../actions/actions";
import { connect } from "react-redux";
import Filter from './filter';
import { ImSpinner3 } from 'react-icons/im';
import styled from "styled-components";

class Students extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: "",
      sorted: "",
      data: '',
      classes: '',
      loading: false,
      status: false,
    };
  }

  fetchData = () => {
    this.setState({ loading: true})
  }

  handleFile = (e) => {
    this.setState({
      student: e.target.files[0],
    });
  };

  componentDidMount() {
    this.props.user();
    this.props.studentRecords();
      fetch('api/v1/students', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          this.setState({ data: data})
        });
  }

  componentDidUpdate(prevProps, prevState){
    const { students, studentRecords } = this.props
    if(JSON.stringify(prevProps.students) !== JSON.stringify(students) || (prevState.data !== this.state.data)){
      studentRecords()
      this.setState({ data: students})
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("student", this.state.student);
    if (document.querySelector(".fileUpload").files.length === 0) {
      console.log("hi error");
    } else {
      for (var key of form_data.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }
    this.setState({ status: true})
    this.setState({ loading: true})

      await this.props.studentRecord(form_data);
      this.setState({ loading: false})
      document.querySelector(".fileUpload").value = null
      setTimeout(() =>{
        this.setState({ status: false})
      }, 2500)
    }
  };
  
  sortStudents = (event) => {
    const sorted = event.target.value
    this.setState({ sorted: sorted})
    this.setState({ data: this.state.data.sort().sort((a, b) => (
      sorted === 'name' ?
      ((a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase())? -1: 1):
      sorted === 'class' ?
      ((a.student_class > b.student_class)? 1: -1):
      sorted === 'section' ?
      ((Number(a.section[0]) < Number(b.section[0]))? -1: 1):
      sorted === 'registration_number' ?
      ((Number(a.registration_number[0]) < Number(b.registration_number[0]))? -1: 1):
      sorted === 'roll_number' ?
      ((Number(a.roll_number[0]) < Number(b.roll_number[0]))? -1: 1):
      ((a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase())? -1: 1)
    ))
    })
  }

  filterByClass = (event) => {
    const { students } = this.props
    const { data } = this.state
    if(event.target.value === ''){
      this.setState({classes: event.target.value})
      this.setState({data: students})
    }else{
    this.setState({classes:event.target.value})
    this.setState({data: students.filter(student => student.student_class.indexOf(event.target.value) >=0)})
    }
  }

  render() {
      const { loading, status } = this.state
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Filter filterClass={this.state.classes} filters={this.filterByClass} sorting={this.sortStudents} sorted={this.state.sorted} studentsData={this.props.students} />
        <form style={{display: 'flex', flexDirection: 'column', margin: '20px auto', padding: '0 20px'}} onSubmit={this.handleSubmit}>
          <p>submit student records</p>
          <input className="fileUpload" onChange={this.handleFile} type="file" accept='.csv' />
          <button disabled={loading} style={{ marginTop: '20px', fontSize: '20px', fontWeight: 700, cursor: 'pointer', background: 'green', color: '#fff', padding: '5px', border: 'none'}}>
          {status ? <p>{loading ?   "Loading..." : "completed"}</p> : <p>submit</p>}
          </button>
          </form>
          {this.props.logged_user.loggedIn && (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Registration Number</th>
                    <th>Roll Number</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.data.length && this.state.data?.map((student) => (
                      <tr key={student.id}>
                        <td>{student?.name}</td>
                        <td>{student?.student_class}</td>
                        <td>{student?.section}</td>
                        <td>{student?.registration_number}</td>
                        <td>{student.roll_number ? student.roll_number : student.id}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  students: state.students.students,
  logged_user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  studentRecord: (studentInfo) => dispatch(createStudents(studentInfo)),
  user: () => dispatch(autoLogin()),
  studentRecords: () => dispatch(getStudents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Students);
