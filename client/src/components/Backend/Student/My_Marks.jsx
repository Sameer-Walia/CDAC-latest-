import { Link } from "react-router-dom";
import Footer from "../../Footer/Footer";
import "./Student.css";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useState } from "react";

import
{
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend
} from "recharts";

function My_Marks()
{

    const { studentID } = useSelector((state) => state.student)
    const [loading, setloading] = useState(false);
    const [my_marks, setmy_marks] = useState([]);

    const [semester, setSemester] = useState("");

    useEffect(() =>
    {
        document.title = "Marks-List"
    }, [])

    useEffect(() =>
    {
        if (studentID)
        {
            fetch_my_marks()
        }
    }, [studentID])

    async function fetch_my_marks()
    {
        try
        {
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_my_marks_by_student/${studentID}`);

            if (resp.data.statuscode === 1)
            {
                setmy_marks(resp.data.my_marks_list)
            }
            else 
            {
                toast.warn(resp.data.msg)
                setmy_marks([]);
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


    const colors = ["#8884d8", "#82ca9d"];

    const filteredData = my_marks.filter(
        (item) => String(item.semester) === String(semester)
    );

    const order = ["MST-1", "MST-2"];
    const types = order.filter((t) =>
        filteredData.some(item => item.type === t)
    );

    const groupedData = Object.values(
        filteredData.reduce((acc, curr) =>
        {
            if (!acc[curr.subjectCode])
            {
                acc[curr.subjectCode] = {
                    subjectCode: curr.subjectCode,
                    "MST-1": 0,
                    "MST-2": 0,
                };
            }

            if (curr.type === "MST-1" || curr.type === "MST-2")
            {
                acc[curr.subjectCode][curr.type] = Number(curr.obtainedMarks);
            }

            return acc;
        }, {})
    );


    return (
        <div>
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
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">About Us</span>
                        <span className="separator">›</span>
                        <span className="crumb active">Marks List</span>
                    </div>
                </div>

                <div className="container  py-3">
                    <h1 className="title hd">Marks List</h1>
                    <div id="student_marks_table" className="table-responsive mt-4">
                        <table className="table custom-table text-center align-middle">
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Student Id</th>
                                    <th>Type</th>
                                    <th>Course</th>
                                    <th>Semester</th>
                                    <th>Subject-Code</th>
                                    <th>Total Marks</th>
                                    <th>Obtained Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    my_marks && my_marks.length > 0 ?
                                        my_marks.map((item, index) =>
                                            <tr key={item._id}>
                                                <td>{index + 1}</td>
                                                <td>{item.studentID}</td>
                                                <td>{item.type}</td>
                                                <td>{item.course}</td>
                                                <td>{item.semester}</td>
                                                <td>{item.subjectCode}</td>
                                                <td>{item.totalMarks}</td>
                                                <td>{item.obtainedMarks}</td>
                                            </tr>
                                        )
                                        :
                                        <tr>
                                            <td colSpan="12" style={{ textAlign: "center" }}>
                                                No Data Found
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>

                </div>

                <div style={{ textAlign: "center", marginTop: "30px" }}>

                    <h2 style={{ marginBottom: "5px", color: "#333" }}>
                        📊 Marks Visualization
                    </h2>

                    <p style={{ color: "#777", fontSize: "14px", marginBottom: "15px" }}>
                        Select semester to view performance
                    </p>

                    <select
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        style={{
                            padding: "10px 15px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontSize: "16px",
                            cursor: "pointer",
                            outline: "none",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                        }}
                    >
                        <option value="">Select Semester</option>
                        <option value="1">Sem 1</option>
                        <option value="2">Sem 2</option>
                        <option value="3">Sem 3</option>
                    </select>

                </div>

                {
                    semester && groupedData.length > 0 && (
                        <div
                            style={{
                                width: "100%",
                                height: 350,
                                marginTop: "30px",
                                background: "#fff",
                                borderRadius: "12px",
                                padding: "20px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                            }}
                        >
                            <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
                                Semester {semester} Performance
                            </h3>

                            <ResponsiveContainer>
                                <BarChart
                                    data={groupedData}
                                    barCategoryGap="30%"
                                    barGap={0}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="subjectCode" />
                                    <YAxis domain={[0, 24]} />
                                    <Tooltip />
                                    <Legend />

                                    {types.map((t, index) => (
                                        <Bar
                                            key={t + "-" + semester}
                                            dataKey={t}
                                            fill={colors[index % colors.length]}
                                            radius={[5, 5, 0, 0]}
                                            label={{ position: "top" }}
                                        />
                                    ))}
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )
                }

                {
                    semester && groupedData.length === 0 && (
                        <p style={{ marginTop: "20px", textAlign: "center" }}>
                            No data for selected semester
                        </p>
                    )
                }


            </div>
            <div className="mt-5">
                <Footer />
            </div>
        </div>
    )
}

export default My_Marks

