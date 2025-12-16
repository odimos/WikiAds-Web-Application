function getCategories(){
  return getData('https://wiki-ads.onrender.com/categories');
}

function test(){
  console.log('test')
}

 function getSubCategoriesOfCategory(id){
  return getData(`https://wiki-ads.onrender.com/categories/${id}/subcategories`);
}

 function getSubCategories(){
  return getData('https://wiki-ads.onrender.com/subcategories');

}

 function getAdsFromSubCategory(id){
  // why does it need the / before ? ??
  return getData(`https://wiki-ads.onrender.com/ads/?subcategory=${id}`);

}

 function getAdsFromCategory(id){
  return getData(`https://wiki-ads.onrender.com/ads/?category=${id}`);

}

 function getData(url){
  const headers = {
      'Accept': 'application/json',
    };
    
    return fetch(url, {
        method:'GET',
        headers: headers,
    })
    .then(response=>{
      return response.json();
    })
    .then(text=>{
      //console.log(text);
      return text;
    })
    .catch(err=>{
      //console.log(response);
      return err;
    })
}


function createCategorymap(categories, subcategories){
  let categoryMap = {};
  categories.forEach(category => {
    // Filter subcategories that belong to the current category
    let subcategoriesForCategory = subcategories.filter(subcategory => subcategory.category_id === category.id);
    
    // Add the subcategories to the category map
    categoryMap[category.id] = {
      category: category,
      subcategories: subcategoriesForCategory
    };
  });
  return categoryMap;
}



function submitFavorite(event, toDo){

    let username = myGlobalvariables.username;
    let sessionId = myGlobalvariables.sessionId;
    // check client-side if logged 
    if (!sessionId){
        alert('Παρακαλώ συνδεθείτε για προσθήκη στη λίστα αγαπημένων');
        return;
    }

    const btn = event.target;
    let liData = btn.parentElement.parentElement;
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
    const method = toDo === 'add' ? 'PUT' : 'DELETE';

    fetch( `favorites` , {
        method: method,
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
        alert(`Successfully ${toDo} to favorites`);
        if (toDo === 'remove'){
            // remove from DOM
            btn.parentElement.parentElement.remove();
        }
        console.log(data);
      })
      .catch(err=>{
        let alertMsg = `Failed to ${toDo} to favorites: `+err
        alert(alertMsg)
        console.log('Error occured:', err);
      });

    
}