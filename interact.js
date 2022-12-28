const steps = Array.from(document.querySelectorAll("form .step"));
const nextBtn = document.querySelectorAll("form .frontnav");
const prevBtn = document.querySelectorAll("form .backnav");
const lastChange = document.querySelectorAll("form .last-changes");
const form = document.querySelector("form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const freqs = Array.from(document.querySelectorAll("form .step .form-group .freq"));
const freqToggle = document.querySelectorAll("form .toggle");
let monthly = freqs[0].classList;
let yearly = freqs[1].classList;
const prices = document.querySelectorAll("form .price");
const checkmarks = document.querySelectorAll("form .step-3 .checkmark");

const planOptions = document.querySelectorAll("form .step-2 .plan");
const finalPlanOptions = document.querySelectorAll("form .step-4 .plan");
const addOnsOptions = document.querySelectorAll("form .step-3 .add-ons");
const finalAddOnsOptions = document.querySelectorAll("form .step-4 .add-ons");

const planVariable = {
    monthlyPrice:{
        arcade: 9, advanced: 12, pro: 15
    },
    yearlyPrice:{
        arcade: 90, advanced: 120, pro: 150
    }
};

const addOnsVariable = {
    monthlyPrice:{
        os: 1, ls: 2, cp: 2
    },
    yearlyPrice:{
        os: 10, ls: 20, cp: 20
    }
};

let totalPlanValue = 0;
let totalAddOnsValue = 0;
let planChosen = false;

nextBtn.forEach((button)=>{
    button.addEventListener("click", ()=>{
        changeStep("next");
    });
});

prevBtn.forEach((button)=>{
    button.addEventListener("click", ()=>{
        changeStep("prev");
    });
});

lastChange.forEach((button)=>{
    button.addEventListener("click", ()=>{
        changeStep("redo");
    });
});

function allFilled(){
    if (nameInput && nameInput.value && emailInput && emailInput.value && phoneInput && phoneInput.value) {
        return true;
      } else {
        return false;
      }
}

function changeStep(btn){
    let index = 0;
    const active = document.querySelector(".active");
    index = steps.indexOf(active);
    steps[index].classList.remove("active");

    if (btn === "next" && index === 1 && planChosen === false){
        alert("Choose 1 plan!");
    } else if (btn === "next" && allFilled()){
        index ++;
    } else if (btn === "next"){
        alert("Missing field!");
    } else if (btn === "prev"){
        index --;
    } else if (btn === "redo"){
        index = 1;
    }

    if (btn === "next" && index === 3){
        totalPrice();
    }
    steps[index].classList.add("active");
}

freqToggle.forEach((button)=>{
    button.addEventListener("click", ()=>{
        changeFreq();
    });
});


function hide(classlst){
    if (classlst.contains("displayed-content")){
        classlst.remove("displayed-content");
        classlst.add("hidden-content");
    }
}

function show(classlst){
    if (classlst.contains("hidden-content")){
        classlst.remove("hidden-content");
        classlst.add("displayed-content");
    }
}

function swap(classlst){
    if (classlst.contains("displayed-content")){
        hide(classlst);
    } else if (classlst.contains("hidden-content")){
        show(classlst);
    }
}

function addValue(vl, priceVariable, className){
    if (monthly.contains("chosen")){
        vl += priceVariable.monthlyPrice[className];
        return vl;
    } else {
        vl += priceVariable.yearlyPrice[className];
        return vl;
    }
}

function removeValue(vl, priceVariable, className){
    if (monthly.contains("chosen")){
        vl -= priceVariable.monthlyPrice[className];
        return vl;
    } else {
        vl -= priceVariable.yearlyPrice[className];
        return vl;
    }
}

function click(classlst){
    if (classlst.contains("clicked") === false){
        classlst.add("clicked");
    }
}

function unclick(classlst){
    if (classlst.contains("clicked")){
        classlst.remove("clicked");
    }
}

function selectPlan(className){
    totalPlanValue = 0;
    for (let i = 0; i < finalPlanOptions.length; i++){
        classlst = finalPlanOptions[i].classList;
        classlst2 = planOptions[i].classList;
        if (classlst.contains(className)){
            show(classlst);
            click(classlst2);
            totalPlanValue = addValue(totalPlanValue, planVariable, className);
        } else {
            hide(classlst);
            unclick(classlst2);
        }
    }
}

function selectAddOns(className){
    for (let i = 0; i < finalAddOnsOptions.length; i++){
        classlst = finalAddOnsOptions[i].classList;
        classlst2 = addOnsOptions[i].classList;
        classlst3 = checkmarks[i].classList;
        if (classlst.contains(className) && classlst.contains("hidden-content")){
            show(classlst);
            click(classlst2);
            click(classlst3);
            totalAddOnsValue = addValue(totalAddOnsValue, addOnsVariable, className);
        } else if (classlst.contains(className) && classlst.contains("displayed-content")){
            hide(classlst);
            unclick(classlst2);
            unclick(classlst3);
            totalAddOnsValue = removeValue(totalAddOnsValue, addOnsVariable, className);
        }
    }
}

function changeFreq(){
    if (monthly.contains("chosen")){
        monthly.remove("chosen");
        yearly.add("chosen");
        totalPlanValue *= 10;
        totalAddOnsValue *= 10;
    } else {
        monthly.add("chosen");
        yearly.remove("chosen");
        totalPlanValue /= 10;
        totalAddOnsValue /= 10;
    }

    for (let i = 0; i < prices.length; i++){
        let priceList = prices[i].classList;
        swap(priceList);
    }
}

planOptions.forEach((button)=>{
    optionList = button.classList;

    if (optionList.contains("arcade")){
        button.addEventListener("click", ()=>{
            selectPlan("arcade");
            planChosen = true;
        });
    } else if (optionList.contains("advanced")){
        button.addEventListener("click", ()=>{
            selectPlan("advanced");
            planChosen = true;
        });
    } else if (optionList.contains("pro")){
        button.addEventListener("click", ()=>{
            selectPlan("pro");
            planChosen = true;
        });
    } 
});

addOnsOptions.forEach((button)=>{
    optionList = button.classList;

    if (optionList.contains("os")){
        button.addEventListener("click", ()=>{
            selectAddOns("os");
        });
    } else if (optionList.contains("ls")){
        button.addEventListener("click", ()=>{
            selectAddOns("ls");
        });
    } else if (optionList.contains("cp")){
        button.addEventListener("click", ()=>{
            selectAddOns("cp");
        });
    } 
});

function totalPrice(){
    totalPriceValue = totalPlanValue + totalAddOnsValue;
    const container = document.querySelector("form .step-4 .total-price .totalPrice");
    if (monthly.contains("chosen")){
        container.innerHTML = "+$" + totalPriceValue + "/mo";
    } else{
        container.innerHTML = "+$" + totalPriceValue + "/yr";
    }
}



