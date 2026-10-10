# Tackle Room — Каталог товарів

Tackle Room — вебзастосунок для перегляду товарів із сучасним інтерфейсом. Проєкт побудований на Next.js, React і TypeScript та використовує зовнішнє API для отримання даних про товари.

Застосунок підтримує пошук, фільтрацію, сортування, обрані товари та кошик із розрахунком загальної вартості.

### Каталог товарів

<img width="1655" height="907" alt="image" src="https://github.com/user-attachments/assets/ecc492f2-2450-46f7-be97-b25642e2cd0f" />

### Детальна інформація про товар
<img width="1634" height="910" alt="image" src="https://github.com/user-attachments/assets/6b50ed38-9919-41ab-bb55-9f4981fc943d" />


### Кошик
<img width="1770" height="903" alt="image" src="https://github.com/user-attachments/assets/420e42e1-14c2-4443-a40a-130f412c1be4" />


### Пошук, фільтрація та сортування

<img width="1637" height="914" alt="image" src="https://github.com/user-attachments/assets/7b63a59b-1257-464c-9c78-18e70817912c" />

<img width="1667" height="781" alt="image" src="https://github.com/user-attachments/assets/2eea264a-59e8-404c-b480-6b8f21b8303a" />



## ✨ Основні можливості

- Каталог товарів із даними із зовнішнього API.
- Пошук за назвою та брендом.
- Фільтрація товарів за категоріями.
- Сортування за рекомендованим порядком, ціною, назвою та рейтингом.
- Додавання товарів до обраного.
- Кошик із можливістю змінювати кількість товарів і видаляти їх.
- Автоматичний розрахунок загальної вартості кошика.
- Модальне вікно з описом, ціною, рейтингом і залишком товару.
- Збереження кошика й обраних товарів у `localStorage`.
- Стани завантаження, помилок і порожніх результатів пошуку.
- Адаптивний інтерфейс.

## 🛠 Технології

- **Next.js 15** — фреймворк для React.
- **React 19** — створення користувацького інтерфейсу.
- **TypeScript** — статична типізація.
- **CSS** — стилізація та адаптивне компонування.
- **Lucide React** — іконки інтерфейсу.
- **DummyJSON API** — отримання даних про товари.
- **React Context API** — керування спільним станом.
- **localStorage** — збереження даних у браузері.

## 🌐 API та дані

Для отримання товарів використовується [DummyJSON Products API](https://dummyjson.com/products).

API надає інформацію про назви, описи, категорії, ціни, рейтинги, залишки, бренди та зображення товарів.

Отримані дані адаптуються до типізованої моделі перед використанням у застосунку. Повторна актуалізація даних налаштована з інтервалом приблизно одна година.

## 🏗 Структура проєкту

```text
products_catalog/
├── public/
│   └── screenshots/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── catalog/
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── CatalogApp.tsx
│   │   │   ├── CatalogError.tsx
│   │   │   ├── CatalogToolbar.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductGridSkeleton.tsx
│   │   │   ├── ProductImage.tsx
│   │   │   ├── ProductModal.tsx
│   │   │   └── Rating.tsx
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   └── store/
│   │       └── StoreProvider.tsx
│   ├── lib/
│   │   ├── api/
│   │   │   ├── product-adapter.ts
│   │   │   └── products.ts
│   │   └── utils/
│   │       └── format-price.ts
│   ├── types/
│   │   └── product.ts
│   └── globals.d.ts
├── .eslintrc.json
├── .gitignore
├── next.config.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

## 🧩 Особливості реалізації

- **Серверне отримання даних:** завантаження товарів винесене в окремий API-модуль.
- **Компонентна архітектура:** каталог, картки товарів, фільтри, модальне вікно та кошик реалізовані окремими компонентами.
- **Типізація:** TypeScript використовується для моделі товару та компонентів.
- **Керування станом:** React Context API забезпечує спільний доступ до кошика й обраних товарів.
- **Збереження даних:** `localStorage` зберігає стан кошика й обраного між перезавантаженнями сторінки.
- **Обробка станів інтерфейсу:** передбачені завантаження, помилки та порожні результати.
