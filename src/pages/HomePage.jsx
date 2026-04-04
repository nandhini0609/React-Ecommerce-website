import './header.css';
import './HomePage.css';
import axios from 'axios';
import { ProductsGrid } from '../components/productsGrid';
import { useState, useEffect } from 'react'
import { Header } from '../components/Header';



export function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products')
            .then((response) => {
                setProducts(response.data);

            })

    }, []);
    //instead of this in vite.config.js, we can also set up a proxy to avoid CORS issues. The above code is commented out, but it achieves the same result as the proxy setup in vite.config.js.
    //useEffect(() => {
    // axios.get('http://localhost:3000/api/products')
    //  .then((response) => {
    //  setProducts(response.data);

    // })
    //axios.get('http://localhost:3000/api/cart-items')
    // .then((response) => {
    //setCart(response.data);
    // })
    //}, []);

    //useeffect for controlling running code

    // fetch('http://localhost:3000/api/products')
    // .then((response) => {
    //     return response.json();

    // }).then((data) => {
    //     console.log(data);

    // }) instead of axios, we can also use fetch to make the API call. The above code is commented out, but it achieves the same result as the axios code.
    return (
        <>
            <title>Ecommerce Project</title>
            <Header cart={cart} />


            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    )
}