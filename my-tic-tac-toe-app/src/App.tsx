
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
      <form >
        <input type='text' placeholder='Seach...' />
        <label>
          <input type='checkbox' />
          Only show products in stock
        </label>
      </form>
    </>
  )
}

function ProductTable({listProducts}) {
  const rows = [];
  let lastCategory = null;

  listProducts.forEach((prod) => {
    if(prod.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow 
          category={prod.category} 
          key={prod.category} />
        )
    }
    rows.push(
        <ProductRow 
          prod={prod} 
          key={prod.name}/>
        )
    lastCategory = prod.category
  })
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
          {rows}
        </tbody>
      </table>
    </>
  )
}

function ProductCategoryRow({category}) {
  return (
    <>
      <tr>
        <th colSpan="2">{category}</th>
      </tr>
    </>
  )
}

function ProductRow({prod}) {
  return (
    <>
      <tr>
        <td>{prod.name}</td>
        <td>{prod.price}</td>
      </tr>
    </>
  )
}
