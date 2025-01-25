const replaceProductInfo = (templateProductHTML, product) => {
  let temp = templateProductHTML.replace(
    '/{%PRODUCTNAME%}/g',
    product.productName
  );
  temp = temp.replace(/{%ID%}/g, product.id);
  temp = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  temp = temp.replace(/{%IMAGE%}/g, product.image);
  temp = temp.replace(/{%FROM%}/g, product.from);
  temp = temp.replace(/{%NUTRIENTS%}/g, product.nutrients);
  temp = temp.replace(/{%QUANTITY%}/g, product.quantity);
  temp = temp.replace(/{%PRICE%}/g, product.price);
  temp = temp.replace(/{%DESCRIPTION%}/g, product.description);
  if (!product.organic) temp.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return temp;
};

module.exports = replaceProductInfo;
