import { useEffect, useState } from "react"
import { IUser } from "../../helpers/types"
import { getAllRequests } from "../../helpers/api";

export const Requests = () => {

    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        getAllRequests()
            .then((response) => {
                if (Array.isArray(response.payload)) {
                    const userData = response.payload.map(
                        (item: { user: IUser }) => item.user
                    );
                    setUsers(userData);
                }
            });
    }, []);


    return (
        <div className="container mt-5">
            <h1>Requests</h1>
        </div>
    );
}