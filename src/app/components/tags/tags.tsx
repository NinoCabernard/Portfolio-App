import "./tags.css";
import { useState, type ReactElement } from "react";

interface TagsProps<T extends Tagable> {
  tags: T[] | undefined;
  title: string;
  children: ReactElement;
}

export interface Tagable {
  name: string;
}

export default function Tags<T extends Tagable>(props: TagsProps<T>) {
  const [showPopup, setShowPopup] = useState<number | undefined>(undefined);
  const [tags, setTags] = useState<T[]>(props.tags ?? []);

  return (
    <div className="tag-container">
      <div className="tag-list-container">
        <span className="tag-title">{props.title}</span>
        {tags.map((tag, index) => {
          if (tag !== undefined) {
            return (
              <div
                className="tag-item"
                onMouseEnter={() => setShowPopup(index)}
                onMouseLeave={() => setShowPopup(undefined)}
              >
                <p>{tag.name}</p>
                {showPopup == index && (
                  <div className="tag-popup">{props.children}</div>
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
