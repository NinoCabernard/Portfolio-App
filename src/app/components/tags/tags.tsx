import "./tags.css";
import { useState, type ReactElement } from "react";

interface TagsProps<T extends Tagable> {
  tags: T[] | undefined;
  title: string;
  popupElement: (tag: T) => ReactElement;
}

export interface Tagable {
  name: string;
}

export default function Tags<T extends Tagable>(props: TagsProps<T>) {
  const [showPopup, setShowPopup] = useState<number | undefined>(undefined);
  const [expanded, setExpanded] = useState(false);
  const tags = props.tags ?? [];

  const visibleTags = expanded ? tags : tags.slice(0, 4);
  const hiddenCount = tags.length - visibleTags.length;

  return (
    <div className="tag-container">
      <span className="tag-title">{props.title}</span>
      {visibleTags.map((tag, index) => {
        if (tag !== undefined) {
          return (
            <div
              className="tag-item"
              onMouseEnter={() => setShowPopup(index)}
              onMouseLeave={() => setShowPopup(undefined)}
            >
              <p>{tag.name}</p>
              {showPopup == index && (
                <div className="tag-popup">{props.popupElement(tag)}</div>
              )}
            </div>
          );
        }
      })}

      {hiddenCount > 0 && !expanded && (
        <div onClick={() => setExpanded(true)}>+{hiddenCount} more</div>
      )}
    </div>
  );
}
