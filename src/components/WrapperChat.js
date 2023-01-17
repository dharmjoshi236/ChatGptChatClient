import React,{useState} from "react";
import axios from 'axios'
import Bot from "./Bot";
import Human from "./Human"
import {MdSend} from 'react-icons/md'

const WrapperChat = ()=> {
    const [humanInput, setHumanInput] = useState('')
    const [humanInputArray, setHumanInputArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [mainArray, setMainArray] = useState([]);
    const [initialPrompt, setInitialPrompt] = useState("The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?")
    const handleHumanData = (e)=> {
        setIsLoading(true);
        e.preventDefault()
        console.log(humanInput);
        const inputHumanInText = initialPrompt + '\nHuman: ' + humanInput;
        if (humanInput.length > 0 && typeof humanInput === 'string') {
            const initialArray = [...mainArray] || [];
            const initialHumanInput = [...humanInputArray] || [];
            initialArray.push({message:{human:humanInput},isHuman:true});
            initialHumanInput.push(humanInput);
            setHumanInputArray(initialHumanInput);
            setMainArray(initialArray);
            setHumanInput('')
        }

        handleBotData(e,inputHumanInText);
    }
    const handleBotData = async (e,prompt)=> {
        e.preventDefault();
        const response = await axios.post('https://chatbot-server-rco6.onrender.com/chat',{prompt: prompt});
        if (response.status === 200) {
            setInitialPrompt(response.data.data);
            let stringFromBackend = response.data.data;
            var displayString = stringFromBackend.replace(/\nAI: /i, "");
            if (displayString.length > 0) {
                const initialAiArray = [...mainArray];
                initialAiArray.push({message:{Ai:displayString},isHuman:false});
                setMainArray(initialAiArray);
                setIsLoading(false);
            }
        }
    }
    return (
        <>
        <main className="msger-chat" id="mainContainer">
            <Bot message={'Hello Human, This Is ChatGpt3, Ask Me Anything, I will answer you!'}/>
            {mainArray.map((message,index)=> (
                <>
                <Human message={message.message.human || humanInputArray[index]}/>
                <Bot message={message.message.Ai}/>
                </>
            ))}

            <form className="msger-inputarea">
            <input disabled={!!isLoading} type="text" className="msger-input" value={humanInput} required onChange={(e)=> setHumanInput(e.target.value)} placeholder="Enter your message..."/>
            <button disabled={!!isLoading} type="submit" className="msger-send-btn" onClick={(e)=> handleHumanData(e, humanInput)}><i><MdSend size={35} color={"white"}/></i></button>
            </form>
        </main>
        </>
    )
}

export default WrapperChat;