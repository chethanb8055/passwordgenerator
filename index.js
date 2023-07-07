
//custom Attribute
const inputSlider = document.querySelector("[data-lengthSlider]")
const lengthDisplay = document.querySelector("[data-lengthNumber]")

const passwordDisplay = document.querySelector("[  data-passwordDisplay]")
const copyBtn = document.querySelector("[data-copy]")
const copyMsg = document.querySelector("[data-copyMsg]")
const uppercaseCheck = document.querySelector("#uppercase")
const lowercaseCheck = document.querySelector("#lowercase")
const numbersCheck = document.querySelector("#numbers")
const symbolsCheck = document.querySelector("#symbols")
const indicator = document.querySelector("[data-indicator]");

const generatorBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkBox]")
// console.log(allCheckBox)


const symbols ="!#$%&'()*+,-./:;<=>?@[\]^_{|}~`."


let password = ""

let passwordLength=10;

let checkCount =1;

handleSlider()
setIndicator("#ccc")

//set strength circle color to gray


//set passwordLength

function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    

}

function setIndicator(color){
    indicator.style.backgroundColor=color;
    //

}


function getRndInteger(min,max){

   return Math.floor(Math.random()*(max-min)) +min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

// console.log(generateRandomNumber())

function generateLowerCase(){
    return  String.fromCharCode(getRndInteger(97,122))
}
function generateUpperCase(){
    return  String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol(){
    const randNum = getRndInteger(0,symbols.length)
    return symbols.charAt(randNum)
}

// console.log(generateSymbol());

function calcStrength(){
    let hasUpper=false;
    let hasLower =false;
    let hasNum = false;
    let hasSym= false;

    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(numbersCheck.checked) hasNum=true;
    if(symbolsCheck.checked) hasSym=true;


    if(hasUpper && hasLower && (hasNum||hasSym)&& passwordLength>=8){
        setIndicator("#0f0")
    }else if(
        (hasLower||hasUpper)&&(hasNum||hasSym)&&passwordLength>=8
    ){
        setIndicator("#ff0")
    }else{
        setIndicator("#f00")
    }

}
async function copyContent(){
     try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
     }
     catch(e){
        copyMsg.innerText="Failed";  
     }

     //to make copy span visible
     copyMsg.classList.add("active");

     setTimeout(()=>{
        copyMsg.classList.remove("active")
     },2000)
}




function shufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));

    return str;
    
}


//Event for Slider
inputSlider.addEventListener(("input"),(e)=>{
    passwordLength = e.target.value
    handleSlider();
})

//event for Copy

copyBtn.addEventListener("click", () => {
    if (passwordDisplay.value)
        copyContent();
});


//function for check-box
function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        //it count from starting for each time click
        if (checkbox.checked)
            checkCount++;
    });

    //special condition
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

//event for check-Box
allCheckBox.forEach((allCheckBox) => {
    allCheckBox.addEventListener('change', handleCheckBoxChange);
})




generatorBtn.addEventListener('click', () => {
    if (checkCount <= 0)
        return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // Remove Previous Password 
    password = "";
    //let put the stuff mentioned by checkboxes
    let funcArr = [];

    if (uppercaseCheck.checked) 
        funcArr.push(generateUpperCase);
    if (lowercaseCheck.checked) 
        funcArr.push(generateLowerCase);
    if (numbersCheck.checked) 
        funcArr.push(generateRandomNumber);
    if (symbolsCheck.checked) 
        funcArr.push(generateSymbol);
    // console.log(funcArr)

    // Compulsory Addition
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
        // console.log(password,"password")
    }

    // console.log("Password: " + password);

    // Additional addition
    // console.log(passwordLength - funcArr.length)

    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRndInteger(0, funcArr.length);
        // console.log(funcArr[randIndex]())
        // console.log(randIndex)
        password += funcArr[randIndex]();
        // console.log(password,"pass")
    }
    // console.log(Array.from(password),password)
    // password = shufflePassword(Array.from(password))
    
    // console.log("Password: " + password);

    // Shuffle Password 
    // password = shufflePassword(Array.from(password));
    // console.log(Array.from(password),"this")
    passwordDisplay.value = password;
    calcStrength();
});