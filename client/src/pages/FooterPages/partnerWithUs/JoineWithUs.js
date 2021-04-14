import React from "react";
import Header from '../../../components/nav/Header';
import '../../../helper.css'

const JoinWithUs = () => {
    return (
        <>
            <Header />
            <div className='container'>
                <br />
                <div id='accordion'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4 className='card-link col-md-5 float-right text-right'>
                                ALLNJO الانضمام الى
                            </h4>
                        </div>
                        <div>
                            <h6 className='card-body text-right'>
                                . يمكنك الانضمام لنا عبر مواقع التواصل الاجتماعي
                            </h6>
                            <section className="mb-3 text-center">
                                <a className="btn btn-outline-black btn-floating m-1 font-size-icons" href="#!" role="button"><i className="fab fa-facebook-f"></i></a>

                                <a className="btn btn-outline-black btn-floating m-1 font-size-icons" href="#!" role="button"><i className="fab fa-twitter"></i></a>

                                <a className="btn btn-outline-black btn-floating m-1 font-size-icons" href="#!" role="button"><i className="fab fa-google"></i></a>

                                <a className="btn btn-outline-black btn-floating m-1 font-size-icons" href="#!" role="button"><i className="fab fa-instagram"></i></a>

                                <a className="btn btn-outline-black btn-floating m-1 font-size-icons" href="#!" role="button"><i className="fab fa-linkedin-in"></i></a>

                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JoinWithUs;