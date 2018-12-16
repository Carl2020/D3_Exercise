d3.csv("./data.csv", function (error, censusData) {

    if (error) console.error;
  
    console.log(censusData);
});

    // log a list of variables

//     var x = censusData.map(data => data.poverty);
//     var y = censusData.map(data => data.healthcare);
//     console.log("In Poverty (%)", x);
//     console.log("Lack Healthcare (%)", y);

//     censusData.forEach(function(data) {
//         data.poverty = +data.poverty;
//         console.log("In Poverty (%)", data.poverty);
//         console.log("Lack Healthcare (%)", data.healthcare);
//     });
// });
    
    
  