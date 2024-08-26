import React, { Component } from 'react'
import './App.css'
import Modal from './components/Modals';
import axios from 'axios';

class  App extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: [],
    };
  }

componentDidMount() {
  this.refreshList();
}

refreshList = () => {
  axios
  .get("http://localhost:8000/api/goals/")
  .then(res => this.setState({ todoList: res.data }))
  .catch(err => console.log(err))
}


//Creating toggle properties
  toggle = ()  => {
    this.setState({ modal: !this.state.modal })
  };

  handleSubmit = item => {
    this.toggle();
    if(item.id){
      axios
      .get(`http://localhost:8000/api/goals/${item.id}/`, item)
      .then(res => this.refreshList())
    }
    axios
    .post("http://localhost:8000/api/goals/", item)
    .then(res => this.refreshList())
  };

  handleDelete = item => {
    axios
    .delete(`http://localhost:8000/api/goals/${item.id}/`)
    .then(res => this.refreshList())
  };

  createItem = () => {
    // const item = { title: "", modal: !this.state.modal }
    const item = { title: "", description: "", completed: false ,modal: !this.state.modal  };
    this.setState({ activeItem: item, modal: !this.state.modal })
  }

  editItem = () => {
    this.setState({ activeItem: item, modal: !this.state.modal })
  }

  // displayCompleted = status => {
  //   if (status) {
  //     return this.setState({viewCompleted: true});
  //   }
  //   return this.setState({viewCompleted: false});
  // }
  displayCompleted = status => {
    this.setState({ viewCompleted: status });
  };

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
            color: this.state.viewCompleted ? 'white' : 'black', // Text color for active/inactive state
            backgroundColor: this.state.viewCompleted ? 'black' : 'white' 
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
            color: this.state.viewCompleted ? 'black' : 'white', // Text color for active/inactive state
            backgroundColor: this.state.viewCompleted ? 'white' : 'black'
          }}
          
         
        >
          Incompleted
        </span>
      </div>
    )
  }

  renderItems = () => {
    // const { viewCompleted } = this.state;
    // const newItems = this.state.todoList.filter(
    //   item => item.completed === viewCompleted
    // );
    const { viewCompleted, todoList } = this.state;
    const filteredItems = todoList.filter(item => item.completed === viewCompleted);


  return filteredItems.map(item =>  (
    <li 
      key={item.id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <span className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`}
      title={item.title}>

      {item.title}
      
      </span>

      <span>
        <button className="btn btn-outline-danger mr-2" onClick={() => this.handleDelete(item)}>Delete</button>
        <button className="btn btn-outline-success mr-2" onClick={() =>this. editItem(item)}>Edit</button>
      </span>
    </li>

  ))
};

  render() {
    return(
      <div className="content p-3 mb-2 bg-gray-light h-full">
        <h1 className="text-black text-center text-xl font-bold my-4">Task App</h1>
        <div className="row">
          <div className="col-md-6 col-sma-10 mx-auto p-0 bg-gray-300" >
            <div className="card p-8">
              <div>
                <button className='btn btn-dark'  onClick={this.createItem}>Add Task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>

          </div>
        </div>
        
        {this.state.modal ? (
          <Modal activeItem={this.state.activeItem} toggle={this.toggle}
          onSave={this.handleSubmit}/>
          
        ) : null}

      </div>

    )
  }
}

export default App
