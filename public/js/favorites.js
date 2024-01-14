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
    .then(r=>{
        if (r.status!=200){
            throw new Error(`Error, Status: ${response.status}`);
        }
        return r.json();
    })
    .then(r=>{
        let templateSource = document.getElementById("favorites-template").innerHTML;
        let template = Handlebars.compile(templateSource);
        let data = {
            ads: r
        };
        console.log(data.ads)
        let html = template(data );
        document.body.innerHTML += html;
    })
    .catch(err=>{
        console.log(err)
    })



}