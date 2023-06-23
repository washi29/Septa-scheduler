

let submit=document.getElementById("get-button");
submit.addEventListener("click",onClick);
let origin=document.getElementById("origin-select");
let destination=document.getElementById("destination-select")
let table=document.getElementById("train-table");
let message=document.getElementById("message-div");
let error =document.getElementById("message-div");
let stat=0;
function onClick(){
    rowsNumber=table.rows.length;
    for(x=rowsNumber-1;x>=0;x--){
            table.deleteRow(x);
        }
    let url=`/next?origin=${origin.value}&destination=${destination.value}`
    fetch(url)
        .then(function(response){
            stat=response.status;

            return response.json();
            
        })
        .then(function(data){
            
            if(stat!=200){
                //message.removeChild(message.lastElementChild)
                if (message.style.display=="none"){
                    message.style.display="block"
                }else{
                
                message.append(data.error);
                }
                //message.remove();
                
            }else{
                message.style.display="none";
                let trains=data.trains;
                for(x=0;x<trains.length;x++){
                    let row = document.createElement("tr");
                    let trainCell = document.createElement("td");
                    trainCell.textContent = trains[x].orig_train;
                    let departureCell = document.createElement("td");
                    departureCell.textContent = trains[x].orig_departure_time;
                    let arrivalCell = document.createElement("td");
                    arrivalCell.textContent = trains[x].orig_arrival_time;
                    let delayCell = document.createElement("td");
                    delayCell.textContent = trains[x].orig_delay;
                    row.append(trainCell);
                    row.append(departureCell);
                    row.append(arrivalCell);
                    row.append(delayCell)
                    if(delayCell.textContent=="On time"){
                        row.style.backgroundColor="green"
                    }
                    table.append(row);
            }

            }
           

        })
}