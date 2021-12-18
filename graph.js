//defining global variales
var csvData = {};
var firstBankNumber = "count";
var secondBankNumber = "EQUIFAX, INC.";

//add event listener for first select combo
document.getElementById("form-select-1").addEventListener("change", (event) => {
  document.getElementById("chartWrapper").remove();
  document.getElementById("txtWrapper").remove();
  firstBankNumber = event.target.value;
  makeChart();
});
//add event listener for secnod select combo
document.getElementById("form-select-2").addEventListener("change", (event) => {
  document.getElementById("chartWrapper").remove();
  document.getElementById("txtWrapper").remove();
  secondBankNumber = event.target.value;
  makeChart();
});

// loading data
d3.csv("./bigram_data.csv")
  .then(function (data) {
    csvData = data; //assign recieved data
    makeChart(); //draw chart
  })
  .finally(() => {
    document.getElementById("chartLoader").remove();
  });

function makeChart() {
  let row = csvData.map((d) => d.ngram);
  let data1 = csvData.map((d) => d[firstBankNumber]);
  let data2 = csvData.map((d) => -d[secondBankNumber]);
  let ctx = document
    .getElementById("chartContainer")
    .appendChild(document.createElement("canvas"));
  ctx.setAttribute("id", "chartWrapper");
  let txt = document
    .getElementById("compareText")
    .appendChild(document.createElement("h5"));
  txt.innerHTML = "Comparison: " + firstBankNumber + " | " + secondBankNumber;
  txt.setAttribute("id", "txtWrapper");
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: row,
      datasets: [
        {
          yAxisID: "yAxis",
          label: firstBankNumber === "count" ? "Total" : firstBankNumber,
          data: data1,
          borderColor: "#874894",
          backgroundColor: "#874894",
        },
        {
          yAxisID: "yAxis",
          label: secondBankNumber === "count" ? "Total" : secondBankNumber,
          data: data2,
          borderColor: "#11A579",
          backgroundColor: "#11A579",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        yAxis: {
          display: false,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "N-Gram",
          position: "bottom",
        },
      },
    },
  });
}
