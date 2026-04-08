import { Product } from "./product";
export function ProductsGrid({ products, loadCart }) {

    return (
        <div className="products-grid">
            <div className="product-container">
                {products.map((product) => {
                    return (
                        <Product key={product.id} product={product} loadCart={loadCart} />

                    );
                })}

            </div>
        </div>


    )
}