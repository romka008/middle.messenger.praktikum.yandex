import Block from "../modules/Block";
import {store} from "../modules/Store";
import {Indexed, isEqual} from "../utils/helpers";

export enum StoreEvents {
    Updated = "updated"
}

export function connect(mapStateToProps: (state: Indexed) => Indexed) {
    return function (Component: typeof Block) {
        return class extends Component {
            // eslint-disable-next-line
            constructor(props: any) {
                // сохраняем начальное состояние
                let state = mapStateToProps(store.getState());

                super({...props, ...state});

                // подписываемся на событие
                store.on(StoreEvents.Updated, () => {
                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());

                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        this.setProps({...newState});
                    }

                    // не забываем сохранить новое состояние
                    state = newState;
                    console.log(state);
                });
            }
        };
    };
}
