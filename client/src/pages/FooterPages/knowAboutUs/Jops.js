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
                           Linkedin  لا توجد وظائف حالياً عند التوفر سوف نعلن هنا و على 
                            </h6>
                        </div>
                        <div><h6 className='card-body text-right'> او يمكنك ارسال سيرتتك الذاتية على الاميل  <a href='mailto: hr@tetrazones.com'>هنا</a> </h6></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Jops;