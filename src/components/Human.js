import React from "react";

const Human = (message)=> {
    let messageStr = message.message;
    return (
        <>
    <div className="msg right-msg">
      <div
       className="msg-img"
       style={{"backgroundImage": "url(https://embodiedfacilitator.com/wp-content/uploads/2018/05/human-icon-png-1901-300x300.png)"}}
      >

      </div>

      <div className="msg-bubble">
        <div className="msg-info">
          <div className="msg-info-name">Human</div>
          <div className="msg-info-time"></div>
        </div>

        <div className="msg-text">
          {messageStr}
        </div>
      </div>
    </div>
        </>
    )
}

export default Human;