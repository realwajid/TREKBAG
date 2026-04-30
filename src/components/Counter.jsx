export default function Counter({ totalCount, totalDone }) {
  return (
    <div>
      {totalDone}/ {totalCount} items packed
    </div>
  );
}