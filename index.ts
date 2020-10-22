import { Model, Collection } from "./library";

export class DateValue {
  private _date: Date;
  constructor(date) {
    this._date = new Date(date);
  }

  get date(): Date {
    return this.date;
  }
}
export type categories = string[];

export class Task extends Model {
  date: DateValue;
  id: string = "";
  description = "";
  done: boolean = false;
  categories: categories;

  constructor({ date, id, description, categories }) {
    super();
    this.date = new DateValue(date);
    this.id = id;
    this.description = description;
    this.categories = categories;
  }

  toggle() {
    this.done = !this.done;
  }

  beforeSet() {
    console.log("before set");
  }
  afterSet() {
    console.log("after eset");
  }
}

const task = new Task({
  date: "june 12, 2020",
  id: "1",
  description: "task 1",
  categories: ["a"]
});
const task1 = new Task({
  date: "june 13, 2020",
  id: "2",
  description: "task 2",
  categories: ["a", "b"]
});
const task2 = new Task({
  date: "june 14, 2020",
  id: "3",
  description: "task 3",
  categories: ["c"]
});

const collection = new Collection<Task>([task1, task2, task], { id: "id" });

console.log("3", collection.getById("3"));

console.log(
  collection.indexBy(
    (x: Task) => {
      // console.log('=>',typeof +x.id);
      return x.done ? "done" : "undone";
    },
    { undone: [], done: [] }
  )
);
