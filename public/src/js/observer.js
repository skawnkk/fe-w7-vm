class Observable {
  constructor() {
    this._observers = new Set();
  }
  subscribe(observer) {
    this._observers.add(observer);
  }
  unsubscribe(observer) {
    this._observers = [...this._observers].filter((subscriber) => subscriber !== observer);
  }
  async notify(data) {
    for (const observer of this._observers) {
      if (observer instanceof Promise) await observer(data);
      else observer(data);
    }
    // this._observers.forEach((observer) => observer(data));
  }
}

export default Observable;
