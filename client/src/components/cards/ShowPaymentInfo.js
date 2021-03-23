import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div>
    <p>
      <span><b> {order._id} :رقم الطلب</b></span>
      <br />
      <span>
         {new Date(order.paymentIntent.created).toLocaleString()} :تاريخ الطلب
      </span>
      <br />
      <span>
      طريقةالدفع: الدفع عند التوصيل 
      </span>
      <br />
      {showStatus && (
        <span className="badge bg-primary text-white">
          STATUS: {order.orderStatus}
        </span>
      )}
    </p>
  </div>
);

export default ShowPaymentInfo;
