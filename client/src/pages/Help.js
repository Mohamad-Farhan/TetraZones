import React from "react";
import { Link } from "react-router-dom";
import Header from '../components/nav/Header';

const Help = () => {
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
                                 كيف يمكنني ان اذهب الى جميع المنتجات؟ 
                            </h4>
                        </div>
                        <div>
                            <h6 className='card-body text-right'>
                                .يمكنك الذهاب الى <span><Link to='/shop' className='text-danger'>الكل</Link></span> لايجاد جميع المنتجات
                            </h6>
                        </div>
                    </div>
                        <br/>
                    <div className='card'>
                        <div className='card-header'>
                            <h4 className='collapsed card-link text-right'>
                                كيف يمكنني  التواصل معكم؟ 
                            </h4>
                        </div>
                        <div>
                            <h6 className='card-body text-right'>
                            .  يمكنك التواص معنى على الواتساب عبر الرقم التالي <span className='text-danger'>0785836823</span> 
                            </h6>
                        </div>
                    </div>
                    <br />
                    <div className='card'>
                        <div className='card-header'>
                            <h4 className='collapsed card-link text-right'>
                                هل يمكنني ان استبدل المنتجات؟
                            </h4>
                        </div>
                        <div>
                            <h6 className='card-body text-right'>
                                .ليس جميع المنتجات ولكن يمكنك ترجيع بعض المنتجات عند التسليم اذا كان فيها اي خلل
                            </h6>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Help;