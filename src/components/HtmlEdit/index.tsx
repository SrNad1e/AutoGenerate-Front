import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import { modules, formats } from './constant';

export const FirstVersion = (props: any) => {
  const { value, onChange } = props;

  return (
    <>
      <ReactQuill
        theme="snow"
        onChange={onChange}
        value={value}
        modules={modules}
        formats={formats}
        readOnly={false}
        preserveWhitespace
        style={{ height: 50, width: 350, marginBottom: 30 }}
      />
    </>
  );
};
