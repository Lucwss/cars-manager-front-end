import React from "react";

import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Card from "../components/Card";


const Protected = () => {

    const { auth } = useAuth()
    const [cars, setCars] = useState([])

    const getAllCars = async () => {
        try {
            const response = await fetch(`http://0.0.0.0:8000/app/cars/`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`,
                }
            })
            const data = await response.json()
            setCars(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getAllCars()
    }, [auth.token])

    return (
        <div>
            <h2 className="text-xl text-primary text-center font-bold my-5">
                Cars Page
            </h2>

            <div className="mx-8 grid grid-cols-1 md:grid-cols-2 gap-5 p-4">
                {cars &&
                    cars.map((el) => <Card key={el._id} car={el} />)}
            </div>
        </div>
    )
}

export default Protected