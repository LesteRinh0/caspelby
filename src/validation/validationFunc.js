const validationError = (data) => {
  const errors = {}

  if (!/^[A-Za-zА-ЯЁа-яё][A-Za-zА-ЯЁа-яё]*$/.test(data.name)) {
    errors.name = 'Имя должно начинаться с заглавной буквы'
  }

  const parsedValue = Number(data.value)
  if (isNaN(parsedValue)) {
    errors.value = 'Значение должно быть числом!'
  }

  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data.date)) {
    errors.date = 'Дата должна быть вида DD/MM/YYYY'
  }

  if (Object.keys(errors).length > 0) {
    return errors
  }
}

export default validationError
