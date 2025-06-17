// components/UrlCell.jsx
const UrlCell = ({ url }) => {
  if (!url) return "-";

  return (
    <div className="max-w-[220px] truncate">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline block"
      >
        {url}
      </a>
    </div>
  );
};

export default UrlCell;
