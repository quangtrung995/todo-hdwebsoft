import React from 'react';

//router
import { useRouteMatch, Switch } from 'react-router-dom';

//comps
import { My_TodoDetail, My_TodoList } from '../../components/organisms';

//route
import { My_PrivateRoute } from '../../routes';

export const My_Reactquery = () => {
  ///static
  const { path } = useRouteMatch();

  ///render
  return (
    <>
      <Switch>
        <My_PrivateRoute exact path={`${path}`} component={My_TodoList} />
        <My_PrivateRoute
          exact
          path={`${path}/todo/:id`}
          component={My_TodoDetail}
        />
      </Switch>
    </>
  );
};

// const My_ReactqueryModal = ({
//   mode,
//   openModal,
//   onConfirm,
//   onCancel
// }) => {
//   ///func to handle events
//   const onEditTodo = (prop, value) => {
//     setEdit((prev) => ({ ...prev, [prop]: value }));
//   };
//   return (
//     <>
//     {/* block modal */}
//     <My_CustomModal
//           open={openModal}
//           onConfirm={onConfirm}
//           onClose={onCancel}
//         >
//           {mode === 'edit' ? (
//             <>
//               <div>
//                 <h4 className="cap-semi">current todo</h4>
//                 <My_CustomInput
//                   inputName="name"
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                     onEditTodo(e.target.name, e.target.value)
//                   }
//                   className="w-full p-2 border border-[#ff7614] my-5"
//                   value={edit.name}
//                   placeholder="Name"
//                 />
//               </div>
//             </>
//           ) : (
//             <h4 className="font-semibold text-center my-5">
//               Do you want to delete this item ?
//             </h4>
//           )}
//         </My_CustomModal>
//         {/* end of block modal */}
//     </>
//   )
// }
