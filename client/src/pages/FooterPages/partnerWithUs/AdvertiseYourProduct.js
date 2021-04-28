import React from "react";
import Header from '../../../components/nav/Header';

const AdvertiseYourProduct = () => {
    return (
        <>
            <Header />
            <div className='container'>
                <br />
                <div id='accordion'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4 className='card-link col-md-5 float-right text-right'>
                               TetraZones الاعلان على 
                            </h4>
                        </div>
                        <div>
                            <h6 className='card-body text-right'>
                                يمكنك التواصل على الرقم التالي 0785836823 أو ارسال اميل <a href='mailto: info@tetrazones.com'>اضغط هنا</a>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdvertiseYourProduct;