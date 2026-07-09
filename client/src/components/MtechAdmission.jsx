import React from 'react'
import Footer from './Footer/Footer';

function MtechAdmission()
{
    return (
        <div>
            <div className="container" style={{ padding: "20px" }}>
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSeBe1ztZnCJo_Ut6JU9uQHqf2jXMahU63Zznu__PCj_R80z1g/viewform?embedded=true"
                    width="100%"
                    height="1800"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                    title="MTech Admission Form"
                >
                    Loading…
                </iframe>
            </div>
            <Footer />
        </div>
    );

}

export default MtechAdmission
