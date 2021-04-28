import React from "react";
import Header from '../../../components/nav/Header';

const Jops = () => {
    return (
        <>
            <Header />
            <div className='container'>
                <br />
                <div id='accordion'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4 className='card-link col-md-5 float-right text-right'>
                                الوظائف
                            </h4>
                        </div>
                        <div>
                            <h6 className='card-body text-right'>
                         <a href='/hr@tetrazones.com'> HR@tetrazones.com</a> الى الاميل التالي  CV  أو ارسل ال  Linkedin  لا توجد وظائف حالياً عند التوفر سوف نعلن هنا و على 
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Jops;