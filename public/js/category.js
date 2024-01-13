function informForm(success){
    document.querySelector('#formSuccess')
    .textContent = success;
}

function informLocalStorage(username, sessionId){
    myGlobalvariables.username = username;
    myGlobalvariables.sessionId =  sessionId;
}

function submitFavorite(event){

    let username = myGlobalvariables.username;
    let sessionId = myGlobalvariables.sessionId;
    // check client-side if logged 
    if (!sessionId){
        alert('Παρακαλώ συνδεθείτε για προσθήκη στη λίστα αγαπημένων');
        return;
    }

    const btn = event.target;
    let liData = btn.nextElementSibling;
    let data = {
        'ad':{
            "image":liData.querySelector(`[name="image"]`).src,
            "id": btn.dataset.ad_id  
        },
        user:{
            username, sessionId
        }
    };
    ['title', 'description', 'cost'].forEach(attribute_name=>{
            data.ad[attribute_name] = 
            liData.querySelector(`[name="${attribute_name}"]`).textContent
    });
    console.log(data);
    const headers = {
        "Content-type": "application/json"
      };

    fetch( `favorites/${data.ad.id}` , {
        method:'PUT',
        headers,
        body:JSON.stringify(data)
    });

    
}

function submitForm(){
    let login = document.querySelector("#loginForm");
    console.log(login);
    login.addEventListener('submit',(event)=>{
        event.preventDefault();
        const data = new FormData(event.target);
        const jsonData = {};
        data.forEach((value, key) => {
            jsonData[key] = value
          });

          const headers = {
            "Content-type": "application/json"
          };

          fetch('/login', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(jsonData)
          })
          .then(response=> 
            {
                if (response.status!=200){
                    console.log('not auth');
                    throw new Error(`Error, Status: ${response.status}`);
                }
                return response.json();
            }
            )
          .then(data =>{
            // update the login form
            informForm(true);
            informLocalStorage(jsonData.username, data.sessionId);
            console.log(data);
          })
          .catch(err=> {
            // update the login form
            informForm(false);
            console.log('err:', err);
          });
    });

}

window.onload = ()=>{
    // construct handlebars
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    document.querySelector('#category_id').textContent = id;
    getAdsFromCategory(id)
    .then(ads=>{
        // handlebars
        let templateSource = document.getElementById("category-template").innerHTML;
        let template = Handlebars.compile(templateSource);
        let data = {
            ads: ads
        };
        let html = template(data );
        document.body.innerHTML += html;

        submitForm();
    });
    
}


