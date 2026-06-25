import { configureStore, createSlice } from "@reduxjs/toolkit"
import { createRoot } from "react-dom/client"
import { Provider, useDispatch, useSelector } from "react-redux"

// slice
const slice = createSlice({
  name: "products",
  initialState: [
    { id: 1, name: "Laptop", inStock: true, price: 1500 },
    { id: 2, name: "Smartphone", inStock: false, price: 800 },
    { id: 3, name: "Tablet", inStock: true, price: 600 },
  ],
  reducers: {
    applyDiscount: (state, action) => {
      state.forEach(product => product.price = product.price*(100 - action.payload)/100)
    },
  },
  selectors: {
    selectProducts: (state) => state,
  },
})

const { applyDiscount } = slice.actions
const { selectProducts } = slice.selectors

// App.tsx
const App = () => {
  const products = useAppSelector(selectProducts)
  const dispatch = useAppDispatch()

  const handleDiscount = (discount: number) => {
    dispatch(applyDiscount(discount))
  }

  return (
    <div>
      <button onClick={() => handleDiscount(10)}>10% Discount</button>
      <button onClick={() => handleDiscount(30)}>30% Discount</button>
      <button onClick={() => handleDiscount(50)}>50% Discount</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>
              {product.name} ({product.inStock ? "In Stock" : "Out of Stock"}) - ${product.price.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// store.ts
const store = configureStore({
  reducer: {
    products: slice.reducer,
  },
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
const useAppDispatch = useDispatch.withTypes<AppDispatch>()
const useAppSelector = useSelector.withTypes<RootState>()

// main.ts
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)

// 📜 Описание:
// При нажатии на кнопки с 10%, 30% или 50% скидками цены всех продуктов должны уменьшиться на
// указанный процент.

// 🪛 Задача:
// Перепишите изменение стейта так, чтобы цена каждого продукта уменьшалась на указанный процент.
// В качестве ответа укажите исправленный код написанный вместо return state.
// ❗Операция должна быть реализована мутабельным образом.
