
import Board from './tictactoe/Board'

export default function App() {
  const products = [
  { category: "Fruits", price: "$1", stocked: true, name: "Pomme" },
  { category: "Fruits", price: "$1", stocked: true, name: "Fruit du dragon" },
  { category: "Fruits", price: "$2", stocked: false, name: "Fruit de la passion" },
  { category: "Légumes", price: "$2", stocked: true, name: "Épinard" },
  { category: "Légumes", price: "$4", stocked: false, name: "Citrouille" },
  { category: "Légumes", price: "$1", stocked: true, name: "Petits pois" }
  ]


  
  return (
    <>
      <div>
        <Board />
        <FilterableProductTable listProducts={products} />
      </div>
    </>
  )
}

function FilterableProductTable({listProducts}) {
  return (
    <>
      <div>
        <div>
          <input type='text' placeholder='Seach...' />
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
      <div>
        <ProductTable listProducts={listProducts} />
      </div>
    </>
  )
}

function SearchBar() {
  return (
    <>
      <input type='checkbox' />
      <label>Only show products in stock</label>
    </>
  )
}

function ProductTable({listProducts}) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>  
        </thead>
        <tbody>
          <ProductCategoryRow categorie={listProducts.categorie}/>
          <ProductRow listProducts={listProducts} />
        </tbody>
        <tbody>
          <ProductCategoryRow categorie="Vegetables"/>
          <ProductRow listProducts={listProducts} />
        </tbody>
      </table>
    </>
  )
}

function ProductCategoryRow({categorie}) {
  return (
    <>
      <tr>
        <th colSpan="2">{categorie}</th>
      </tr>
    </>
  )
}

function ProductRow({listProducts}) {
  return (
    <>
    {listProducts.map((prod) => (
      <tr>
        <td>{prod.name}</td>
        <td>{prod.price}</td>
      </tr>
    ))}
    </>
  )
}
