import { Link } from "react-router-dom"
import Footer from "../Footer/Footer";
import "./Research.css"

function StudentProjects()
{
    return (
        <div>
            <div id="Research_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">Research & Consultancy</span>
                        <span className="separator">›</span>
                        <span className="crumb active">Student Projects</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Student Projects</h1>

                        <h4>Smart LPG Meter cum Leakage Controller with Home safety</h4>

                        <p className="para">M.Tech students of ACSD has designed and developed an Smart LPG Meter cum Leakage Controller with Home safety.The product has won the first prize in INNOTECH-2016 organized by Pushpa Gujral Science City in collaboration with PTU on 18-20 March, 2016. Development of an intelligent Digital system provides information to user about the amount of gas left in cylinder. This system give auto alert to user before the gas of cylinder is completely consumed, so it can be booked for refilling. System will also provide the leakage detection. If found immediately cutoff the Main power Supply of the house and turns off the regulator switch. The temperature Sensor will help user to maintain the temperature and fire safety around the cylinder. The proposed system will be in the form of movable mechanical assembly which contains the structure to hold the cylinder and there will be an auto regulator knob mechanism assembly to turn off the knob at the time of emergency. The circuitry is being placed inside the assembly with a LCD fitted on the top of the assembly for user interface.</p>

                        <img src="/assets/images/r4.png" className="img-fluid custom-img "></img>

                        <h4 className="pt-5">INTELLIGENT SHOPPING CART SYSTEM</h4>

                        <p className="para">M.Tech students of ACSD has designed and developed an intelligent shopping cart. The same product has won the first prize in INNOTECH-2015 organized by Pushpa Gujral Science City in collaboration with PTU on 18-20 March, 2015. The objective of this project is to improve the speed of purchase by using RFID. This project is used in shopping complex for purchase the products. The proposed system intends to assist shopping in person that will minimize the time spent in shopping as well as intended to aid the store management with real-time updates on the inventory.</p>

                        <img src="/assets/images/r5.png" className="img-fluid custom-img dimension"></img>

                        <p className="para">The aim is to develop an intelligent shopping cart system that provides a technology oriented, low-cost, easily scalable, and rugged system for assisting shopping in person. The cart’s inbuilt automatic billing system makes shopping a breeze and has other positive spin-offs such as freeing staff from repetitive checkout scanning, reducing total number of staffs and increasing operational efficiency of the system. The emergence of new technologies, such as Radio Frequency Identification (RFID) and wireless networks, makes the shopping processes faster, transparent and efficient.</p>

                        <h2 className="pt-5">Selected Student Projects : (2011 - 2013)</h2>
                        <h4 className="pt-5">DESIGN & DEVELOPMENT OF E- BABY CRADLE</h4>

                        <p className="para">E- Baby Cradle that is designed to help parents and nurses in infants care. This will help the women to take care of the baby effectively and without effort and managing the other things at home. E-Baby Cradle will swings automatically when baby cries, for this it has a cry analyzing system which detects the baby cry voice and accordingly the cradle swings till the baby stops crying. The speed of the cradle can be controlled as per the user need. The system has inbuilt alarm that indicates two conditions – first when the mattress is wet, which is an important parameter to keep the baby in hygienic condition, second when baby does not stop crying with in a stipulated time, which intimated that baby needs attention. This system helps parents and nurses to take care of babies without physical attention. The developed system is build around PIC16F73 microcontroller having various units like signal conditioning, driver circuit, motor, alarm. MIC is used to input the baby cry voice. Then through signal conditioning unit, voice signal is passed to microcontroller. Based on input signal microcontroller drives the driver circuit which drives the motor and cradle swings.16 X 1 LCD is used to display baby cry sound level and inputted pre-set value. Two switches are provided to set the pre-set value. Two switches are provided to reset the system. When baby cries and the sound level is greater than pre-set value system starts automatically.</p>

                        <img src="/assets/images/r6.png" className="img-fluid custom-img "></img>

                        <h4 className="pt-5">DESIGN AND DEVELOPMENT OF SMART ROBOT CAR FOR BORDER SECURITY</h4>

                        <p className="para">The multipurpose smart robot car using wireless camera detecting alive humans, fire, harmful gases, metals, obstacles at remote areas and send information to main location. Normally, a danger event occurs due to the negligence of humans. There is a need of machine that functions in spite of a living person at border areas. For this, Sensory network is used in our proposed system to detect parameters like human presence, harmful gases, pistols, bombs, mines, fire etc., at remote areas. The system uses machine intelligence to provide immediate response from sensors. The main features of this robot differentiating it from others are execution of versatile tasks in night and rough areas. It is used as a surveillance and inspection robot at border areas. This whole robot system works in two modes. Mode one is automatic mode and the other is user controllable mode. By default, robot works in automatic mode in which all sensors are functional for automatic action. Sometimes robot can stuck in bad or rough areas then user can control it manually in user controllable mode. User sends the signal toward robot car using RF module to control it manually. User could watch the robot through wireless camera built in the robot car and gives directions to change the path accordingly.</p>

                        <h4 className="pt-5">DEVELOPMENT OF PIC MICROCONTROLLER BASED AUTOMATED NUTRIENTS COMPOSITION CONTROL FERTIGATION SYSTEM</h4>

                        <p className="para">The Developed prototype for fertigation comprises of two sensors to measure pH, EC of the fertilizer solution. The signals from the sensors are conditioned with the help of signal conditioning cards and interfaced to PIC microcontroller through inbuilt ADC. Three fertilizer tanks are used in this system two out of them contains the fertilizer solutions of nitrogen, phosphorous and potassium and one contain acid i.e. nitric acid, sulphuric acid etc to manage the pH and EC of fertigation solution. Fertilizers are used to modify pH and EC of solution. Ammonium forming fertilizers decrease the pH level and make the solution acidic while nitrate forming fertilizers contains basic ions and are less acid hence increase pH level and make the solution alkaline. The mixing tank is main container where fertilizer solutions are poured from fertilizer tanks with the help of solenoid flow valves. These valves are operated by relays and are turned on and off to deliver nutrients into the mixing tank. The valves are controlled according to the pH and EC signals from fertilizer solution in mixing tank. The LCD is used to display the computed results of nutrient solutions and keypad is used for manually entering the parameters (EC and pH) required for crop. In this automated fertigation system the farmer can also select the crop from the crop table where the crops parameters are prementioned in the programming of the system. The sensors will detect the pH and EC values in continuous manner and the solenoid flow valves will open and close the selected nutrient tank to pour the solution into the mixing tank according to the readings from the sensors. This process will be repeated until the desired values achieved. When the desired parameters achieved the system will stop with the indication of buzzer.</p>

                    </div>


                    <div className="sidebar">
                        <h3 className="sidebar-title">Research & Consultancy</h3>
                        <ul>
                            <li><Link to="/overview">Publications</Link></li>
                            <li><Link to="/sponsored_projects">Sponsored Projects</Link> </li>
                            <li className="active"><Link to="/student_projects">Student Projects</Link> </li>
                        </ul>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default StudentProjects
