

function createHandlebarsAds(ads){
        // handlebars
        let templateSource = document.getElementById("category-template").innerHTML;
        let template = Handlebars.compile(templateSource);
        let data = {
            ads: ads
        };
        let html = template(data );
        let main = document.body.querySelector('main');
        main.innerHTML += html;
}

function createHandlebarsSideMenu(subs){
    let templateSource = document.getElementById("side-menu-template").innerHTML;
    let template = Handlebars.compile(templateSource);
    let data = {subs: subs};
    let html = template(data );
    let grid = document.querySelector('#gridWrapper');
    grid.innerHTML += html;
}

window.onload = ()=>{
    // construct handlebars
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    //document.querySelector('#category_id').textContent = id;
    Promise.all([getAdsFromCategory(id), getSubCategoriesOfCategory(id)])
    
    .then(([ads,subs])=>{
        if (ads.length === 0){
                document.getElementById("emptyMessage").style.display = "block";
                console.log("no ads");
            }else {
                document.getElementById("emptyMessage").style.display = "none";
                console.log("ads found");
            }
        createHandlebarsSideMenu(subs);

        createHandlebarsAds(ads);
        

        console.log(subs)
        console.log(ads)
        initFilter()
    });

    // create the form logic
    submitFormInit();

    
}


function initFilter(){
    let filter_radio = document.querySelector('#side-menu');
    filter_radio.addEventListener('change', (event)=>{
        let element = event.target;
        let sub_id = element.value;
        filter(sub_id);
    })
}

function filter(sub_id){
    let ads = document.querySelectorAll('[name="categoryAd"]');
    console.log('ads:', ads, sub_id)
    ads.forEach(ad => {
        console.log(ad.dataset.sub_id)
        if (ad.dataset.sub_id == sub_id || sub_id==0){
            ad.style.display = 'inline-block';
        } else {
            ad.style.display = 'none';
        }
        
    });
}