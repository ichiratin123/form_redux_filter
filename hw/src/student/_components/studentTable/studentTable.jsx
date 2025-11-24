import { useSelector, useDispatch } from "react-redux";
import { deleteStudent, setEdit } from "../../slide/slide";
import { useState } from "react";

export default function StudentTable() {
  const data = useSelector((state) => state.students.list);
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const filteredData = data.filter(
    (sv) =>
      sv.hoTen.toLowerCase().includes(keyword.toLowerCase()) ||
      sv.maSV.toLowerCase().includes(keyword.toLowerCase()) ||
      sv.email.toLowerCase().includes(keyword.toLowerCase())
  );
  return (
    <div>
      <div className="container mx-auto">
        <input
          type="text"
          className="mt-5 border-1 border-gray-400 mr-2 px-2 py-1"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="bg-green-600 text-white rounded-sm px-2 py-1">
          Find
        </button>
      </div>
      <table className="w-full mt-5 table-auto border-collapse">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3">Mã SV</th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((sv, index) => (
            <tr key={index} className="border-b-1 border-gray-200">
              <td className="text-center">{sv.maSV}</td>
              <td className="text-center">{sv.hoTen}</td>
              <td className="text-center">{sv.phone}</td>
              <td className="text-center">{sv.email}</td>
              <td className="text-center">
                <button
                  type="button"
                  className="bg-green-600 text-white p-1 rounded-sm mt-1 mb-1 mr-1 cursor-pointer"
                  onClick={() => {
                    dispatch(setEdit(sv));
                  }}
                >
                  sửa
                </button>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(deleteStudent(sv.maSV));
                  }}
                  className="bg-red-600 text-white p-1 rounded-sm mt-1 mb-1 mr-1 cursor-pointer"
                >
                  xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
