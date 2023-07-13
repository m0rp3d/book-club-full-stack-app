import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import MainComponent from './components/MainComponent';


function App() {
  return (
      <div>
          <div className="d-flex justify-content-center">
              <div className="border  bg-primary-subtle">
                  <MainComponent></MainComponent>
              </div>
          </div>
      </div>
  );
}

export default App;
