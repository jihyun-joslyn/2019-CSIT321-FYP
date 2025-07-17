var x = location.search;
var params = new URLSearchParams(x);
var pid = params.get("pID");
fetch('https://uowfyp2020.herokuapp.com/service/getServiceDetails?pID=' + pid, {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
}).then(response => response.json())
    .then(responseJson => {
        console.log(responseJson);
        var pname = document.getElementById("p_name");
        var pid = document.getElementById("p_id");
        var pcate = document.getElementById("p_cate");
        var pprice = document.getElementById("p_price");
        var pdes = document.getElementById("p_description");
        var pselhref = document.getElementById("p_seller_href");
        pname.innerHTML+= " " + responseJson.name;
        pid.innerHTML+= " " + responseJson.productID;
        pcate.innerHTML+= " " + responseJson.category;
        pselhref.innerHTML+= " " + responseJson.seller;
        pprice.innerHTML+= " HKD " + responseJson.price + ".00";
        pdes.innerHTML+= " " + responseJson.description;
        
    });

fetch('https://uowfyp2020.herokuapp.com/sPhoto/getphoto?productID=' + pid, {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
}).then(response => response.json())
    .then(responseJson => {
        console.log(responseJson);
        document.getElementById("p_img").src = responseJson[0].photoID.img;
    });