
var tablebody = document.getElementById("tablebody");
fetch('https://uowfyp2020.herokuapp.com/admin/adminGetAllService', {
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
            td1a.href = "/penddetails?pID=" + responseJson[i].productID;
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
            var td5node = document.createTextNode(responseJson[i].description);
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
    })

