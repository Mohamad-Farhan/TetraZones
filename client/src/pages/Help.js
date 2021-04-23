import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from '../components/nav/Header';
import { saveUSerQuestion } from '../functions/user';

const Help = () => {

    const [question, setQuestion] = useState('');

    const { user } = useSelector((state) => ({ ...state }));


    const saveQuestion = () => {
        saveUSerQuestion(user.token, question).then()
    }

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
                    <br />
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
                                هل يمكنني استبدال المنتجات؟
                            </h4>
                        </div>
                        <div>
                            <h6 className='card-body text-right'>
                                .ليس جميع المنتجات ولكن يمكنك ارجاع بعض المنتجات عند التسليم اذا كان فيها اي خلل
                            </h6>
                        </div>
                    </div>
                </div>
                <br />
                <br />

                <div className="form-group text-right">
                    <label>الأميل</label>
                    <input type="email" value={user.email} className="form-control text-right" />
                </div>
                <br />
                <div className="form-group text-right">
                    <label>اضف سؤالك</label>
                    <textarea
                        className="form-control text-right"
                        rows="3"
                        value={question}
                        onChange={(e) => {
                            setQuestion(e.target.value);
                        }}
                    />
                </div>
                <button type="submit" onClick={saveQuestion} className="btn btn-primary float-right">أرسال</button>
            </div>

        </>
    );
};

export default Help;