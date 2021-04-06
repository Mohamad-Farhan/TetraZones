import React from "react";
import { Link } from "react-router-dom";
import Header from '../components/nav/Header';

const YourSaller = () => {
    return (
        <>
            <Header />
            <div className='container'>
                <h4 className='text-right'>الاسئلة الاكثر شيوعا</h4>
                <br />
                <div id='accordion'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4 className='card-link col-md-5 float-right'>
                                البيع على (اسم الموقع)
                            </h4>
                        </div>
                        <div>
                            <h6 className='card-body text-right'>
                                يمكنك البيع على (اسم الموقع) بالأتصال على الرقم التالي (الرقم) أو يمكنك ان ترسل أميل على الاميل التالي(الاميل)
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default YourSaller;