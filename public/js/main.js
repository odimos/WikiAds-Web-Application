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
    .catch(response=>{
      //console.log(response);
      return null;
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


