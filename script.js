"use strict";

function clearElement(element) {
    while (element.firstChild) {
        element.firstChild.remove();
    }
}

function showResult(boxId, text, className = "") {
    const box = document.getElementById(boxId);
    clearElement(box);
    appendLine(boxId, text, className);
}

function appendLine(boxId, text, className = "") {
    const line = document.createElement("p");
    line.textContent = text;
    if (className) line.className = className;
    document.getElementById(boxId).append(line);
}

function appendTitle(boxId, text) {
    appendLine(boxId, text, "result-title");
}

function appendTable(boxId, rows, columns) {
    const table = document.createElement("table");
    table.className = "data-table";

    const headRow = document.createElement("tr");
    for (const column of columns) {
        const th = document.createElement("th");
        th.textContent = column.title;
        headRow.append(th);
    }
    table.append(headRow);

    for (const row of rows) {
        const tr = document.createElement("tr");
        for (const column of columns) {
            const td = document.createElement("td");
            td.textContent = column.get(row);
            tr.append(td);
        }
        table.append(tr);
    }

    document.getElementById(boxId).append(table);
}

function showTable(boxId, title, rows, columns) {
    clearElement(document.getElementById(boxId));
    appendTitle(boxId, title);
    if (rows.length === 0) {
        appendLine(boxId, "Нічого не знайдено", "error");
        return;
    }
    appendTable(boxId, rows, columns);
}

// ЗАВДАННЯ 1
const products = [
    { name: "Ноутбук", category: "Електроніка", price: 25000, inStock: 5 },
    { name: "Миша", category: "Аксесуари", price: 500, inStock: 0 },
    { name: "Клавіатура", category: "Аксесуари", price: 1200, inStock: 12 },
    { name: "Монітор", category: "Електроніка", price: 7000, inStock: 3 },
    { name: "Веб-камера", category: "Аксесуари", price: 1500, inStock: 0 },
    { name: "Принтер", category: "Офісна техніка", price: 6500, inStock: 2 }
];

const productColumns = [
    { title: "Назва", get: p => p.name },
    { title: "Категорія", get: p => p.category },
    { title: "Ціна, грн", get: p => p.price },
    { title: "На складі", get: p => p.inStock }
];

function getAvailableProducts(list) {
    return list.filter(product => product.inStock > 0);
}

function findProductByName(list, name) {
    const query = name.trim().toLowerCase();
    const found = list.find(product => product.name.toLowerCase() === query);
    return found !== undefined ? found : "Товар не знайдено";
}

function task1ShowAll() {
    showTable("box1", "Усі товари", products, productColumns);
}

function task1ShowAvailable() {
    showTable("box1", "Товари в наявності", getAvailableProducts(products), productColumns);
}

function task1Find() {
    const name = document.getElementById("productName").value;
    const result = findProductByName(products, name);

    if (typeof result === "string") {
        showResult("box1", result, "error");
    } else {
        showTable("box1", "Знайдений товар", [result], productColumns);
    }
}

// ЗАВДАННЯ 2
const students = [
    { name: "Андрій", age: 19, grade: 8, group: "Кі-23-01" },
    { name: "Богдана", age: 19, grade: 9, group: "Пм-23-02" },
    { name: "Василь", age: 18, grade: 5, group: "Кі-23-01" },
    { name: "Галина", age: 20, grade: 6, group: "Пм-23-02" },
    { name: "Дмитро", age: 18, grade: 10, group: "Кі-23-01" },
    { name: "Мар'ян", age: 18, grade: 9, group: "Пі-23-03" },
    { name: "Захар", age: 19, grade: 7, group: "Пі-23-03" }
];

const studentColumns = [
    { title: "Ім'я", get: s => s.name },
    { title: "Вік", get: s => s.age },
    { title: "Оцінка", get: s => s.grade },
    { title: "Група", get: s => s.group }
];

function groupBy(list) {
    return list.reduce(function (groups, student) {
        if (!groups[student.group]) {
            groups[student.group] = [];
        }
        groups[student.group].push(student);
        return groups;
    }, {});
}

function sortStudentsByGrade(list) {
    return [...list].sort((a, b) => b.grade - a.grade);
}

function task2ShowAll() {
    showTable("box2", "Усі студенти", students, studentColumns);
}

function task2ShowGroups() {
    const groups = groupBy(students);
    clearElement(document.getElementById("box2"));

    for (const groupName in groups) {
        appendTitle("box2", `Група ${groupName}`);
        appendTable("box2", groups[groupName], studentColumns);
    }
}

function task2ShowSorted() {
    showTable("box2", "Студенти за оцінкою (спадання)", sortStudentsByGrade(students), studentColumns);
}

// ЗАВДАННЯ 3
const employees = [
    { name: "Олег", position: "Розробник", salary: 40000, years: 5 },
    { name: "Ірина", position: "Дизайнер", salary: 32000, years: 3 },
    { name: "Максим", position: "Тестувальник", salary: 28000, years: 2 },
    { name: "Світлана", position: "Менеджер", salary: 45000, years: 8 },
    { name: "Роман", position: "Аналітик", salary: 36000, years: 4 }
];

const employeeColumns = [
    { title: "Ім'я", get: e => e.name },
    { title: "Посада", get: e => e.position },
    { title: "Зарплата, грн", get: e => e.salary },
    { title: "Років на посаді", get: e => e.years }
];

function getAverageSalary(list) {
    if (list.length === 0) return 0;
    const sum = list.reduce((total, employee) => total + employee.salary, 0);
    return sum / list.length;
}

function findMostExperiencedEmployee(list) {
    return list.reduce((best, employee) => employee.years > best.years ? employee : best);
}

function task3ShowAll() {
    showTable("box3", "Усі працівники", employees, employeeColumns);
}

function task3Average() {
    const average = getAverageSalary(employees);
    showResult("box3", `Середня зарплата: ${average.toFixed(2)} грн`, "ok");
}

function task3MostExperienced() {
    const employee = findMostExperiencedEmployee(employees);
    showTable("box3", "Працівник з найбільшим досвідом", [employee], employeeColumns);
}

// ЗАВДАННЯ 4
const books = [
    { title: "Кобзар", author: "Тарас Шевченко", year: 1840, rating: 4.9, isRead: true },
    { title: "Тіні забутих предків", author: "Михайло Коцюбинський", year: 1911, rating: 4.5, isRead: false },
    { title: "Intermezzo", author: "Михайло Коцюбинський", year: 1908, rating: 4.1, isRead: true },
    { title: "Лісова пісня", author: "Леся Українка", year: 1911, rating: 4.7, isRead: false },
    { title: "Камінний хрест", author: "Василь Стефаник", year: 1900, rating: 3.8, isRead: true },
    { title: "Fata Morgana", author: "Михайло Коцюбинський", year: 1910, rating: 4.0, isRead: false },
    { title: "Захар Беркут", author: "Іван Франко", year: 1883, rating: 4.3, isRead: false }
];

const bookColumns = [
    { title: "Назва", get: b => b.title },
    { title: "Автор", get: b => b.author },
    { title: "Рік", get: b => b.year },
    { title: "Рейтинг", get: b => b.rating },
    { title: "Прочитана", get: b => b.isRead ? "так" : "ні" }
];

function getUnreadBooks(list) {
    return list.reduce(function (titles, book) {
        if (!book.isRead) titles.push(book.title);
        return titles;
    }, []);
}

function getBooksByAuthor(list, author) {
    const query = author.trim().toLowerCase();
    return list
        .reduce(function (result, book) {
            if (book.author.toLowerCase() === query) result.push(book);
            return result;
        }, [])
        .sort((a, b) => a.year - b.year);
}

function getTopRatedBooks(list) {
    return list
        .reduce(function (result, book) {
            if (book.rating > 4) result.push(book);
            return result;
        }, [])
        .sort((a, b) => b.rating - a.rating);
}

function task4ShowAll() {
    showTable("box4", "Усі книги", books, bookColumns);
}

function task4Unread() {
    const titles = getUnreadBooks(books);
    clearElement(document.getElementById("box4"));
    appendTitle("box4", "Непрочитані книги");
    for (const title of titles) {
        appendLine("box4", title);
    }
}

function task4ByAuthor() {
    const author = document.getElementById("authorName").value;
    showTable("box4", `Книги автора «${author.trim()}» (за роком)`, getBooksByAuthor(books, author), bookColumns);
}

function task4TopRated() {
    showTable("box4", "Книги з рейтингом вище 4", getTopRatedBooks(books), bookColumns);
}

// ЗАВДАННЯ 5
const orders = [
    {
        orderId: 1,
        customer: { name: "Іван Петренко", email: "ivan@example.com" },
        items: [
            { name: "Ноутбук", price: 25000, quantity: 1 },
            { name: "Миша", price: 500, quantity: 2 }
        ],
        total: 26000
    },
    {
        orderId: 2,
        customer: { name: "Олена Коваль", email: "olena@example.com" },
        items: [
            { name: "Клавіатура", price: 1200, quantity: 1 },
            { name: "Навушники", price: 1800, quantity: 1 }
        ],
        total: 3000
    },
    {
        orderId: 3,
        customer: { name: "Іван Петренко", email: "ivan@example.com" },
        items: [
            { name: "Монітор", price: 7000, quantity: 1 },
            { name: "Кабель HDMI", price: 250, quantity: 2 }
        ],
        total: 7500
    },
    {
        orderId: 4,
        customer: { name: "Марія Шевченко", email: "maria@example.com" },
        items: [
            { name: "Миша", price: 500, quantity: 1 },
            { name: "Килимок", price: 300, quantity: 1 }
        ],
        total: 800
    },
    {
        orderId: 5,
        customer: { name: "Олена Коваль", email: "olena@example.com" },
        items: [
            { name: "Монітор", price: 7000, quantity: 2 }
        ],
        total: 14000
    }
];

const orderColumns = [
    { title: "№", get: o => o.orderId },
    { title: "Клієнт", get: o => o.customer.name },
    { title: "Email", get: o => o.customer.email },
    { title: "Товари", get: o => o.items.map(i => `${i.name} ×${i.quantity}`).join(", ") },
    { title: "Сума, грн", get: o => o.total }
];

function getTotalSpentByCustomer(list, customerName) {
    const query = customerName.trim().toLowerCase();
    return list
        .filter(order => order.customer.name.toLowerCase() === query)
        .reduce((sum, order) => sum + order.total, 0);
}

function task5ShowAll() {
    showTable("box5", "Усі замовлення", orders, orderColumns);
}

function task5Total() {
    const name = document.getElementById("customerName").value;
    if (name.trim() === "") {
        showResult("box5", "Введіть ім'я клієнта", "error");
        return;
    }

    const total = getTotalSpentByCustomer(orders, name);
    if (total === 0) {
        showResult("box5", `Замовлень клієнта «${name.trim()}» не знайдено`, "error");
    } else {
        showResult("box5", `Клієнт «${name.trim()}» витратив ${total} грн`, "ok");
    }
}

// ЗАВДАННЯ 6
const shopProducts = [
    { productId: 1, name: "Ноутбук", price: 25000 },
    { productId: 2, name: "Миша", price: 500 },
    { productId: 3, name: "Клавіатура", price: 1200 },
    { productId: 4, name: "Монітор", price: 7000 }
];

const purchases = [
    { purchaseId: 1, productId: 1, quantity: 2 },
    { purchaseId: 2, productId: 2, quantity: 10 },
    { purchaseId: 3, productId: 4, quantity: 3 },
    { purchaseId: 4, productId: 2, quantity: 5 },
    { purchaseId: 5, productId: 3, quantity: 4 },
    { purchaseId: 6, productId: 1, quantity: 1 },
    { purchaseId: 7, productId: 4, quantity: 2 }
];

function getTotalSales(productList, purchaseList) {
    return purchaseList.reduce(function (sales, purchase) {
        const product = productList.find(item => item.productId === purchase.productId);
        if (product) {
            sales[product.name] = (sales[product.name] || 0) + product.price * purchase.quantity;
        }
        return sales;
    }, {});
}

function task6ShowSource() {
    clearElement(document.getElementById("box6"));

    appendTitle("box6", "Товари");
    appendTable("box6", shopProducts, [
        { title: "productId", get: p => p.productId },
        { title: "Назва", get: p => p.name },
        { title: "Ціна, грн", get: p => p.price }
    ]);

    appendTitle("box6", "Покупки");
    appendTable("box6", purchases, [
        { title: "purchaseId", get: p => p.purchaseId },
        { title: "productId", get: p => p.productId },
        { title: "Кількість", get: p => p.quantity }
    ]);
}

function task6Sales() {
    const sales = getTotalSales(shopProducts, purchases);
    const rows = Object.keys(sales).map(name => ({ name: name, sum: sales[name] }));

    showTable("box6", "Дохід від продажу кожного товару", rows, [
        { title: "Товар", get: r => r.name },
        { title: "Дохід, грн", get: r => r.sum }
    ]);
}

task1ShowAll();
