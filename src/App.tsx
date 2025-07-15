import React, { useEffect, useState } from "react";
import "./App.css";
import { Product } from "./components/Product";
import type { IProduct } from "./models";
import axios from "axios";

function App() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchProducts() {
        try {
            setLoading(true);
            const response = await axios.get<IProduct[]>(
                "https://fakestoreapi.com/products?limit=5"
            );
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch products");
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto max-w-2xl pt-5">
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!loading && !error && products.length === 0 && (
                <p>No products found</p>
            )}
            {!loading &&
                !error &&
                products.length > 0 &&
                products.map((product) => (
                    <Product product={product} key={product.id} />
                ))}
        </div>
    );
}

export default App;
