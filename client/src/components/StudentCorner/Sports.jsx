import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import "./StudentCorner.css"
import { useEffect } from 'react';

function Sports()
{
    useEffect(() =>
    {
        document.title = "Sports";
    }, []);

    return (
        <div>
            <div id="studentcorner_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">Student Corner</span>
                        <span className="separator">›</span>
                        <span className="crumb active">Sports</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Sports</h1>
                        <h4>Inter Student Sports Meet (ISSM-2016) & Cultural Night</h4>
                        <p className='para'>Sports meet is an important event in the life of every school or college. Sports in themselves are an indispensable part of the study. C-DAC Mohali has organized its annual sports meet for M.Tech Students (ISSM-2016) on 10th and 11th March, 2016. In the Sports meet number of entertaining activities were conducted, it began with Marathon race of 3 Km headed by Director and HOD (C-DAC Mohali), Faculty members and all the students actively participated. Sport events were held in the spacious C-DAC grounds, the whole playground had been decorated with flags and banners. The chief guest was the Hon'ble Director of C-DAC Mohali and he inaugurated the program. The sportsmen and women volunteers participated in the march past. The sports events were organized as:-</p>
                        <ul>
                            <li>Cricket Match</li>
                            <li>Badminton Match: Doubles and Mix Doubles</li>
                            <li>Foot Ball</li>
                            <li>Volley Ball</li>
                            <li>Athletics</li>
                            <ul>
                                <li>100 Meter Race</li>
                                <li>200 Meter Race</li>
                            </ul>
                            <li>Kho - Kho</li>
                            <li>Tug of War</li>
                            <li>Fun Games (lemon on Spoon Race, 3 Leg Race)</li>
                        </ul>
                        <p className='para'>The events which evoked the greatest interest were the Cricket match, Badminton match and volley ball match. After much competition, sports meet finally came to ground conclusion with closing ceremony. The sports meet closed with brief closing speech by Chief Guest and praised all participants for bringing “Sporting talent, Sportsmanship and Team work”. After the speech, the sports meet ended with the National Anthem. ACSD has also celebrated Cultural Night on 8th April, 2016, Celebration began with brief opening speech by Director. Various cultural programs were actively performed by students.</p>

                        <h4>Inter Student Sports Meet (ISSM-2015) & Cultural Night</h4>
                        <p className='para'>C-DAC Mohali has organized its annual sports meet for M.Tech Students (ISSM-15) and Cultural Night from 12th to 14th March, 2015. In the Sports meet number of entertaining activities were conducted, it began with Marathon race of 3Km headed by Director, C-DAC Mohali and HOD, Faculty members and all the students actively participated. Sports events were held in the spacious C-DAC grounds, the whole playground had been decorated with flags and banners. The chief guest Director, C-DAC Mohali inaugurated the program and the sportsmen and women volunteers participated in the March past. The sports events were organized as:-</p>

                        <ul>
                            <li>Boys Cricket Match</li>
                            <li>Badminton Match: Doubles and Mix Doubles</li>
                            <li>Foot Ball</li>
                            <li>Athletics</li>
                            <ul>
                                <li>100 Meter Race</li>
                                <li>200 Meter Race</li>
                            </ul>
                            <li>Table Tennis</li>
                            <li>Kho - Kho</li>
                            <li>Tug of War</li>
                            <li>Fun Games (lemon on Spoon Race, 3 Leg Race)</li>
                        </ul>

                        <p className='para'>The events which evoked the greatest interest were the Cricket match, Badminton match and Tug of war. After much competition, sports meet finally came to ground conclusion with closing ceremony. The sports meet closed with brief closing speech by Chief Guest and praised all participants for bringing “Sporting talent, Sportsmanship and Team work”. After the speech, the sports meet ended with the National Anthem. ACSD has also celebrated Cultural Night on 14th March, 2015, Celebration began with brief opening speech by Director. Various Cultural programs were actively performed by students</p>

                        <h4>Inter Student Sports Meet (ISSM-2014)</h4>
                        <p className='para'>Sports day is an important event in the life of every school or college. Sports in themselves are an indispensable part of the study. C-DAC mohali has organized its annual sports meet on 11th April, 2014. In the Sports meet number of entertaining activities were conducted, it began with Marathon race of 3Km headed by Director, C-DAC Mohali and HOD, Faculty members and all the students actively participated.</p>

                        <p className='par'>Sports events were held in the spacious C-DAC grounds,the whole playground had been decorated with flags and banners. The chief guest Director, C-DAC Mohali inaugurated the program and the sportsmen and women volunteers participated in the March past. The sports events were organized as:-</p>

                        <ul>
                            <li>Boys Cricket Match</li>
                            <li>Badminton Match: Doubles and Mix Doubles</li>
                            <li>100 Meter Race</li>
                            <li>200 Meter Race</li>
                            <li>Table Tennis</li>
                            <li>Tug of War</li>
                        </ul>

                        <p className='para'>
                            The events which evoked the greatest interest were the Cricket match, Badminton match and Tug of war. After much competition, sports meet finally came to ground conclusion with closing ceremony. The sports meet closed with brief closing speech by Chief Guest and praised all participants for bringing “Sporting talent, Sportsmanship and Team work”. After the speech, the sports meet ended with the National Anthem.
                        </p>

                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Student Corner</h3>
                        <ul>
                            <li><Link to="/library">Library</Link></li>
                            <li><Link to="/laboratories">Laboratories</Link> </li>
                            <li><Link to="/hostel">Hostels</Link> </li>
                            <li><Link to="/antiragging">Anti Ragging</Link> </li>
                            <li><Link to="#">Alumni</Link> </li>
                            <li className="active"><Link to="/sports">Sports</Link> </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Sports
