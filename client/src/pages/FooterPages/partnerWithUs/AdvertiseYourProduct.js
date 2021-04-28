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
                               help@tetrazones.com يمكنك التواصل عبر الرقم التالي للاعلان او ارسال اميل 
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdvertiseYourProduct;