import React from "react";

const Bot = (message)=> {
    let messageStr = message.message
    return (
        <>
        <div className="msg left-msg">
      <div
       className="msg-img"
       style={{"backgroundImage": "url(https://freesvg.org/img/1538298822.png)"}}
      ></div>

      <div className="msg-bubble">
        <div className="msg-info">
          <div className="msg-info-name">BOT</div>
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

export default Bot;