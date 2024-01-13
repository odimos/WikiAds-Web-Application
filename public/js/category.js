function informForm(success){
    document.querySelector('#formSuccess')
    .textContent = success;
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


