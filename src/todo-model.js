class TodoModel {
  constructor(data) {
    this.data = data || {
      title: "",
      type: "",
      completed: "on",
      description: "",
      due_date: new Date(),
      priotity: "Low"
    };
  }

  set(key, value) {
    this.data[key] = value;
  }

  async save() {
    const result = await fetch(
      "http://localhost:3000/todos/" + (this.data.id || ""),
      {
        method: this.data.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.data)
      }
    );

    this.data.id = result.id;

    result;
  }
}
