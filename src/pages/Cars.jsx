import Layout from '../components/Layout'
import Card from '../components/Card'
import React from 'react'
import Loading from '../components/Loading'
import { useState, useEffect } from 'react'

const Cars = () => {
    const [cars, setCars] = useState([])
    const [brand, setBrand] = useState('')
    const [isPending, setIsPending] = useState(true)
    const [page, setPage] = useState(1)

    const handleChangeBrand = (event) => {
        setCars([])
        setBrand(event.target.value)
        setIsPending(true)
    }

    const handleChangePage = (event) => {
        setCars([])
        setPage(event.target.value)
        setIsPending(true)
    }

    const getCarsByBrand = async (brand, page) => {
        try {
            let response = await fetch(`http://0.0.0.0:8000/app/cars/?brand=${brand}&min_price=0&max_price=100000&page=${page}`)
            let data = await response.json()
            setCars(data)
            setIsPending(false)
        }
        catch (err) {
            console.log(err)
        } finally {
            setIsPending(false)
        }
    }

    useEffect(() => {
        getCarsByBrand(brand, page)
    }, [brand, page])

    return (
        <Layout>
            <h2 className='font-bold font-mono text-lg text-center my-4'>Cars - {brand ? brand : "all brands"}</h2>
            <div className='mx-8'>
                <label htmlFor="cars">Choose a brand: </label>
                <select name="cars" id="cars" onChange={handleChangeBrand}>
                    <option value="">All Cars</option>
                    <option value="Fiat">Fiat</option>
                    <option value="Citroen">Citroen</option>
                    <option value="Renault">Renault</option>
                    <option value="Opel">Opel</option>
                </select>
                <label htmlFor="cars">Choose a page: </label>
                <select name="page" id="page" onChange={handleChangePage}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div className='mx-8'>
                {isPending && <Loading brand={brand} />}
                <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
                    {cars && cars.map(el => <Card car={el} key={el._id} />)}
                </div>
            </div>
        </Layout>
    )
}

export default Cars