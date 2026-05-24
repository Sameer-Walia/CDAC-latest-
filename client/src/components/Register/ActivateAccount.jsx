import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function ActivateAccount()
{

    const [loading, setloading] = useState(false);
    const [msg, setmsg] = useState()
    const [params] = useSearchParams();
    const code = params.get("code")
    const navigate = useNavigate()

    useEffect(() => 
    {
        if (code)
        {
            activateuseraccount();
        }
    }, [code])

    async function activateuseraccount() 
    {
        try 
        {
            if (!code.trim())
            {
                return toast.error("Error Occured")
            }
            setloading(true)
            const apidata = { code }
            const resp = await axios.put(`${import.meta.env.VITE_API_URL}/api/activateuseraccount`, apidata)

            if (resp.data.statuscode === 1) 
            {
                toast.success(resp.data.msg);
                navigate("/staff_login")
            }
            else 
            {
                setmsg("Error while activating Account. May be u have already activated. U can directly Login now")
            }

        }
        catch (e) 
        {
            toast.error("Error Occured : " + (e.response?.data?.msg || e.message))
        }
        finally
        {
            setloading(false)
        }
    }

    return (
        <>
            {loading && (
                <div className="overlay">
                    <div>
                        <div className="spinner"></div>
                        <p style={{ color: "white", marginTop: "10px" }}>
                            Please wait...
                        </p>
                    </div>
                </div>
            )}
            <div id="authpage">
                <div className="thanks-page">
                    <div className="thanks-container">
                        <div className="thanks-content">
                            <h2 className="thanks-heading">
                                {msg}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ActivateAccount;