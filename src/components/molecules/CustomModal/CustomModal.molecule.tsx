import React from 'react';

//comps
import { My_CustomButton } from '../../atom';

type CustomModalType = {
  open: boolean | string;
  onConfirm: () => void;
  onClose: () => void;
  children: JSX.Element;
};

export const My_CustomModal = ({
  open,
  onConfirm,
  onClose,
  children,
}: CustomModalType) => {
  useDisableBodyScroll(open);
  ///render
  return (
    <>
      {open ? (
        <div className="w-screen h-screen absolute top-0 right-0 left-0 bg-opacity flex flex-center">
          <div className="rounded-lg bg-white p-3 m-3 flex flex-col custom-animation w-full md:w-1/3">
            {children}
            <div className="flex flex-row flex-center mt-5 gap-x-3">
              <My_CustomButton
                buttonType="button"
                className="py-2 px-5 bg-[#ff7614] cap-semi text-white rounded-md"
                onClickButton={onConfirm}
              >
                <h4>confirm</h4>
              </My_CustomButton>
              <My_CustomButton
                buttonType="button"
                className="py-2 px-5 bg-mytext cap-semi text-white rounded-md"
                onClickButton={onClose}
              >
                <h4>cancel</h4>
              </My_CustomButton>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
const useDisableBodyScroll = (open: boolean | string) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);
};
