import React from 'react';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { getTodo, thunkAsyncAction } from '../../redux/action';

//constant
import { BACKEND_URL } from '../../constant';

//alert
import { AlertType, showNotification } from '../../utils/Alerts';

//comps
import { My_AddTodoForm, My_TodoItem } from '../../components/organisms';
import { My_CustomModal, My_LoadingSpinner } from '../../components/molecules';
import { My_CustomInput } from '../../components/atom';

//repo
import * as api from '../../service/axiosApi';

//interface
import { ITodoData } from '../../utils/todo';

export const My_Redux = () => {
  const { todoList, loading, thunk }: any = useSelector((state) => state);
  const dispatch = useDispatch();

  ///state
  const [openModal, onSetModal] = React.useState<string | boolean>(false);
  const [mode, setMode] = React.useState('');
  const [edit, setEdit] = React.useState<ITodoData | null>(null);

  ///effect
  React.useEffect(() => {
    onGetTodoList();
    onThuckRequest();
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
      api
        .updateOne(edit!)
        .then((res) => {
          onGetTodoList();
          notiSuccess('Edited');
        })
        .catch((err) => console.log(err));
    }
    if (mode === 'delete') {
      api
        .deleteOne(openModal as string)
        .then((res) => {
          onGetTodoList();
          notiSuccess('Deleted');
        })
        .catch((err) => console.log(err));
    }
    onCancel();
  };
  const onCancel = () => {
    onSetModal(false);
  };
  const onEditTodo = (prop: string, value: string) => {
    setEdit((prev) => ({ ...prev, [prop]: value } as ITodoData));
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
  const onThuckRequest = () => {
    thunkAsyncAction()(dispatch);
  };

  ///render
  return (
    <>
      <div className="custom-animation">
        {/* block 1 */}
        <div className="p-3">
          <My_AddTodoForm />
        </div>
        <div className="flex flex-col flex-center">
          <div className="md:w-1/3 flex flex-col gap-y-1 p-3">
            <h4 className="cap-semi text-center py-5">
              what's the plan for today ?
            </h4>
            {loading.status ? (
              todoList.todo_list.map((item: ITodoData, index: number) => (
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
        {/* end of block 1 */}
        {/* block modal */}
        <My_CustomModal
          open={openModal}
          onConfirm={onConfirm}
          onClose={onCancel}
        >
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
                  value={edit!.name}
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
    </>
  );
};
