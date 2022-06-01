import { Link } from "react-router-dom"

export default function HomeBoss () {

    return (
        <div>
            <Link to="/home/add">
                <button>Add User</button>
            </Link>
        </div>
    )

}