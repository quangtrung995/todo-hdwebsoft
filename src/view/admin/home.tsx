import axios from 'axios';

//axios
import React from 'react';

//constant
import { BACKEND_URL } from '../../constant';

//img
import logo from '../../assets/programming.png';

//comps
import { My_CustomButton, My_CustomInput } from '../../components/atom';
import { My_CustomModal, My_LoadingSpinner } from '../../components/molecules';
import { My_AddTodoForm, My_TodoItem } from '../../components/organisms';

//alert
import { AlertType, showNotification } from '../../utils/Alerts';

//auth
import { useAuth } from '../Wrapper/Auth.wrapper';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { getTodo } from '../../redux/action';

const My_home = () => {
  ///static
  const { todoList, loading }: any = useSelector((state) => state);
  const dispatch = useDispatch();
  const { onLogout } = useAuth();

  ///state
  const [openModal, onSetModal] = React.useState(null);
  const [mode, setMode] = React.useState('delete');
  const [edit, setEdit] = React.useState({ name: '' });

  ///effect
  React.useEffect(() => {
    onGetTodoList();
    return () => {
      onGetTodoList();
    };
  }, []);

  ///func to handle events
  const onChangeMode = (target: string, _id: string, editValue?: any) => {
    setMode(target);
    onSetModal(_id);
    if (target === 'edit') {
      setEdit(editValue);
    }
  };
  const onConfirm = () => {
    if (mode === 'edit') {
      axios
        .put(`${BACKEND_URL}/todo/${openModal}`, edit)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            onGetTodoList();
            notiSuccess('Edited');
          }
        })
        .catch((err) => console.log(err));
    }
    if (mode === 'delete') {
      axios
        .delete(`${BACKEND_URL}/todo/${openModal}`)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            onGetTodoList();
            notiSuccess('Deleted');
          }
        })
        .catch((err) => console.log(err));
    }
    onCancel();
  };
  const onCancel = () => {
    onSetModal(null);
  };
  const onEditTodo = (prop, value) => {
    setEdit((prev) => ({ ...prev, [prop]: value }));
  };
  const onSignout = () => {
    notiSuccess('Success');
    setTimeout(() => onLogout(), 2000);
  };
  const notiSuccess = (message: string) => {
    showNotification({
      type: AlertType.SUCCESS,
      msg: message,
    });
  };
  const onGetTodoList = () => {
    dispatch(getTodo());
  };

  ///render
  return (
    <div className="w-full min-h-screen">
      {/* block 1 */}
      <div className="flex flex-row justify-between items-center px-5">
        <img className="w-14 h-14 object-contain" src={logo} alt="a logo" />
        <My_CustomButton
          className="bg-gray-700 text-white border rounded-lg py-1 px-3 cap-semi"
          onClickButton={onSignout}
        >
          <h4>sign out</h4>
        </My_CustomButton>
      </div>
      {/* end of block 1 */}
      {/* block 2 */}
      <div className="p-3">
        <My_AddTodoForm />
      </div>
      <div className="flex flex-col flex-center">
        <div className="md:w-1/3 flex flex-col gap-y-1 p-3">
          <h4 className="cap-semi text-center py-5">
            what's the plan for today ?
          </h4>
          {loading.status ? (
            todoList.todo_list.map((item, index) => (
              <My_TodoItem
                key={item.uuid}
                name={item.name}
                onClickDelete={() => onChangeMode('delete', item.id)}
                onClickEdit={() => onChangeMode('edit', item.id, item)}
              />
            ))
          ) : (
            <My_LoadingSpinner />
          )}
        </div>
      </div>
      {/* end of block 2 */}
      {/* block modal */}
      <My_CustomModal open={openModal} onConfirm={onConfirm} onClose={onCancel}>
        {mode === 'edit' ? (
          <>
            <div>
              <h4 className="cap-semi">current todo</h4>
              <My_CustomInput
                inputName="name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onEditTodo(e.target.name, e.target.value)
                }
                className="w-full p-2 border border-[#ff7614] my-5"
                value={edit.name}
                placeholder="Name"
              />
            </div>
          </>
        ) : (
          <h4 className="font-semibold text-center my-5">
            Do you want to delete this item ?
          </h4>
        )}
      </My_CustomModal>
      {/* end of block modal */}
    </div>
  );
};
export default My_home;
