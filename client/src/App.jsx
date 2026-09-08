import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header'
import Siteroutes from './components/Siteroutes'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TeacherLogin } from "../src/reduxslices/teacherSlice";
import StaffHeader from './components/Header/StaffHeader';
import StudentHeader from './components/Header/StudentHeader';
import { StudentLogin } from './reduxslices/studentSlice';

function App()
{

  const { isLoggedIn: staffLoggedIn, usertype: staffType } = useSelector((state) => state.teacher);

  const { isLoggedIn: studentLoggedIn, usertype: studentType } = useSelector((state) => state.student);

  const dispatch = useDispatch()

  useEffect(() =>
  {
    const data = sessionStorage.getItem("teacherdata");
    if (data)
    {
      dispatch(TeacherLogin(JSON.parse(data)));
    }
  }, [])

  useEffect(() =>
  {
    const studentData = sessionStorage.getItem("studentdata");
    if (studentData)
    {
      dispatch(StudentLogin(JSON.parse(studentData)));
    }
  }, []);


  return (
    <>
      {
        staffLoggedIn ? <StaffHeader /> : studentLoggedIn ?
          <StudentHeader /> : <Header />
      }

      <Siteroutes />
      <ToastContainer theme="colored" />
    </>
  )
}

export default App
