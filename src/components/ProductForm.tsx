import type { Product } from "../schemas"

type ProductFormProps = {
    product?: Product
}

export default function ProductForm({ product }: ProductFormProps) {
    return (
        <>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="name"
                >
                    Product name:
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Product name"
                    defaultValue={product?.name}
                />
            </div>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="price">
                    Price
                </label>
                <input
                    id="price"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Price product"
                    name="price"
                    defaultValue={product?.price}
                />
            </div>
        </>
    )
}
