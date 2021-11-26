import React from 'react';

//react query
import { useQuery, useMutation, useQueryClient } from 'react-query';

//router
import { useHistory, useRouteMatch } from 'react-router-dom';

//comps
import { My_AddTodoForm, My_TodoItem } from '..';
import { My_CustomModal, My_LoadingSpinner } from '../../molecules';

//repo
import * as api from '../../../service/axiosApi';

//alert
import { AlertType, showNotification } from '../../../utils/Alerts';
import { My_Pagination } from '../../molecules/Pagination';

//interface
import { ITodoData } from '../../../utils/todo';

export const My_TodoList = () => {
  ///static
  const { path } = useRouteMatch();
  const history = useHistory();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery('todo', api.getAll, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const total = Math.ceil(data.length / 5);
      setPage((prev) => ({ ...prev, total }));
    },
  });
  const { mutate } = useMutation(api.deleteOne, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('todo');
      notiSuccess('Deleted');
      onCancelModal();
    },
  });

  ///state
  const [openModal, onSetModal] = React.useState<string | null>(null);
  const [todo, setTodo] = React.useState([]);
  const [page, setPage] = React.useState({
    page: 1,
    total: 0,
  });

  ///func to handle events
  const onDelete = (_id: string) => {
    onSetModal(_id);
  };
  const onClickEdit = (id: string) => {
    history.push(`${path}/todo/${id}`);
  };
  const onCancelModal = () => {
    onSetModal(null);
  };
  const onConfirmModal = () => {
    mutate(openModal!);
  };
  const notiSuccess = (message: string) => {
    showNotification({
      type: AlertType.SUCCESS,
      msg: message,
    });
  };
  const onFetchPage = () => {
    // api.getWithQueryPage
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
            {!isLoading ? (
              data.map((item: ITodoData, index: number) => (
                <My_TodoItem
                  key={item.uuid}
                  name={item.name}
                  onClickDelete={() => onDelete(item.id)}
                  onClickEdit={() => onClickEdit(item.id)}
                />
              ))
            ) : (
              <My_LoadingSpinner />
            )}
            <My_Pagination total_page={10} current_page={3} />
          </div>
        </div>
        {/* end of block 1 */}
        {/* block modal */}
        <My_CustomModal
          open={Boolean(openModal)}
          onConfirm={onConfirmModal}
          onClose={onCancelModal}
        >
          <h4 className="font-semibold text-center my-5">
            Do you want to delete this item ?
          </h4>
        </My_CustomModal>
        {/* end of block modal */}
      </div>
    </>
  );
};
