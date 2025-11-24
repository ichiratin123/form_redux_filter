import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, updateStudent } from "../../slide/slide";

export default function StudentForm() {
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.students.edit);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maSV: edit?.maSV || "",
      hoTen: edit?.hoTen || "",
      phone: edit?.phone || "",
      email: edit?.email || "",
    },
    onSubmit: (value) => {
      console.log(value);
      if (edit) {
        dispatch(updateStudent(value));
      } else {
        dispatch(addStudent(value));
      }
      formik.resetForm();
    },
    validationSchema: yup.object().shape({
      maSV: yup.string().required("không được bỏ trống"),
      hoTen: yup.string().required("không được bỏ trống"),
      phone: yup
        .string()
        .required("không được bỏ trống")
        .matches(
          /^(0|\+84)(3|5|7|8|9)\d{8}$/,
          "số không hợp lệ vd: 0901234567"
        ),
      email: yup
        .string()
        .required("không được bỏ trống")
        .matches(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "email không hợp lệ vd: abc@gmail.com"
        ),
    }),
  });
  return (
    <div>
      <div className="bg-gray-800 text-white font-bold text-3xl py-3 px-5 mb-2">
        Thông tin sinh viên
      </div>
      <div className="container mx-auto">
        <form className="grid grid-cols-2 gap-4" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="">Mã SV</label>
            <input
              id="maSV"
              name="maSV"
              type="text"
              className="border-1 border-gray-400 rounded-sm px-1.5"
              value={formik.values.maSV}
              onChange={formik.handleChange}
            />
            <p className="mt-1, text-xs text-rose-600">{formik.errors.maSV}</p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Họ Tên</label>
            <input
              id="hoTen"
              name="hoTen"
              type="text"
              className="border-1 border-gray-400 rounded-sm px-1.5"
              value={formik.values.hoTen}
              onChange={formik.handleChange}
            />
            <p className="mt-1, text-xs text-rose-600">{formik.errors.hoTen}</p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Số điện thoại</label>
            <input
              id="phone"
              name="phone"
              type="text"
              className="border-1 border-gray-400 rounded-sm px-1.5"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            <p className="mt-1, text-xs text-rose-600">{formik.errors.phone}</p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              className="border-1 border-gray-400 rounded-sm px-1.5"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <p className="mt-1, text-xs text-rose-600">{formik.errors.email}</p>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white p-2 w-[40%] rounded-sm"
          >
            {edit ? "Cập nhật sinh viên" : "Thêm sinh viên"}
          </button>
        </form>
      </div>
    </div>
  );
}
