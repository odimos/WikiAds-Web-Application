function handlebarsCreation(ads){
    let templateSource = document.getElementById("favorites-template").innerHTML;
    let template = Handlebars.compile(templateSource);
    let data = {
        ads: ads
    };
    console.log(data.ads)
    let html = template(data );
    document.body.innerHTML += html;
}

window.onload = ()=>{

    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    const sessionId = urlParams.get('sessionId');
    console.log(username, sessionId);

    fetch('/showfavorites',{
        method:'POST',
        headers: { 'Content-type':'application/json' },
        body: JSON.stringify({'username':username, 'sessionId':sessionId})
    })
    .then(response=>{
        if (response.status!=200){
            if (response.status==401){
                // authorisation error
                return response.json()
                .then(err=>{
                    console.log('Auth Error', err);
                    throw new Error('Failed Authorisation');
                }) 
            } 
            else {
                throw new Error(`Error Status: ${response.statusText}`);
            }
        }
        return response.json();
    })
    .then(r=>{
        handlebarsCreation(r);
    })
    .catch(err=>{
        alert(err);
        console.log(err)
    })



}