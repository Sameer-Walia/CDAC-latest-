import "./Footer.css";
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

function Footer()
{

  const scrollToTop = () =>
  {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div id="footer" className="pt-5 pb-3 fbc theme2">

      <div className="container">
        <div className="row">

          <div className="col-lg-3 col-md-6 col-6">
            <h4>Quick Navigation</h4>
            <ul className="list-unstyled">
              <li><Link to="/overview">About C-DAC</Link></li>
              <li><Link to="#">FAQs</Link></li>
              <li><Link to="https://cdac.in/index.aspx?id=rti" target="_blank" rel="noopener noreferrer">RTI Act</Link></li>
              <li><Link to="/privacy_policy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-6">
            <h4>Programmes</h4>
            <ul className="list-unstyled">
              <li><Link to="/mtech_vlsi">M.Tech - VLSI Design</Link></li>
              <li><Link to="/mtech_es">M.Tech - Embedded System</Link></li>
              <li><Link to="/mtech_ai">M.Tech - AI</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-6 mt-lg-0 mt-4">
            <h4>Admissions</h4>
            <ul className="list-unstyled">
              <li><Link to="/procedure">Procedure</Link></li>
              <li><Link to="/eligibility_criteria">Eligibility Criteria</Link></li>
              <li><Link to="/seat_distribution">Seat Distribution</Link></li>
              <li><Link to="/fees_structure">Fee Structure</Link></li>
              <li><Link to="/admission_helpline">Admission Helpline</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-12 mt-lg-0 mt-4">
            <h4>Contacts</h4>
            <ul className="list-unstyled">
              <li>A-34 Ind. Area, Phase 8, Mohali Punjab</li>
              <li>mtech-mohali@cdac.in</li>
              <li>acsdcofficial@gmail.com</li>
              <li>+91-172-6619078, +91-172-6619081</li>
              <li><a href="https://www.facebook.com/mtechcdacmohali" target="_blank" rel="noopener noreferrer">www.facebook.com/mtechcdacmohali</a></li>
            </ul>
          </div>

        </div>
      </div>

      <div className="bb"></div>

      <p className="text-center mt-3">
        © Copyright 2026. All Rights Reserved.
        <span className="ms-5">Designed and Developed by C-DAC, Mohali</span>
      </p>

      <button className="scroll-top" onClick={scrollToTop}>
        <FaArrowUp />
      </button>

    </div>
  );
}

export default Footer;