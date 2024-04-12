import {api, Product} from "./api";

export const productApi = api.injectEndpoints({
    endpoints: builder => ({
        createProduct: builder.mutation({
            query: (product) => ({
                body: product,
                url: "/",
                method: 'POST'
            }),
            invalidatesTags: () => [{
                type: 'Product',
            }]
        }),
        getImageById: builder.mutation({
            query: (id) => ({
                url: `/image/${id}`,
                method: 'POST'
            }),
            invalidatesTags: () => [{
                type: 'Product',
            }]
        }),
        getProductsCart: builder.query<Product, void>({
            query: (id) => `/product?id=${id}`,
        })
    })
})

export const {useCreateProductMutation, useGetProductsCartQuery, useGetImageByIdMutation} = productApi

