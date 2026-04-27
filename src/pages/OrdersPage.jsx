import axios from 'axios';
import { useEffect, useState, Fragment } from 'react';
import dayjs from 'dayjs';
import { formatMoney } from '../utils/money';
import './OrdersPage.css';
import './header.css';
import { Header } from '../components/Header';

export function OrdersPage({ cart }) {
    const [orders, setOrders] = useState([]);

    const loadOrders = () => {
        return axios.get('/api/orders?expand=products')
            .then((response) => {
                // Only show orders from the last 30 days
                const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
                const recentOrders = response.data.filter(order => order.orderTimeMs >= thirtyDaysAgo);
                setOrders(recentOrders);
            })
    }

    useEffect(() => {
        loadOrders().catch(() => {
            // Handled by global interceptor.
        })

    }, [])

    useEffect(() => {
        const onRetry = (event) => {
            if (event?.detail?.path === '/orders') {
                loadOrders().catch(() => {
                    // Handled by global interceptor.
                })
            }
        }

        window.addEventListener('nmart-api-retry', onRetry)
        return () => {
            window.removeEventListener('nmart-api-retry', onRetry)
        }
    }, [])
    return (
        <>
            {/* ✅ Use reusable header */}
            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">
                    <a href="/" style={{ textDecoration: 'none' }}>
                        <span className="logo">Nmart</span>
                    </a>
                </div>

                <div className="orders-grid">

                    {/* ORDER 1 */}
                    {orders.map((order) => {
                        return (
                            <div key={order.id} className="order-container">

                                <div className="order-header">
                                    <div className="order-header-left-section">
                                        <div className="order-date">
                                            <div className="order-header-label">Order Placed:</div>
                                            <div>{dayjs(order.orderTimeMs).format('MMMM D, YYYY')}</div>
                                        </div>
                                        <div className="order-total">
                                            <div className="order-header-label">Total:</div>
                                            <div>{formatMoney(order.totalCostCents)}</div>
                                        </div>
                                    </div>

                                    <div className="order-header-right-section">
                                        <div className="order-header-label">Order ID:</div>
                                        <div>{order.id}</div>
                                    </div>
                                </div>

                                <div className="order-details-grid">
                                    {order.products.map((orderProduct) => {
                                        return (
                                            <Fragment key={orderProduct.product.id}>
                                                <div className="product-image-container">
                                                    <img src={orderProduct.product.image} />
                                                </div>

                                                <div className="product-details">
                                                    <div className="product-name">
                                                        {orderProduct.product.name}
                                                    </div>
                                                    <div className="product-delivery-date">
                                                        Arriving on:{dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D, YYYY')}
                                                    </div>
                                                    <div className="product-quantity">
                                                        Quantity:{orderProduct.quantity}
                                                    </div>

                                                    <button className="buy-again-button button-primary">
                                                        <img className="buy-again-icon" src="/images/icons/buy-again.png" />
                                                        <span>Add to Cart</span>
                                                    </button>
                                                </div>

                                                <div className="product-actions">
                                                    <button className="track-package-button button-secondary">
                                                        Track package
                                                    </button>
                                                </div>
                                            </Fragment>

                                        )
                                    }
                                    )}

                                </div>
                            </div>


                        )

                    })}

                    {/* ORDER 2 (same structure) */}

                </div>
            </div>
        </>
    );
}