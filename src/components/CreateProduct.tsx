import React, { useState } from "react";
import type { IProduct } from "../models";
import axios from "axios";
import { ErrorMessage } from "./ErrorMessage";

const productData: IProduct = {
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 13.5,
    description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
        rate: 42,
        count: 10,
    },
};

interface CreateProductProps {
    onCreate: (product: IProduct) => void;
}

export function CreateProduct({ onCreate }: CreateProductProps) {
    const [value, setValue] = useState("");
    const [error, setError] = useState();

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Submitted value:", value);

        if (value.trim().length === 0) {
            setError("Please enter valid title");
            return;
        }

        setError(undefined);

        try {
            productData.title = value;
            const response = await axios.post<IProduct>(
                "https://fakestoreapi.com/products",
                productData
            );
            onCreate(response.data);

            console.log("Product created:", response.data);

            setValue("");
        } catch (e) {
            setError("Something went wrong while creating product");
            console.error(e);
        }
    };

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <form onSubmit={submitHandler}>
            <input
                type="text"
                className="border-none py-2 px-4 mb-2 w-full outline-1"
                placeholder="Enter product title..."
                value={value}
                onChange={changeHandler}
            />

            {error && <ErrorMessage error={error} />}

            <button
                type="submit"
                className="py-2 px-4 border-none bg-yellow-400 hover:text-yellow-200 transition-all"
            >
                Enter
            </button>
        </form>
    );
}
