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
    return getData(`https://wiki-ads.onrender.com/ads?subcategory=${id}`);
  
  }
  
   function getAdsFromCategory(id){
    return getData(`https://wiki-ads.onrender.com/ads?category=${id}`);
  
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
      .catch(response=>{
        //console.log(response);
        return null;
      })
  }

  module.exports = {getCategories, getSubCategories, test, getAdsFromCategory}