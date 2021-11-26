import React from 'react';

//svg
import {
  My_ChevronLeftSvg,
  My_ChevronRightSvg,
} from '../../../assets/Chevron.svg';

//comps
import { My_CustomButton } from '../../atom';

type PaginationType = {
  total_page: number;
  current_page: number;
  fetchApi?: any;
};

export const My_Pagination = ({
  total_page,
  current_page,
  fetchApi,
}: PaginationType) => {
  ///state
  const [page, setPage] = React.useState({
    curr: current_page,
    total: total_page,
  });

  ///effect
  //   React.useEffect(() => {
  //     fetchApi(page.curr, page.total);
  //     return () => fetchApi();
  //   }, [page]);

  ///func to handle events
  const onPlus = () => {
    setPage((prev) => ({ ...prev, curr: prev.curr + 1 }));
  };
  const onMinus = () => {
    setPage((prev) => ({ ...prev, curr: prev.curr - 1 }));
  };
  const onCLickPageNum = (num: number) => {
    setPage((prev) => ({ ...prev, curr: num }));
  };
  const onDisable = () => {
    if (page.curr === 1 || page.curr === page.total) return true;
    else return false;
  };

  ///render
  return (
    <div className="flex flex-col items-center my-12">
      <div className="flex text-gray-700">
        <My_CustomButton
          className="h-8 w-8 mr-1 flex flex-center cursor-pointer"
          onClickButton={onMinus}
          disabled={onDisable()}
        >
          <My_ChevronLeftSvg size={15} />
        </My_CustomButton>
        <div className="flex h-8 font-medium ">
          {pagination(page.curr, page.total).map((item, index) => {
            if (typeof item == 'number') {
              console.log(page.curr, index + 1);
              return (
                <My_CustomButton
                  key={index}
                  className={`w-8 md:flex flex-center hidden cursor-pointer leading-5 transition duration-150 ease-in border-t-2 hover:text-[#ff7614] ${
                    page.curr === item
                      ? 'border-[#ff7614] text-[#ff7614]'
                      : 'border-transparent'
                  }`}
                  onClickButton={() => onCLickPageNum(item)}
                >
                  <p>{item}</p>
                </My_CustomButton>
              );
            } else {
              return (
                <p
                  key={index}
                  className={`w-8 md:flex flex-center hidden leading-5 transition duration-150 ease-in  border-t-2 border-transparent`}
                >
                  {item}
                </p>
              );
            }
          })}
        </div>
        <My_CustomButton
          className="h-8 w-8 ml-1 flex flex-center cursor-pointer"
          onClickButton={onPlus}
          disabled={onDisable()}
        >
          <My_ChevronRightSvg size={15} className="border-yellow-500" />
        </My_CustomButton>
      </div>
    </div>
  );
};

function pagination(c: number, m: number) {
  var current = c,
    last = m,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range: string | number[] = [],
    rangeWithDots: (string | number)[] = [],
    l;

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}
