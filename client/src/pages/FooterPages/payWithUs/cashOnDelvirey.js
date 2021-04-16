import React from "react";
import Header from '../../../components/nav/Header';
import image1 from './images/1.png'
import image2 from './images/2.png'
import image3 from './images/3.png'

const cashOnDelvirey = () => {
    return (
        <>
            <Header />
            <div className='container'>
                <br />
                <div id='accordion'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4 className='card-link col-md-5 float-right text-right'>
                                الدفع عند التوصيل
                            </h4>
                        </div>
                        <div>
                            <h6 className='card-body text-right'>
                                .نقدم الآن خيار الدفع النقدي عند الاستلام كخيار للدفع بالدينار الأردن
                            </h6>
                            <h6 className='card-body text-right'>
                                :يرجى الملاحظة
                                <p>.سيقوم موظف التوصيل بتحصيل المبلغ المستحق الإجمالي عند توصيل الطلب -</p>
                                <p>.لن تقبل سوى العملة المحلية(الدينار الأردني)  -</p>
                                <p>.سيقوم موظف التوصيل بتحصيل المبلغ المستحق الإجمالي عند توصيل الطلب -</p>
                                <p>.يمكنك استبدال او ارجاع المنتج اذا كان يوجد فيه اي خلل مصنعي عند الاستلام -</p>
                            </h6>
                            <h4 className='card-body text-right'>:وإليك كيفية إجراء ذلك</h4>
                        </div>
                        <div className="card-body float-right">
                            <img className="card-img" src={image1} alt="image1" style={{ width: '100px', float: 'right' }} />
                            <h5 className="card-title text-right">قم باجراء الطلب</h5>
                            <p className="card-text text-right"> .قم بالشراء وقم بملئ معلوماتك كاملة</p>
                        </div>
                        <div className="card-body float-right">
                            <img className="card-img" src={image2} alt="image1" style={{ width: '100px', float: 'right' }} />
                            <h5 className="card-title text-right">نقوم بتسليم طلبك

                            </h5>
                            <p className="card-text text-right"> .سيصلك الطلب إلى منزلك، وستتلقى رسالة نصية ومكالمة عندما يكون الطلب في الطريق إليك</p>
                        </div>
                        <div className="card-body float-right">
                            <img className="card-img" src={image3} alt="image1" style={{ width: '100px', float: 'right' }} />
                            <h5 className="card-title text-right">ادفع نقداً على باب منزلك</h5>
                            <p className="card-text text-right">.سيقوم موظف التوصيل بتحصيل المبلغ المستحق لإجمالي الطلب وسيقدم لك المنتج</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default cashOnDelvirey;