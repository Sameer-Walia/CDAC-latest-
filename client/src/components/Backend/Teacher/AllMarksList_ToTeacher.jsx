import React, { useEffect, useState } from "react";
import "./Teacher.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";

function AllMarksList_ToTeacher()
{
    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const [studentsdata_marks, setstudentsdata_marks] = useState([]);
    const navi = useNavigate();

    useEffect(() =>
    {
        document.title = "ALL Marks-List"
    }, [])

    useEffect(() =>
    {
        fetchallStudents_marks()
    }, [])

    async function fetchallStudents_marks()
    {
        try
        {
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_all_Students_marks_by_teacher`);

            if (resp.data.statuscode === 1)
            {
                setstudentsdata_marks(resp.data.students_marks_list)
            }
            else 
            {
                toast.warn(resp.data.msg)
                setstudentsdata_marks([]);
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
        navi(`/update_marks_by_teacher/${id}`)
    }

    async function handleDelete(id)
    {
        try
        {
            setloading(true)
            const resp = window.confirm("Are you sure to Delete")

            if (resp === true)
            {
                const resp = await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete_marks_by_teacher/${id}`)

                if (resp.data.statuscode === 1)
                {
                    toast.success(resp.data.msg)
                    fetchallStudents_marks()
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
                        <h1 className="hd ">Marks List</h1>
                        <button
                            className="search-btn"
                            onClick={() => navi("/marks_added_by_me_teacher")}
                        >
                            ➕ Added By Me
                        </button>
                        <button
                            className="search-btn"
                            onClick={() => navi("/add_mst_1_marks_by_teacher")}
                        >
                            ➕ Add MST-1 Marks
                        </button>
                        <button
                            className="search-btn"
                            onClick={() => navi("/add_mst_2_marks_by_teacher")}
                        >
                            ➕ Add MST-2 Marks
                        </button>
                    </div>
                    <div id="teacher_list" className="table-container">
                        <table className="teacher-table mt-4">
                            <thead>
                                <tr>
                                    <th>S.NO.</th>
                                    <th>StudentID</th>
                                    <th>Type</th>
                                    <th>Course</th>
                                    <th>Semester</th>
                                    <th>Subject Code</th>
                                    <th>Total Marks</th>
                                    <th>Obtained Marks</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    studentsdata_marks && studentsdata_marks.length > 0 ?
                                        studentsdata_marks.map((item, index) =>
                                            <tr key={item._id}>
                                                <td>{index + 1}</td>
                                                <td>{item.studentID}</td>
                                                <td>{item.type}</td>
                                                <td>{item.course}</td>
                                                <td>{item.semester}</td>
                                                <td>{item.subjectCode}</td>
                                                <td>{item.totalMarks}</td>
                                                <td>{item.obtainedMarks}</td>
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

export default AllMarksList_ToTeacher;