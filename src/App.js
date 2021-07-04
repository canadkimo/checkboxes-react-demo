import CheckListTable from "./CheckListTable";
import "./styles.css";

const mockData = [
  {
    id: "a",
    isDisabled: false,
    isChecked: false,
    status: "00-未派車"
  },
  {
    id: "b",
    isDisabled: true,
    isChecked: false,
    status: "00-未派車"
  },
  {
    id: "c",
    isDisabled: false,
    isChecked: false,
    status: "00-未派車"
  },
  {
    id: "d",
    isDisabled: false,
    isChecked: false,
    status: "00-未派車"
  },
  {
    id: "e",
    isDisabled: false,
    isChecked: false,
    status: "00-未派車"
  }
];

export default function App() {
  return (
    <div className="App">
      <CheckListTable initData={mockData} />
    </div>
  );
}
