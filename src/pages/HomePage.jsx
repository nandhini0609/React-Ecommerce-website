import './header.css';
import './HomePage.css';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { Header } from '../components/Header';


export function HomePage() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        axios.get('/api/products')
            .then((response) => {
                setProducts(response.data);

            })
        axios.get('/api/cart-items')
            .then((response) => {
                setCart(response.data);
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
                <div className="products-grid">
                    <div className="product-container">
                        {products.map((product) => {
                            return (
                                <div className="product-container" key={product.id}>
                                    <div className="product-image-container">
                                        <img className="product-image" src={product.image} />
                                    </div>

                                    <div className="product-name limit-text-to-2-lines">
                                        {product.name}
                                    </div>

                                    <div className="product-rating-container">
                                        <img
                                            className="product-rating-stars"
                                            src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                                        />
                                        <div className="product-rating-count link-primary">
                                            {product.rating.count}
                                        </div>
                                    </div>

                                    <div className="product-price">
                                        ${(product.priceCents / 100).toFixed(2)}
                                    </div>

                                    <div className="product-quantity-container">
                                        <select>
                                            {[...Array(10)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="product-spacer"></div>

                                    <div className="added-to-cart">
                                        <img src="images/icons/checkmark.png" />
                                        Added
                                    </div>

                                    <button className="add-to-cart-button button-primary">
                                        Add to Cart
                                    </button>
                                </div>
                            );
                        })}

                        <div className="product-container">
                            <div className="product-image-container">
                                <img className="product-image"
                                    src="images/products/intermediate-composite-basketball.jpg" />
                            </div>

                            <div className="product-name limit-text-to-2-lines">
                                Intermediate Size Basketball
                            </div>

                            <div className="product-rating-container">
                                <img className="product-rating-stars"
                                    src="images/ratings/rating-40.png" />
                                <div className="product-rating-count link-primary">
                                    127
                                </div>
                            </div>

                            <div className="product-price">
                                $20.95
                            </div>

                            <div className="product-quantity-container">
                                <select>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>

                            <div className="product-spacer"></div>

                            <div className="added-to-cart">
                                <img src="images/icons/checkmark.png" />
                                Added
                            </div>

                            <button className="add-to-cart-button button-primary">
                                Add to Cart
                            </button>
                        </div>

                        <div className="product-container">
                            <div className="product-image-container">
                                <img className="product-image"
                                    src="images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg" />
                            </div>

                            <div className="product-name limit-text-to-2-lines">
                                Adults Plain Cotton T-Shirt - 2 Pack
                            </div>

                            <div className="product-rating-container">
                                <img className="product-rating-stars"
                                    src="images/ratings/rating-45.png" />
                                <div className="product-rating-count link-primary">
                                    56
                                </div>
                            </div>

                            <div className="product-price">
                                $7.99
                            </div>

                            <div className="product-quantity-container">
                                <select>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>

                            <div className="product-spacer"></div>

                            <div className="added-to-cart">
                                <img src="images/icons/checkmark.png" />
                                Added
                            </div>

                            <button className="add-to-cart-button button-primary">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}