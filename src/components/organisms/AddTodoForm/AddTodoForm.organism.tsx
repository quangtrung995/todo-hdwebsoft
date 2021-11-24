import React from 'react';

//constant
import { BACKEND_URL } from '../../../constant';

//axios
import axios from 'axios';

//utils
import { makeID } from '../../../utils';

//comps
import { My_CustomButton, My_CustomInput } from '../../atom';

//redux
import { useDispatch } from 'react-redux';

//alert
import { getTodo } from '../../../redux/action';
import { AlertType, showNotification } from '../../../utils/Alerts';

export const My_AddTodoForm = ({}) => {
  ///static
  const dispatch = useDispatch();

  ///state
  const [content, setContent] = React.useState({ name: '' });

  ///effect
  React.useEffect(() => {
    return () => {
      onGetTodoList();
    };
  }, []);

  ///func to handle events
  const onChangeValue = (prop, value) => {
    setContent((prev) => ({
      ...prev,
      [prop]: value,
    }));
  };
  const onSubmit = () => {
    const object = {
      ...content,
      uuid: makeID(8),
    };
    axios
      .post(`${BACKEND_URL}/todo`, object)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          onGetTodoList();
          setContent({ name: '' });
          notiSuccess('Todo added');
        }
      })
      .catch((err) => console.log('error at post todo: ', err));
  };
  const onGetTodoList = () => {
    dispatch(getTodo());
  };
  const notiSuccess = (message: string) => {
    showNotification({
      type: AlertType.SUCCESS,
      msg: message,
    });
  };

  ///render
  return (
    <div className="w-full">
      <h4 className="uppercase font-semibold text-center py-5">todo form</h4>
      <div className="flex flex-row md:w-1/3 mx-auto">
        <My_CustomInput
          inputName="name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChangeValue(e.target.name, e.target.value)
          }
          className="w-full p-2 border border-[#ff7614]"
          value={content.name}
          placeholder="Name"
        />
        <My_CustomButton
          className="w-36 bg-myblue text-white text-center py-2 capitalize bg-[#ff7614]"
          buttonType="submit"
          value="submit"
          onClickButton={onSubmit}
        >
          <h4>add todo</h4>
        </My_CustomButton>
      </div>
    </div>
  );
};
