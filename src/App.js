import './App.css';
import NavBar from './components/Navbar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';

function App() {
  return (
    <>
      <NavBar />
      <ItemListContainer greeting= {'Bienvenidos'} />
    </>
  );
}

export default App;
