import { useEffect, useMemo, useState } from "react";

const useKeyPressingListener = (keyCode) => {
  const [isKeyPressing, setIsKeyPressing] = useState(false);

  useEffect(() => {
    const keyPressListener = (e) => {
      e.keyCode === keyCode && setIsKeyPressing(true);
    };

    const keyReleaseListener = (e) => {
      e.keyCode === keyCode && setIsKeyPressing(false);
    };

    document.addEventListener("keydown", keyPressListener);
    document.addEventListener("keyup", keyReleaseListener);

    return () => {
      document.removeEventListener("keydown", keyPressListener);
      document.removeEventListener("keyup", keyReleaseListener);
    };
  }, [keyCode]);

  return [isKeyPressing];
};

export default function CheckListTable({ initData }) {
  const [checkList, setCheckList] = useState(initData);
  const [isShiftPressing] = useKeyPressingListener(16);
  const [prevClickIndex, setPrevClickIndex] = useState(-1);
  const isAllChecked = useMemo(
    () =>
      checkList
        .filter((item) => !item.isDisabled)
        .every((item) => item.isChecked),
    [checkList]
  );

  const updatIsChecked = (isChecked, range) => {
    const shouldUpdate = (item, i) => {
      const isInRange = !range || (i >= range.start && i <= range.end);
      return item.isDisabled || !isInRange;
    };

    const newList = checkList.map((item, i) => ({
      ...item,
      ...(shouldUpdate(item, i) ? {} : { isChecked })
    }));

    setCheckList(newList);
  };

  const getSelectedRange = (currentIndex) => {
    let prevIndex = currentIndex;
    if (isShiftPressing && prevClickIndex >= 0) {
      prevIndex = prevClickIndex;
    }

    return [prevIndex, currentIndex].sort((a, b) => a - b);
  };

  const handleChange = (event) => {
    const { name: id, checked: isChecked } = event.target;
    const currentIndex = checkList.findIndex((i) => i.id === id);
    const [start, end] = getSelectedRange(currentIndex);

    updatIsChecked(isChecked, { start, end });
    setPrevClickIndex(currentIndex);
  };

  const handleChangeAll = (event) => updatIsChecked(event.target.checked);

  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={isAllChecked}
              onChange={handleChangeAll}
            />
          </th>
          <th>狀態</th>
        </tr>
      </thead>
      <tbody>
        {checkList.map((data) => (
          <tr key={data.id}>
            <td>
              <input
                type="checkbox"
                name={data.id}
                checked={data.isChecked}
                onChange={handleChange}
                disabled={data.isDisabled}
              />
            </td>
            <td>{data.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
