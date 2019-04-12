import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import dateFns from 'date-fns'
import './Calendar.css'
import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
  } from 'semantic-ui-calendar-react';

import { doCreateMovieData } from '../../Firebase/Users'

class Calendar extends Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        show: false
    }


    renderHeader() {
        const dateFormat = "MMMM YYYY";
        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
              </div>
                </div>
                <div className="col col-center">
                    <span>
                        {dateFns.format(this.state.currentMonth, dateFormat)}
                    </span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    }


    renderDays() {
        const dateFormat = "dddd";
        const days = [];
        let startDate = dateFns.startOfWeek(this.state.currentMonth);
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }
        return <div className="days row">{days}</div>;
    }


    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${
                            !dateFns.isSameMonth(day, monthStart)
                                ? "disabled"
                                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                            }`}
                        key={day}
                        onClick={() => this.toggleShow(dateFns.parse(cloneDay))}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    // onDateClick = day => {
    //     console.log(day)
    //     this.setState({
    //       show: true,
          
    //     });
    //   };

    toggleShow = day => {
        this.setState({
            selectedDate: day,
            show: !this.state.show
        })
    }


    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    };

    render() {
        return (
            <div className="calendar">
                {
                    !this.state.show
                        ? <div>
                            {this.renderHeader()}
                            {this.renderDays()}
                            {this.renderCells()}
                        </div>
                        : <AddMovie 
                            day={this.state.selectedDate} 
                            toggleShow={this.toggleShow} 
                            toggleShow={this.toggleShow}
                            currentMonth={this.state.currentMonth}
                            currentUserId={this.props.currentUser.id}
                        />
                }
            </div>
        )
    }
}

class AddMovie extends Component {
    state = {
        title: '',
        time: '',
        place: ''
    }

    createMovieDate = () => {
        doCreateMovieData(this.props.currentUserId, Object.assign({
            date: `${dateFns.format(this.props.currentMonth, "MMMM")} ${this.props.day.getDate()
        }`},this.state))
        this.props.toggleShow(this.props.day)
    }
        


    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
      }
    doHandleInput = e =>
        this.setState({
            [e.target.name]: e.target.value
        }) 
    
    render() {
        // console.log(this.props)
        const { day } = this.props
        return (
            <div className='calendar'>
                pick a movie
                <button onClick={() => this.props.toggleShow(this.props.day)}>close</button>
                {/* <form className='calendar-form'>
                    <input type='text' onChange={e => this.doHandleInput(e)} name='title' value={this.state.title}></input>
                    <input type='text' onChange={e => this.doHandleInput(e)} name='place' value={this.state.title}></input>
                    <input type='text' onChange={e => this.doHandleInput(e)} name='address' value={this.state.title}></input>
                    <input type='date' onChange={e => this.doHandleInput(e)} name='data' value={t.toString()} 
                    ></input>
                </form> */}
                <h3>{dateFns.format(this.props.currentMonth, "MMMM")} {day.getDate()}</h3>
                <Form onSubmit={this.createMovieDate}>
                    <Form.Field>
                        <label>Title</label>
                        <input onChange={e => this.doHandleInput(e)} name='title' placeholder='Title' />
                    </Form.Field>
                    <Form.Field>
                        <label>Place</label>
                        <input onChange={e => this.doHandleInput(e)} name='place' value={this.state.place} placeholder='Place' />
                    </Form.Field>
                    <Form.Field>
                        <label>Time</label>
                        <TimeInput
                            name="time"
                            placeholder="Time"
                            value={this.state.time}
                            iconPosition="left"
                            onChange={this.handleChange}
                            closable={true}
                            />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        )
    }
}


export default Calendar