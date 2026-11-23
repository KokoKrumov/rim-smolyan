# Регионален Исторически Музей "Стою Шишков" - Смолян

Час то кода за официалния уебсайт на Регионален исторически музей "Стою Шишков" - Смолян.

## 📋 Описание

Уебсайтът на РИМ - Смолян представя най-големия музей в Средните Родопи, който съхранява веществената памет на обитателите на най-високите части на планината през различните исторически периоди.

### Основни функционалности

- **Колекции и фондове** - Основни фондове и виртуални колекции с детайлна информация за експонатите
- **Експозиции** - Актуални и архивни музейни експозиции
- **Новини и събития** - Информация за актуалните събития и новини от музея
- **Къща-музей "Ласло Наги"** - Специализирана секция за художника
- **Образователни програми и игри** - Интерактивен образователен съдържание
- **Услуги** - Информация за цени, работно време и предлагани услуги
- **Многоезичност** - Поддръжка на български и английски език

## 🛠️ Технологичен стек

- **Frontend Framework:** React
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **UI Components:** React Bootstrap, Styled Components
- **Интернационализация:** React Intl
- **Build Tool:** Vite
- **Стилове:** SCSS/SASS
- **Други:** Axios, Lodash, React Share

## 🚀 Инсталация и стартиране

### Предварителни изисквания

- Node.js
- npm

### Стъпки за инсталация

1. Клонирайте репозиторито:
```bash
git clone https://github.com/KokoKrumov/rim-smolyan.git
cd rim-smolyan
```

2. Инсталирайте зависимостите:
```bash
npm install
```

3. Стартирайте development сървър:
```bash
npm start
```

Приложението ще бъде достъпно на `http://localhost:3000`

## 📦 Build команди

### Development
```bash
npm run start:dev
npm run build:dev
```

### Production
```bash
npm run start:prod
npm run build:prod
```

### Staging
```bash
npm run build:staging
```

### Обикновен build
```bash
npm run build
```

## 🧪 Тестове

```bash
npm run test:run
npm run test:run -- store actions
npm run test:coverage
```

Тестовете за Redux Toolkit и съвместимите Redux actions са съответно в `src/store/__tests__/` и `src/actions/__tests__/`.

### End-to-end тестове (Playwright)

```bash
npx playwright install chromium webkit   # еднократно – сваля браузърите
npm run test:e2e
npm run test:e2e -- prices --project=chromium
npm run test:e2e -- --ui
```

Тестовете са в `e2e/` и се изпълняват в Chromium и WebKit. Playwright сам стартира Vite в режим `e2e`
([`environments/.env.e2e`](environments/.env.e2e)) на порт 3100.

Тестовете не достигат до WordPress: заявките към API-то се подменят с фикстурите в `e2e/fixtures/`, а всички
останали външни заявки се блокират. Тест, който направи API заявка без фикстура, се проваля – добавете
фикстурата в [`e2e/support/test.js`](e2e/support/test.js) и импортирайте `test` и `expect` от този файл.

### Collection preview images

Category descriptions provide preview URLs without dimensions. Intrinsic sizes for the
static main/virtual collection previews are maintained in
[`collectionPreviewImageProps.js`](src/utilities/collectionPreviewImageProps.js).
Update the matching entry when adding or replacing a preview asset so its space is
reserved before loading, without changing its aspect ratio.

## 📁 Структура на проекта

```
rim-smolyan/
├── src/
│   ├── actions/         # Redux actions
│   ├── api/             # API комуникация
│   ├── assets/          # Статични ресурси (шрифтове, икони, изображения)
│   ├── components/      # React компоненти
│   │   ├── pages/       # Страници на приложението
│   │   ├── header/      # Хедър компоненти
│   │   ├── footer/      # Футър компоненти
│   │   ├── modal/       # Модални прозорци
│   │   └── ...
│   ├── reducers/        # Redux reducers
│   ├── store/           # Redux Toolkit store и slices
│   ├── translations/    # Файлове за превод (BG/EN)
│   ├── utilities/       # Помощни функции
│   └── styles/          # Глобални стилове
├── public/              # Публични файлове
│   ├── images/          # Изображения
│   └── *.json           # JSON данни
├── e2e/                 # End-to-end тестове (Playwright)
│   ├── fixtures/        # Записани отговори от WordPress API
│   └── support/         # Общи помощни функции и подмяна на API-то
├── build/               # Production build файлове
└── environments/        # Environment конфигурации
```

## 🌐 Страници

- **Начална страница** - Обща информация и актуалности
- **Колекции** - Основни фондове и виртуални колекции
- **Експозиции** - Текущи и архивни експозиции
- **Новини** - Актуални събития и новини
- **За нас** - История и информация за музея
- **Контакти** - Информация за контакт
- **Къща-музей "Ласло Наги"** - Специализирана секция
- **Услуги и цени** - Информация за услуги
- **Игри** - Образователни игри
- **Административни** - Административна информация и проекти

## 🔧 Конфигурация

Проектът използва environment файлове за различни среди:
- `.dev.env` - Development среда
- `.prod.env` - Production среда
- `.staging.env` - Staging среда

## 📄 Лиценз

Private project

## 👥 Екип

Разработен за Регионален исторически музей "Стою Шишков" - Смолян

## 📞 Контакти

За повече информация посетете официалния сайт на музея или се свържете с администрацията на музея.

## 🔗 Полезни връзки

- [Официален сайт на РИМ - Смолян](https://museumsmolyan.eu/)
- [Facebook страница](https://www.facebook.com/museum.smolyan)
