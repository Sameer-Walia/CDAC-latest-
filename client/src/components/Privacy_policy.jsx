import { Link } from 'react-router-dom'
import Footer from './Footer/Footer'
import { useEffect } from 'react';

function Privacy_policy()
{
    useEffect(() =>
    {
        document.title = "Privacy Policy";
    }, []);

    return (
        <div>
            <div id="about_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb active">Privacy Policy</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Privacy Policy</h1>

                        <p className="para">
                            ACSD, C-DAC, Mohali-website does not automatically capture any specific personal information from you, (like name, phone number or e-mail address), that allows us to identify you individually.
                        </p>

                        <p className="para">
                            If the ACSD, C-DAC, Mohali-website requests you to provide personal information, you will be informed for the particular purposes for which the information is gathered and adequate security measures will be taken to protect your personal information.
                        </p>
                        <p className="para">
                            We do not sell or share any personally identifiable information volunteered on the ACSD, C-DAC, Mohali-website to any third party (public/private). Any information provided to this website will be protected from loss, misuse, unauthorized access or disclosure, alteration, or destruction.
                        </p>
                        <p className="para">
                            We gather certain information about the user, such as Internet protocol (IP) addresses, domain name, browser type, operating system, the date and time of the visit and the pages visited. We make no attempt to link these addresses with the identity of individuals visiting our site unless an attempt to damage the site has been detected.
                        </p>

                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Privacy_policy
