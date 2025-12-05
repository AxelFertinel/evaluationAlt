const scores = {
  level1: 100,
  level2: 85,
  level3: 95,
};
function getValues(scores) {
  return Object.values(scores);
}
console.log("🚀 ~ getValues(scores):", getValues(scores))

const pricesInEuros = {
  book: 20,
  pen: 5,
  notebook: 10,
};
const toDollars = (euros: number) => euros * 1.1;

function transformValues(pricesInEuros, toDollars) {
  return Object.values(pricesInEuros).map((result) => {
    return toDollars(result);
  });
}

console.log("🚀 ~ transformValues(pricesInEuros, toDollars):", transformValues(pricesInEuros, toDollars))
// { book: 22, pen: 5.5, notebook: 11 }

const store1Sales = { january: 1000, february: 1200, march: 900 };
const store2Sales = { january: 800, february: 950, march: 1100 };

function mergeObjects(a, b) {
  const table = [...new Set([...Object.keys(a), ...Object.keys(b)])];

  const acc = table.reduce((acc, key) => {
    const valueA = a[key] || 0;
    const valueB = b[key] || 0;

    acc[key] = valueA + valueB;

    return acc;
  }, {});

  return acc;
}
console.log("🚀 ~ mergeObjects(store1Sales, store2Sales:", mergeObjects(store1Sales, store2Sales));
// { january: 1800, february: 2150, march: 2000 }

// Cas d'usage : Recherche des produits en rupture de stock

const productStock = {
  laptop: 0,
  mouse: 5,
  keyboard: 0,
  monitor: 3,
};

function findKeysByValue(product, stock) {
  return Object.keys(product).filter((k) => product[k] === stock);
}

console.log("🚀 ~ findKeysByValue(productStock, 0):", findKeysByValue(productStock, 0))
// ["laptop", "keyboard"]

// Cas d'usage : Création d'un objet de scores à partir de noms de joueurs et leurs points

const playerNames = ["Alice", "Bob", "Charlie"];
const scores2 = [100, 85, 90];

function createObjectFromArrays(arr1, arr2) {
  return arr1.reduce(
    (acc, key, index) => Object.assign(acc, { [key]: arr2[index] }),
    {}
  );
}

console.log("🚀 ~ createObjectFromArrays(playerNames, scores2):", createObjectFromArrays(playerNames, scores2))
// { Alice: 100, Bob: 85, Charlie: 90 }

// Cas d'usage : Analyse des statuts de commandes

const orderStatuses = {
  order1: "pending",
  order2: "delivered",
  order3: "pending",
  order4: "cancelled",
  order5: "pending",
};

function countValues(data) {
  return Object.values(data).reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

//console.log(countValues(orderStatuses));
// { pending: 3, delivered: 1, cancelled: 1 }

// Cas d'usage : Extraction des informations publiques d'un profil

const userProfile = {
  name: "Jean Martin",
  email: "jean@email.com",
  password: "secret123",
  age: 35,
  address: "123 rue Principal",
};

const publicInfo = ["name", "age"] as const;

function extractProperties(userProfile, publicInfo) {
  return Object.entries(userProfile).reduce((acc, [key, value]) => {
    if (publicInfo.includes(key)) {
      acc[key] = value;
      return acc; 
    }

    return acc;
  }, {});
}

console.log("🚀 ~ extractProperties(userProfile, publicInfo):", extractProperties(userProfile, publicInfo))
// { name: "Jean Martin", age: 35 }
