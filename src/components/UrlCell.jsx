// components/UrlCell.jsx

const UrlCell = ({ url }) => {
  if (!url) return "-";

  return (
    <div className="flex items-center w-full">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 text-blue-600 hover:underline truncate"
      >
        {url}
      </a>
    </div>
  );
};

export default UrlCell;
