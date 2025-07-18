import { useEffect, useState } from "react";
import type { IProduct } from "../models";
import axios from "axios";

export function useProducts() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    function addProduct(product: IProduct) {
        setProducts((prev) => [...prev, product]);
    }

    async function fetchProducts() {
        try {
            setLoading(true);
            const response = await axios.get<IProduct[]>(
                "https://fakestoreapi.com/products?limit=5"
            );
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            setError("Failed to fetch products");
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products,
        error,
        loading,
        addProduct,
    };
}
