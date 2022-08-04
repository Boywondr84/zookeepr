const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal,
} = require('../lib/animals');

const { animals } = require('../data/animals.json');
const { hasUncaughtExceptionCaptureCallback } = require("process");
const { start } = require("repl");
jest.mock("fs");
test("creates an animal object", () => {
    const animal = createNewAnimal(
        {name: "Martha", id: "alidjajf" },
        animals
    );

    expect(animal.name).toBe("Martha");
    expect(animal.id).toBe("alidjajf");
});

test("filters by query", () => {
    const startingAnimals = [
    {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
        personalityTraits: ["quirky", "rash"],
    },
    {
        id: "4",
        name: "Noel",
        species: "bear",
        diet: "carnivore",
        personalityTraits: ["impish", "sassy", "brave"],
    },
];
    const updatedAnimals = filterByQuery({ species: "gorilla" }, startingAnimals);

    expect(updatedAnimals.length).toEqual(1);
});

test("finds animal by id", () => {
    const startingAnimals = [
        {
            id: "3",
            name: "Erica",
            species: "gorilla", 
            diet: "omnivore",
            personalityTraits: ["quirky", "rash"],
        },
        {
            id: "4",
            name: "Noel",
            species: "bear",
            diet: "carnivore",
            personalityTraits: ["impish", "sassy", "brave"],
        },
    ];

    const result = findById("3", startingAnimals);

    expect(result.name).toBe("Erica");
});

test("validates personality traits", () => {
    const animal = {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
        personalityTraits: ["quirky", "rash"],
    };
    const invalidAnimal = {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
    };

    const result = validateAnimal(animal);
    const result2 = validateAnimal(invalidAnimal);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});