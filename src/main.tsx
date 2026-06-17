// import { createRoot } from "react-dom/client"
//
// export const App = () => {
//   return <h1>App</h1>
// }
//
// createRoot(document.getElementById("root")!).render(<App />)

import { SubmitHandler, useForm } from "react-hook-form"
import { createRoot } from "react-dom/client"

type Inputs = {
  name: string
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<Inputs>({
    defaultValues: { name: "" },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const minLength = 5
    if (data.name.length < minLength) {
      alert(`❌ FirstName must be at least ${minLength} characters long`)
    } else {
      alert(JSON.stringify(data, null, 2))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register("name", {minLength: 5})} />
      </div>
      <button type="submit" disabled={!(isValid && isDirty)}>
        Отправить
      </button>
    </form>
  )
}

createRoot(document.getElementById("root")!).render(<Login />)

// 📜 Описание:
// Начните вводить символы в input. После ввода первого символа кнопка "Отправить" раздизаблится.
// Задача: кнопка "Отправить" должна раздизаблиться только в том случае, если длинна имени больше, либо равна 5 символам.
// ❗Текст ошибки выводить в разметке не нужно.
// ❗Сторонние библиотеки (например zod, yup) использовать запрещено.
// ❗Если используете свой message для обработки ошибки, то в качестве текста ошибки напишите 'Error'

// В качестве ответа напишите полностью тег в котором вы изменяли значения
// 🖥 Пример ответа: <input {...register("name", {disabled })} />"