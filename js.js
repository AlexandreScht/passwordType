const column = ['A', 'B', 'C', 'D', 'E'];
const ligne = 5;
const Way = [];
let press = null
let last;
const ElParent = document.getElementById('plato');

const StartWay = (cell) => {
    Way.push(cell);
    press = true;
}

const SaveWay = (cell) => {
    if (!press) {
        return
    }
    Way.push(cell);
}

const EndWay = () => {
    if (!Way.length) {
        return
    }
    press = null
    setTimeout(() => {
        ColorWay(Way[0], Way.length);
        Way.splice(0, 1);
        EndWay();
    }, 300);
    if (last) {
        last.style.backgroundColor = '';
    }
}

const ColorWay = (id, lght) => {
    document.getElementById(id).animate([
        { backgroundColor: 'transparent' },
        { backgroundColor: 'red' }
    ], {
        // timing options
        duration: 1000,
        iterations: 1
    });
    if (lght === 1) {
        document.getElementById(id).style.backgroundColor = 'red';
        last = document.getElementById(id);
    }
}

const CreateTbl = (col, row) => {
    return Array.from({ length: row }, (_, index) => {
        const value = `${col}${index + 1}`;
        index++;
        return value;
    });
}

const CreateDOM = (tag, attr = {}, parents = null) => {
    const Elem = document.createElement(tag)
    const { children, event, ...others } = attr;

    if (others) {
        Object.assign(Elem, others);
    }

    if (children) {
        Elem.append(...children);
    }

    if (event) {
        Object.entries(event).forEach(([eventName, callback]) =>
            Elem.addEventListener(eventName, callback)
        );
    }

    if (parents) {
        parents.append(Elem);
    }
    return Elem;
}

const DomObj = CreateDOM(
    'table',
    {
        className: "w-full h-full",
        children: [CreateDOM(
            'tbody',
            {
                children: column.map((col) =>
                    CreateDOM(
                        'tr',
                        {
                            className: "w-full",
                            children: CreateTbl(col, ligne).map((cell) => CreateDOM(
                                'td',
                                {
                                    className: "border-solid border-2 border-black text-center hover:bg-red-300/10 text-3xl select-none",
                                    id: cell,
                                    textContent: cell,
                                    event: {
                                        mousedown: () => StartWay(cell),
                                        mouseenter: () => SaveWay(cell),
                                        mouseup: () => EndWay(),
                                    }
                                }
                            ))
                        }
                    )
                )
            }
        )],
    },
    ElParent
);