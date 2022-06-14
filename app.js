'use strict';

/*          GLOBAL VARIABLES / CONSTANTS           */
// window into the DOM where chart.js is rendered
const images = document.querySelector('section');
// array that holds all the created (objects) items from createItem();
let itemsArray = [];
// running count on how many clicks user makes
let counter = 0;
// maximum amount of clicks
let maxClicks = 25;
// array where results data retrieved from localStorage gets placed
let resultsArray = [];
// array to hold 6 random items for display
let randomNumberArray = [];


/*          FUNCTIONAL CODE / LOGIC          */
// constructor function to create objects
function Items(views, likes, name, fileExtension) {
  // views and likes are not set to 0 so they can keep running total of each round of votes
  this.views = views;
  this.likes = likes;
  this.name = name;
  this.fileExtension = fileExtension;
  this.src = `img/${this.name}.${fileExtension}`;
}


// creating instances of objects (items)
function createItems(views, likes, name, fileExtension) {
  let itemObject = new Items(views, likes, name, fileExtension);
  itemsArray.push(itemObject);
}


// generate random number for renderItem();
function randomItem() {
  //min [0] and max is [18]
  return Math.floor(Math.random() * (itemsArray.length));
}


// generates 3 unique images to render on page
// got help from Andres from class with the repl.it example in class
function renderItems() {
  // create array of random number that are not the same
  // set to < 9 to make sure at least half of the images get rendered equally on page
  while (randomNumberArray.length < 9) {
    let item = randomItem();
    if (!randomNumberArray.includes(item)) {
      randomNumberArray.push(item);
    }
  }
  // i < randomNumberArray.length - 6 to ensure the first three images render
  for (let i = 0; i < randomNumberArray.length - 6; i++) {
    // assigned each of the 3 items an item number
    let item1 = randomNumberArray.shift();
    let image1 = document.getElementById('item1');
    image1.src = itemsArray[item1].src;
    image1.alt = itemsArray[item1].name;

    let item2 = randomNumberArray.shift();
    let image2 = document.getElementById('item2');
    image2.src = itemsArray[item2].src;
    image2.alt = itemsArray[item2].name;

    let item3 = randomNumberArray.shift();
    let image3 = document.getElementById('item3');
    image3.src = itemsArray[item3].src;
    image3.alt = itemsArray[item3].name;

    //counting how many times the items were viewed
    itemsArray[item1].views++;
    itemsArray[item2].views++;
    itemsArray[item3].views++;
  }
}


//event handler for items and number of likes they get
function handleLikes(event) {
  counter++;
  for (let i = 0; i < itemsArray.length; i++) {
    if (event.target.alt === itemsArray[i].name) {
      itemsArray[i].likes++;
      break;
    }
  }
  // when the counter reaches maxClicks, the results render
  if (counter === maxClicks) {
    images.removeEventListener('click', handleLikes);
    renderResults();
  } else {
    // random items keep rendering until counter === maxClicks
    renderItems();
  }
}


// stores results of each voting round in localStorage
function storeItems(arr) {
  // KEY name is 'saveItems'
  // stringifies objects to put into localStorage
  let resultsData = JSON.stringify(arr);
  localStorage.setItem('saveItems', resultsData);
}


// retrieves previous voting results from localStorage
function renderData() {
  let findData = localStorage.getItem('saveItems');
  // "un-stringify" results from localStorage which turn into 'POJO' (plain old JS object)
  let showData = JSON.parse(findData);
  //check to see if there is data in localStorage with if statement
  if (findData) {
    // re-assemble properties of previous results
    for (let order of showData) {
      let views = order.views;
      let likes = order.likes;
      let name = order.name;
      let fileExtension = order.fileExtension;
      let src = order.src;
      // POJOs get re-instantiated by going through createItems(); again
      createItems(views, likes, name, fileExtension, src);
    }
    // if no previous results are found in localStorage, run page from the beginning (initial run)
  } if (!findData) {
    // called to create the first instances of Items objects
    initialResults();
  }
  renderItems();
}


// render results on page after voting is done
function renderResults() {
  resultsArray = itemsArray;
  //store the voting results in localStorage via resultsArray
  storeItems(resultsArray);
  // using 3 arrays to create a corresponding "list" for the chart to display results
  let itemNames = [];
  let itemViews = [];
  let itemLikes = [];
  // iterate through the itemsArray to get the 3 data points needed to display in chart
  for (let i = 0; i < itemsArray.length; i++) {
    itemNames.push(itemsArray[i].name);
    itemViews.push(itemsArray[i].views);
    itemLikes.push(itemsArray[i].likes);
  }

  // chart.js renders bar chart with results of total views and likes
  const data = {
    labels: itemNames, // names of all the items
    datasets: [{
      label: 'No. of views',
      data: itemViews, // total number of times the item was viewed
      backgroundColor: [
        'rgba(255, 205, 86, 0.4)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
      ],
      borderWidth: 1
    },
    {
      label: 'No. of likes',
      data: itemLikes, // total number of likes each item got
      backgroundColor: [
        'rgba(153, 102, 255, 0.6)'
      ],
      borderColor: [
        'rgb(0, 0, 0)'
      ],
      borderWidth: 1
    }]
  };
  // options to change how the chart can look when rendered
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      layout: {
        padding: {
          bottom: 10
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Most Popular Items',
          font: {
            size: 20
          }
        },
        legend: {
          labels: {
            font: {
              size: 15
            }
          }
        },
        tooltip: {
          yAlign: 'bottom',
          displayColors: false,
        },
      },
    },
  };
  // window into the DOM to get chart to render
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}

/*   run when it is the very first time the user loads the page or clears localStorage  */
function initialResults() {
  // arguments set as (views, likes, name, fileExtension)
  // views and likes values set to 0 since the page has nothing stored in localStorage
  createItems(0,0,'bag','jpg');
  createItems(0,0,'banana','jpg');
  createItems(0,0,'bathroom','jpg');
  createItems(0,0,'boots','jpg');
  createItems(0,0,'breakfast','jpg');
  createItems(0,0,'bubblegum','jpg');
  createItems(0,0,'chair','jpg');
  createItems(0,0,'cthulhu','jpg');
  createItems(0,0,'dog-duck','jpg');
  createItems(0,0,'dragon','jpg');
  createItems(0,0,'pen','jpg');
  createItems(0,0,'pet-sweep','jpg');
  createItems(0,0,'scissors','jpg');
  createItems(0,0,'shark','jpg');
  createItems(0,0,'sweep', 'png');
  createItems(0,0,'tauntaun','jpg');
  createItems(0,0,'unicorn','jpg');
  createItems(0,0,'water-can','jpg');
  createItems(0,0,'wine-glass','jpg');
}

/*  invokes the page to start when loaded   */
renderData();

// eventListener to change the images after each click
images.addEventListener('click', handleLikes);
