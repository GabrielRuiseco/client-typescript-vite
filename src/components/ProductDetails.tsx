import { useNavigate } from 'react-router-dom'
import type { Product } from "../schemas"
import { formatCurrency } from "../utils"

type ProductDetailProps = {
    product: Product
}

export default function ProductDetails({ product }: ProductDetailProps) {
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
                    {availability ? 'Available' : 'Unavailable'}
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
                            className='hover:bg-indigo-500 bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
                        >
                            Edit
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}
