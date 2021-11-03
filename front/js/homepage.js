const $productsWrapper = document.querySelector('.products-wrapper')

const ITEMS_PER_PAGE = 8

//On va chercher les infos

const retrieveProductsData = () => fetch ('/back/models/Product.js')
    .then (res => res.json())
    .then (data => data.product)
    .catch (err => console.log ("Erreur", err))

const createProductCardImage = product => {
    const $productImage = document.createElement('img')
    $productImage.classList.add('item__img')
    $productImage.setAttribute ('src', `../back/images/${product.imageURL}`)
    $productImage.setAttribute ('alt', `Canapé ${product.name}`)

    return $productImage
}

//On va chercher de quoi remplir la carte

const createProductCardInfos = product =>{
    const $productInfo = document.createElement('div')
    $productInfo.classList.add('.item')

    const $productInfoTitle = document.createElement('h3')
    $productInfoTitle.textContent = `${product.name}`

    const $productInfoDescription = document.createElement('p')
    $productInfoDescription.textContent = `${product.description}`

    const $productButton = document.createElement ('a')
    $productButton.classList.add('product-button')
    $productButton.setAttribute('href', `../front/html/product.html?productID=${product.name}`)

    $productInfo.appendChild($productInfoTitle)
    $productInfo.appendChild($productInfoDescription)
    $productInfo.appendChild($productButton)

    return $productInfo
}

//On crée la carte

const createProductCard = product => {
    const $productCard = document.createElement('div')
    $productCard.classList.add('item')
    const $productImage = createProductCardImage(product)
    const $productInfo = createProductCardInfos(product)

    $productCard.appendChild($productImage)
    $productCard.appendChild($productInfo)

    return $productCard
}

//Offset

const calculateOffset = () => {
    const params = new URLSearchParams(window.location.search)
    const pageParams = params.get('page')

    if (!pageParams || Number(pageParams) === 1) {
        return 0
    }

    return (Number(pageParams) - 1) * ITEMS_PER_PAGE
}


const main = async () => {
    const productsData = await retrieveProductsData()
        
    const offset = calculateOffset()

    for (let i = offset; i < ITEMS_PER_PAGE + offset; i++) {
        if (productsData[i]) {
            $productsWrapper.appendChild(createProductCard(productsData[i]))
        }
    }
    console.log ("Erreur", err)
}

main()