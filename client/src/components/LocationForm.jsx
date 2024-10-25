import { Form } from "react-router-dom";
import Input from "./Input";
import Textarea from "./Textarea";
import InputFile from "./InputFile";

export default function LocationForm(props) {
  const {
    className,
    state,
    dispatch,
    handleImages,
    children,
    ...rest
  } = props;

  return (
    <Form
      className={className}
      {...rest}
    >
      <div className="flex flex-col gap-3">
        <Input id="title" value={state.title} onChange={(e)=> dispatch({ type: "SET_TITLE", payload: e.target.value})}>
          제목
        </Input>
        <Input id="address" value={state.address} readOnly>
          주소
        </Input>
        <Textarea
          id="description"
          value={state.description}
          onChange={(e) => dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })} 
          rows="5"
        >
          설명
        </Textarea>
        <input
          type="text"
          name="coordinate"
          value={JSON.stringify(state.coordinate)}
          readOnly
          hidden
        />
        <InputFile
          id="images"
          name="images"
          type="file"
          accept="image/*"
          onChange={handleImages}
          multiple
        >이미지 업로드</InputFile>
      </div>
      {children}
    </Form>
  );
}
