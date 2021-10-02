

const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const gen = [document.getElementById("gen-m"), document.getElementById("gen-f")];
const address = document.getElementById("address");
const condition = document.getElementById("condition");
const listhtml = document.getElementById("list-id");
let listtxt = listhtml.innerHTML;
let datalist = [];

function validate(){
    let flag=0;
    reclear();
    if(fname.value==""){
        flag++;
        document.getElementById("fname-error").innerHTML = "first name is requred...";
    }
    if(lname.value==""){
        flag++;
        document.getElementById("lname-error").innerHTML = "last name is requred...";
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
        adddata();
}

function adddata(){
    let temparray =[];
    temparray.push(fname.value);
    temparray.push(lname.value)
    temparray.push([gen[0].checked, gen[1].checked]);
    temparray.push(address.value);
    datalist.push(temparray);
    document.getElementById("form-body").reset();
    display();
}

function reclear(){
    document.getElementById("fname-error").innerHTML = "";
    document.getElementById("lname-error").innerHTML = "";
    document.getElementById("gen-error").innerHTML = "";
    document.getElementById("add-error").innerHTML = "";
    document.getElementById("cond-error").innerHTML = "";
}

function display(){
    let displaytxt = listtxt;
    console.log(datalist);
    datalist.forEach( (val, i) => {
        console.log(val[2][0]);
        console.log(val[2][1]);
        let gender = val[2][0] ? "Male" : "Female"; 
        displaytxt +=`
        <li>
          <ul class="list-row">
            <li>${val[0]}</li>
            <li>${val[1]}</li>
            <li>${gender}</li>
            <li>${val[3]}</li>
            <li><input type="button" value="Edit" onclick="editdata(${i})"></li>
            <li><input type="button" value="Delete" onclick="dltdata(${i})"></li>
          </ul>
        </li>`;
    });
    listhtml.innerHTML = displaytxt;
}

function dltdata(index){
    datalist.splice(index, 1);
    display();
}

function editdata(index){
    fname.value = datalist[index][0];
    lname.value = datalist[index][1];
    gen[0].checked = datalist[index][2][0];
    gen[1].checked = datalist[index][2][1];
    address.value = datalist[index][3];
    condition.checked = true;
}

















