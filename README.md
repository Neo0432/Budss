# Slider

Для запуска проекта используется расширение [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). IDE - VSC.
## 🚀 Особенности

- **Код**: Верстка выполнена без использования jQuery, фреймворков или сторонних библиотек — только HTML, CSS и JS.
- **Гибкость**: Корректная работа с любым количеством слайдов (от 1 до 10 и более).
- **Плавная анимация**: Используется функция [`setInterval`](http://javascript.ru/setinterval) для реализации плавного эффекта анимации (помимо этого, анимация `ease-in-out`)
- **Предотвращение множественной прокрутки**: Защита от чрезмерного клика на кнопки — пока текущая анимация не завершится, кнопки остаются неактивными.
- **Навигация по точкам**: Под слайдером реализована навигация для перехода к любому слайду.