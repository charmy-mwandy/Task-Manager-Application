import React, { Component } from 'react'
import './App.css'
import CustomModal from './components/Modals';

const goals = [
  {
    id: 1,
    title: "Party",
    description: "To night.",
    completed: true
  }, {
    id: 2,
    title: "Reading",
    description: "To night.",
    completed: false
  },  {
    id: 3,
    title: "Cleaning",
    description: "To night.",
    completed: true
  }, {
    id: 4,
    title: "Shopping",
    description: "To night.",
    completed: false
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
      return this.setstatus({viewCompleted: true});
    }
    return this.setstatus({viewCompleted: false});
  }

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick ={() => this.displayCompleted (true)}
          className={this.state.viewCompleted ? "active" : ""}
          style={{ 
            border: '1px solid black' , 
            marginRight: 25 , 
            cursor: 'pointer', 
            borderRadius: 10, 
            padding:"5px 8px",
            color: this.state.viewCompleted ? 'black' : 'white',
            backgroundColor: this.state.viewCompleted ? 'white' : 'black'
          }}
          
        >
          Completed
        </span>
        <span
          onClick ={() => this.displayCompleted (false)}
          className={this.state.viewCompleted ?  "" : "active"}
          style={{ 
            border: '1px solid black' , 
            marginRight: 25 , 
            cursor: 'pointer', 
            borderRadius: 10, 
            padding:"5px 8px",
            color: this.state.viewCompleted ? 'white' : 'black',
            backgroundColor: this.state.viewCompleted ? 'black' : 'white'
          }}
          
         
        >
          Incompleted
        </span>
      </div>
    )
  }

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
      item => item.completed == viewCompleted
    );

  return newItems.map(item =>  (
    <li 
      key={item.id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <span className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`}
      title={item.title}>

      { item.title }
      
      </span>

      <span>
        <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger mr-2 ">Delete</a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-outline-success mr-2  ">Edit</a>
      </span>
    </li>

  ))
};

  render() {
    return(
      <div className="content">
        <h1 className="text-black text-center text-xl font-bold my-4">Task App</h1>
        <div className="row">
          <div className="col-md-6 col-sma-10 mx-auto p-0 bg-gray-300" >
            <div className="card p-8">
              <div>
                <a href="#" target="_blank" rel="noopener noreferrer" className='btn btn-dark'>Add Task</a>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>

          </div>
        </div>
      </div>
    )

  }



}


export default App
