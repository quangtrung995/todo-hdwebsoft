//comps
import { My_Redux } from "../view/admin/myredux";
import { My_Reactquery } from "../view/admin/reactquery";


export const routes = [
    {
        name: "saga",
        path: "/redux-saga",
        component: My_Redux
    },
    {
        name: "react query",
        path: "/react-query",
        component: My_Reactquery
    },
]