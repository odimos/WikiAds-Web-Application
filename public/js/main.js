function getCategories(){

    const url = 'https://wiki-ads.onrender.com/categories';
    const headers = {
      'Content-Type': 'application/json',
    };
    
    fetch(url, {
        method:'GET',
        headers: headers,
    })
    .then(response=>{
      return response.json();
    })
    .then(text=>console.log(text))
    .catch(response=>{
      console.log(response)
    })
  }
  