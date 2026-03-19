import './ordersPage.css';
import './header.css';
import { Header } from '../components/Header';

export function OrdersPage() {
    return (
        <>
            {/* ✅ Use reusable header */}
            <Header />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <div className="orders-grid">

                    {/* ORDER 1 */}
                    <div className="order-container">

                        <div className="order-header">
                            <div className="order-header-left-section">
                                <div className="order-date">
                                    <div className="order-header-label">Order Placed:</div>
                                    <div>August 12</div>
                                </div>
                                <div className="order-total">
                                    <div className="order-header-label">Total:</div>
                                    <div>$35.06</div>
                                </div>
                            </div>

                            <div className="order-header-right-section">
                                <div className="order-header-label">Order ID:</div>
                                <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
                            </div>
                        </div>

                        <div className="order-details-grid">
                            <div className="product-image-container">
                                <img src="/images/products/athletic-cotton-socks-6-pairs.jpg" />
                            </div>

                            <div className="product-details">
                                <div className="product-name">
                                    Black and Gray Athletic Cotton Socks - 6 Pairs
                                </div>
                                <div className="product-delivery-date">
                                    Arriving on: August 15
                                </div>
                                <div className="product-quantity">
                                    Quantity: 1
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
                        </div>
                    </div>

                    {/* ORDER 2 (same structure) */}

                </div>
            </div>
        </>
    );
}