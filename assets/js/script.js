const formselect = document.getElementById("form-body");
const popmsg = document.querySelector(".pop-msg");
const subbtn = document.querySelector("#sub-btn");
const canbtn = document.querySelector("#can-btn");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const gen = [document.getElementById("gen-male"), document.getElementById("gen-female")];
const address = document.getElementById("address");
const condition = document.getElementById("condition");
const errorSpan = document.querySelectorAll(".error");
const listhtml = document.querySelector(".list");
const formNode = document.querySelectorAll(".form-group input, textarea");

let listtxt = listhtml.innerHTML;
let datalist=[
    {firstname : "Nitin",
    lastname : "Gupta",
    genderArray : [true , false],
    add : "Badlapur"},
    {firstname : "NDG",
    lastname : "Gupta",
    genderArray : [true , false],
    add : "Badlapur"},
    {firstname : "Ramu",
    lastname : "Gupta",
    genderArray : [true , false],
    add : "Badlapur"},
    {firstname : "gopu",
    lastname : "Gupta",
    genderArray : [true , false],
    add : "Badlapur"}
];

display();

subbtn.addEventListener("click",function (event){
    if(saveEdit(this.pointer))
        event.stopImmediatePropagation();
    reclear();
});
subbtn.addEventListener("click",saveNew);
canbtn.addEventListener("click",reclear);

formNode.forEach( function (element, index){
    element.pointer = index;
    element.addEventListener("focus",function (){
        switch(element.pointer){
            case 0:
                errorSpan[0].innerHTML = "";
                break;
            case 1:
                errorSpan[1].innerHTML = "";
                break;
            case 2:
                errorSpan[2].innerHTML = "";
                break;
            case 3:
                errorSpan[2].innerHTML = "";
                break;
            case 4:
                errorSpan[3].innerHTML = "";
                break;
            case 5:
                errorSpan[4].innerHTML = "";
                break;
        }
    });
    console.log(element);
    element.addEventListener("focusout", function (event){
        console.log(element.pointer);
        for (let i=0; i<=element.pointer; i++) {
            switch(i){
                case 0:
                    fname.value=="" && (errorSpan[0].innerHTML = "first name is required...");
                    break;
                case 1:
                    lname.value=="" && (errorSpan[1].innerHTML = "last name is required...");
                    break;
                case 2:
                    (gen[0].checked||gen[1].checked) || (errorSpan[2].innerHTML = "please select your gender...");
                    break;
                case 3:
                    (gen[0].checked||gen[1].checked) || (errorSpan[2].innerHTML = "please select your gender...");
                    break;
                case 4:
                    address.value=="" && (errorSpan[3].innerHTML = "please enter your address...");
                    break;
            }
        }
    });
});



function dataObj(firstname, lastname, genderArray, add){
    this.firstname = firstname;
    this.lastname = lastname;
    this.genderArray = genderArray;
    this.add = add;
}

function saveEdit(index){
    if(index != undefined){ 
        if(validate()){
            datalist.splice(index, 1, crtObj());
            formselect.reset();
            display();
            popmsgFun("Your Data Edited Sucsessfully... Thank You!!!");
        }
        subbtn.pointer = undefined;
        return true;
    }
    else
        return false;
}

function saveNew(){
    if(validate()){
        datalist.push(crtObj());
        console.log(datalist);
        formselect.reset();
        display();
        popmsgFun("Your Data saved Sucsessfully... Thank You!!!");
    }
}

function crtObj(){
    return new dataObj(fname.value, lname.value, [gen[0].checked, gen[1].checked], address.value);
}

function popmsgFun(msg){
    popmsg.innerHTML=msg;
    setTimeout(function(){ popmsg.innerHTML="&nbsp;"; }, 3000);
}

function validate(){
    let flag = 0;
    if(fname.value==""){
        document.getElementById("fname-error").innerHTML = "first name is required...";
        flag ++ ;
    }    
    if(lname.value==""){
        document.getElementById("lname-error").innerHTML = "last name is required...";
        flag ++ ;
    }
    if(!(gen[0].checked||gen[1].checked)){
        document.getElementById("gen-error").innerHTML = "please select your gender...";
        flag ++ ;
    }
    if(address.value==""){
        document.getElementById("add-error").innerHTML = "please enter your address...";
        flag ++ ;
    }
    if(!condition.checked){
        document.getElementById("cond-error").innerHTML = "do agree for terms and conditions";
        flag ++ ;
    }
    if(flag==0)
        return true;
    else
        return false;
}

function display(){
    document.querySelectorAll(".list-data").forEach( function(val, i){
        document.querySelector(".list").removeChild(val);
    });
    datalist.forEach( function(val, i){
        let gender = val.genderArray[0] ? "Male" : "Female";
        let tmp1 = document.createElement("li");
        let tmp2 = document.createElement("ul");
        let namenode = document.createElement("li");
        namenode.innerHTML = val.firstname;
        let lastnode = document.createElement("li");
        lastnode.innerHTML = val.lastname;
        let gendernode = document.createElement("li");
        gendernode.innerHTML = gender;
        let addnode = document.createElement("li");
        addnode.innerHTML = val.add;
        let editnodeblock = document.createElement("li");
        let editnode = document.createElement("input");
        editnode.setAttribute("type","button");
        editnode.setAttribute("value","Edit");
        editnode.addEventListener("click", editdata);
        editnode.pointer = i;
        editnodeblock.appendChild(editnode);
        let dltnodeblock = document.createElement("li");
        let dltnode = document.createElement("input");
        dltnode.setAttribute("type","button");
        dltnode.setAttribute("value","Delete");
        dltnode.addEventListener("click",dltdata);
        dltnode.pointer = i;
        dltnodeblock.appendChild(dltnode);
        tmp2.appendChild(namenode);
        tmp2.appendChild(lastnode);
        tmp2.appendChild(gendernode);
        tmp2.appendChild(addnode);
        tmp2.appendChild(editnodeblock);
        tmp2.appendChild(dltnodeblock);
        tmp2.setAttribute("class", "list-row");
        tmp1.appendChild(tmp2);
        tmp1.setAttribute("class", "list-data");
        document.querySelector(".list").insertAdjacentElement("beforeend",tmp1);
    });
}

function editdata(){
    let index = this.pointer;
    subbtn.pointer = index;
    let tempObj = datalist[index];
    fname.value = tempObj.firstname;
    lname.value = tempObj.lastname;
    gen[0].checked = tempObj.genderArray[0];
    gen[1].checked = tempObj.genderArray[1];
    address.value = tempObj.add;
    condition.checked = true;
}

function dltdata(){
    let index = this.pointer;
    console.log(this.pointer);
    if(confirm("Are you sure wnna delete this?")){
        datalist.splice(index, 1);
        display();
        popmsgFun("Your Data Deleted Sucsessfully...");
    }
}

function reclear(){
    subbtn.pointer = undefined;
    for(let val of errorSpan)
        val.innerHTML = "";
}

