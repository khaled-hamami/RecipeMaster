import React from "react";
import { TagsInput } from "react-tag-input-component";
import "@/app/globals.css";
interface TagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <TagsInput
        value={value}
        onChange={onChange}
        name="ingredients"
        placeHolder="Ingredients"
        classNames={{
          input: "tagsInput",
          tag: "tag",
          tagRemove: "tagRemove",
        }}
      />
    </div>
  );
};

export default TagInput;
