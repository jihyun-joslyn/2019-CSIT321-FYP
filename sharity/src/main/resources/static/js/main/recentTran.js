var table2tr2 = document.getElementById("table2tr2");


fetch('https://uowfyp2020.herokuapp.com/order/adminRecentTrans', {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
}).then(response => response.json())
    .then(responseJson => {
        x = Object.keys(responseJson).length;
        for (var i = 0; i < x; i++) {
            console.log(responseJson);
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td1node = document.createTextNode(responseJson[i].transactionID);
            td1.appendChild(td1node);
            tr.appendChild(td1);

            var td2 = document.createElement("td");
            var td2node = document.createTextNode(responseJson[i].accountID);
            td2.appendChild(td2node);
            tr.appendChild(td2);

            var td3 = document.createElement("td");
            var td3node = document.createElement("img");
            td3node.setAttribute("src", responseJson[i].method)
            td3node.setAttribute("width", "150");
            td3node.setAttribute("heigth", "100");
            td3.appendChild(td3node);
            tr.appendChild(td3);

            var td4 = document.createElement("td");
            var td4node = document.createTextNode("$ " + responseJson[i].tprice + ".00");
            td4.appendChild(td4node);
            tr.appendChild(td4);

            var td5 = document.createElement("td");
            var td5node = document.createTextNode(responseJson[i].date_Added);
            td5.appendChild(td5node);
            tr.appendChild(td5);
            table2tr2.appendChild(tr);
        }
    });