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
                                الاعلان على (اسم الموقع)
                            </h4>
                        </div>
                        <div>
                            <h6 className='card-body text-right'>
                                يمكنك التواصل عبر الرقم التالي للاعلان او ارسال اميل (الاميل)
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdvertiseYourProduct;