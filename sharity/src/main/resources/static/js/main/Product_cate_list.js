var x = location.search;
var params = new URLSearchParams(x);
var cid = params.get("cid");
var cate = "";
if(cid == "c0001"){
    cate = "Electronics";
}else if(cid == "c0002"){
    cate = "Video Gaming";
}else if(cid == "c0003"){
    cate = "Photography";
}else if(cid == "c0004"){
    cate = "Toys";
}else if(cid == "c0005"){
    cate = "Fashion";
}else if(cid == "c0006"){
    cate = "Accessories";
}else if(cid == "c0007"){
    cate = "Cosmestics";
}else if(cid == "c0008"){
    cate = "Automobiles";
}else if(cid == "c0009"){
    cate = "Music";
}else if(cid == "c0010"){
    cate = "Baby goods";
}else if(cid == "c0011"){
    cate = "Health";
}else if(cid == "c0012"){
    cate = "Crafts";
}else if(cid == "c0013"){
    cate = "Sports";
}else if(cid == "c0014"){
    cate = "Pet Supplies";
}else if(cid == "c0015"){
    cate = "Idol Goods";
}

var Theader = document.getElementById("T_header");
Theader.innerHTML = cate;
var tablebody = document.getElementById("tablebody");
fetch('https://uowfyp2020.herokuapp.com/item/getItemByCat?cID=' + cid, {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
}).then(response => response.json())
    .then(responseJson => {
        console.log(responseJson);
        var len = Object.keys(responseJson).length;
        for (var i = 0; i < len; i++) {
            var tr = document.createElement("tr");

            var td1 = document.createElement("td");
            td1.setAttribute("width", "480px");
            td1.setAttribute("height", "320px");
            var td1a = document.createElement("a");
            td1a.href = "/productdetails?pID=" + responseJson[i].productID;
            var td1img = document.createElement("img");
            td1img.setAttribute("src",responseJson[i].img);
            td1img.setAttribute("width", "460px");
            td1img.setAttribute("height", "300px");
            td1a.appendChild(td1img);
            td1.appendChild(td1a);
            tr.appendChild(td1);
            
            var td2 = document.createElement("td");
            var td2node = document.createTextNode(responseJson[i].productID);
            td2.appendChild(td2node);
            tr.appendChild(td2);

            var td3 = document.createElement("td");
            var td3node = document.createTextNode(responseJson[i].name);
            td3.appendChild(td3node);
            tr.appendChild(td3);

            var td5 = document.createElement("td");
            var td5node = document.createTextNode(cate);
            td5.appendChild(td5node);
            tr.appendChild(td5);

            var td6 = document.createElement("td");
            var td6node = document.createTextNode("$ " + responseJson[i].price + ".00");
            td6.appendChild(td6node);
            tr.appendChild(td6);

            var td7 = document.createElement("td");
            var td7node = document.createTextNode(responseJson[i].sellerID);
            td7.appendChild(td7node);
            tr.appendChild(td7);
            
            tablebody.appendChild(tr);
        }

    });