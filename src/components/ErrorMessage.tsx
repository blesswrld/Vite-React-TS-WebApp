import React from "react";

interface ErrorMessageProps {
    error: string;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
    return <p className="text-red-500 text-center">{error}</p>;
}
