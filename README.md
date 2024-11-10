# MyMessenger

## Описание проекта

**MyMessenger** — это учебное веб-приложение мессенджера, разработанное для улучшения навыков веб-разработки. Оно включает функционал обмена сообщениями, управления пользователями и отображения списка чатов, а также использует современные технологии, такие как TypeScript, SCSS, Handlebars и Vite для сборки.

---

## Обновления sprint_4

В рамках четвёртого спринта были добавлены следующие изменения:

- **Тестирование**:
  - Написаны тесты для следующих компонентов:
    - **Роутер**: Реализованы тесты для проверки корректности регистрации маршрутов, навигации и переходов между страницами.
    - **Компоненты**: Написаны тесты для основных компонентов приложения, включая их рендеринг, работу с состоянием и взаимодействие с пользователем.
    - **Модуль отправки запросов**: Написаны тесты для работы с API, включая обработку ошибок и успешные ответы от сервера.
  - Для тестирования используется **Mocha** и **Chai**. Тесты для каждого модуля хранятся рядом с тестируемыми файлами.
- **Pre-commit hooks**:
  - Настроены **precommit** хуки для автоматической проверки кода перед коммитом. Это включает:
    - Проверка на наличие ошибок с помощью **ESLint**.
    - Проверка стиля кода с использованием **Stylelint**.
    - Запуск тестов через **Mocha**.
- **Аудит и обновление пакетов**:
  - Проведен аудит пакетов с помощью инструментов для обеспечения безопасности и актуальности.
  - Все зависимости обновлены до последних стабильных версий с учётом безопасности.

---

## Обновления sprint_3

В рамках третьего спринта были добавлены следующие изменения:

- **Роутинг**:

  - Реализован роутер для регистрации маршрутов приложения.
  - Каждая страница приложения имеет собственный роут:
    - `/` — страница входа.
    - `/sign-up` — страница регистрации.
    - `/settings` — страница настроек профиля пользователя.
    - `/messenger` — страница чатов.
  - В DOM может быть активна только одна страница. При переходе между страницами происходит удаление предыдущей из DOM.
  - При обновлении страницы отображается тот же URL, который был активен до обновления.
  - Переходы между страницами возможны как через интерфейс приложения (например, кнопки), так и с помощью кнопок «Назад» и «Вперёд» в браузере.

- **HTTP API для чатов, авторизации и пользователей**:

  - Внедрены API для:
    - Авторизации (регистрация, вход, выход).
    - Управления данными пользователя (изменение данных профиля, аватара и пароля).
    - Управления чатами (отображение списка чатов пользователя, создание чата, добавление и удаление пользователей в чате).
  - После регистрации пользователь автоматически перенаправляется на страницу чатов.
  - Добавлена базовая проверка авторизации: неавторизованные пользователи перенаправляются на страницу логина.

- **Подключение WebSocket**:

  - WebSocket используется для обмена real-time сообщениями.
  - WebSocket подключается для работы с real-time сообщениями и обновляется в соответствии с активным чатом.

- **Другие улучшения**:
  - Сборка и разработка проекта по-прежнему выполняются с помощью Vite.
  - Весь код проверяется на наличие ошибок с помощью ESLint и Stylelint.

---

## Обновления sprint_2

- Проект переведён на **TypeScript**.
- Добавлена страница со списком чатов и лентой переписки.
- Внедрён компонентный подход:
  - Используется реализация **Block** и **Event Bus**.
  - Проект разделён на компоненты и страницы, что позволяет переиспользовать элементы интерфейса.
- Добавлен сбор данных из форм: данные выводятся в консоль как объект.
- Реализована валидация на все формы:
  - Авторизация.
  - Регистрация.
  - Отправка сообщения.
  - Настройки пользователя.
  - Валидация осуществляется через регулярные выражения и проверяется при событиях **blur** и **submit**.
- Валидационные проверки включают:
  - Имя, фамилия: латиница или кириллица, первая буква заглавная, без пробелов и цифр.
  - Логин: 3–20 символов, латиница, может содержать цифры, но не состоять из них, допускаются дефис и нижнее подчёркивание.
  - Email: латиница, обязательные символы `@` и точка.
  - Пароль: 8–40 символов, хотя бы одна заглавная буква и цифра.
  - Телефон: 10–15 символов, может начинаться с плюса.
  - Сообщение: поле не должно быть пустым.
- Генерация страниц происходит на стороне клиента.
- Структура проекта приведена в соответствие с рекомендациями по архитектуре, добавлены единообразные экспорты и импорты.
- Реализован базовый класс **View** для отображения страниц и компонентов по шаблону MVC.
- Добавлен класс для работы с XHR-запросами с методами GET, POST, PUT, DELETE, поддержкой **query string** и body для запросов.
- Настроены **ESLint** и **Stylelint** для статического анализа кода. Весь код проходит проверку типов, линтинг и тесты.

---

## Команды для работы с проектом

- `npm install` — установка зависимостей.
- `npm run dev` — запуск версии для разработки.
- `npm run preview` — предпросмотр собранной версии.
- `npm run build` — сборка стабильной версии.
- `npm run start` — сборка и запуск проекта.
- `npm run lint` — запуск проверки ESlint.
- `npm run lint:style` — запуск проверки stylelint.
- `npm run tsc` — запуск проверки typescript.

---

## Стартовая страница

[MyMessenger](https://ypraktikum.netlify.app/)
