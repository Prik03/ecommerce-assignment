import Navbar from './components/Navbar';
import ProductsContainer from './components/ProductsContainer';

function App() {
  return (
    <>
      <Navbar />
      <main className="p-4">
        <ProductsContainer />
      </main>
    </>
  );
}

export default App;
