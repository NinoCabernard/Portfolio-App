import TagItem from "./tag-item";
import "./tags.css";
import { useState, type ReactElement } from "react";

interface TagsProps<T extends Tagable> {
  tags: T[] | undefined;
  title: string;
  popupElement?: (tag: T) => ReactElement;
}

export interface Tagable {
  name: string;
}

export default function Tags<T extends Tagable>(props: TagsProps<T>) {
  const [showPopup, setShowPopup] = useState<number | undefined>(undefined);
  const [expanded, setExpanded] = useState(false);
  const tags = props.tags ?? [];

  const visibleTags = expanded ? tags : tags.slice(0, 3);
  const hiddenCount = tags.length - visibleTags.length;

  return (
    <div className="tag-container">
      <span className="tag-title">{props.title}</span>
      {visibleTags.map((tag, index) => {
        if (tag !== undefined) {
          return (
            <TagItem
              key={tag.name}
              tag={tag}
              popupElement={props.popupElement}
            ></TagItem>
          );
        }
      })}

      {hiddenCount > 0 && !expanded && (
        <div
          className="tag-expandable tag-item"
          onClick={() => setExpanded(true)}
        >
          +{hiddenCount} more
        </div>
      )}
      {hiddenCount == 0 && expanded && (
        <div
          className="tag-expandable tag-item"
          onClick={() => setExpanded(false)}
        >
          show less
        </div>
      )}
    </div>
  );
}
