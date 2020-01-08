export default class Listener {
    constructor(state) {
        this._state = state;
        this._subscribers = [];
    }

    addSubscriber(subscriber) {
        this._subscribers.push(subscriber);
    }

    removeSubscriber(toRmv) {
        this._subscribers = this._subscribers.filter(
            subscriber => subscriber !== toRmv
        );
    }

    notifySubscribers() {
        this._subscribers.forEach(sub => {
            const [obj, method] = sub.split('.');
            if (this._state[obj] && this._state[obj][method]) {
                this._state[obj][method]()
            } else {
                this.removeSubscriber(sub);
            }
        });
    }
}
