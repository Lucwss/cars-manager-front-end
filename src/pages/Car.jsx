import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import FormInput from '../components/FormInput'

const Car = () => {

    let { id } = useParams()
    const navigate = useNavigate()

    const [car, setCar] = useState(null)
    const [price, setPrice] = useState(null)
    const [error, setError] = useState([])
    const [isPending, setIsPending] = useState(true)

    const onChange = (event) => {
        setPrice(event.target.value)
    }

    const getCarById = async () => {
        try {
            const response = await fetch(`http://0.0.0.0:8000/app/cars/${id}`)
            if (!response.ok) {
                setError("Error fetching car")
            }
            else {
                const data = await response.json()
                setCar(data)
                setPrice(data.price)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setIsPending(false)
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://0.0.0.0:8000/app/cars/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                const data = await response.json()
                let errArray = data.detail.map(el => `${el.loc[1]} - ${el.msg}`)
                setError(errArray)
            } else {
                setError([])
                navigate("/cars")
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsPending(false)
        }

    }

    const updatePrice = async () => {
        try {
            console.log("What", `http://0.0.0.0:8000/app/cars/${id}`)
            const response = await fetch(`http://0.0.0.0:8000/app/cars/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ price })
            })
            const data = await response.json()
            if (!response.ok) {
                let errArray = data.detail.map(el => `${el.loc[1]} - ${el.msg}`)
                setError(errArray)
            } else {
                setError([])
                getCarById(id)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsPending(false)
        }
    }

    useEffect(() => {
        getCarById()
    }, [id])

    return (
        <Layout>
            {isPending && <div className='bg-red-500 w-full text-white h-10 text-lg'><h2>Loading Car...</h2></div>}
            {error && error.map((el, index) => (<li key={index} className='my-2 p-1 border-2 border-red-700 max-w-md mx-auto'>{el}</li>))}
            {car && <div>
                <div className='flex flex-col justify-between min-h-full items-center'>
                    <div className='font-bold text-xl text-gray-600 my-3'>
                        {car.brand} {car.make}
                    </div>
                    <div className='max-w-xl'>
                        <img src="https://hips.hearstapps.com/hmg-prod/images/2023-mclaren-artura-101-1655218102.jpg?crop=1.00xw:0.847xh;0,0.153xh&resize=1200:*" alt="A car!" />
                    </div>
                    <div className='flex flex-col items-center font-normal text-lg'>
                        <div>Price: <span className='font-semibold text-orange-600 text-xl'>{car.price}</span></div>
                        <div>Year: {car.year}</div>
                        <div>Km: {car.km}</div>
                    </div>
                    <div className='flex flex-row'>
                        <FormInput label='change price' placeholder={price} type="number" value={price} onChange={onChange} required />
                        <button
                            onClick={updatePrice}
                            className='bg-yellow-500 text-white p-2 rounded-md m-3 transition-opacity hover:opacity-80'
                        >
                            Edit price
                        </button>
                        <button
                            onClick={handleDelete}
                            className='bg-red-700 text-white p-2 rounded-md m-3 transition-opacity hover:opacity-80'
                        >
                            Delete Car
                        </button>
                    </div>
                    <p>Warning: deleting is permanent!</p>
                </div>
            </div>}
        </Layout>
    )
}

export default Car