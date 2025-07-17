var x = location.search;
var params = new URLSearchParams(x);
var pid = params.get("pID");
fetch('https://uowfyp2020.herokuapp.com/admin/adminGetDetail?pID=' + pid, {
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
        var approve = document.getElementById("approve");
        approve.href = "/adminPass?pID=" + responseJson.productID;
        var decline = document.getElementById("decline");
        decline.href = "/admin/adminDrop?pID=" + responseJson.productID;
        pname.innerHTML+= " " + responseJson.name;
        pid.innerHTML+= " " + responseJson.productID;
        pcate.innerHTML+= " " + responseJson.cid;
        pselhref.innerHTML+= " " + responseJson.sellerID;
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