import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import TaskList from './components/TaskList';
import NavBar from './components/NabBar';

function App() {
  return (
    <div className='app'>
      <NavBar />
      <div className="container">
        <TaskList />
      </div>
    </div>
  );
}

export default App;
