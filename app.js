const allTabsBody = document.querySelectorAll('.tab-body-single');
const allTabsHead = document.querySelectorAll('.tab-head-single');
const searchForm = document.querySelector('.app-header-search');
const previous = document.getElementById('previous');
const after = document.getElementById('after');
let searchList = document.getElementById('search-list');


//token = 5889658271068532
let activeTab = 1, allData, count=1, dataID;

const init = () => {
    showActiveTabBody();
    showActiveTabHead();
}

const showActiveTabHead = () => allTabsHead[activeTab - 1].classList.add('active-tab');

const showActiveTabBody = () => {
    hideAllTabBody();
    allTabsBody[activeTab - 1].classList.add('show-tab');
}

const hideAllTabBody = () => allTabsBody.forEach(singleTabBody => singleTabBody.classList.remove('show-tab'));
const hideAllTabHead = () => allTabsHead.forEach(singleTabHead => singleTabHead.classList.remove('active-tab'));

// even listeners
window.addEventListener('DOMContentLoaded', () => init());
// button event listeners
allTabsHead.forEach(singleTabHead => {
    singleTabHead.addEventListener('click', () => {
        hideAllTabHead();
        activeTab = singleTabHead.dataset.id;
        showActiveTabHead();
        showActiveTabBody();
    });
});

const getInputValue = (event) => {
    event.preventDefault();
    let searchText = searchForm.search.value;
    fetchAllStarWars(searchText);
}

// search form submission
searchForm.addEventListener('submit', getInputValue);

// api key => 727054372039115
const fetchAllStarWars = async(searchText) => {
    let url = `https://akabab.github.io/starwars-api/api/all.json`;
    var chars = [];
    try{
        const response = await fetch(url);
        allData = await response.json();
        for (var char of allData) {
            var name = char.name.toLowerCase();
            if (name.includes(searchText.toLowerCase())) {
                chars.push(char);
            }
        }
        console.log(chars);
        // if(allData.response === 'success'){
        //     showSearchList(allData.results);
        // }
    } catch(error){
        console.log(error);
    }
    showSearchList(chars);
}

const showSearchList = (data) => {
    searchList.innerHTML = "";
    data.forEach(dataItem => {
        const divElem = document.createElement('div');
        divElem.classList.add('search-list-item');
        divElem.innerHTML = `
            <img src = "${dataItem.image.url ? dataItem.image.url : ""}" alt = "">
            <p data-id = "${dataItem.id}">${dataItem.name}</p>
        `;
        searchList.appendChild(divElem);
    });
}

searchForm.search.addEventListener('keyup', () => {
    if(searchForm.search.value.length > 1){
        fetchAllStarWars(searchForm.search.value);
    } else {
        searchList.innerHTML = "";
    }
});

searchList.addEventListener('click', (event) => {
    let searchId = event.target.dataset.id;
    //console.log(searchId);
    //console.log(count);
    //console.log(typeof(searchId));
    let singleData = allData.results.filter(singleData => {
        console.log(typeof(singleData.id));
        return searchId === singleData.id;
    })
    console.log(singleData);
    let i = Number(searchId);
    //console.log(typeof(i));
    count=i;
    //console.log(count);
    showStarwarsDetails(singleData);
    searchList.innerHTML = "";
});

const selectById =  async(count) =>{
    
    const singleData = [];
    let url = `https://akabab.github.io/starwars-api/api/id/${count}.json`;
    singleData.push(fetch(url).then((res) => res.json()));
    Promise.all(singleData).then((results) => {
        showStarWarsDetails(results);
    });

};

selectById(count);


previous.addEventListener('click', () =>{
    if (count >1){
        count = count-1;
    }
    else{
        count =731;
    }
    selectById(count);
})

after.addEventListener('click', () =>{
    if (count <731){
        count = count+1;
    }
    else{
        count =1;
    }
    selectById(count);
})




const showStarWarsDetails = (data) => {
    console.log(data[0]);
    //console.log(data[0].id);
    document.querySelector('.app-body-content-thumbnail').innerHTML = `
        <img src = "${data[0].image}">
    `;

    document.querySelector('.name').textContent = data[0].id + " " + data[0].name;
    var teams = "";
    var affs = data[0].affiliations
    for (var i = 0; i < affs.length; i++){
        teams + "<li>" + data[0].affiliations[i] +"<li>"
        console.log(teams);
    }
    document.querySelector('.tab-body-single.powerstats').innerHTML = `
    <li>
        <span>Name:</span>
        <span>${data[0].name}</span>
    </li>
    <li>
        <span>Height: </span>
        <span>${data[0].height}</span>
    </li>
    <li>
        <span>Mass:</span>
        <span>${data[0].mass}</span>
    </li>
    <li>
        <span>Homeworld:</span>
        <span>${data[0].homeworld}</span>
    </li>
    <li>
        <span>wiki:</span>
        <span>${data[0].wiki}</span>
    </li>
    <li>
        <span>Born:</span>
        <span>${data[0].born}</span>
    </li>
    <li>
        <span>BornLocation:</span>
        <span>${data[0].bornlocation}</span>
    </li>
    <li>
        <span>Died:</span>
        <span>${data[0].died}</span>
    </li>
    <li>
    <span>Model:</span>
    <span>${data[0].model}</span>
    </li>
    <li>
    <span>Manufacturer:</span>
    <span>${data[0].manufacturer}</span>
    </li>
    <li>
    <span>Class:</span>
    <span>${data[0].class}</span>
    </li>

    <li>
        <span>Species:</span>
        <span>${data[0].species}</span>
    </li>
    <li>
        <span>Affilations:</span>
        <span>${teams}</span>
    </li>
    <li>
        <span>Masters:</span>
        <span>${data[0].Masters}</span>
    </li>
    <li>
        <span>Apprentices:</span>
        <span>${data[0].apprentices}</span>
    </li>
    `;
}