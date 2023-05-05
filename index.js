const accessKey="xonKAQgA4ZMlA5MwczMo3rKWEb-XteDaXt2eO-jC1cE";
const formEl =document.querySelector("form");

const searchInputEl=document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showmorebutton =document.getElementById("show-more-button");

let inputData="";
let page=1;

async function searchimages(){
    inputData = searchInputEl.value;
    // Three variables used=> page&inputdata&accessKey
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    // console.log(url);
    const response= await fetch(url);
    const data= await response.json();
    if(page === 1){
        searchResultsEl.innerHTML="";
    }

    const results =data.results;
    // console.log(results);

    results.map((result)=>{
        const imagewrapper = document.createElement("div");
        imagewrapper.classList.add("single-search-result");
        const image=document.createElement("img");
        image.src=result.urls.small;
        image.alt= result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href=result.links.html;
        imageLink.target= "_blank";
        imageLink.textContent =result.alt_description;

        // image aur imagelink ko andr waale div m insert(append) krdiya
        imagewrapper.appendChild(image);
        imagewrapper.appendChild(imageLink);
        // aur fir andr waale div ko bahr wale div m insert krdia
        searchResultsEl.appendChild(imagewrapper);
    });
    page++;
    if(page>1){
        showmorebutton.style.display = "block";
    }
}

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1;
    searchimages();
});
showmorebutton.addEventListener("click",()=>{
    searchimages();
})