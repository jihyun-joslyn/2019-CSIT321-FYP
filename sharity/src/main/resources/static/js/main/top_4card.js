var date = new Date();
var month = date.getMonth();
var month_over = document.getElementById("turn_month");
fetch('https://uowfyp2020.herokuapp.com/admin/adminMonthlySum',{
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
}).then(response => response.json())
    .then(responseJson =>{
        console.log(responseJson);
        month_over.innerHTML = "$ " + responseJson[month] + ".00";
    });



var year_over = document.getElementById("turn_year");
fetch('https://uowfyp2020.herokuapp.com/admin/adminYearlySum',{
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
}).then(response => response.json())
    .then(responseJson =>{
        console.log(responseJson);
        year_over.innerHTML = "$ " + responseJson + ".00";
    });



var month_expect = 30000;
var expect = document.getElementById("expect");
var expect_bar = document.getElementById("expect_bar");
fetch('https://uowfyp2020.herokuapp.com/admin/adminMonthlySum',{
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
}).then(response => response.json())
    .then(responseJson =>{
        console.log(responseJson);
        var real = (responseJson[month] / month_expect) * 100;
        console.log("real: ", real);
        expect.innerHTML = real + "%";
        expect_bar.style.setProperty('width', real+"%");
    });



var pending = document.getElementById("pending_all");
fetch('https://uowfyp2020.herokuapp.com/admin/adminTotalPadding',{
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
}).then(response => response.json())
    .then(responseJson =>{
        console.log(responseJson);
        pending.innerHTML = responseJson;
    });