import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

//router
import { useHistory, useParams } from 'react-router';

//comps
import { My_LoadingSpinner } from '../../molecules';
import { My_CustomButton, My_CustomInput } from '../../atom';

//repo
import * as api from '../../../service/axiosApi';

//alert
import { AlertType, showNotification } from '../../../utils/Alerts';

export const My_TodoDetail = () => {
  ///static
  const { id }: { id: string } = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery(
    ['todo', id],
    () => api.getOneById(id),
    {
      onSuccess: (data) => {
        setContent({ ...data });
      },
    }
  );
  const { isLoading: loading, mutate } = useMutation(api.updateOne, {
    onMutate: (updatedUser) => {
      queryClient.setQueryData(['todo', id], updatedUser);
    },
    onSuccess: async () => {
      await queryClient.prefetchQuery('todo', api.getAll);
      notiSuccess('Edited');
      history.push(`/dashboard/react-query`);
    },
  });

  ///state
  const [content, setContent] = React.useState(data ? data : {});

  ///func to handle event
  const onChangeValue = (prop: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      [prop]: value,
    }));
  };
  const onSubmit = () => {
    mutate(content);
  };
  const notiSuccess = (message: string) => {
    showNotification({
      type: AlertType.SUCCESS,
      msg: message,
    });
  };

  if (isLoading) return <My_LoadingSpinner />;
  ///render
  return (
    <div className="custom-animation">
      <h4 className="uppercase font-semibold text-center py-5">
        edit your todo
      </h4>
      <div className="flex flex-row md:w-1/3 mx-auto">
        <My_CustomInput
          inputName="name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChangeValue(e.target.name, e.target.value)
          }
          className="w-full p-2 border border-[#ff7614]"
          value={content?.name}
          placeholder="Name"
        />
        <My_CustomButton
          className="w-36 bg-myblue text-white text-center py-2 capitalize bg-[#ff7614]"
          buttonType="submit"
          value="submit"
          onClickButton={onSubmit}
        >
          <h4>edit todo</h4>
        </My_CustomButton>
      </div>
    </div>
  );
};
