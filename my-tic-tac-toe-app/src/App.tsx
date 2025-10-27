import { useState } from 'react'
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
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  return (
    <>
        <SearchBar 
          filterText={filterText} 
          inStockOnly={inStockOnly}
          onFilterTextChange={setFilterText}
          onInStockOnlyChange={setInStockOnly}
          />
        <ProductTable 
          listProducts={listProducts} 
          filterText={filterText} 
          inStockOnly={inStockOnly} />
    </>
  )
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <>
      <form>
        <input type='text' 
        placeholder='Seach...' 
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}/>

        <br/>
        <label>
          <input 
            type='checkbox' 
            checked={inStockOnly} 
            onChange={(e) => onInStockOnlyChange(e.target.checked)}/>
          Only show products in stock
        </label>
      </form>
    </>
  )
}

function ProductTable({listProducts, filterText, inStockOnly}) {
  
  
  
  const rows = [];
  let lastCategory = null;
  
  listProducts.forEach((prod) => {
    if(prod.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return
    }
    if(inStockOnly && !prod.stocked) {
      return false;
    }

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
  const name = prod.stocked ? prod.name : 
    <span style={{ color: "red"}}>{prod.name}</span>
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{prod.price}</td>
      </tr>
    </>
  )
}
