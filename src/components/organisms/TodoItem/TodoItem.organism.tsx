import React from 'react';

//comps
import { My_CustomButton, My_TrimmingText } from '../../atom';

export const My_TodoItem = ({ name, onClickEdit, onClickDelete }) => {
  return (
    <div className="w-full todo-row">
      <div className="w-full">
        <My_TrimmingText lines={1} className="cap-semi text-white">
          {name}
        </My_TrimmingText>
      </div>
      <div className="flex flex-row gap-x-3">
        <My_CustomButton onClickButton={onClickEdit}>
          <i className="fas fa-edit text-white text-base" />
        </My_CustomButton>
        <My_CustomButton onClickButton={onClickDelete}>
          <i className="fas fa-times text-white text-base" />
        </My_CustomButton>
      </div>
    </div>
  );
};
