import { Link, Form, useActionData, type ActionFunctionArgs, redirect } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addProduct } from "../services/ProductService"

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    let error = ''
    if (Object.values(data).includes('')) {
        error = 'All values are required'
        console.log('desde el if')
        return error
    }
    console.log('fuera del if')
    await addProduct(data)
    return redirect('/')
}

export default function NewProduct() {

    const error = useActionData() as string

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">
                    Register new product
                </h2>
                <Link
                    to={"/"}
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                >
                    Back to products
                </Link>
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form
                className="mt-10"
                method="POST"
                action=""
            >
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
                    />
                </div>
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Register Product"
                />
            </Form>
        </>
    )
}
