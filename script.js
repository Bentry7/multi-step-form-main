//total sub price
var totalSubprice = 9;
const totalPrice = document.getElementById('total-price');

// next prev btns
const nextBtn = document.getElementById('next-step-btn');
const prevBtn = document.getElementById('go-back-btn');

var currentTab = 0; // Current tab is set to be the first tab (0)
var x = document.getElementsByClassName("tab");

//toggled Elements selectors
const step2Toggle = document.querySelector('#step-2-toggle');
const main = document.querySelector("main");
const h4Monthly = document.getElementById('h4-monthly');
const h4Yearly = document.getElementById('h4-yearly');

const yearlyPlan = document.querySelectorAll('.yearly');
const monthlyPlan = document.querySelectorAll('.monthly');

const onlineServicePrice = document.getElementById('online-service-price');
const otherAddOnsPrices = document.querySelectorAll('.add-ons-price');


const totalText = document.getElementById('total-text');

// radio btns
const arcadePlanBtn = document.getElementById('arcade');
const advancedPlanBtn = document.getElementById('advanced');
const proPlanBtn = document.getElementById('pro');

// addons check btns
const onlineServiceBtn = document.getElementById('online-service');
const largerStorageBtn = document.getElementById('larger-storage');
const customizeProfileBtn = document.getElementById('customize-profile');

// addons divs 
const CustomizableProfileSelected = document.getElementById('customizable-profile-selected');
const LargerStorageSelected = document.getElementById('larger-storage-selected');
const OnlineServiceSelected = document.getElementById('online-service-selected');


// plan-name and price tag element selectors
const planName = document.getElementById('plan-name');
const price = document.getElementById('price');
const yearlyPlanName = document.getElementById('monthly-plan-name');
const yearlyPrice = document.getElementById('yearly-price');


// Regex 
const RegexPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// required text
const requiredFieldText = document.querySelectorAll(".required-field-text");

function toggleRequiredText () {
    var y;
   y= x[0].getElementsByTagName("input");
   
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
        requiredFieldText[i].style.display = "inline";
    } else {
        requiredFieldText[i].style.display = "none";
    }
  }
}

function showTab(n) {
  // This function will display the specified tab of the form ...
  
  if (n>=0) {
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        prevBtn.style.display = "none";
    } else {
        prevBtn.style.display = "inline-block";
    }
    if (n == (x.length - 2)) {
        nextBtn.innerHTML = "Confirm";
    } else {
        nextBtn.innerHTML = "Next Step";
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)

    if (n >3) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        document.getElementById('thank-you').style.display = 'flex'
    }
    if (n==3) {
        nextBtn.style.backgroundColor = 'hsl(243, 100%, 62%)';
    } else {
        nextBtn.style.backgroundColor = 'hsl(213, 96%, 18%)';
    }

    }
}

function nextPrev(n) {
  // This function will figure out which tab to display
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("multi-step-form").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);

    //   calculate total price
  if (currentTab === 3) {
    if (!step2Toggle.checked) {
        if (arcadePlanBtn.checked){
            planName.innerHTML = 'Arcade(Monthly)';
            price.innerText = '$9/mo';
            totalSubprice = 9;
            
        } else if (advancedPlanBtn.checked) {
            planName.innerHTML = 'Advanced(Monthly)';
            price.innerText = '$12/mo';
            totalSubprice = 12;
        } else {
            planName.innerHTML = 'Pro(Monthly)';
            price.innerText = '$15/mo';
            totalSubprice = 12;
        }
        if (onlineServiceBtn.checked){
            totalSubprice+=1;
            OnlineServiceSelected.innerHTML = '<p>Online service</p><p>+$1/mo</p>';
        } else {
            OnlineServiceSelected.innerHTML = ''
        }
        if (largerStorageBtn.checked){
            totalSubprice+=2;
            LargerStorageSelected.innerHTML = '<p>Larger storage</p><p>+$2/mo</p>';
        } else {
            LargerStorageSelected.innerHTML = ''
        }
        if (customizeProfileBtn.checked){
            totalSubprice+=2;
            CustomizableProfileSelected.innerHTML = "<p>Customizable profile</p><p>+$2/mo</p>";
        } else {
            CustomizableProfileSelected.innerHTML =''
        }
        totalPrice.innerText = '$'+totalSubprice+'/mo';

    } else {
        if (arcadePlanBtn.checked){
            planName.innerHTML = 'Arcade(Yearly)';
            price.innerText = '$90/mo';
            totalSubprice = 90;
            
        } else if (advancedPlanBtn.checked) {
            planName.innerHTML = 'Advanced(Yearly)';
            price.innerText = '$120/mo';
            totalSubprice = 120;
        }else {
            planName.innerHTML = 'Pro(Yearly)';
            price.innerText = '$150/mo';
            totalSubprice = 150;
        }
        if (onlineServiceBtn.checked){
            totalSubprice+=10;
            OnlineServiceSelected.innerHTML = '<p>Online service</p><p>+$10/mo</p>';
        } else {
            OnlineServiceSelected.innerHTML = ''
        }
        if (largerStorageBtn.checked){
            totalSubprice+=20;
            LargerStorageSelected.innerHTML = '<p>Larger storage</p><p>+$20/mo</p>';
        } else {
            LargerStorageSelected.innerHTML = ''
        }
        if (customizeProfileBtn.checked){
            totalSubprice+=20;
            CustomizableProfileSelected.innerHTML = "<p>Customizable profile</p><p>+$20/mo</p>";
        } else {
            CustomizableProfileSelected.innerHTML =''
        }
        totalPrice.innerText = '$'+totalSubprice+'/mo';
    }
  }
}

function validateForm() {
  // This function deals with validation of the form fields
  var y, i, valid = true;
  y = x[0].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  if (!RegexPattern.test(y[1].value)) {
    valid = false;
    alert('Enter valid email address');
  } 


  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, step = document.getElementsByClassName("step");
 if (n>=0 && n<4) {
    for (i = 0; i < step.length; i++) {
        step[i].className = step[i].className.replace(" active", "");
      }
      //... and adds the "active" class to the current step:
      step[n].className += " active";
 }
}





function togglePlan () {
    //Toggles elements related to selected plan
    if (step2Toggle.checked){
        yearlyPlan.forEach((item) => item.style.display = 'block');
        monthlyPlan.forEach((item) => item.style.display = 'none');

        
        h4Monthly.style.opacity = '0.6';
        h4Yearly.style.opacity = '1';
        onlineServicePrice.innerHTML = '+$10/yr';
        otherAddOnsPrices.forEach((item) => item.innerHTML= '+$20/yr');

        totalText.innerText = 'Total (per year)';

        if (window.innerWidth <768) {
            main.style.minHeight = "670px";
        }
    }else {
        yearlyPlan.forEach((item) => item.style.display = 'none');
        monthlyPlan.forEach((item) => item.style.display = 'block');

        h4Monthly.style.opacity = '1';
        h4Yearly.style.opacity = '0.6';
        onlineServicePrice.innerHTML = '+$1/mo';
        otherAddOnsPrices.forEach((item) => item.innerHTML= '+$2/yr');

        totalText.innerText = 'Total (per month)';

        if (window.innerWidth <768) {
            main.style.minHeight = "630px";
        }
    }
}



step2Toggle.onclick = togglePlan;

showTab(0); // Display the current tab
