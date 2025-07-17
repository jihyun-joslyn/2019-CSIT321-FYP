var tablebody = document.getElementById("tablebody");
fetch('https://uowfyp2020.herokuapp.com/user/getAllUser', {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
}).then(response => response.json())
    .then(responseJson => {
        //console.log(responseJson);
        var len = Object.keys(responseJson).length;
        for (var i = 0; i < len; i++) {
            var tr = document.createElement("tr");

            var td1 = document.createElement("td");
            var td1node = document.createTextNode(responseJson[i].accountID);
            td1.appendChild(td1node);
            tr.appendChild(td1);

            var td2 = document.createElement("td");
            var td2node = document.createTextNode(responseJson[i].userID);
            td2.appendChild(td2node);
            tr.appendChild(td2);

            var td3 = document.createElement("td");
            var td3node = document.createTextNode(responseJson[i].password);
            td3.appendChild(td3node);
            tr.appendChild(td3);

            var td5 = document.createElement("td");
            var td5node = document.createTextNode(responseJson[i].name);
            td5.appendChild(td5node);
            tr.appendChild(td5);

            var td6 = document.createElement("td");
            var td6node = document.createTextNode(responseJson[i].email);
            td6.appendChild(td6node);
            tr.appendChild(td6);

            var td7 = document.createElement("td");
            var td7node = document.createTextNode(responseJson[i].address);
            td7.appendChild(td7node);
            tr.appendChild(td7);

            var td7 = document.createElement("td");
            var td7node = document.createTextNode(responseJson[i].bio);
            td7.appendChild(td7node);
            tr.appendChild(td7);

            var td7 = document.createElement("td");
            var td7node = document.createTextNode(responseJson[i].phone);
            td7.appendChild(td7node);
            tr.appendChild(td7);

            tablebody.appendChild(tr);
        }

    })


