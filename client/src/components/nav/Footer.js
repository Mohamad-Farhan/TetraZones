import React from "react";
import '../../helper.css'
const Footer = () => {

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="nav-color text-center text-white footer-container">
            <button className='btn btn-outline-light btn-floating m-1 border-radius' onClick={scrollTop}>الرجوع لأعلى</button>
            <div className="container p-4">
                <section className="mb-4">
                    <a className="btn btn-outline-light btn-floating m-1 border-radius" href="#!" role="button"><i className="fab fa-facebook-f"></i></a>

                    <a className="btn btn-outline-light btn-floating m-1 border-radius" href="#!" role="button"><i className="fab fa-twitter"></i></a>

                    <a className="btn btn-outline-light btn-floating m-1 border-radius" href="#!" role="button"><i className="fab fa-google"></i></a>

                    <a className="btn btn-outline-light btn-floating m-1 border-radius" href="#!" role="button"><i className="fab fa-instagram"></i></a>

                    <a className="btn btn-outline-light btn-floating m-1 border-radius" href="#!" role="button"><i className="fab fa-linkedin-in"></i></a>

                </section>

                <section className="">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase footer-text-icon">دعنا نساعدك</h5>


                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#!" className="text-white border-footer"> فايرس كورنا المستجد (كوفد-19) و(اسم الموقع)</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white border-footer"> حسابك</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white border-footer"> مشترياتك</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white border-footer"> طلبات الأرجاع</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white border-footer"> المساعدة </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase footer-text-icon">طريقة الدفع</h5>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#!" className="text-white border-footer"> الدفع عند التوصيل</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase footer-text-icon border-footer" >اعرف المزيد عنا</h5>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#!" className="text-white border-footer"> وظائف</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white border-footer"> معلومات عن (اسم الموقع)</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase footer-text-icon">كن شريكاً معنا</h5>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="/yourSaller" className="text-white border-footer"> البيع على (اسم الموقع)</a>
                                </li>
                                <li>
                                    <a href="/joinWithUs" className="text-white border-footer"> انضم لنا</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white border-footer"> أعلن عن منتجاتك</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white border-footer"> سوق لنفسك معنا</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>

            <div className="text-center p-3" style={{ backgroundcolor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2020 Copyright:
    <a className="text-white" href="/"> Web Name</a>
            </div>
        </footer>
    );
};

export default Footer;
