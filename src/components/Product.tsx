import React, { useState } from "react";
import type { IProduct } from "../models";

interface ProductProps {
    product: IProduct;
}

export function Product({ product }: ProductProps) {
    const [details, setDetails] = useState(false);

    const btnBgClassName = details ? "bg-yellow-400" : "bg-blue-400";
    const btnClasses = ["mt-3 mb-3 py-2 px-4 border-none", btnBgClassName];

    return (
        <div className="border py-2 px-4 rounded flex flex-col items-center mb-2">
            <img src={product.image} className="w-1/6" alt={product.title} />
            <p>{product.title}</p>
            <span className="font-bold">{product.price || product.title}</span>

            <button
                className={btnClasses.join(" ")}
                onClick={() => setDetails((prev) => !prev)}
            >
                {details ? "Hide Details" : "Show Details"}
            </button>

            {/* <button
                className="mt-3 mb-3 py-2 px-4 border-none bg-blue-400"
                onClick={() => setDetails(false)}
            >
                Hide Details
            </button> */}
            {details && (
                <div>
                    <p>{product.description}</p>
                    <p>
                        Rate:{" "}
                        <span style={{ fontWeight: "bold" }}>
                            {product.rating?.rate}
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
}
