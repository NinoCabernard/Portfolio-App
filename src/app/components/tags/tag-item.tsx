import type { Tagable } from "./tags";
import "./tag-item.css";
import { useState, type ReactElement } from "react";

interface TagProps<T extends Tagable> {
  tag: T;
  popupElement: (tag: T) => ReactElement;
}

export default function TagItem<T extends Tagable>(props: TagProps<T>) {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const tag = props.tag;
  return (
    <div
      className="tag-item"
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <p>{tag.name}</p>
      {showPopup && <div className="tag-popup">{props.popupElement(tag)}</div>}
    </div>
  );
}
