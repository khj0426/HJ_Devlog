import "./index.css";
import Skeleton from "@hj-devlog/shared/src/components/Skeleton/Skeleton";
export default function Loading() {
  return (
    <div className="loading_container">
      {Array.from({ length: 50 }).map((_, index) => (
        <div key={index}>
          <Skeleton.Text
            height={70}
            className="loading_skeleton"
            style={{
              display: "flex",
              width: "80%",
            }}
          />
        </div>
      ))}
    </div>
  );
}
