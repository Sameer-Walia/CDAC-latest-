import { useSelector } from "react-redux";
import "./Student.css";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UploadFees_ByStudent()
{

    const { course, studentID, email, name } = useSelector((state) => state.student)

    const [semester, setSemester] = useState("");
    const [loading, setloading] = useState(false);
    const [pdf, setPdf] = useState(null);
    const fileInputRef = useRef(null);

    const [feesstatus, setfeesstatus] = useState(null);
    const [statusType, setStatusType] = useState("");

    useEffect(() =>
    {
        document.title = "Fees-upload"
    }, [])

    async function submit_fees_proof()
    {
        try
        {
            setloading(true);
            if (!semester)
            {
                toast.error("Please select semester");
                return;
            }
            const formData = new FormData();
            formData.append("semester", semester);
            formData.append("studentID", studentID);
            formData.append("email", email);
            formData.append("name", name);
            formData.append("course", course);

            if (pdf != null)
            {
                formData.append("pdf", pdf)
            }

            const resp = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload_fees_by_student`, formData)

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg);
                setSemester("");
                setPdf(null);
                if (fileInputRef.current) 
                {
                    fileInputRef.current.value = '';
                }
            }
            else
            {
                toast.error(resp.data.msg);
            }

        }
        catch (e)
        {
            toast.error("Error Occured : " + (e.response?.data?.msg || e.message))
        }
        finally
        {
            setloading(false);
        }
    }

    useEffect(() =>
    {
        if (semester)
        {
            setStatusType("");
            setfeesstatus(null);
            fetch_sem_fees_detail_status()
        }
    }, [semester])

    async function fetch_sem_fees_detail_status()
    {
        try
        {
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_sem_fees_detail_status/${studentID}/${semester}`,)
            if (resp.data.statuscode === 1)
            {
                setfeesstatus(resp.data.fees_status);

                if (resp.data.fees_status.status === "Paid")
                {
                    setStatusType("paid");
                }
                else
                {
                    setStatusType("pending");
                }
            }
            else
            {
                setfeesstatus(null);
                setStatusType("notfound");
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
        <div id="student_page" className="p-4">

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

            <div className="container">
                <div className="breadcrumb">
                    <Link to="/studenthome" className="crumb">Home</Link>
                    <span className="separator">›</span>
                    <span className="crumb">Student Corner</span>
                    <span className="separator">›</span>
                    <span className="crumb active">Fees Upload</span>
                </div>
            </div>

            <div className="fees-container">

                <h1 className="hd text-center  mb-4">Upload Fees</h1>

                <div id="student_fees_upload_table" className="table-responsive mb-4">
                    <table className="custom-fee-table ">
                        <thead>
                            <tr>
                                <th colSpan="3" className="table-title">ONLINE ADMISSION FEES TRANSFER DETAILS</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr><td>NAME</td><td>DIRECTOR CDAC MOHALI</td></tr>
                            <tr><td>BANK</td><td>STATE BANK OF INDIA</td></tr>
                            <tr><td>ACCOUNT NO.</td><td>55034442545</td></tr>
                            <tr><td>IFSC Code</td><td>SBIN0050502</td></tr>
                            <tr><td>Branch</td><td>SBI Phase 7 Mohali</td></tr>
                        </tbody>
                    </table>
                </div>

                Course :-
                <p className="degree">
                    <span className="degree-title">M.Tech</span>
                    <span className="degree-separator">–</span>
                    <span className="degree-course">{course}</span>
                </p>

                <div className="filters">
                    <select onChange={(e) => setSemester(e.target.value)} required>
                        <option value="">Select Semester</option>
                        <option value="1">Semester 1</option>
                        <option value="2">Semester 2</option>
                        <option value="3">Semester 3</option>
                        <option value="4">Semester 4</option>
                    </select>

                </div>

                {
                    semester &&
                    <>
                        {
                            statusType === "paid" &&
                            <div className="status-box">
                                Status: <span className="paid">Paid</span>
                            </div>
                        }

                        {
                            (statusType === "pending" || statusType === "notfound") &&
                            <>
                                <div className="status-box">
                                    Status: <span className="pending">Pending</span>
                                </div>

                                <div className="upload-box">
                                    <label>Upload Payment Proof</label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        ref={fileInputRef}
                                        onChange={(e) =>
                                        {
                                            const file = e.target.files[0];

                                            if (!file) return;

                                            if (file.type !== "application/pdf")
                                            {
                                                toast.error("Only PDF file allowed");
                                                fileInputRef.current.value = "";
                                                return;
                                            }

                                            if (file.size > 3 * 1024 * 1024)
                                            {
                                                toast.error("File size must be less than 3MB");
                                                fileInputRef.current.value = "";
                                                return;
                                            }

                                            setPdf(file);
                                        }}
                                    />
                                    <button onClick={submit_fees_proof} disabled={!pdf} >Submit</button>
                                </div>
                            </>
                        }
                    </>
                }

            </div>
        </div>
    );
}

export default UploadFees_ByStudent;