interface User {
  id: number;
  name: string;
  age: number;
  active: boolean;
}
// Cas d'usage : Filtrage des utilisateurs actifs dans une application
function filterByProperty1(
  users: User[],
  filtre: keyof User,
  value: boolean | number | string
) {
  return users.filter((user) => user[filtre] === value).length;
}

const users: User[] = [
  { id: 1, name: "Alice", age: 25, active: true },
  { id: 2, name: "Bob", age: 30, active: false },
  { id: 3, name: "Charlie", age: 35, active: true },
];
console.log(
  `🚀 ~ filterByProperty1(users, "age", 25):`,
  filterByProperty1(users, "age", 25)
);

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

// Cas d'usage : Regroupement de produits par catégorie dans un e-commerce

const products: Product[] = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999 },
  { id: 2, name: "Smartphone", category: "Electronics", price: 699 },
  { id: 3, name: "T-shirt", category: "Clothing", price: 29 },
  { id: 4, name: "T-shirt", category: "Clothing", price: 29 },
  { id: 5, name: "ram", category: "Electronics", price: 29 },
];

console.log(
  `🚀 ~ groupBy1(products, "category"):`,
  groupBy1(products, "category")
);
// { Electronics: [...], Clothing: [...] }

function groupBy1(products: Product[], value: keyof Product) {
  return Object.groupBy(products, (obj) => obj[value]);
}

interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
}
// Cas d'usage : Trouver les livres disponibles dans deux bibliothèques

interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
}

const library1: Book[] = [
  { id: 1, title: "1984", author: "Orwell", available: true },
  { id: 2, title: "Dune", author: "Herbert", available: false },
];

const library2: Book[] = [
  { id: 3, title: "1984", author: "Orwell", available: true },
  { id: 4, title: "Foundation", author: "Asimov", available: true },
];

function findIntersection(library1: Book[], library2: Book[], title: string) {
  const inLibrary1 = library1.find((book) => book.title === title);
  const inLibrary2 = library2.find((book) => book.title === title);

  return inLibrary1 && inLibrary2
    ? [inLibrary1]
    : "Ce livre n'existe pas dans le deux librairy";
}

console.log(
  `🚀 ~ findIntersection(library1, library2, "1984"):`,
  findIntersection(library1, library2, "1984")
);
// [{ id: 1, title: "1984", author: "Orwell", available: true }]

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  salary: number;
}

// Cas d'usage : Création d'un rapport de salaires avec noms complets

const employees: Employee[] = [
  { id: 1, firstName: "John", lastName: "Doe", salary: 50000 },
  { id: 2, firstName: "Jane", lastName: "Smith", salary: 60000 },
];

const transformer = (emp: Employee) => ({
  id: emp.id,
  fullName: `${emp.firstName} ${emp.lastName}`,
  annualSalary: emp.salary * 12,
});

function transformArray(employees: Employee[], transformer: any) {
  return employees.map((employee) => {
    return transformer(employee);
  });
}
console.log(
  "🚀 ~ transformArray(employees, transformer):",
  transformArray(employees, transformer)
);
// [{id: 1, fullName: 'John Doe', annualSalary: 600000}, ...]

interface Transaction {
  id: number;
  type: "credit" | "debit";
  amount: number;
  category: string;
}

// Cas d'usage : Calcul des totaux par catégorie de dépenses

const transactions: Transaction[] = [
  { id: 1, type: "debit", amount: 100, category: "Food" },
  { id: 2, type: "debit", amount: 50, category: "Food" },
  { id: 3, type: "credit", amount: 75, category: "Income" },
];

function aggregateData(
  transactions: Transaction[],
  cat: keyof Transaction,
  amount: keyof Transaction
) {
  const result = transactions.reduce((acc, transaction) => {
    const category = transaction[cat] as string;
    const total = transaction[amount] as number;

    if (acc[category]) {
      acc[category] += total;
    } else {
      acc[category] = total;
    }

    return acc;
  }, {} as Record<string, number>);

  return result;
}

console.log(
  `🚀 ~ aggregateData(transactions, "category", "amount"):`,
  aggregateData(transactions, "category", "amount")
);
// { Food: 150, Income: 75 }
