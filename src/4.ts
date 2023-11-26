class Key {
  private signature: number;

  constructor() {
    // Генерую випадковий підпис за допомогою Math.random()
    this.signature = Math.random();
  }

  // Метод, що повертає значення властивості signature
  public getSignature(): number {
    return this.signature;
  }
}

class Person {
  private name: string;
  private key: Key;

  //Конструктор приймає об'єкт класу Key і зберігає їх у приватному властивості key(додатково оголошую властивість name)
  constructor(name: string, key: Key) {
    this.name = name;
    this.key = key;
  }

  // Метод, що повертає значення властивості key
  public getKey(): Key {
    return this.key;
  }

  // Метод, що повертає значення властивості name
  public getName(): string {
    return this.name;
  }
}

abstract class House {
  protected door: boolean = false; //початкове значчення - двері зачинені
  protected key: Key;
  protected tenants: Person[] = []; // початкове значення - пустий масив

  constructor(key: Key) {
    this.key = key;
  }

  public abstract OpenDoor(key: Key): void;

  // Mетод, що перевіряє чи відкриті двері, та додає об'єкт Person, якщо true
  public comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      console.log(`Welcome, ${person.getName()}! You entered the house.`);
    } else {
      console.log(`The door is closed. It is impossible to enter.`);
    }
  }
}

class MyHouse extends House {
  //реалізую абстрактний клас, якщо ключі збігаються - двері відчиняються.
  public OpenDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log("The door is open.");
    } else {
      console.log("Invalid key. The door remains closed.");
    }
  }
}

const key = new Key();

const house = new MyHouse(key);

const person = new Person("Valeriia", key);

house.OpenDoor(person.getKey());

house.comeIn(person);

export {};
