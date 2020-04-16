//fetch API-Sample
const listDiv = document.getElementById("list");

const url = "https://coronavirus-19-api.herokuapp.com/countries";
let jsonCountries = "";

document.getElementById("btnAlphabet").addEventListener("click", function() {
  showData("sortByCountry");
});
document.getElementById("btnNumeric").addEventListener("click", function() {
  showData("sortByNumber");
});

async function loadData() {
  let response = await fetch(url);
  //send network request and get information from the server.
  if (response.ok) {
    jsonCountries = await response.json(); // parse the response as json//
  } else {
    alert("HTTP-Error: " + response.status); //to do exit
  }
  console.log(JSON.stringify(jsonCountries)); //show fetched data in console

  showData();
}

function showData(sortType) {
  console.log("showData with sortType:" + sortType);
  let jsonSorted = "";

  if (sortType === "sortByNumber") {
    jsonSorted = jsonCountries.sort(casesSort);
  } else {
    jsonSorted = jsonCountries.sort(countrySort);
  }

  let result = "";

  for (let i = 0; i < jsonSorted.length; i++) {
    // iterate through sorted objects of the array
    if (jsonSorted[i].country !== "" && jsonSorted[i].country !== "Total:") {
      result +=
        jsonSorted[i].country +
        ", neue Fälle:  " +
        jsonSorted[i].todayCases +
        "<br>";
    }
  }

  listDiv.innerHTML = result;
}

function countrySort(a, b) {
  console.log("countrySort");
  //string sort function
  // Use toUpperCase() to ignore character casing
  const countryA = a.country.toUpperCase();
  const countryB = b.country.toUpperCase();

  let comparison = 0;
  if (countryA > countryB) {
    comparison = 1;
  } else if (countryA < countryB) {
    comparison = -1;
  }
  return comparison;
}

function casesSort(a, b) {
  //numeric sort function
  return b.todayCases - a.todayCases;
}

loadData();
