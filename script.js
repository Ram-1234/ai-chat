let onSubmit = document.getElementById('onsubmit');
let messageBox = document.getElementById('root');
let userInput = document.getElementById('user_input');
let newTopic = document.getElementById('newtopic');
let scrollDown = document.getElementById('scroll_down');
let suggestionBox = document.getElementById('suggetion_box_id');
let submitButtonIcon = document.getElementById('submit_button_icon');


let defautlAns = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.";

// REFRESH PAGE
newTopic.addEventListener('click',(e)=>{
    location.reload();
})

// ACTIVE INPUT FIELD
userInput.addEventListener('click',()=>{
    submitButtonIcon.style.color="grey";
})

// SCROLL EVENT
messageBox.addEventListener('scroll', (e)=>{
    let scrollH = e.target.scrollHeight;
    let clientH = e.target.clientHeight;
    let scrollT = e.target.scrollTop;
    if(scrollT+20 < scrollH-clientH){
        scrollDown.classList.add('toggle');
    }else{
        scrollDown.classList.remove('toggle');
    }
})

// SCROLL TO BOTTOM
scrollDown.addEventListener('click', ()=>{
    scrollDown.classList.remove('toggle');
    messageBox.scrollTop = messageBox.scrollHeight;
})

// ENTER KEY PRESSED
document.onkeydown=function(e){
    if(e.key?.toLowerCase()==='enter'){
        let userInputText = userInput?.value;
        userInputText = userInputText.trim();
        if(userInputText.length){
            suggestionBox.classList.add('suggetion_toggle');
            displayAnswer(userInputText,defautlAns);
            userInput.value='';
            userInput.blur();
            userInput.focus();
           }
    }
}

// SUBMIT BUTTON
onSubmit.addEventListener('click',async (e)=>{
    e.preventDefault();
    let userInputValue = userInput?.value;
    userInputValue = userInputValue.trim();
   if(userInputValue?.length){
    suggestionBox.classList.add('suggetion_toggle')
    let res = await apiRequest('https://jsonplaceholder.typicode.com/users');
    //let data = await res.json();
    displayAnswer(userInput.value,defautlAns);
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
    let id = Math.random() * 100;
    let div = document.createElement('div');
    div.setAttribute('class', 'wrap_response_msg');
    div.setAttribute('id', id);
    // wrapper for p & h tag element
    let wrapfh = document.createElement('div');
    let wrapfp = document.createElement('div');

    let htag = document.createElement('h4');
    let ptag = document.createElement('p');

    let techSagarIconImg = document.createElement('img');
    techSagarIconImg.setAttribute('src','Techsagar_logoCircle.png');
    techSagarIconImg.setAttribute('class','prompt_techsagar_icon');
    techSagarIconImg.setAttribute('title','TechSagar');
    // Text 'T' Icon for techsagr
    let techsagarIcon = document.createElement('span');
    techsagarIcon.setAttribute('class',"prompt_techsagar_icon");
    techsagarIcon.setAttribute('title','TechSagar');
    techsagarIcon.innerText='T';
    
    let userIcon = document.createElement('span');
    userIcon.setAttribute('class','prompt_user_icon');
    userIcon.setAttribute('title','You');
    userIcon.innerText='U';

    htag.innerText = question;
    wrapfh.append(htag,userIcon);

    ptag.innerText =  ans.trim();
    wrapfp.append(techSagarIconImg,ptag);

    div.classList.add('container');
    div.append(wrapfh,wrapfp);

    messageBox.append(div);
    div.scrollIntoView({bewhavior:"smooth"});
}

// SUGGESTION BOX TOGGLE
suggestionBox.addEventListener('click', (e)=>{
    let clickedItemClass = e.target.classList[0];
    let questionMessage = e.target.innerText;
   
    if(!clickedItemClass && questionMessage?.length){
        displayAnswer(questionMessage,defautlAns);
        suggestionBox.classList.add('suggetion_toggle');
        userInput.value='';
        userInput.focus();
    }
})



