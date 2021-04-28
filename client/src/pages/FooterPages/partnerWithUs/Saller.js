import React from "react";
import Header from '../../../components/nav/Header';

const YourSaller = () => {
    return (
        <>
            <Header />
            <div className='container'>
                <br />
                <div id='accordion'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4 className='card-link col-md-5 float-right text-right'>
                                TetraZones البيع على
                            </h4>
                        </div>
                        <div>
                            <h6 className='card-body text-right'>
                                بالأتصال على الرقم التالي 0785836823 أو يمكنك ان ترسل أميل على الاميل <a href='mailto: info@tetrazones.com'>اضغط هنا</a>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default YourSaller;