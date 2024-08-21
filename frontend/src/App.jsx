import React, { Component } from 'react'
import './App.css'

const goals = [
  {
    id: 1,
    title: "Party",
    description: "To night.",
    completed: true
  }
  
]

class  App extends Component {
  constructor(props){
    super(props);
    this.state = {
      viewCompleted: false,
      taskList: goals,

    };
  }

  displayCompleted = status => {
    if (status) {
      return this.setstatus({viewCompleted:true});
    }
    return this.setstatus({viewCompleted:false});
  }



}


export default App
