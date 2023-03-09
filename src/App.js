import logo from './logo.svg';
import './App.css';
import Dt from './demo/DataTableBasicDemo'
import { Editor } from 'primereact/editor';
import { AutoComplete } from 'primereact/autocomplete';

function App(){
    return (
      <div className="App">
        <Dt/>
        <Editor/>
        <AutoComplete />
      </div>
    );
}

export default App;
