function informForm(success, txt){
    let formSuccess = document.querySelector('#formSuccess');
    if (!success){
        formSuccess.textContent = 'Login Failed: '+txt;
        formSuccess.classList.add('failure');

    } else {
        formSuccess.style.display = "none";
        let welcome = document.querySelector('#welcome');
        welcome.style.display = "block";
        document.querySelector('#loginForm')
        .style.display = "none";
        let usernameElement = welcome.querySelector('span');
        usernameElement.textContent = txt
    }

}

function informLocalStorage(username, sessionId){
    myGlobalvariables.username = username;
    myGlobalvariables.sessionId =  sessionId;

    let favs_link = document.querySelector('#favorites');
    favs_link.href = `favorites?username=${username}&sessionId=${sessionId}`;
    favs_link.style.display = "block";
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

    fetch( `favorites` , {
        method:'PUT',
        headers,
        body:JSON.stringify(data)
    })
    .then(response=>{
        if (response.status==200){
            return response.json();

        } else if (response.status==401 || response.status==409){
            // authorisation error
            return response.json()
            .then(err=>{
                console.log('Auth Error', err.message);
                throw new Error(err.message);
            });
        } else {
            console.log(response);
            throw new Error(`Unexpected Error: ${response.statusText}`);
        }
      })
      .then(data=>{
        alert("Successfully added to favorites");
        console.log(data);
      })
      .catch(err=>{
        let alertMsg = "Failed to add to favorites: "+err
        alert(alertMsg)
        console.log('Error occured:', err);
      });

    
}

function submitFormInit(){
    let login = document.querySelector("#loginForm");
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
          .then(response=>{
            if (response.status==200){
                return response.json();

            } else if (response.status==401){
                // authorisation error
                return response.json()
                .then(err=>{
                    console.log('Auth Error', err);
                    throw new Error('Failed Authorisation');
                });
            } else {
                console.log(response);
                throw new Error(`Unexpected Error: ${response.statusText}`);
            }
          })
          .then(data=>{
            informForm(true, jsonData.username);
            informLocalStorage(jsonData.username, data.sessionId);
            console.log(data);
          })
          .catch(err=>{
            informForm(false,'Failed Authorisation');
            console.log('Error occured:', err);
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

        submitFormInit();
    });
    
}


