const formselect = document.getElementById("form-body");
const popmsg = document.querySelector(".pop-msg");
const subbtn = document.getElementById("sub-btn");
const canbtn = document.getElementById("can-btn");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const gen = [document.getElementById("gen-male"), document.getElementById("gen-female")];
const address = document.getElementById("address");
const condition = document.getElementById("condition");
const errorSpan = document.querySelectorAll(".error");
const listhtml = document.getElementById("list-id");
let listtxt = listhtml.innerHTML;
let datalist = [];
subbtn.setAttribute("onclick","validate()");
canbtn.setAttribute("onclick","reclear()");
function dataObj(firstname, lastname, genderArray, add){
    this.firstname = firstname;
    this.lastname = lastname;
    this.genderArray = genderArray;
    this.add = add;
}



function validate(index){
    let flag=0;
    reclear();
    if(fname.value==""){
        flag++;
        document.getElementById("fname-error").innerHTML = "first name is required...";
    }
    if(lname.value==""){
        flag++;
        document.getElementById("lname-error").innerHTML = "last name is required...";
    }
    if(!(gen[0].checked||gen[1].checked)){
        flag++;
        document.getElementById("gen-error").innerHTML = "please select your gender...";
    }
    if(address.value==""){
        flag++;
        document.getElementById("add-error").innerHTML = "please enter your address...";
    }
    if(!condition.checked){
        flag++;
        document.getElementById("cond-error").innerHTML = "do agree for terms and conditions";
    }
    console.log(flag);
    if(flag==0)
        index == undefined ? adddata() : adddata(index);
}

function adddata(index){
    let temobj = new dataObj(fname.value, lname.value, [gen[0].checked, gen[1].checked], address.value);
    index == undefined ? datalist.push(temobj) : datalist.splice(index, 1, temobj);
    formselect.reset();
    display();
    popmsg.innerHTML="Your Data saved Sucsessfully... Thank You!!!";
    setTimeout(function(){ popmsg.innerHTML="&nbsp;"; }, 3000);
}

function reclear(index){
    for(let val of errorSpan)
        val.innerHTML = "";
    if( index != undefined ){
        subbtn.setAttribute("onclick","validate()");
        canbtn.setAttribute("onclick","reclear()");
    }
}

function display(){
    let displaytxt = listtxt;
    datalist.forEach( function(val, i){
        let gender = val.genderArray[0] ? "Male" : "Female"; 
        displaytxt +=`
        <li>
          <ul class="list-row">
            <li>${val.firstname}</li>
            <li>${val.lastname}</li>
            <li>${gender}</li>
            <li>${val.add}</li>
            <li><input type="button" value="Edit" onclick="editdata(${i})"></li>
            <li><input type="button" value="Delete" onclick="dltdata(${i})"></li>
          </ul>
        </li>`;
    });
    listhtml.innerHTML = displaytxt;
    subbtn.setAttribute("onclick","validate()");
}

function dltdata(index){
    if(confirm("Are you sure wnna delete this?")){
        datalist.splice(index, 1);
        display();
        popmsg.innerHTML="Your Data Deleted Sucsessfully...";
        setTimeout(function(){ popmsg.innerHTML="&nbsp;"; }, 3000);
    }
}

function editdata(index){
    let tempObj = datalist[index];
    fname.value = tempObj.firstname;
    lname.value = tempObj.lastname;
    gen[0].checked = tempObj.genderArray[0];
    gen[1].checked = tempObj.genderArray[1];
    address.value = tempObj.add;
    condition.checked = true;
    subbtn.setAttribute("onclick","validate("+index+")");
    canbtn.setAttribute("onclick","reclear("+index+")");
}

















