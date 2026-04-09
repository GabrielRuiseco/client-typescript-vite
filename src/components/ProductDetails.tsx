import { useNavigate, Form, type ActionFunctionArgs, redirect, useFetcher } from 'react-router-dom'
import type { Product } from "../schemas"
import { formatCurrency } from "../utils"
import { deleteProduct } from '../services/ProductService'

type ProductDetailProps = {
    product: Product
}

export async function action({ params }: ActionFunctionArgs) {
    const { id } = params
    if (id !== undefined) {
        await deleteProduct(+id)
        return redirect('/')
    }
}

export default function ProductDetails({ product }: ProductDetailProps) {

    const fetcher = useFetcher()
    const { name, price, availability } = product
    const navigate = useNavigate()

    return (
        <>
            <tr className="border-b ">
                <td className="p-3 text-center text-lg text-gray-800">
                    {name}
                </td>
                <td className="p-3  text-center text-lg text-gray-800">
                    {formatCurrency(price)}
                </td>
                <td className="p-3 text-center text-lg text-gray-800">
                    <fetcher.Form action="" method='POST'>
                        <button
                            type='submit'
                            name='product'
                            value={JSON.stringify(product)}
                            className={`${availability ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full hover:cursor-pointer`}
                        >
                            {availability ? 'Available' : 'Unavailable'}
                        </button>
                    </fetcher.Form>
                </td>
                <td className="p-3 text-lg text-gray-800 ">
                    <div className="flex gap-2 items-center">
                        <button
                            onClick={() => navigate(`/products/${product.id}/edit`
                                /* create the state using the onClick
                                , {
                                state: {
                                    product
                                }
                            }*/
                            )}
                            className='hover:bg-indigo-500 bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:cursor-pointer'
                        >
                            Edit
                        </button>
                        <Form className='w-full'
                            method='POST'
                            action={`products/${product.id}/delete`}
                            onSubmit={(e) => {
                                if (!confirm('Confirm the Delete')) {
                                    e.preventDefault()
                                }
                            }}
                        >
                            <input
                                type="submit"
                                value="Delete"
                                className='hover:bg-red-500 bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:cursor-pointer' />
                        </Form>
                    </div>
                </td>
            </tr >
        </>
    )
}
