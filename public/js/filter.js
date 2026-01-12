function initFilter(){
    try {
        let filter_radio = document.querySelector('#side-menu');
        filter_radio.addEventListener('change', (event)=>{
            let element = event.target;
            let sub_id = element.value;
            filter(sub_id);
        })
    } catch (error) {
        console.log("Error initializing filter:", error);
    }

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
