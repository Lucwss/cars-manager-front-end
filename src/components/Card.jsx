import {Link} from "react-router-dom"

const Card = ({ car }) => {
    let { brand, price, make, year, km, cm3, _id } = car
    return (
        <div className="shadow-md p-5 flex flex-col">
            <div className="font-extrabold text-center border-b-2">{brand} {model}</div>
            <div>Year: {year}</div>
            <div>Price: 
                <span className="font-semibold text-orange-600">{price}</span>
            </div>
            <div>Color: {color}</div>
        </div>
    )
}

export default Card