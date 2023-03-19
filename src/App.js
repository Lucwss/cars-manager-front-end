import Header from "./components/Header";
import { useState, useEffect } from "react";

const App = () => {
    let [users, setUsers] = useState([]);
    let [page, setPage] = useState(1);

    const get = async () => {
        let response = await fetch(`https://reqres.in/api/users?page=${page}`);
        let json = await response.json();
        setUsers(json["data"]);
    };
    useEffect(() => {
        get();
    }, [page])
    

    return (
        <>
            <div className="App max-w-3x1 max-auto h-full">
                <Header />
                <button className="border border-gray-500 rounded-md p-2 m-5"
                onClick={() => {page === 1 ? setPage(2) : setPage(1)}}
                >Toggle users</button>
                <ul>
                    {users&&
                        users.map(e => {
                            return (
                                <li key={e.id} >{e.email}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    );
};

export default App;
