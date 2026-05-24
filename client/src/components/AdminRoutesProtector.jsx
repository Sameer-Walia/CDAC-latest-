import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminRoutesProtector(props)
{
    const navigate = useNavigate()

    useEffect(() =>
    {
        const data = sessionStorage.getItem("teacherdata")
        if (!data)
        {
            toast.error("Please login to access the page");
            navigate("/staff_login");
        }
        else
        {
            const teacher = JSON.parse(data)
            if (teacher.usertype !== "admin")
            {
                toast.error("Please login to access the Admin Page");
                navigate("/staff_login");
            }
        }
    }, [])

    return (
        <div>
            <props.compname />
        </div>
    )
}

export default AdminRoutesProtector
