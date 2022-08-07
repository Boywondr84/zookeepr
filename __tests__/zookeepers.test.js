const fs = require ("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require('../lib/zookeepers.js');

const { zookeepers } = require('../data/zookeepers.json');
const { hasUncaughtExceptionCaptureCallback } = require("process");
const { start } = require("repl");
jest.mock("fs");

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        {name: "Steve", id: "11"},
        zookeepers
    );
    expect(zookeeper.name).toBe("Steve");
    expect(zookeeper.id).toBe("11");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "12",
            name: "Bob",
            age: 50,
            favoriteAnimal: "giraffe",
        },
        {
            id: "15",
            name: "Jim",
            age: 61,
            favoriteAnimal: "chimpanzee",
        },
    ];
    const updatedZookeepers = filterByQuery({ favoriteAnimal: "giraffe" }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("finds a zookeeper id", () => {
    const startingZookeepers = [
        {
            id: "12",
            name: "Bob",
            age: 50,
            favoriteAnimal: "giraffe",
        },
        {
            id: "15",
            name: "Jim",
            age: 61,
            favoriteAnimal: "chimpanzee",
        }, 
    ];

    const result = findById("12", startingZookeepers);

    expect(result.name).toBe("Bob");
});

test("validate name", () => {
    const zookeeper = {
            id: "12",
            name: "Bob",
            age: 50,
            favoriteAnimal: "giraffe",
        };
    const invalidZookeeper = {
            id: "15",
            name: "John",
            age: '61',
            favoriteAnimal: "chimpanzee",
    };
    
    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});