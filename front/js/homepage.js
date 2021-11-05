const $productsWrapper = document.querySelector('items');

const ITEMS_PER_PAGE = 8

//On va chercher les infos

const retrieveProductsData = () => fetch('/back/data/products.json')
    .then(res => res.json())
    .then(data => data.products)
    .catch(err => console.log ("Erreur", err))

//On va chercher de quoi remplir la carte

const createProductCardImage = products => {
    const $productImage = document.createElement('img')
    $productImage.classList.add('item__img')
    $productImage.setAttribute('src', `../back/images/${products.imageURL}`)
    $productImage.setAttribute('alt', `${products.name}`)

    return $productImage
}

const createProductCardInfos = products =>{
    const $productInfo = document.createElement('div')
    $productInfo.classList.add('.item')

    const $productInfoTitle = document.createElement('h3')
    $productInfoTitle.textContent = `${products.name}`

    const $productInfoDescription = document.createElement('p')
    $productInfoDescription.textContent = `${products.description}`

    const $productButton = document.createElement ('a')
    $productButton.classList.add('products-button')
    $productButton.setAttribute('href', `../front/html/product.html?productID=${product.name}`)

    $productInfo.appendChild($productInfoTitle)
    $productInfo.appendChild($productInfoDescription)
    $productInfo.appendChild($productButton)

    return $productInfo
}

//On crée la carte

const createProductCard = products => {
    const $productCard = document.createElement('div')
    $productCard.classList.add('item')
    const $productImage = createProductCardImage(products)
    const $productInfo = createProductCardInfos(products)

    $productCard.appendChild($productImage)
    $productCard.appendChild($productInfo)

    return $productCard
}

//Affichage de la carte

const displayProducts = products => {
    products.forEach(products => {
        const $productCard = createProductCard(products)
        $productsWrapper.appendChild($productCard)
    })}
