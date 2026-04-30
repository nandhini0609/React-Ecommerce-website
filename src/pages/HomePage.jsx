import './header.css';
import './HomePage.css';
import axios from 'axios';
import { ProductsGrid } from '../components/productsGrid';
import { useState, useEffect } from 'react'
import { Header } from '../components/Header';



export function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const loadProducts = () => {
        return axios.get('/api/products')
            .then((response) => {
                const productList = Array.isArray(response.data) ? response.data : []
                setProducts(productList);
            })
    }

    // Filter products based on search query
    const filteredProducts = products.filter((product) => {
        const query = searchQuery.toLowerCase();
        return (
            product.name.toLowerCase().includes(query) ||
            (product.description && product.description.toLowerCase().includes(query))
        );
    });

    useEffect(() => {
        loadProducts().catch(() => {
            // Handled by global interceptor.
        })

    }, []);

    useEffect(() => {
        const onRetry = (event) => {
            if (event?.detail?.path === '/') {
                loadProducts().catch(() => {
                    // Handled by global interceptor.
                })
            }
        }

        window.addEventListener('nmart-api-retry', onRetry)
        return () => {
            window.removeEventListener('nmart-api-retry', onRetry)
        }
    }, [])
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
            <Header cart={cart} searchQuery={searchQuery} onSearchChange={setSearchQuery} />


            <div className="home-page">
                <ProductsGrid products={filteredProducts} loadCart={loadCart} />
            </div>
        </>
    )
}