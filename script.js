let onSubmit = document.getElementById('onsubmit');
let messageBox = document.getElementById('root');
let userInput = document.getElementById('user_input');
let newTopic = document.getElementById('newtopic');
let scrollDown = document.getElementById('scroll_down');

let defautlAns = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
// REFRESH PAGE
newTopic.addEventListener('click',(e)=>{
    location.reload();
})

messageBox.addEventListener('scroll', (e)=>{
    let scrollH = e.target.scrollHeight;
    let clientH = e.target.clientHeight;
    let scrollT = e.target.scrollTop;
    if(scrollT+5 < scrollH-clientH){
        scrollDown.classList.add('toggle')
    }else{
        scrollDown.classList.remove('toggle')
    }
})

// SCROLL TO BOTTOM
scrollDown.addEventListener('click', ()=>{
    scrollDown.classList.remove('toggle')
    messageBox.scrollTop = messageBox.scrollHeight;
})

// ENTER KEY PRESSED
document.onkeydown=function(e){
    if(e.key?.toLowerCase()==='enter'){
        if(userInput?.value.length){
            displayAnswer(userInput.value,defautlAns);
            userInput.value='';
            userInput.blur();
            userInput.focus();
           }
    }
}

// SUBMIT BUTTON
onSubmit.addEventListener('click',async (e)=>{
    e.preventDefault();
    let userInputValue = userInput?.value
   if(userInputValue?.length){
    let res = await apiRequest('https://jsonplaceholder.typicode.com/users');
    //let geminiRes = await run(userInputValue); 
    let data = await res.json();
    //console.log('geminiRes', geminiRes);
    displayAnswer(userInput.value,defautlAns);
    //displayAnswer(userInput.value,geminiRes);
    userInput.value='';
    userInput.focus();
   }
})

// API CALL
async function apiRequest(api){
    let response = await fetch(api);
    //res = await response.json();
    return response;
}

// DISPLAY
function displayAnswer(question, ans){
    // debugger
    let id = Math.random() * 100;
    let div = document.createElement('div');
    div.setAttribute('class', 'wrap_response_msg');
    div.setAttribute('id', id);
    let htag = document.createElement('h4');
    let ptag = document.createElement('p');
    htag.innerText = question;
    ptag.innerText = ans;
    div.classList.add('container');
    div.append(htag,ptag);
    messageBox.append(div);
    div.scrollIntoView({bewhavior:"smooth"});
    //messageBox.scrollDown = messageBox.scrollHeight;
}



// gemini ai
//const { GoogleGenerativeAI } = require("@google/generative-ai");
//import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
//export const genAI = new GoogleGenerativeAI('AIzaSyDMhDXaFOwcyKKAvroLAAFcRVEAhcK8crg');

// export async function run(prompt) {
//   // For text-only input, use the gemini-pro model
//   const model = genAI.getGenerativeModel({ model: "gemini-pro"});
//   //const prompt = "Write a story about a magic backpack."
//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   //console.log(text);
//   return text;
// }


