import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
// import About from './pages/About';
import Navigation from './components/Navigation';
import Cart from './pages/Cart';
import SingleProduct from './pages/SingleProduct';
import ProductsPage from './pages/ProductsPage';
import { Cartcontext } from './pages/Cartcontext';
import { useState } from 'react';
import { useEffect } from 'react';
import { getCart, storeCart } from './pages/helper';

const App = () => {   

    const [cart, setCart] = useState({});

    // fetch cart from local storage
    useEffect(() => {
        getCart().then((cart) => {
            setCart(JSON.parse(cart));
        });

    }, [])


    useEffect(() => {
        storeCart(JSON.stringify(cart))
    }, [cart])


    return (
        <>
            <Router>

                {/* Wrapping all the items in CartContext */}
                <Cartcontext.Provider value={{cart,setCart}} >

                        <Navigation />

                        <Routes>

                            <Route path='/' element={<Home />}></Route>
                            {/* <Route path='/About' element={<About />}></Route> */}
                            <Route path='/products' exact element={<ProductsPage />}></Route>
                            <Route path='/products/:_id' element={<SingleProduct />}></Route>
                            <Route path='/cart' element={<Cart />}></Route>

                        </Routes>

                </Cartcontext.Provider>

            </Router>
        </>
    )
}

export default App;