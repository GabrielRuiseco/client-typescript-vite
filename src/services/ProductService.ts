import { safeParse, pipe, number, transform, parse, unknown } from "valibot"
import { DraftProductSchema, ProductsSchema, ProductSchema, type Product } from "../schemas"
import axios from "axios";
import { toBoolean } from "../utils";

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data: ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/product`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Datos no validos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/product`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('There was an error')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/product/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('There was an error')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data: ProductData, id: Product['id']) {
    const NumberSchema = pipe(
        unknown(),
        transform((input) => Number(input)),
        number()
    )
    try {
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/product/${id}`
            await axios.put(url, result.output)
        }
    } catch (error) {
        console.log(error)
    }

}

export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/product/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export async function updateProductAvailability(data: ProductData) {
    const { id, name, price, availability } = JSON.parse(data.product.toString())

    const NumberSchema = pipe(
        unknown(),
        transform((input) => Number(input)),
        number()
    )
    try {
        const result = safeParse(ProductSchema, {
            id: id,
            name: name,
            price: parse(NumberSchema, price),
            availability: toBoolean(availability.toString())
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/product/${id}`
            const data = {
                availability: !result.output.availability
            }
            await axios.patch(url, data)
        }
    } catch (error) {
        console.log(error)
    }

}