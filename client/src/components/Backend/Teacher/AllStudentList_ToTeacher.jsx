import React, { useEffect, useState } from "react";
import "./Teacher.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";

function AllStudentList_ToTeacher()
{
    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const [studentsdata, setstudentsdata] = useState([]);
    const navi = useNavigate();

    useEffect(() =>
    {
        localStorage.setItem("tabLink", "studentlist");
    }, []);

    useEffect(() =>
    {
        document.title = "Students-List"
    }, [])

    useEffect(() =>
    {
        fetchallStudents()
    }, [])

    async function fetchallStudents()
    {
        try
        {
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_all_Students_by_teacher`);

            if (resp.data.statuscode === 1)
            {
                setstudentsdata(resp.data.allstudents_list)
            }
            else 
            {
                toast.warn(resp.data.msg)
                setstudentsdata([]);
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

    function handleEdit(id)
    {
        navi(`/update_student_by_teacher/${id}`)
    }

    async function handleDelete(id)
    {
        try
        {
            setloading(true)
            const resp = window.confirm("Are you sure to Delete")

            if (resp === true)
            {
                const resp = await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete_student_by_teacher/${id}`)

                if (resp.data.statuscode === 1)
                {
                    toast.success(resp.data.msg)
                    fetchallStudents()
                }
                else 
                {
                    toast.error(resp.data.msg)
                }
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
        <div id="Teacher_page">

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

            <div className="teacher_container">

                <TeacherSidebar collapse={collapse} setCollapse={setCollapse} />


                <div className={`teacher_maincontent ${collapse ? "expand" : ""}`}>
                    <div className="header-row">
                        <h1 className="hd">Students List</h1>
                        <button
                            className="search-btn"
                            onClick={() => navi("/student_add_by_teacher")}
                        >
                            ➕ Added By Me
                        </button>
                        <button
                            className="search-btn"
                            onClick={() => navi("/add_student")}
                        >
                            ➕ Add Student
                        </button>
                        <button
                            className="search-btn"
                            onClick={() => navi("/search_student")}
                        >
                            🔍 Search Student
                        </button>
                    </div>
                    <div id="teacher_list" className="table-container">
                        <table className="teacher-table mt-4">
                            <thead>
                                <tr>
                                    <th>S.NO.</th>
                                    <th>Name</th>
                                    <th>ID</th>
                                    <th>Password</th>
                                    <th>Course</th>
                                    <th>Email</th>
                                    <th>Father Name</th>
                                    <th>Mother Name</th>
                                    <th>Phone No</th>
                                    <th>Phone No(2)</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {studentsdata && studentsdata.length > 0 ?
                                    studentsdata.map((item, index) =>
                                        <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.studentID}</td>
                                            <td>{item.password}</td>
                                            <td>{item.course}</td>
                                            <td>{item.email}</td>
                                            <td>{item.father}</td>
                                            <td>{item.mother}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.phone2}</td>
                                            <td>
                                                <button
                                                    className="edit-btn"
                                                    onClick={() => handleEdit(item._id)}
                                                >
                                                    ✏️
                                                </button>
                                            </td>

                                            {/* Delete Column */}
                                            <td>
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDelete(item._id)}
                                                >
                                                    🗑
                                                </button>
                                            </td>
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
            </div>
        </div>
    );
}

export default AllStudentList_ToTeacher;